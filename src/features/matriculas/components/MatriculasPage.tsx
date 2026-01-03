"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function MatriculasPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Estudiante
    nombres: "",
    apellidos: "",
    dni: "",
    fechaNacimiento: "",
    edad: "",
    distrito: "",
    celularAlumno: "",
    celularApoderado: "",
    email: "",
    modalidad: "Virtual",

    // Step 2: Curso
    producto: "",
    plan: "",
    ciclo: "",
    sede: "",
    diaClase: "",
    horaInicio: "",
    horaFin: "",
    institucionAnterior: "",
    tipoInscripcion: "",
    asesora: "",
    origen: "",

    // Step 3: Pago
    pagoMatricula: 0,
    pagoMaterial: 0,
    pagoPension: 0,
    pagoCertificado: 0,
    pagoExamen: 0,
    boleta: "",
  });

  const totalPagado =
    Number(formData.pagoMatricula) +
    Number(formData.pagoMaterial) +
    Number(formData.pagoPension) +
    Number(formData.pagoCertificado) +
    Number(formData.pagoExamen);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFinalAction = () => {
    console.log("Matriculando alumno:", formData);
    alert("Alumno matriculado con éxito (Ver consola)");
  };

  // Opciones de hora para los selectores
  const timeOptions = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 7;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  return (
    <div className={styles.matriculasContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Registro de Matrícula</h1>
        <p className={styles.pageDescription}>
          {currentStep === 1 &&
            "Complete los datos personales y de contacto del estudiante."}
          {currentStep === 2 &&
            "Seleccione el curso, modalidad y detalles académicos."}
          {currentStep === 3 &&
            "Registre los pagos efectuados para finalizar la matrícula."}
        </p>
      </header>

      {/* Stepper */}
      <div className={styles.stepperContainer}>
        <div className={styles.stepper}>
          <div
            className={`${styles.step} ${
              currentStep >= 1 ? styles.activeStep : ""
            }`}
          >
            <div className={styles.stepNumber}>1</div>
            <span className={styles.stepLabel}>Estudiante</span>
          </div>
          <div
            className={`${styles.stepLine} ${
              currentStep >= 2 ? styles.activeLine : ""
            }`}
          ></div>
          <div
            className={`${styles.step} ${
              currentStep >= 2 ? styles.activeStep : ""
            }`}
          >
            <div className={styles.stepNumber}>2</div>
            <span className={styles.stepLabel}>Curso</span>
          </div>
          <div
            className={`${styles.stepLine} ${
              currentStep >= 3 ? styles.activeLine : ""
            }`}
          ></div>
          <div
            className={`${styles.step} ${
              currentStep >= 3 ? styles.activeStep : ""
            }`}
          >
            <div className={styles.stepNumber}>3</div>
            <span className={styles.stepLabel}>Pago</span>
          </div>
        </div>
      </div>

      <div className={styles.formContent}>
        {currentStep === 1 && (
          <div className={styles.formGrid}>
            <div className={styles.column}>
              <section className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <h3>Datos Personales</h3>
                </div>
                <div className={styles.sectionBody}>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="nombres"
                          id="nombres"
                          value={formData.nombres}
                          onChange={handleInputChange}
                          type="text"
                          placeholder=" "
                          className={styles.input}
                          required
                        />
                        <label htmlFor="nombres" className={styles.label}>
                          Nombres <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="apellidos"
                          id="apellidos"
                          value={formData.apellidos}
                          onChange={handleInputChange}
                          type="text"
                          placeholder=" "
                          className={styles.input}
                          required
                        />
                        <label htmlFor="apellidos" className={styles.label}>
                          Apellidos <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="dni"
                          id="dni"
                          value={formData.dni}
                          onChange={handleInputChange}
                          type="text"
                          placeholder=" "
                          className={styles.input}
                          required
                        />
                        <label htmlFor="dni" className={styles.label}>
                          DNI / Documento{" "}
                          <span className={styles.required}>*</span>
                        </label>
                        {formData.dni.length >= 8 && (
                          <span className={styles.checkIcon}>✓</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="fechaNacimiento"
                          id="fechaNacimiento"
                          value={formData.fechaNacimiento}
                          onChange={handleInputChange}
                          type="date"
                          className={styles.input}
                          required
                        />
                        <label
                          htmlFor="fechaNacimiento"
                          className={styles.label}
                        >
                          Fecha de Nacimiento{" "}
                          <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="edad"
                          id="edad"
                          value={formData.edad}
                          onChange={handleInputChange}
                          type="number"
                          placeholder=" "
                          className={styles.input}
                          required
                        />
                        <label htmlFor="edad" className={styles.label}>
                          Edad <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="distrito"
                          id="distrito"
                          value={formData.distrito}
                          onChange={handleInputChange}
                          type="text"
                          placeholder=" "
                          className={styles.input}
                          required
                        />
                        <label htmlFor="distrito" className={styles.label}>
                          Distrito <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <select
                        name="modalidad"
                        id="modalidad"
                        value={formData.modalidad}
                        onChange={handleInputChange}
                        className={styles.select}
                        required
                      >
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual">Virtual</option>
                      </select>
                      <label htmlFor="modalidad" className={styles.label}>
                        Modalidad de Interés{" "}
                        <span className={styles.required}>*</span>
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className={styles.column}>
              <section className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <h3>Datos de Contacto</h3>
                </div>
                <div className={styles.sectionBody}>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <input
                        name="celularAlumno"
                        id="celularAlumno"
                        value={formData.celularAlumno}
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" "
                        className={styles.input}
                        required
                      />
                      <label htmlFor="celularAlumno" className={styles.label}>
                        Celular del Alumno{" "}
                        <span className={styles.required}>*</span>
                      </label>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <input
                        name="celularApoderado"
                        id="celularApoderado"
                        value={formData.celularApoderado}
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" "
                        className={styles.input}
                      />
                      <label
                        htmlFor="celularApoderado"
                        className={styles.label}
                      >
                        Celular del Apoderado
                      </label>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <input
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder=" "
                        className={styles.input}
                        required={formData.modalidad === "Virtual"}
                      />
                      <label htmlFor="email" className={styles.label}>
                        Correo electrónico{" "}
                        {formData.modalidad === "Virtual" ? "*" : "(Opcional)"}
                      </label>
                      {formData.email.includes("@") && (
                        <span className={styles.checkIcon}>✓</span>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.formGrid}>
            <div className={styles.column}>
              <section className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <h3>Curso y Programa</h3>
                </div>
                <div className={styles.sectionBody}>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <select
                          name="producto"
                          id="producto"
                          value={formData.producto}
                          onChange={handleInputChange}
                          className={styles.select}
                          required
                        >
                          <option value="" disabled hidden></option>
                          <option value="Pre Kids">Pre Kids</option>
                          <option value="Kids">Kids</option>
                          <option value="Teens">Teens</option>
                          <option value="Adultos">Adultos</option>
                        </select>
                        <label htmlFor="producto" className={styles.label}>
                          Producto <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <select
                          name="plan"
                          id="plan"
                          value={formData.plan}
                          onChange={handleInputChange}
                          className={styles.select}
                          required
                        >
                          <option value="" disabled hidden></option>
                          <option value="Standard">Standard</option>
                          <option value="Plus">Plus</option>
                          <option value="Premium">Premium</option>
                          <option value="Estudiantil">Estudiantil</option>
                          <option value="Convenio">Convenio</option>
                          <option value="Aupair">Aupair</option>
                          <option value="Particulares">
                            Horas Particulares
                          </option>
                        </select>
                        <label htmlFor="plan" className={styles.label}>
                          Plan <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="ciclo"
                          id="ciclo"
                          value={formData.ciclo}
                          onChange={handleInputChange}
                          type="text"
                          placeholder=" "
                          className={styles.input}
                          required
                        />
                        <label htmlFor="ciclo" className={styles.label}>
                          Ciclo / Nivel{" "}
                          <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <select
                          name="sede"
                          id="sede"
                          value={formData.sede}
                          onChange={handleInputChange}
                          className={styles.select}
                          required
                        >
                          <option value="" disabled hidden></option>
                          <option value="Lima">Lima</option>
                          <option value="Arequipa">Arequipa</option>
                        </select>
                        <label htmlFor="sede" className={styles.label}>
                          Sede <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Horario Refinado */}
                  <div className={styles.scheduleSection}>
                    <h4 className={styles.subSectionTitle}>
                      Horario <span className={styles.required}>*</span>
                    </h4>
                    <div className={styles.row}>
                      <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                          <input
                            name="diaClase"
                            id="diaClase"
                            value={formData.diaClase}
                            onChange={handleInputChange}
                            type="date"
                            className={styles.input}
                            required
                          />
                          <label htmlFor="diaClase" className={styles.label}>
                            Día de Clase
                          </label>
                        </div>
                      </div>
                      <div className={styles.timeSelects}>
                        <div className={styles.formGroup}>
                          <div className={styles.inputWrapper}>
                            <select
                              name="horaInicio"
                              id="horaInicio"
                              value={formData.horaInicio}
                              onChange={handleInputChange}
                              className={styles.select}
                              required
                            >
                              <option value="" disabled hidden></option>
                              {timeOptions.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                            <label
                              htmlFor="horaInicio"
                              className={styles.label}
                            >
                              Hora Inicio
                            </label>
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <div className={styles.inputWrapper}>
                            <select
                              name="horaFin"
                              id="horaFin"
                              value={formData.horaFin}
                              onChange={handleInputChange}
                              className={styles.select}
                              required
                            >
                              <option value="" disabled hidden></option>
                              {timeOptions.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                            <label htmlFor="horaFin" className={styles.label}>
                              Hora Fin
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className={styles.column}>
              <section className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <h3>Datos de Inscripción</h3>
                </div>
                <div className={styles.sectionBody}>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <select
                        name="tipoInscripcion"
                        id="tipoInscripcion"
                        value={formData.tipoInscripcion}
                        onChange={handleInputChange}
                        className={styles.select}
                        required
                      >
                        <option value="" disabled hidden></option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="Oficina">Oficina</option>
                      </select>
                      <label htmlFor="tipoInscripcion" className={styles.label}>
                        Tipo de Inscripción{" "}
                        <span className={styles.required}>*</span>
                      </label>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <select
                        name="asesora"
                        id="asesora"
                        value={formData.asesora}
                        onChange={handleInputChange}
                        className={styles.select}
                        required
                      >
                        <option value="" disabled hidden></option>
                        <option value="Asesora 1">Asesora 1</option>
                        <option value="Asesora 2">Asesora 2</option>
                      </select>
                      <label htmlFor="asesora" className={styles.label}>
                        Asesora Comercial{" "}
                        <span className={styles.required}>*</span>
                      </label>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <input
                        name="origen"
                        id="origen"
                        value={formData.origen}
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" "
                        className={styles.input}
                      />
                      <label htmlFor="origen" className={styles.label}>
                        ¿Cómo se enteró de "Brittany"?
                      </label>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <input
                        name="institucionAnterior"
                        id="institucionAnterior"
                        value={formData.institucionAnterior}
                        onChange={handleInputChange}
                        type="text"
                        placeholder=" "
                        className={styles.input}
                      />
                      <label
                        htmlFor="institucionAnterior"
                        className={styles.label}
                      >
                        Institución Anterior
                      </label>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className={styles.formGrid}>
            <div className={styles.column}>
              <section className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <h3>Pagos y Matrícula</h3>
                </div>
                <div className={styles.sectionBody}>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="pagoMatricula"
                          id="pagoMatricula"
                          value={formData.pagoMatricula}
                          onChange={handleInputChange}
                          type="number"
                          placeholder=" "
                          className={styles.input}
                        />
                        <label htmlFor="pagoMatricula" className={styles.label}>
                          Matrícula (S/.)
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="pagoMaterial"
                          id="pagoMaterial"
                          value={formData.pagoMaterial}
                          onChange={handleInputChange}
                          type="number"
                          placeholder=" "
                          className={styles.input}
                        />
                        <label htmlFor="pagoMaterial" className={styles.label}>
                          Material (S/.)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="pagoPension"
                          id="pagoPension"
                          value={formData.pagoPension}
                          onChange={handleInputChange}
                          type="number"
                          placeholder=" "
                          className={styles.input}
                        />
                        <label htmlFor="pagoPension" className={styles.label}>
                          Pensión (S/.)
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="pagoCertificado"
                          id="pagoCertificado"
                          value={formData.pagoCertificado}
                          onChange={handleInputChange}
                          type="number"
                          placeholder=" "
                          className={styles.input}
                        />
                        <label
                          htmlFor="pagoCertificado"
                          className={styles.label}
                        >
                          Certificado (S/.)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="pagoExamen"
                          id="pagoExamen"
                          value={formData.pagoExamen}
                          onChange={handleInputChange}
                          type="number"
                          placeholder=" "
                          className={styles.input}
                        />
                        <label htmlFor="pagoExamen" className={styles.label}>
                          Examen Clasificación (S/.)
                        </label>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          name="boleta"
                          id="boleta"
                          value={formData.boleta}
                          onChange={handleInputChange}
                          type="text"
                          placeholder=" "
                          className={styles.input}
                          required
                        />
                        <label htmlFor="boleta" className={styles.label}>
                          Número de Boleta{" "}
                          <span className={styles.required}>*</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className={styles.column}>
              <section className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <h3>Resumen de Pago</h3>
                </div>
                <div className={styles.sectionBody}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      Total Efectuado:
                    </span>
                    <span className={styles.amount}>
                      S/. {totalPagado.toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>
                      Saldo Pendiente:
                    </span>
                    <span className={styles.amount}>S/. {(0).toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryNote}>
                    <p>
                      El saldo se calcula automáticamente basado en la suma de
                      los conceptos ingresados.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <footer className={styles.formFooter}>
        <div className={styles.footerButtons}>
          <div className={styles.leftBtn}>
            {currentStep > 1 && (
              <button className={styles.btnBack} onClick={prevStep}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Atrás
              </button>
            )}
          </div>
          <div className={styles.rightBtn}>
            {currentStep < 3 ? (
              <button className={styles.btnNext} onClick={nextStep}>
                Siguiente
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ) : (
              <button
                className={styles.btnRegister}
                onClick={handleFinalAction}
              >
                Matricular Alumno
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
