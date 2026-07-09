// ========== SISTEMA DE HOJAS DIARIAS POR CLIENTE ==========
// Agrega esto al agente-contador-fiscoia.html (antes de </script>)

const DATOS_DIARIOS_KEY = 'fiscoia_datos_diarios';
const CLIENTES_KEY = 'fiscoia_clientes';

// Estructura de datos diarios
class DatosDiarios {
  constructor(fecha = new Date()) {
    this.fecha = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
    this.clientes = {}; // { nombreCliente: [facturas] }
    this.resumen = {
      totalFacturas: 0,
      totalIVA: 0,
      totalNeto: 0,
      clientesUnicos: 0
    };
  }

  agregarFactura(nombreCliente, datosFactura) {
    // Inicializar cliente si no existe
    if (!this.clientes[nombreCliente]) {
      this.clientes[nombreCliente] = [];
    }

    // Agregar factura
    this.clientes[nombreCliente].push({
      ...datosFactura,
      horaRegistro: new Date().toLocaleTimeString('es-AR')
    });

    // Actualizar resumen
    this.resumen.totalFacturas++;
    this.resumen.totalIVA += parseFloat(datosFactura.iva) || 0;
    this.resumen.totalNeto += parseFloat(datosFactura.neto) || 0;
    this.resumen.clientesUnicos = Object.keys(this.clientes).length;

    // Guardar
    this.guardar();
  }

  guardar() {
    localStorage.setItem(DATOS_DIARIOS_KEY, JSON.stringify(this));
  }

  static cargar() {
    const datos = localStorage.getItem(DATOS_DIARIOS_KEY);
    if (datos) {
      const obj = JSON.parse(datos);
      const hoy = new Date().toISOString().split('T')[0];
      
      // Si es de otro día, crear nuevos datos
      if (obj.fecha !== hoy) {
        return new DatosDiarios();
      }
      
      const instance = new DatosDiarios();
      Object.assign(instance, obj);
      return instance;
    }
    return new DatosDiarios();
  }

  static resetear() {
    localStorage.removeItem(DATOS_DIARIOS_KEY);
  }
}

// Función para extraer datos de la respuesta IA
function extraerDatosParaHojasDiarias(datosExtraidos) {
  return {
    tipo: datosExtraidos.tipo || 'N/A',
    numero: datosExtraidos.numero || 'N/A',
    fecha: datosExtraidos.fecha || 'N/A',
    cuitEmisor: datosExtraidos.cuitEmisor || 'N/A',
    emisor: datosExtraidos.emisor || 'N/A',
    neto: datosExtraidos.neto || 0,
    iva: datosExtraidos.iva || 0,
    retIva: datosExtraidos.retIva || 0,
    retGan: datosExtraidos.retGan || 0,
    percIIBB: datosExtraidos.percIIBB || 0,
    total: datosExtraidos.total || 0,
    monotributo: datosExtraidos.monotributo || 'No',
    impuestos: datosExtraidos.impuestos || []
  };
}

// Generar Excel con hojas por cliente
async function generarExcelDiario() {
  const datos = DatosDiarios.cargar();
  
  if (Object.keys(datos.clientes).length === 0) {
    alert('No hay datos para el día de hoy');
    return;
  }

  // Crear workbook
  const wb = XLSX.utils.book_new();

  // HOJA 1: RESUMEN DEL DÍA
  const resumenData = [
    ['RESUMEN DEL DÍA', datos.fecha],
    [],
    ['Métrica', 'Valor'],
    ['Total Facturas', datos.resumen.totalFacturas],
    ['Clientes Únicos', datos.resumen.clientesUnicos],
    ['Total Neto', datos.resumen.totalNeto],
    ['Total IVA', datos.resumen.totalIVA],
    ['Total (Neto + IVA)', datos.resumen.totalNeto + datos.resumen.totalIVA]
  ];
  
  const wsResumen = XLSX.utils.aoa_to_sheet(resumenData);
  XLSX.utils.book_append_sheet(wb, wsResumen, 'Resumen');

  // HOJAS POR CLIENTE
  Object.entries(datos.clientes).forEach(([cliente, facturas]) => {
    const clienteData = [
      ['CLIENTE:', cliente],
      ['Fecha:', datos.fecha],
      ['Total facturas:', facturas.length],
      [],
      ['Tipo', 'Número', 'Fecha', 'CUIT Emisor', 'Emisor', 'Neto', 'IVA', 'Total', 'Ret. IVA', 'Ret. Gan.', 'Perc. IIBB', 'Hora Registro']
    ];

    // Agregar facturas
    facturas.forEach(f => {
      clienteData.push([
        f.tipo,
        f.numero,
        f.fecha,
        f.cuitEmisor,
        f.emisor,
        f.neto,
        f.iva,
        f.total,
        f.retIva || 0,
        f.retGan || 0,
        f.percIIBB || 0,
        f.horaRegistro
      ]);
    });

    // Agregar totales
    const totalNeto = facturas.reduce((sum, f) => sum + (parseFloat(f.neto) || 0), 0);
    const totalIVA = facturas.reduce((sum, f) => sum + (parseFloat(f.iva) || 0), 0);
    const totalMonto = totalNeto + totalIVA;

    clienteData.push([]);
    clienteData.push(['TOTALES', '', '', '', '', totalNeto, totalIVA, totalMonto, '', '', '']);

    const wsCliente = XLSX.utils.aoa_to_sheet(clienteData);
    
    // Formatear (ancho de columnas)
    wsCliente['!cols'] = [
      { wch: 12 }, // Tipo
      { wch: 18 }, // Número
      { wch: 12 }, // Fecha
      { wch: 16 }, // CUIT
      { wch: 20 }, // Emisor
      { wch: 10 }, // Neto
      { wch: 10 }, // IVA
      { wch: 10 }, // Total
      { wch: 10 }, // Ret. IVA
      { wch: 10 }, // Ret. Gan
      { wch: 10 }, // Perc IIBB
      { wch: 14 }  // Hora
    ];

    XLSX.utils.book_append_sheet(wb, wsCliente, cliente.substring(0, 31)); // Excel permite max 31 chars en nombre sheet
  });

  // Guardar archivo
  const nombreArchivo = `FiscoIA_${datos.fecha}.xlsx`;
  XLSX.writeFile(wb, nombreArchivo);

  registrarActividad('Hoja Diaria Generada', `Excel diario creado: ${nombreArchivo} con ${datos.resumen.clientesUnicos} clientes`);
}

// Generar Excel individual por cliente
async function generarExcelPorCliente(nombreCliente) {
  const datos = DatosDiarios.cargar();
  
  if (!datos.clientes[nombreCliente]) {
    alert('No hay datos para este cliente');
    return;
  }

  const facturas = datos.clientes[nombreCliente];
  const wb = XLSX.utils.book_new();

  // HOJA: FACTURAS DEL CLIENTE
  const clienteData = [
    ['CLIENTE:', nombreCliente],
    ['Fecha:', datos.fecha],
    ['Total facturas:', facturas.length],
    [],
    ['Tipo', 'Número', 'Fecha', 'CUIT Emisor', 'Emisor', 'Neto', 'IVA', 'Total', 'Ret. IVA', 'Ret. Gan.', 'Perc. IIBB', 'Hora Registro']
  ];

  facturas.forEach(f => {
    clienteData.push([
      f.tipo,
      f.numero,
      f.fecha,
      f.cuitEmisor,
      f.emisor,
      f.neto,
      f.iva,
      f.total,
      f.retIva || 0,
      f.retGan || 0,
      f.percIIBB || 0,
      f.horaRegistro
    ]);
  });

  // Totales
  const totalNeto = facturas.reduce((sum, f) => sum + (parseFloat(f.neto) || 0), 0);
  const totalIVA = facturas.reduce((sum, f) => sum + (parseFloat(f.iva) || 0), 0);
  const totalMonto = totalNeto + totalIVA;

  clienteData.push([]);
  clienteData.push(['TOTALES', '', '', '', '', totalNeto, totalIVA, totalMonto, '', '', '']);

  const ws = XLSX.utils.aoa_to_sheet(clienteData);
  ws['!cols'] = [
    { wch: 12 }, { wch: 18 }, { wch: 12 }, { wch: 16 }, { wch: 20 },
    { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 14 }
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Facturas');

  // Guardar
  const nombreArchivo = `${nombreCliente}_${datos.fecha}.xlsx`;
  XLSX.writeFile(wb, nombreArchivo);

  registrarActividad('Excel Cliente Generado', `Descargado: ${nombreArchivo}`);
}

// Panel visual de datos diarios
function mostrarPanelDatosDiarios() {
  const datos = DatosDiarios.cargar();
  
  let html = `
    <div style="background:var(--surface2); border:1px solid var(--border); border-radius:12px; padding:20px; margin-bottom:24px;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
        <div>
          <div style="font-size:12px; color:var(--text-dim); margin-bottom:4px;">DATOS ACUMULADOS DEL DÍA</div>
          <div style="font-size:18px; font-weight:700; color:var(--text);">${datos.fecha}</div>
        </div>
        <div style="display:flex; gap:10px;">
          <button onclick="generarExcelDiario()" style="background:var(--green); border:none; border-radius:6px; padding:10px 16px; color:white; font-weight:600; cursor:pointer; font-size:12px;">
            📊 Excel Diario
          </button>
          <button onclick="limpiarDatosDiarios()" style="background:var(--red); border:none; border-radius:6px; padding:10px 16px; color:white; font-weight:600; cursor:pointer; font-size:12px;">
            🗑️ Limpiar día
          </button>
        </div>
      </div>

      <!-- RESUMEN -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:12px; margin-bottom:20px;">
        <div style="background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:11px; color:var(--text-dim); margin-bottom:4px;">Facturas</div>
          <div style="font-size:20px; font-weight:700; color:var(--green);">${datos.resumen.totalFacturas}</div>
        </div>
        <div style="background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:11px; color:var(--text-dim); margin-bottom:4px;">Clientes</div>
          <div style="font-size:20px; font-weight:700; color:var(--teal);">${datos.resumen.clientesUnicos}</div>
        </div>
        <div style="background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:11px; color:var(--text-dim); margin-bottom:4px;">Neto</div>
          <div style="font-size:16px; font-weight:700; color:var(--text);">$${formatCotiz(datos.resumen.totalNeto)}</div>
        </div>
        <div style="background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:11px; color:var(--text-dim); margin-bottom:4px;">IVA</div>
          <div style="font-size:16px; font-weight:700; color:var(--green);">$${formatCotiz(datos.resumen.totalIVA)}</div>
        </div>
      </div>

      <!-- CLIENTES CON FACTURAS -->
      <div style="margin-top:20px;">
        <div style="font-size:12px; font-weight:600; color:var(--text); margin-bottom:12px;">Facturas por cliente:</div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px;">
  `;

  Object.entries(datos.clientes).forEach(([cliente, facturas]) => {
    const neto = facturas.reduce((sum, f) => sum + (parseFloat(f.neto) || 0), 0);
    const iva = facturas.reduce((sum, f) => sum + (parseFloat(f.iva) || 0), 0);
    
    html += `
      <div style="background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:12px;">
        <div style="font-size:12px; font-weight:600; color:var(--text); margin-bottom:8px;">${cliente}</div>
        <div style="display:flex; justify-content:space-between; gap:8px; font-size:11px; margin-bottom:8px;">
          <span>📄 ${facturas.length} facturas</span>
          <span>💵 $${formatCotiz(neto + iva)}</span>
        </div>
        <button onclick="generarExcelPorCliente('${cliente}')" style="width:100%; background:var(--green); border:none; border-radius:4px; padding:6px; color:white; font-weight:600; cursor:pointer; font-size:11px;">
          ⬇️ Descargar
        </button>
      </div>
    `;
  });

  html += `
        </div>
      </div>
    </div>
  `;

  return html;
}

function limpiarDatosDiarios() {
  if (confirm('¿Estás seguro de que querés limpiar los datos del día?')) {
    DatosDiarios.resetear();
    alert('Datos del día eliminados');
    location.reload();
  }
}

// Integración con análisis de facturas
function integrarConAnalisisDiario(datosFactura, nombreCliente) {
  const datos = DatosDiarios.cargar();
  const datosFormateados = extraerDatosParaHojasDiarias(datosFactura);
  datos.agregarFactura(nombreCliente, datosFormateados);
  console.log('✓ Factura agregada a hoja diaria');
}
