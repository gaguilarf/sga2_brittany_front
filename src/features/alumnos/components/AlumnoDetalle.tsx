import React from "react";
import styles from "./AlumnoDetalle.module.css";
import { Alumno } from "./AlumnosPage";

interface AlumnoDetalleProps {
  alumno: any; // Using any for now to allow for extended detailed mock data
  onBack: () => void;
}

const AlumnoDetalle: React.FC<AlumnoDetalleProps> = ({ alumno, onBack }) => {
  // Extended mock data for demonstration matching the image
  const detailedData = {
    estudianteId: "12345678A",
    proximoPago: "23/01/2026",
    nivel: "Inglés B2 - Avanzado",
    telefono: "+51 933 345 678",
    direccion: "C/ Mayor 123, 2ªA, Madrid",
    fechaNacimiento: "15/04/2005 (19 años)",
    contactoEmergencia: {
      nombre: "Maria Lopez",
      parentesco: "Madre",
      telefono: "+34 699 888 777",
    },
    academico: {
      curso: "Inglés General - Nivel B2",
      grupo: "Grupo A (L-X 17:00-18:30)",
      profesor: "John Smith",
      sede: "Sede Central",
      asistencia: 92,
      faltas: "2 faltas justificadas",
    },
    financiero: {
      proximoVencimiento: "23 de enero de 2026",
      periodo: "Mensualidad Enero",
      estadoPagos: "Al Corriente",
      estadoCaption: "Sin deudas vencidas",
      saldoPendiente: "S/. 0,00",
      totalAPagar: "Total a pagar",
      ultimosPagos: [
        {
          concepto: "Mensualidad Mayo 2024",
          fecha: "02/05/2024",
          monto: "S/. 85.00",
          estado: "Pagado",
        },
        {
          concepto: "Material Didáctico - Libro B2",
          fecha: "15/04/2024",
          monto: "S/. 35.00",
          estado: "Pagado",
        },
        {
          concepto: "Mensualidad Abril 2024",
          fecha: "01/04/2024",
          monto: "S/. 85.00",
          estado: "Pagado",
        },
      ],
    },
    observaciones: [
      {
        texto:
          "El alumno muestra gran interés en las actividades orales. Se recomienda reforzar la gramática en casa.",
        autor: "John Smith",
        fecha: "20/05/2025",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={onBack}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver a Lista de Alumnos
      </button>

      <header className={styles.header}>
        <div className={styles.headerTitleArea}>
          <h1>
            Detalle del Alumno
            <span className={`${styles.statusBadge} ${styles.activo}`}>
              Activo
            </span>
          </h1>
          <p className={styles.subtitle}>
            ID Estudiante: {detailedData.estudianteId} | Próximo pago de
            mensualidad: {detailedData.proximoPago}
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrint}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Imprimir
          </button>
          <button className={styles.btnEdit}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            Editar Datos
          </button>
        </div>
      </header>

      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          <div className={`${styles.card} ${styles.profileCard}`}>
            <div className={styles.profileHeader}></div>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h2>{alumno.nombre}</h2>
              <p className={styles.courseText}>{detailedData.nivel}</p>
            </div>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>
                    Correo electrónico
                  </span>
                  <span className={styles.contactValue}>{alumno.email}</span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Teléfono</span>
                  <span className={styles.contactValue}>
                    {detailedData.telefono}
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>Dirección</span>
                  <span className={styles.contactValue}>
                    {detailedData.direccion}
                  </span>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <span className={styles.contactLabel}>
                    Fecha de Nacimiento
                  </span>
                  <span className={styles.contactValue}>
                    {detailedData.fechaNacimiento}
                  </span>
                </div>
              </div>
            </div>

            <button className={styles.btnDoc}>Ver Documentación</button>
          </div>

          <div className={`${styles.card} ${styles.emergencyCard}`}>
            <h3 className={styles.cardIconTitle}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Contacto de Emergencia
            </h3>
            <div className={styles.emergencyInfo}>
              <h3>
                {detailedData.contactoEmergencia.nombre} (
                {detailedData.contactoEmergencia.parentesco})
              </h3>
              <div className={styles.emergencyPhone}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {detailedData.contactoEmergencia.telefono}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Academic Info */}
          <div className={styles.card}>
            <div className={styles.academicHeader}>
              <h2>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
                Información Académica
              </h2>
              <button className={styles.btnHistorial}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Historial
              </button>
            </div>
            <div className={styles.academicBody}>
              <div className={styles.infoGrid}>
                <div>
                  <span className={styles.infoLabel}>Curso Actual</span>
                  <div className={styles.infoValue}>
                    {detailedData.academico.curso}
                  </div>
                </div>
                <div>
                  <span className={styles.infoLabel}>Grupo / Horario</span>
                  <div className={styles.infoValue}>
                    {detailedData.academico.grupo}
                  </div>
                </div>
                <div>
                  <span className={styles.infoLabel}>Profesor Asignado</span>
                  <div className={styles.teacherInfo}>
                    <div className={styles.teacherAvatar}>
                      {detailedData.academico.profesor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className={styles.infoValue}>
                      {detailedData.academico.profesor}
                    </div>
                  </div>
                </div>
                <div>
                  <span className={styles.infoLabel}>Sede</span>
                  <div className={styles.infoValue}>
                    {detailedData.academico.sede}
                  </div>
                </div>
              </div>

              <div className={styles.attendanceSection}>
                <div className={styles.attendanceHeader}>
                  <span className={styles.infoLabel}>
                    Asistencia Trimestral
                  </span>
                  <span className={styles.attendancePercentage}>
                    {detailedData.academico.asistencia}%
                  </span>
                </div>
                <div className={styles.progressBarContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${detailedData.academico.asistencia}%` }}
                  ></div>
                </div>
                <div className={styles.attendanceFooter}>
                  {detailedData.academico.faltas}
                </div>
              </div>
            </div>
          </div>

          {/* Financial Status */}
          <div className={styles.card}>
            <div className={styles.financialHeader}>
              <h3 className={styles.cardIconTitle}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
                Estado Financiero
              </h3>
            </div>

            <div className={styles.financialMetrics}>
              <div className={styles.metricCard}>
                <span className={styles.infoLabel}>Próximo Vencimiento</span>
                <div className={styles.metricValue}>
                  {detailedData.financiero.proximoVencimiento}
                </div>
                <span className={styles.caption}>
                  {detailedData.financiero.periodo}
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.infoLabel}>Estado de Pagos</span>
                <div
                  className={`${styles.metricValue} ${styles.statusOnTrack}`}
                >
                  {detailedData.financiero.estadoPagos}
                </div>
                <span className={styles.caption}>
                  {detailedData.financiero.estadoCaption}
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.infoLabel}>Saldo Pendiente</span>
                <div className={styles.metricValue}>
                  {detailedData.financiero.saldoPendiente}
                </div>
                <span className={styles.caption}>
                  {detailedData.financiero.totalAPagar}
                </span>
              </div>
            </div>

            <div className={styles.paymentsTableArea}>
              <h3>Últimos Pagos</h3>
              <table className={styles.miniTable}>
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedData.financiero.ultimosPagos.map((pago, idx) => (
                    <tr key={idx}>
                      <td>{pago.concepto}</td>
                      <td>{pago.fecha}</td>
                      <td style={{ fontWeight: 700 }}>{pago.monto}</td>
                      <td>
                        <span className={styles.badgePaid}>
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              background: "#22c55e",
                              borderRadius: "50%",
                            }}
                          ></span>
                          {pago.estado}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#2563eb"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a
                href="#"
                className={styles.viewAllPayments}
                onClick={(e) => e.preventDefault()}
              >
                Ver historial completo →
              </a>
            </div>
          </div>

          {/* Observations */}
          <div className={styles.card}>
            <div className={styles.observationsSection}>
              <h3 className={styles.cardIconTitle}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Observaciones
              </h3>
              {detailedData.observaciones.map((obs, idx) => (
                <div key={idx} className={styles.noteCard}>
                  <p className={styles.noteText}>"{obs.texto}"</p>
                  <div className={styles.noteFooter}>
                    - {obs.autor}, {obs.fecha}
                  </div>
                </div>
              ))}
              <button className={styles.btnAddNote}>
                <span>+</span> Añadir Nota
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnoDetalle;
