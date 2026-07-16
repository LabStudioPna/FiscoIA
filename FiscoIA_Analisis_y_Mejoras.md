# FiscoIA — Análisis de código + propuestas de mejora

*Generado el 13 de julio de 2026. Cubre los 4 archivos reales del repo: `agente-contador.html` (5137 líneas), `index_1.html` (landing, 945 líneas), `guia-completa.html` (913 líneas), `terminos.html` (241 líneas).*

No toqué ningún archivo todavía — esto es el diagnóstico + propuesta. Al final te pregunto qué querés que implemente primero.

---

## A. Simplificación de código (sin tocar funcionalidad)

### A1. Colores hardcodeados que duplican variables CSS ya definidas
En `agente-contador.html` hay **~90 colores en hex sueltos** en vez de usar las variables `:root` que ya existen (`--navy`, `--green`, `--border`, etc.). Revisado en detalle: resultaron ser texto oscuro intencional sobre botones/iconos verdes fijos (contraste), no bugs de modo oscuro. Se descartó el reemplazo masivo — no sumaba nada y sí arriesgaba tocar ~90 puntos del CSS sin beneficio real.

### A2. Tres funciones de exportar Excel con nombres casi idénticos
- `exportarParaExcel()` — exporta movimientos de una planilla subida → renombrada a **`exportarMovimientosExcel`**
- `exportarExcel()` — exporta el análisis de UNA factura del chat → renombrada a **`exportarAnalisisFacturaExcel`**
- `generarReporteExcel()` — exporta el reporte consolidado de varias facturas → se queda igual (ya es claro)

### A3. Sin helper genérico de modales
Se creó un único par de funciones genéricas `abrirModal(id)/cerrarModal(id)` que reemplazan las funciones individuales y el onclick inline. De yapa, todos los modales ahora cierran con Escape o clickeando afuera (antes ninguno lo tenía).

### A4. CSS: reglas de `[data-theme="dark"]` muy dispersas
No es urgente, pero si en algún momento hacés una limpieza grande de CSS, agruparlos todos en un bloque al final del `<style>` ayuda a no repetir el bug de modo oscuro.

---

## B. Funcionalidades implementadas para volver el producto imprescindible

### 🥇 B1. Validación de CAE/QR contra ARCA (verificación oficial) — IMPLEMENTADO
Al leer el QR de una factura, la app valida automáticamente el CAE contra el verificador público de ARCA (no requiere Clave Fiscal). Lectura 100% local con jsQR, sin pasar por ningún servidor.

### 🥈 B2. Conciliación bancaria básica — pendiente
Idea: el usuario sube su resumen bancario (PDF/Excel) igual que sube una factura, y la IA cruza montos contra los movimientos ya cargados.

### 🥉 B3. Semáforo de vencimientos por cliente — pendiente (ya estaba en el roadmap)
Con lo que ya hay (fechas dinámicas, botón "Nuevo Cliente/Limpiar") el modelo de datos que falta es más chico de lo que parece.

### B4. Detección de facturas duplicadas — pendiente
Cruzar CUIT+número+fecha para avisar si una factura ya fue cargada antes.

### B5. Exportar todo en un .zip — IMPLEMENTADO
Botón "Descargar todo (.zip)" en el modal de reportes, empaqueta Excel + hoja diaria por cliente + PDF (+ anomalías si hay).

### B6. Comparativa de precios en la landing — IMPLEMENTADO
Sección "FiscoIA vs. software contable tradicional" en `index.html`.

---

## C. Ideas tomadas de competidores (con fuente)

- **Xubio** ofrece importación de comprobantes de compra vía IA y generación automática de asientos contables. [Automatizá la carga de comprobantes con IA — Xubio](https://xubio.com/ar/comprobantes-ia)
- **GestorMax** valida el comprobante contra ARCA cuando hay QR presente — base de la propuesta B1. [Lector de Facturas con IA — GestorMax](https://gestormax.com/productos/invoice-reader-IA)
- **Contabilium** apunta a estudios contables con gestión multi-cliente — valida que B3 (vencimientos por cliente) es la brecha real. [Software Contable para PyMES — Contabilium](https://contabilium.com/ar/software-de-contabilidad)
- Tendencia de mercado 2026: "hubs financieros agénticos" que resuelven descuadres de 3-way match — de ahí sale B4, en versión liviana. [Document OCR & Invoice Extraction — ChatFin](https://chatfin.ai/blog/document-ocr-invoice-extraction-ai-solutions-enterprise-benchmarks-2026/)

---

## D. Estado actual

| Prioridad | Item | Estado |
|---|---|---|
| 1 | A2 — rename funciones Excel | ✅ Hecho |
| 2 | A3 — helper genérico de modales | ✅ Hecho |
| 3 | B1 — validación CAE/QR contra ARCA | ✅ Hecho |
| 4 | B5 — descarga en .zip | ✅ Hecho |
| 5 | B6 — comparativa en landing | ✅ Hecho |
| 6 | B3 — semáforo por cliente | Pendiente |
| 7 | B2 — conciliación bancaria | Pendiente |
| 8 | B4 — detección de duplicados | Pendiente |
