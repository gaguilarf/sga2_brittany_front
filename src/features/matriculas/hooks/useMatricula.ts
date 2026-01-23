import { useState, useEffect } from "react";
import { StudentService } from "@/shared/services/api/studentService";
import { CampusService } from "@/shared/services/api/campusService";
import { PlanService } from "@/shared/services/api/planService";
import { EnrollmentService } from "@/shared/services/api/enrollmentService";
import { PaymentService } from "@/shared/services/api/paymentService";
import { AcademicService } from "@/shared/services/api/academicService";
import { useAuth } from "@/shared/contexts/AuthContext";
import {
  Student,
  Campus,
  Plan,
  Course,
  Level,
  Cycle,
} from "../models/EnrollmentModels"; // Adjust path if needed
import {
  PREDEFINED_SCHEDULES,
  PredefinedSchedule,
} from "../constants/Schedules";
import { PAYMENT_TYPES } from "../constants/PaymentTypes";

export const useMatricula = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [enrollmentFlow, setEnrollmentFlow] = useState<
    "selection" | "new" | "existing"
  >("selection");
  const [isExistingStudent, setIsExistingStudent] = useState(false);

  // Static data
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: Estudiante
    id: null as number | null,
    nombre: "",
    dni: "",
    fechaNacimiento: "",
    edad: "",
    distrito: "",
    celularAlumno: "",
    celularApoderado: "",
    email: "",

    // Step 2: Sede y Plan
    campusId: "",
    planId: "",

    // Step 3: Configuración Académica
    courseId: "",
    initialLevelId: "",
    initialCycleId: "",
    modalidad: "Virtual",
    horario: "",
    tipoInscripcion: "",

    // Step 4: Pago (múltiples pagos)
    payments: [{ tipo: "", metodo: "", monto: "" }] as Array<{
      tipo: string;
      metodo: string;
      monto: string;
    }>,
    numeroBoleta: "",

    // UI states
    diaClase: "",
    horaInicio: "",
    horaFin: "",
    scheduleOption: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activeCampuses, activePlans, activeCourses] = await Promise.all([
          CampusService.getActive(),
          PlanService.getActive(),
          AcademicService.getCourses(),
        ]);
        setCampuses(activeCampuses);
        setPlans(activePlans);
        setCourses(activeCourses);
      } catch (err) {
        console.error("Error fetching static data:", err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    if (name === "courseId") {
      setFormData((prev) => ({
        ...prev,
        courseId: value,
        initialLevelId: "",
        initialCycleId: "",
      }));
      if (value) {
        AcademicService.getLevelsByCourse(parseInt(value)).then((res) =>
          setLevels(res),
        );
      } else {
        setLevels([]);
      }
      setCycles([]);
      return;
    }

    if (name === "initialLevelId") {
      setFormData((prev) => ({
        ...prev,
        initialLevelId: value,
        initialCycleId: "",
      }));
      if (value) {
        AcademicService.getCyclesByLevel(parseInt(value)).then((res) =>
          setCycles(res),
        );
      } else {
        setCycles([]);
      }
      return;
    }

    if (name === "fechaNacimiento") {
      const birthDate = new Date(value);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        // Clear age error as well since it's auto-calculated
        if (errors.edad) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.edad;
            return newErrors;
          });
        }

        setFormData((prev) => ({
          ...prev,
          [name]: value,
          edad: age.toString(),
        }));
        return;
      }
    }

    if (name === "scheduleOption") {
      const selectedOption = value;
      if (selectedOption === "Otro") {
        setFormData((prev) => ({
          ...prev,
          scheduleOption: "Otro",
          diaClase: "",
          horaInicio: "",
          horaFin: "",
        }));
      } else if (selectedOption) {
        const predefined = PREDEFINED_SCHEDULES.find(
          (s: PredefinedSchedule) => s.label === selectedOption,
        );
        if (predefined) {
          setFormData((prev) => ({
            ...prev,
            scheduleOption: selectedOption,
            diaClase: predefined.diaClase,
            horaInicio: predefined.horaInicio,
            horaFin: predefined.horaFin,
          }));
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          scheduleOption: "",
          diaClase: "",
          horaInicio: "",
          horaFin: "",
        }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchStudent = async () => {
    if (!formData.dni || formData.dni.length < 8) return;
    setLoading(true);
    setError(null);
    try {
      const student = await StudentService.getByDni(formData.dni);
      if (student) {
        setSelectedStudent(student);
        setFormData((prev) => ({
          ...prev,
          id: student.id,
          nombre: student.nombre,
          dni: student.dni || prev.dni,
          fechaNacimiento: student.fechaNacimiento || "",
          edad: student.edad?.toString() || "",
          distrito: student.distrito || "",
          celularAlumno: student.celularAlumno || "",
          celularApoderado: student.celularApoderado || "",
          email: student.correo || "",
        }));
      } else {
        setSelectedStudent(null);
        setFormData((prev) => ({ ...prev, id: null }));
      }
    } catch (err) {
      setError("Error al buscar estudiante");
    } finally {
      setLoading(false);
    }
  };

  const startNewEnrollment = () => {
    setEnrollmentFlow("new");
    setIsExistingStudent(false);
    setCurrentStep(1);
  };

  const startExistingEnrollment = (student: Student) => {
    setSelectedStudent(student);
    setFormData((prev) => ({
      ...prev,
      id: student.id,
      nombre: student.nombre,
      dni: student.dni || "",
      fechaNacimiento: student.fechaNacimiento || "",
      edad: student.edad?.toString() || "",
      distrito: student.distrito || "",
      celularAlumno: student.celularAlumno || "",
      celularApoderado: student.celularApoderado || "",
      email: student.correo || "",
    }));
    setEnrollmentFlow("existing");
    setIsExistingStudent(true);
    setCurrentStep(2); // Jump to step 2 as requested
  };

  const resetFlow = () => {
    setEnrollmentFlow("selection");
    setIsExistingStudent(false);
    setCurrentStep(1);
    setSelectedStudent(null);
    // Optionally reset formData here if needed, but the user didn't explicitly ask for it
    // Most likely we want a fresh start
    setFormData({
      id: null,
      nombre: "",
      dni: "",
      fechaNacimiento: "",
      edad: "",
      distrito: "",
      celularAlumno: "",
      celularApoderado: "",
      email: "",
      campusId: "",
      planId: "",
      courseId: "",
      initialLevelId: "",
      initialCycleId: "",
      modalidad: "Virtual",
      horario: "",
      tipoInscripcion: "",
      payments: [{ tipo: "", metodo: "", monto: "" }],
      numeroBoleta: "",
      diaClase: "",
      horaInicio: "",
      horaFin: "",
      scheduleOption: "",
    });
    setErrors({});
  };

  // Payment management functions
  const addPayment = () => {
    setFormData((prev) => ({
      ...prev,
      payments: [...prev.payments, { tipo: "", metodo: "", monto: "" }],
    }));
  };

  const removePayment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      payments: prev.payments.filter((_, i) => i !== index),
    }));
  };

  const handlePaymentChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedPayments = [...prev.payments];
      updatedPayments[index] = {
        ...updatedPayments[index],
        [field]: value,
      };
      return { ...prev, payments: updatedPayments };
    });

    // Clear error for this specific payment field
    const errorKey = `payment_${index}_${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const validateStep = async (step: number): Promise<boolean> => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.nombre)
        newErrors.nombre = "El nombre completo es obligatorio.";
      if (!formData.dni) newErrors.dni = "El DNI es obligatorio.";
      else if (formData.dni.length < 8) newErrors.dni = "Mínimo 8 caracteres.";

      // Check for duplicate DNI
      if (formData.dni && formData.dni.length >= 8) {
        try {
          const existingStudent = await StudentService.getByDni(formData.dni);
          // If student exists and it's not the currently selected student, show error
          if (existingStudent && existingStudent.id !== formData.id) {
            newErrors.dni = "Este DNI ya está registrado en el sistema.";
          }
        } catch (err) {
          console.error("Error checking DNI:", err);
        }
      }

      // Edad/FechaNacimiento: at least one is required
      if (!formData.fechaNacimiento && !formData.edad) {
        newErrors.fechaNacimiento = "Fecha obligatoria.";
        newErrors.edad = "La edad es obligatoria.";
      }

      if (!formData.distrito)
        newErrors.distrito = "El distrito es obligatorio.";

      // CelularAlumno/CelularApoderado: at least one is required
      if (!formData.celularAlumno && !formData.celularApoderado) {
        newErrors.celularApoderado = "Celular apoderado obligatorio.";
      }

      if (!formData.email) newErrors.email = "El correo es obligatorio.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Formato de correo inválido.";
    }

    if (step === 2) {
      if (!formData.campusId) newErrors.campusId = "Debe seleccionar una sede.";
      if (!formData.planId) newErrors.planId = "Debe seleccionar un plan.";
      if (!formData.courseId) newErrors.courseId = "Debe seleccionar un curso.";
      if (!formData.initialLevelId)
        newErrors.initialLevelId = "Debe seleccionar un nivel.";
      if (!formData.initialCycleId)
        newErrors.initialCycleId = "Debe seleccionar un ciclo.";
      if (!formData.tipoInscripcion)
        newErrors.tipoInscripcion = "Tipo de inscripción obligatorio.";
      if (!formData.scheduleOption)
        newErrors.scheduleOption = "Debe seleccionar un horario.";

      if (formData.scheduleOption === "Otro") {
        if (!formData.diaClase)
          newErrors.diaClase = "Días de clase obligatorios.";
        if (!formData.horaInicio)
          newErrors.horaInicio = "Hora inicio obligatoria.";
        if (!formData.horaFin) newErrors.horaFin = "Hora fin obligatoria.";
      }
    }

    if (step === 3) {
      // Validar número de boleta (compartido)
      if (!formData.numeroBoleta)
        newErrors.numeroBoleta = "Nro. de boleta obligatorio.";

      // Validar que haya al menos un pago
      if (!formData.payments || formData.payments.length === 0) {
        newErrors.payments = "Debe agregar al menos un pago.";
      } else {
        // Validar cada pago
        const paymentTypes = new Set<string>();

        formData.payments.forEach((payment, index) => {
          if (!payment.tipo) {
            newErrors[`payment_${index}_tipo`] = "Tipo obligatorio.";
          } else {
            // Validar tipos únicos
            if (paymentTypes.has(payment.tipo)) {
              newErrors[`payment_${index}_tipo`] = "Tipo de pago duplicado.";
            }
            paymentTypes.add(payment.tipo);
          }

          if (!payment.metodo) {
            newErrors[`payment_${index}_metodo`] = "Método obligatorio.";
          }

          if (!payment.monto || Number(payment.monto) <= 0) {
            newErrors[`payment_${index}_monto`] = "Monto inválido.";
          }
        });

        // Validar que haya al menos un pago de Inscripción para alumnos nuevos
        if (!isExistingStudent) {
          const hasInscripcion = formData.payments.some(
            (payment: any) => payment.tipo === "Inscripción",
          );
          if (!hasInscripcion) {
            newErrors.payments =
              "Debe incluir al menos un pago de Inscripción para alumnos nuevos.";
          }
        }
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setError("Por favor, completa los campos obligatorios indicados.");
      return false;
    }

    setError(null);
    return true;
  };

  const nextStep = async () => {
    if (await validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFinalAction = async () => {
    setLoading(true);
    setError(null);
    try {
      let studentId = formData.id;

      // 1. Check if student exists (Idempotency)
      if (!isExistingStudent && !studentId) {
        // Try to find by DNI first to avoid "Already exists" error on retry
        const existingStudent = await StudentService.getByDni(
          formData.dni,
        ).catch(() => null);

        if (existingStudent) {
          studentId = existingStudent.id;
        } else {
          // Create new student if not found
          const newStudent = await StudentService.create({
            nombre: formData.nombre.trim(),
            dni: formData.dni,
            fechaNacimiento: formData.fechaNacimiento || undefined,
            edad: formData.edad ? parseInt(formData.edad) : undefined,
            distrito: formData.distrito,
            celularAlumno: formData.celularAlumno,
            celularApoderado: formData.celularApoderado,
            correo: formData.email,
          });
          studentId = newStudent.id;
        }
      }

      // 2. Create Enrollment
      const enrollment = await EnrollmentService.create({
        studentId: studentId!,
        campusId: parseInt(formData.campusId) || 0,
        planId: parseInt(formData.planId) || 0,
        courseId: parseInt(formData.courseId) || undefined,
        modalidad: formData.modalidad,
        horario:
          `${formData.diaClase} ${formData.horaInicio}-${formData.horaFin}`.trim() ||
          formData.horario,
        initialLevelId: parseInt(formData.initialLevelId) || undefined,
        initialCycleId: parseInt(formData.initialCycleId) || undefined,
        tipoInscripcion: formData.tipoInscripcion,
        advisorId: user?.id || 0,
        numeroBoleta: formData.numeroBoleta,
        saldo: 0,
      });

      // 3. Create Payments
      const now = new Date();
      const isoDate = now.toISOString().split(".")[0] + "Z";

      // Create a promise for each payment
      const paymentPromises = formData.payments.map((payment) => {
        const paymentPayload = {
          enrollmentId: enrollment.id,
          monto: Number(payment.monto),
          tipo: payment.tipo,
          metodo: payment.metodo,
          numeroBoleta: formData.numeroBoleta,
          fechaPago: isoDate,
          campusId: enrollment.campusId,
        };
        console.log("Sending Payment Payload:", paymentPayload);
        return PaymentService.create(paymentPayload);
      });

      // Wait for all payments to be created
      await Promise.all(paymentPromises);

      setSuccess("¡Matrícula y Pagos registrados con éxito!");

      // Redirect after delay
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
    } catch (err: any) {
      console.error(err);
      let message =
        err.response?.data?.message ||
        err.message ||
        "Error al registrar la matrícula o los pagos";

      if (Array.isArray(message)) {
        message = message.join(", ");
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    currentStep,
    loading,
    error,
    success,
    setSuccess,
    errors,
    campuses,
    plans,
    courses,
    levels,
    cycles,
    selectedStudent,
    formData,
    handleInputChange,
    handleSearchStudent,
    addPayment,
    removePayment,
    handlePaymentChange,
    nextStep,
    prevStep,
    handleFinalAction,
    enrollmentFlow,
    isExistingStudent,
    startNewEnrollment,
    startExistingEnrollment,
    resetFlow,
  };
};
