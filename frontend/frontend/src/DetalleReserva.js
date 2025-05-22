import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./assets/styles/DetalleReserva.css";

export default function DetalleReserva() {
  const reserva = {
    id: 1,
    asientos: "12A, 12B",
    tipo_precio: "Económico",
    precio_unitario: 150,
    cantidad_reservas: 2,
    total_pago: 300,
    aerolinea: "LATAM",
    viaje: {
      origen: "Santiago",
      destino: "Buenos Aires",
      fecha_inicio: "2025-06-01",
      fecha_fin: "2025-06-10"
    },
    cliente: {
      nombre: "Juan Pérez",
      email: "juan.perez@gmail.com"
    }
  };

  const generarPDF = () => {
  const input = document.getElementById("reserva-detalle");
  html2canvas(input, { scale: 3 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = canvas.width / canvas.height;

    const maxPdfWidth = pdfWidth * 0.85; 

    let imgWidth = maxPdfWidth;
    let imgHeight = imgWidth / imgProps;

    if (imgHeight > pdfHeight * 0.95) {
      imgHeight = pdfHeight * 0.95;
      imgWidth = imgHeight * imgProps;
    }

    const x = (pdfWidth - imgWidth) / 2;
    const y = 10; 

    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save("detalle_reserva.pdf");
    });
    };

  return (
    <div className="reserva-wrapper">
      <div id="reserva-detalle" className="reserva-info">
        <h2 className="reserva-title">Detalle de Reserva</h2>

        <p><strong>ID Reserva:</strong> {reserva.id}</p>
        <p><strong>Asientos:</strong> {reserva.asientos}</p>
        <p><strong>Tipo de Precio:</strong> {reserva.tipo_precio}</p>
        <p><strong>Precio Unitario:</strong> ${reserva.precio_unitario}</p>
        <p><strong>Cantidad de Reservas:</strong> {reserva.cantidad_reservas}</p>
        <p><strong>Total Pagado:</strong> ${reserva.total_pago}</p>
        <p><strong>Aerolínea:</strong> {reserva.aerolinea}</p>
        <p><strong>Cliente:</strong> {reserva.cliente.nombre}</p>
        <p><strong>Email:</strong> {reserva.cliente.email}</p>
        <p><strong>Origen:</strong> {reserva.viaje.origen}</p>
        <p><strong>Destino:</strong> {reserva.viaje.destino}</p>
        <p><strong>Fecha de Inicio:</strong> {reserva.viaje.fecha_inicio}</p>
        <p><strong>Fecha de Fin:</strong> {reserva.viaje.fecha_fin}</p>
      </div>

      <button className="btn-descargar" onClick={generarPDF}>Descargar PDF</button>
    </div>
  );
}

