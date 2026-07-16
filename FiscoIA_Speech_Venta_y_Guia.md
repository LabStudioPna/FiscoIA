# FiscoIA — Guía de Venta y Referencia Completa

*Para LAB — todo lo que necesitás saber para vender, explicar y defender el producto.*

---

## 🎤 PARTE 1 — El Speech de Venta

### Versión corta (30 segundos, para arrancar una conversación)

> "FiscoIA es un asistente contable con inteligencia artificial. Le subís una factura y en segundos te dice el IVA, las retenciones, si algo no cierra. Genera reportes en Excel y PDF, te avisa vencimientos de ARCA, y lo mejor: tus datos nunca pasan por mis servidores — quedan en tu compu o en tu propio Google Drive. Podés probarlo gratis 5 días, sin tarjeta."

### Versión completa (para una reunión / demo)

**1. El dolor (empezá acá, no con el producto):**
> "¿Cuánto tiempo te lleva revisar una factura a mano — chequear el CUIT, calcular el IVA, ver si las retenciones están bien, y después pasarlo a una planilla? Con 20-30 facturas por semana, eso son horas que no facturás."

**2. La solución:**
> "FiscoIA hace eso en 10 segundos. Subís el PDF o la foto de la factura, la IA la lee, extrae todos los datos, y te arma el reporte — Excel, PDF, o el formato que necesites para ARCA."

**3. El diferencial que importa (privacidad):**
> "A diferencia de otros softwares contables, FiscoIA no tiene un servidor central donde se guardan los datos de tus clientes. Vos usás tu propia clave de IA (de Anthropic, la misma empresa de Claude) y opcionalmente tu propio Google Sheets. Eso significa que los datos fiscales de tus clientes — CUITs, montos — nunca están en manos de un tercero. Para un contador, eso es tranquilidad real, no solo marketing."

**4. Lo que hace, en criollo:**
- Lee facturas (PDF, foto, Excel) y extrae todo automáticamente
- Calcula IVA, detecta retenciones e inconsistencias
- Arma reportes: Excel, PDF, TXT para ARCA
- Te avisa vencimientos
- Te manda un resumen semanal y mensual por email (opcional)
- Convertidor de moneda con cotización en tiempo real
- Chat para consultas impositivas puntuales

**5. El cierre:**
> "Podés probarlo gratis 5 días, sin tarjeta, con tu propia cuenta de Google. Si te sirve, seguís con el Plan Estudio a USD 80 por mes — eso incluye que yo te ayude a configurar todo, te avisa cuando cambia algo importante en la normativa, y tenés soporte directo por WhatsApp conmigo."

---

## 🛡️ PARTE 2 — Preguntas Incómodas (y cómo responderlas bien)

### "¿Esto me va a reemplazar / dejar sin laburo?"
**No lo evites — respondé de frente:**
> "No reemplaza tu criterio profesional, reemplaza el trabajo mecánico y repetitivo — leer una factura, tipear los datos, sumar. Vos seguís siendo el que firma, el que decide, el que responde ante ARCA. FiscoIA hace en 10 segundos lo que a vos te toma 15 minutos de tipeo, para que uses ese tiempo en asesorar, no en cargar datos."

### "¿Cómo sé que mis datos están seguros? ¿Vos los ves?"
**Esta es LA pregunta más importante — contestala con seguridad:**
> "No, y te lo puedo mostrar técnicamente: cuando subís una factura, se manda directo desde tu navegador a la IA (Anthropic), usando tu propia clave personal. Yo no tengo ningún servidor en el medio de ese proceso. Si conectás Google Sheets, es tu propia cuenta de Google, no la mía. Lo único que yo guardo es tu email y qué plan tenés — nada de facturas, nada de CUITs de tus clientes."

### "¿Y si la IA se equivoca? ¿Quién responde?"
> "La IA puede equivocarse, como cualquier herramienta — por eso cada reporte que genera FiscoIA dice explícitamente que debe ser revisado por un profesional antes de presentarlo. Es una herramienta de asistencia, no de decisión automática. Vos seguís siendo el responsable profesional, igual que si un asistente humano te hubiera tipeado los datos — los revisás antes de firmar."

### "¿Por qué pagaría si hay una versión gratis?"
> "La versión gratis (5 días) te deja probar el producto entero, sin límites de funciones. Después de esos 5 días, si seguís usándolo, pagás por mi acompañamiento — te ayudo a configurar todo, te aviso de cambios normativos importantes, y tenés una línea directa conmigo si algo falla o tenés una duda. No estás pagando por 'features extra', estás pagando porque alguien te responde rápido."

### "¿Qué pasa si Anthropic sube los precios o cierra el servicio?"
> "El costo de la IA lo pagás vos directo a Anthropic, separado de mi cuota — así que si en algún momento cambia el precio, lo ves reflejado ahí, con total transparencia (hoy son centavos por factura, así que hay mucho margen). Y como es una arquitectura simple, si en algún momento tuviera sentido migrar a otro proveedor de IA, no es un cambio traumático."

### "¿Puedo cancelar cuando quiera?"
> "Sí. No hay contrato atado ni permanencia mínima. El plan pago es mes a mes."

### "¿Hay algo parecido en el mercado? ¿Por qué elegir esto?"
> "Hay softwares contables grandes (Tango, Xubio, etc.) que hacen mucho más — pero también cuestan mucho más, y tus datos SÍ viven en sus servidores. FiscoIA no compite con eso, es un complemento liviano y rápido para el trabajo del día a día: leer facturas rápido, sin que tengas que migrar todo tu sistema actual."

### "¿Cuánto me cuesta realmente usarlo, todo incluido?"
> "Dos cosas separadas: el Plan Estudio ($80/mes, mi soporte), y el consumo de IA que pagás directo a Anthropic — aproximadamente $0.002 dólares por consulta. Analizar 100 facturas te cuesta centavos, literalmente. Con $5 dólares de crédito hacés más de 200 análisis."

### "¿Necesito instalar algo?"
> "No, es una página web. Andá a [URL], entrá con tu cuenta de Google, y listo."

### "¿Funciona en el celular?"
> "Sí, está pensado para funcionar bien en celular y en computadora por igual."

---

## 📖 PARTE 3 — Glosario y Arquitectura (para que vos lo tengas clarísimo)

### Cómo explicarte a vos mismo lo que armamos

**El login (Google):**
Cuando alguien entra con su cuenta de Google, se crea un registro en una base de datos que vive en tu servidor de n8n — ahí se guarda: email, nombre, plan (gratis/estudio), y fecha de alta. Nada más. Esa base de datos se llama `FiscoIA_Usuarios`.

**La prueba de 5 días:**
Cuando alguien se registra, arranca a contar desde `fechaAlta`. Cada vez que esa persona vuelve a loguearse, el sistema calcula cuántos días pasaron. Si pasaron 5 o más y sigue en plan "gratis", le bloqueamos el acceso y le mostramos un cartel para contratar. Es un chequeo que se hace en el momento de loguearse — no es una vigilancia en tiempo real.

**La API Key (Anthropic):**
Es la llave que cada usuario pone para que la Inteligencia Artificial funcione. Es personal, se paga aparte (a Anthropic, no a vos), y se guarda solo en el navegador del usuario — se borra sola al cerrar la pestaña.

**Google Sheets — 2 caminos:**
- **Conexión rápida (OAuth):** 1 click, FiscoIA le arma la hoja sola en su Google Drive. Fácil, pero no permite el digesto/reporte automático.
- **Modo avanzado (Apps Script):** el usuario copia y pega un código en su cuenta de Google. Más difícil, pero es el único que permite mandar emails automáticos (digesto semanal, reporte mensual).

**Digesto semanal / Reporte mensual:**
Son emails automáticos que le llegan al usuario (no a vos) con un resumen de su actividad. Corren en la propia cuenta de Google del usuario — de nuevo, nada pasa por tus servidores.

**n8n:**
Es la herramienta que ya usabas para automatizaciones — ahora también hace de "backend liviano" para FiscoIA: guarda las cuentas de usuario y corre el Monitor Normativo (que chequea cambios impositivos todas las noches).

**El plan pago — qué desbloquea técnicamente:**
Nada, hoy. Es una decisión de diseño: todos tienen el mismo producto. Cuando alguien te paga, vos entrás a la tabla de usuarios en n8n y le cambiás manualmente el campo `plan` de "gratis" a "estudio" — eso hace que ya no le corte el acceso a los 5 días.

**Lo que NUNCA toca tus servidores:**
Facturas, CUITs, montos, nombres de clientes de tus usuarios, el contenido del chat. Todo eso va directo del navegador del usuario a Anthropic (o a su propio Google, si lo conecta).

---

## ✅ Checklist antes de la primera venta real

- [ ] Publicar la pantalla de consentimiento OAuth en Google Cloud (sacarla de "modo Prueba")
- [ ] Tener a mano el link de WhatsApp para cuando alguien contrate
- [ ] Practicá el speech corto en voz alta al menos una vez
- [ ] Ubicá dónde está la tabla `FiscoIA_Usuarios` en n8n, para cambiar el plan cuando alguien pague
- [ ] Mercado Pago — cuando estés listo, retomamos

---

*Documento generado el 13 de julio de 2026. Guardalo — es tu referencia para cualquier conversación de venta.*
