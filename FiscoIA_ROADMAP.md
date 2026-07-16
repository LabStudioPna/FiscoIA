# FiscoIA — Roadmap

*Última actualización: 10 de julio de 2026*

## 🟢 Pendiente inmediato

| Item | Detalle |
|---|---|
| Formspree del formulario de contacto | `index.html` tiene `action="https://formspree.io/f/YOUR_FORM_ID"` — hay que crear el form en formspree.io (gratis) y reemplazar el ID real. Sin esto el formulario de contacto no envía nada. |
| Verificar OG image en producción | Pegar `https://labstudiopna.github.io/FiscoIA/` en el Facebook Sharing Debugger o mandarla por WhatsApp para confirmar que la tarjeta se ve bien con la imagen nueva. |
| Dominio `fiscoia.com.ar` | Registro pendiente (estaba planeado para un sábado). |
| Payment method en Anthropic Console | Para que la API key no se quede sin crédito cada pocos usos. |

## 🟡 Corto plazo (si hay tracción temprana de ventas)

- **Integración Stripe** — pagos automáticos para planes pagos
- **DDJJ precompletada ARCA** — alto valor percibido, diferenciador fuerte
- **2FA** — seguridad esperable en cualquier SaaS con datos fiscales
- **Vencimientos ARCA vinculados a cliente + semáforo combinado** — hoy los vencimientos son una lista general fija (hardcodeada, no dinámica), sin relación a clientes específicos. Requiere: (1) modelo de datos que asocie cada vencimiento a un cliente, (2) hacer la lista dinámica en vez de fechas fijas 2026 hardcodeadas, (3) semáforo verde/amarillo/rojo por cliente combinando vencimientos pendientes + anomalías detectadas en sus facturas. Es cambio de arquitectura, no ajuste rápido.

## 🔵 Q3 2026 (según volumen de usuarios)

- Carga automática a portal ARCA
- Upgrade a modelo Sonnet (mejor calidad, más caro — evaluar cuándo se justifica)
- Reportes mensuales PDF automáticos
- Integración Mercado Pago
- App mobile

## 🟣 Q4 2026 / 2027 (visión larga)

- Integración con software contable existente
- Analytics y predicción de impuestos
- API para terceros
- Expansión a Chile, Uruguay, Colombia

## 💡 Recomendación

No avanzar con nada de "Corto plazo" en adelante hasta tener usuarios pagos reales dando señal de qué piden. Priorizar: validar que lo que ya existe funciona sin bugs, conseguir los primeros clientes, y recién ahí evaluar qué construir después.

## ⚠️ Cosas para revisar / posibles pendientes técnicos

- Confirmar que todos los archivos entregados en las últimas sesiones (agente-contador.html, index.html, guia-completa.html, favicon.svg/ico/pngs, og-image.png) están efectivamente subidos y en producción — hubo idas y vueltas donde algunos fixes no llegaban a pushearse.
- Revisar bugs reportados como "resueltos" directamente en la app en celular real, no solo confiar en el código (varias veces un fix funcionaba en teoría pero no en la práctica por selectores CSS mal apuntados).
