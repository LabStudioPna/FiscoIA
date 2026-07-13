# FiscoIA — Roadmap

*Última actualización: 13 de julio de 2026*

## 🔴 Bloqueado en LAB (necesita acción/decisión tuya)

| Item | Detalle |
|---|---|
| Mercado Pago | Conseguir cuenta de developer + Access Token en developers.mercadopago.com |
| Publicar OAuth fuera de "modo Prueba" | Google Cloud Console → Pantalla de consentimiento OAuth → Publicar. Sin esto, solo vos (y los emails agregados como prueba) pueden loguearse |
| Cambiar plan de un usuario que paga | Manual: tabla `FiscoIA_Usuarios` en n8n → cambiar campo `plan` de "gratis" a "estudio" |

## 🟡 Corto plazo (si hay tracción de ventas)

- **Integración Stripe** — alternativa/complemento a Mercado Pago
- **DDJJ precompletada ARCA** — alto valor percibido
- **2FA** — esperable en un SaaS con datos fiscales
- **Vencimientos ARCA vinculados a cliente + semáforo verde/amarillo/rojo** — hoy los vencimientos son una lista general fija (no por cliente, no recurrente mes a mes). Requiere: (1) modelo de datos que asocie vencimiento↔cliente, (2) hacerla dinámica/recurrente en vez de fechas fijas 2026 hardcodeadas, (3) semáforo combinando vencimientos + anomalías. Cambio de arquitectura, no ajuste rápido.
- **Plantilla de Google Sheets "hacer una copia"** — para simplificar el modo avanzado de Apps Script (LAB tiene que crear la planilla plantilla una vez en su Drive y pasar el link con `/copy` al final)

## 🔵 Q3 2026 (según volumen de usuarios)

- Investigar si existe API oficial de ARCA para carga automática (si no existe, no se hace vía scraping/automatización de navegador — riesgo de manejar Clave Fiscal)
- Reportes mensuales PDF ya están — evaluar si conviene modelo Sonnet para mejor calidad (más caro)
- Mercado Pago activo
- App mobile nativa (hoy es web responsive, no app)

## 🟣 Q4 2026 / 2027 (visión larga)

- Integración con software contable existente
- Analytics y predicción de impuestos
- API para terceros
- Expansión a Chile, Uruguay, Colombia
- Notificaciones por WhatsApp (Monitor Normativo) — hay 2 nodos ya armados en n8n (WhatsApp Admin LABStudio + WhatsApp Clientes Plan) pero desactivados con placeholders sin completar. Requiere cuenta de WhatsApp Business API.

## 💡 Recomendación

Con el modelo de prueba de 5 días ya andando, lo más urgente es: **publicar el OAuth** (para que cualquiera pueda entrar, no solo cuentas de prueba) y **conseguir el Access Token de Mercado Pago**. Todo lo demás puede esperar a tener usuarios reales dando señal de qué priorizar.

## ⚠️ Antes de la primera venta real

- [ ] Confirmar que los 4 archivos HTML están efectivamente subidos y en producción (hubo varias rondas hoy, verificar que la última versión de `agente-contador.html` esté pusheada)
- [ ] Probar el flujo completo en un dispositivo real: login → 5 días de prueba → bloqueo → contacto WhatsApp
- [ ] Revisar `terminos.html` esté linkeado y accesible

## ✅ Resuelto 13/07 (fin de sesión)

- **Panel "IVA acumulado por mes" mezclaba clientes distintos.** Agregado botón "🔄 Nuevo Cliente / Limpiar" junto al panel — borra el acumulado persistente y los análisis de la sesión actual, con confirmación (acción destructiva). El contador ahora puede tocarlo antes de empezar con otro cliente para no mezclar datos.
