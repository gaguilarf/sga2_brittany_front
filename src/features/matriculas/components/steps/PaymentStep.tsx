import styles from "../page.module.css";

interface Props {
  formData: any;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentChange: (index: number, field: string, value: string) => void;
  addPayment: () => void;
  removePayment: (index: number) => void;
}

export const PaymentStep = ({
  formData,
  errors,
  handleChange,
  handlePaymentChange,
  addPayment,
  removePayment,
}: Props) => {
  return (
    <div className={styles.formGrid}>
      <div className={styles.columnFull}>
        <section className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <h3>Facturación y Pagos</h3>
          </div>
          <div className={styles.sectionBody}>
            {/* Facturación - Shared Field */}
            <div className={styles.rowFull}>
              <div className={styles.formGroup}>
                <div className={styles.inputWrapper}>
                  <input
                    name="numeroBoleta"
                    id="numeroBoleta"
                    value={formData.numeroBoleta}
                    onChange={handleChange}
                    type="text"
                    placeholder=" "
                    className={`${styles.input} ${
                      errors.numeroBoleta ? styles.invalid : ""
                    }`}
                    required
                  />
                  <label htmlFor="numeroBoleta" className={styles.label}>
                    Nro. de Boleta / Recibo{" "}
                    <span className={styles.required}>*</span>
                  </label>
                  {errors.numeroBoleta && (
                    <span className={styles.errorText}>
                      {errors.numeroBoleta}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.divider} />

            {/* List of Payments */}
            <div className={styles.paymentsList}>
              <div className={styles.sectionSubHeader}>
                <h4>Detalle de Pagos</h4>
                {errors.payments && (
                  <span className={styles.errorText}>{errors.payments}</span>
                )}
              </div>

              {formData.payments.map((payment: any, index: number) => (
                <div key={index} className={styles.paymentItemCard}>
                  <div className={styles.paymentItemHeader}>
                    <h5>Pago #{index + 1}</h5>
                    {formData.payments.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePayment(index)}
                        className={styles.removeBtn}
                        title="Eliminar este pago"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className={styles.paymentRow}>
                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <select
                          value={payment.tipo}
                          onChange={(e) =>
                            handlePaymentChange(index, "tipo", e.target.value)
                          }
                          className={`${styles.select} ${
                            errors[`payment_${index}_tipo`]
                              ? styles.invalid
                              : ""
                          }`}
                          required
                        >
                          <option value="">Seleccione tipo</option>
                          <option value="Inscripción">Inscripción</option>
                          <option value="Mensualidad">Mensualidad</option>
                          <option value="Materiales">Materiales</option>
                          <option value="Otro">Otro</option>
                        </select>
                        <label className={styles.labelFloating}>
                          Tipo de Pago{" "}
                          <span className={styles.required}>*</span>
                        </label>
                        {errors[`payment_${index}_tipo`] && (
                          <span className={styles.errorText}>
                            {errors[`payment_${index}_tipo`]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <select
                          value={payment.metodo}
                          onChange={(e) =>
                            handlePaymentChange(index, "metodo", e.target.value)
                          }
                          className={`${styles.select} ${
                            errors[`payment_${index}_metodo`]
                              ? styles.invalid
                              : ""
                          }`}
                          required
                        >
                          <option value="">Seleccione método</option>
                          <option value="Efectivo">Efectivo</option>
                          <option value="Transferencia">Transferencia</option>
                          <option value="Tarjeta">Tarjeta</option>
                          <option value="Yape/Plin">Yape/Plin</option>
                        </select>
                        <label className={styles.labelFloating}>
                          Método de Pago{" "}
                          <span className={styles.required}>*</span>
                        </label>
                        {errors[`payment_${index}_metodo`] && (
                          <span className={styles.errorText}>
                            {errors[`payment_${index}_metodo`]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <div className={styles.inputWrapper}>
                        <input
                          value={payment.monto}
                          onChange={(e) =>
                            handlePaymentChange(index, "monto", e.target.value)
                          }
                          type="number"
                          placeholder="0.00"
                          className={`${styles.input} ${
                            errors[`payment_${index}_monto`]
                              ? styles.invalid
                              : ""
                          }`}
                          required
                        />
                        <label className={styles.labelFloating}>
                          Monto S/. <span className={styles.required}>*</span>
                        </label>
                        {errors[`payment_${index}_monto`] && (
                          <span className={styles.errorText}>
                            {errors[`payment_${index}_monto`]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addPayment}
                className={styles.addPaymentBtn}
                disabled={formData.payments.length >= 4}
              >
                + Agregar otro pago
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
