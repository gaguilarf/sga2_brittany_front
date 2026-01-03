"use client";

import { useState } from "react";
import styles from "./AlumnosPage.module.css";

interface Alumno {
  id: string;
  nombre: string;
  dni: string;
  sede: string;
  estado: "Activo" | "Inactivo" | "Egresado";
  fechaIngreso: string;
}

const MOCK_ALUMNOS: Alumno[] = [
  {
    id: "1",
    nombre: "Ana García Lopez",
    dni: "12345678A",
    sede: "Sede Central",
    estado: "Activo",
    fechaIngreso: "12/01/2024",
  },
  {
    id: "2",
    nombre: "Carlos Ruiz Gomez",
    dni: "87654321B",
    sede: "Sede Norte",
    estado: "Inactivo",
    fechaIngreso: "05/02/2023",
  },
  {
    id: "3",
    nombre: "Laura Martín Díaz",
    dni: "98765432C",
    sede: "Sede Sur",
    estado: "Activo",
    fechaIngreso: "20/03/2024",
  },
  {
    id: "4",
    nombre: "Marcos Soler Peña",
    dni: "11223344D",
    sede: "Sede Central",
    estado: "Egresado",
    fechaIngreso: "15/09/2022",
  },
  {
    id: "5",
    nombre: "Sofia Navarro Gil",
    dni: "55667788E",
    sede: "Sede Norte",
    estado: "Activo",
    fechaIngreso: "01/02/2024",
  },
  {
    id: "6",
    nombre: "Daniel Vega Sanz",
    dni: "99887766F",
    sede: "Sede Sur",
    estado: "Inactivo",
    fechaIngreso: "10/11/2023",
  },
];

export default function AlumnosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sedeFilter, setSedeFilter] = useState("Sede Central");
  const [estadoFilter, setEstadoFilter] = useState("Todos");

  return (
    <div className={styles.alumnosContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Lista de Alumnos</h1>
        <button className={styles.btnNewAlumno}>
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
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Nuevo Alumno
        </button>
      </header>

      <section className={styles.filterCard}>
        <div className={styles.filtersGrid}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Sede</label>
            <select
              value={sedeFilter}
              onChange={(e) => setSedeFilter(e.target.value)}
              className={styles.select}
            >
              <option value="Sede Central">Sede Central</option>
              <option value="Sede Norte">Sede Norte</option>
              <option value="Sede Sur">Sede Sur</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Estado del alumno</label>
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              className={styles.select}
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Egresado">Egresado</option>
            </select>
          </div>

          <div className={styles.searchGroup}>
            <div className={styles.searchWrapper}>
              <svg
                className={styles.searchIcon}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Buscar por nombre, DNI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NOMBRE COMPLETO</th>
                <th>DNI</th>
                <th>SEDE</th>
                <th>ESTADO</th>
                <th>
                  FECHA DE INGRESO{" "}
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
                    <polyline points="7 15 12 20 17 15"></polyline>
                    <polyline points="7 9 12 4 17 9"></polyline>
                  </svg>
                </th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ALUMNOS.map((alumno) => (
                <tr key={alumno.id}>
                  <td className={styles.nameCell}>{alumno.nombre}</td>
                  <td>{alumno.dni}</td>
                  <td>{alumno.sede}</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[alumno.estado.toLowerCase()]
                      }`}
                    >
                      <span className={styles.statusDot}></span>
                      {alumno.estado}
                    </span>
                  </td>
                  <td>{alumno.fechaIngreso}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.btnEdit}>
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
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Editar
                      </button>
                      <button className={styles.btnDetails}>
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        Detalles
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className={styles.tableFooter}>
          <div className={styles.recordsInfo}>Mostrando 1-6 de 150 alumnos</div>
          <div className={styles.pagination}>
            <button className={styles.pageBtn}>Anterior</button>
            <button className={`${styles.pageBtn} ${styles.activePage}`}>
              1
            </button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.paginationEllipsis}>...</span>
            <button className={styles.pageBtn}>15</button>
            <button className={styles.pageBtn}>Siguiente</button>
          </div>
        </footer>
      </section>
    </div>
  );
}
