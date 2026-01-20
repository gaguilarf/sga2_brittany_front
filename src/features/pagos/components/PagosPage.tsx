"use client";

import { useState } from "react";
import {
  Search,
  Landmark,
  Smartphone,
  Banknote,
  CreditCard,
} from "lucide-react";
import styles from "./PagosPage.module.css";

export default function PagosPage() {
  const [method, setMethod] = useState("Transferencia");
  const [amount, setAmount] = useState(430);
  const [formData, setFormData] = useState({
    tipoPago: "",
    fechaPago: new Date().toISOString().split("T")[0],
    numeroFactura: "",
  });

  // Mock Student Data
  const student = {
    nombre: "Juan Pérez",
    codigo: "12345",
    sede: "Lima Centro",
    grado: "5to Secundaria",
  };

  // Mock Debts
  const debts = [
    { concepto: "Matrícula", monto: 0 },
    { concepto: "Pensión (Septiembre)", monto: 350 },
    { concepto: "Material", monto: 80 },
    { concepto: "Certificado", monto: 0 },
  ];

  const totalDebt = debts.reduce((acc, curr) => acc + curr.monto, 0);
  const newBalance = Math.max(0, totalDebt - amount);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.pagosContainer}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Pagos</h1>
      </header>

      {/* 1. Buscador */}
      <section className={styles.searchSection}>
        <div className={styles.searchInputWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Buscar Estudiante por DNI, Nombre o Código"
            className={styles.searchInput}
          />
        </div>
      </section>

      {/* 2 & 3. Info & Deudas */}
      <section className={styles.sectionCard}>
        <div className={styles.sectionBody}>
          <div className={styles.studentInfoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Estudiante:</span>
              <span className={styles.infoValue}>
                {student.nombre} (Cod. {student.codigo})
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Sede:</span>
              <span className={styles.infoValue}>{student.sede}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Grado:</span>
              <span className={styles.infoValue}>{student.grado}</span>
            </div>
          </div>

          <div className={styles.debtsSection}>
            <h4 className={styles.debtsTitle}>Deudas Pendientes:</h4>
            <div className={styles.debtsGrid}>
              {debts.map((debt, index) => (
                <div key={index} className={styles.debtItem}>
                  <span className={styles.debtLabel}>{debt.concepto}:</span>
                  <span
                    className={`${styles.debtValue} ${debt.monto > 0 ? styles.debtValueHighlight : ""}`}
                  >
                    S/ {debt.monto.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Registrar Pago Form */}
      <section className={styles.formSection}>
        <div className={styles.formHeader}>
          <h3>Registrar Pago</h3>
        </div>
        <div className={styles.sectionBody}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tipo de Pago</label>
              <select
                name="tipoPago"
                className={styles.select}
                value={formData.tipoPago}
                onChange={handleInputChange}
              >
                <option value="">Seleccione un concepto</option>
                <option value="Matrícula">Matrícula</option>
                <option value="Pensión">Pensión</option>
                <option value="Material">Material</option>
                <option value="Certificado">Certificado</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de Pago</label>
              <div className={styles.inputWrapper}>
                <input
                  type="date"
                  name="fechaPago"
                  className={styles.input}
                  value={formData.fechaPago}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Número de Factura/Boleta</label>
              <input
                type="text"
                name="numeroFactura"
                placeholder="Ejem: B001-0001"
                className={styles.input}
                value={formData.numeroFactura}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Monto a Pagar</label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                  }}
                >
                  S/
                </span>
                <input
                  type="number"
                  className={styles.input}
                  style={{ paddingLeft: "2.5rem" }}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* 5. Método de Pago */}
          <div className={styles.methodSection}>
            <span className={styles.methodLabel}>Método de Pago</span>
            <div className={styles.methodGrid}>
              {[
                { name: "Transferencia", icon: Landmark },
                { name: "Yape", icon: Smartphone },
                { name: "Efectivo", icon: Banknote },
                { name: "Tarjeta", icon: CreditCard },
              ].map((m) => (
                <div
                  key={m.name}
                  className={`${styles.methodCard} ${method === m.name ? styles.methodCardActive : ""}`}
                  onClick={() => setMethod(m.name)}
                >
                  <m.icon className={styles.methodIcon} />
                  <span className={styles.methodName}>{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Resumen de Deuda */}
          <div className={styles.summarySection}>
            <h4 className={styles.summaryTitle}>Resumen de Deuda</h4>
            <div className={styles.summaryRow}>
              <span>Deuda Total Actual</span>
              <span>S/ {totalDebt.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Monto a Pagar</span>
              <span>- S/ {amount.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRowTotal}>
              <span>Nuevo Saldo Pendiente</span>
              <span>S/ {newBalance.toFixed(2)}</span>
            </div>
          </div>

          {/* 7. Acciones */}
          <div className={styles.actions}>
            <button className={styles.btnCancel}>Cancelar</button>
            <button className={styles.btnSubmit}>Registrar Pago</button>
          </div>
        </div>
      </section>
    </div>
  );
}
