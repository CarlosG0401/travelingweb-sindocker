import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./assets/styles/DetalleReserva.css";
import infoDestino from "./infoDestinos";

export default function DetalleReserva() {
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const reserva_id = localStorage.getItem("reserva_id");
    if (!reserva_id) return;

    fetch(`http://localhost:8000/detalle_reserva.php?reserva_id=${reserva_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("asientos", data.asientos);
          localStorage.setItem("tipo_precio", data.tipo_precio);
          localStorage.setItem("precio_unitario", data.precio_unitario);
          localStorage.setItem("cantidad_reservas", data.cantidad_reservas);
          localStorage.setItem("total", data.total);
          localStorage.setItem("aerolinea_nombre", data.aerolinea_nombre);
          localStorage.setItem("cliente_nombre", data.cliente_nombre);
          localStorage.setItem("cliente_email", data.cliente_email);
          localStorage.setItem("origen", data.origen);
          localStorage.setItem("destino", data.destino);
          localStorage.setItem("fecha_inicio", data.fecha_inicio);
          localStorage.setItem("fecha_fin", data.fecha_fin);

          setReserva({
            id: reserva_id,
            asientos: data.asientos,
            tipo_precio: data.tipo_precio,
            precio_unitario: data.precio_unitario,
            cantidad_reservas: data.cantidad_reservas,
            total_pago: data.total,
            aerolinea: data.aerolinea_nombre,
            cliente: {
              nombre: data.cliente_nombre,
              email: data.cliente_email,
            },
            viaje: {
              origen: data.origen,
              destino: data.destino,
              fecha_inicio: data.fecha_inicio,
              fecha_fin: data.fecha_fin,
            },
          });
        }
      });
  }, []);

  const generarPDF = () => {
    const input = document.getElementById("reserva-detalle");
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = canvas.width / canvas.height;

      let imgWidth = pdfWidth * 0.85;
      let imgHeight = imgWidth / imgProps;

      if (imgHeight > pdfHeight * 0.95) {
        imgHeight = pdfHeight * 0.95;
        imgWidth = imgHeight * imgProps;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = 10;

      // Primera página: Detalle de Reserva
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      const destino = reserva.viaje.destino;
      const extra = infoDestino[destino];

      if (extra) {
        pdf.addPage();

        let ypos = 20;
        pdf.setFontSize(18);
        pdf.setTextColor(33, 37, 41);
        pdf.setFont("helvetica", "bold");
        pdf.text(`Información adicional sobre ${destino}`, 20, ypos);

        ypos += 10;
        pdf.setFontSize(9);
        const subtituloColor = [33, 66, 131]; // Azul oscuro
        const textoColor = [60, 60, 60];

        extra.texto.forEach((linea) => {
          if (ypos >= 270) {
            pdf.addPage();
            ypos = 20;
          }

          const isTitulo = /^[A-ZÁÉÍÓÚÑ][\w\sÁÉÍÓÚÑ]+:?$/.test(linea.trim());

          if (isTitulo) {
            pdf.setFont("helvetica", "bolditalic");
            pdf.setTextColor(...subtituloColor);
            const clean = linea.replace(/:$/, "") + ":";
            pdf.text(clean, 20, ypos);
            pdf.setDrawColor(...subtituloColor);
            pdf.line(20, ypos + 1, 180, ypos + 1); // línea decorativa
            ypos += 7;
          } else {
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(...textoColor);
            const splitted = pdf.splitTextToSize(linea, 170);
            pdf.text(splitted, 20, ypos);
            ypos += splitted.length * 5;
          }
        });

        // Agregar imágenes al final
        const cargarImagenes = extra.imagenes.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = url;
            img.onload = () => resolve(img);
          });
        });

        Promise.all(cargarImagenes).then((imagenes) => {
          imagenes.forEach((img) => {
            if (ypos + 60 >= 280) {
              pdf.addPage();
              ypos = 20;
            }
            pdf.addImage(img, "JPEG", 20, ypos, 160, 60);
            ypos += 70;
          });

          // Firma de cierre opcional
          pdf.addPage();
          pdf.setFontSize(14);
          pdf.setTextColor(70, 70, 70);
          pdf.setFont("times", "italic");
          pdf.text("¡Gracias por preferir TravelingWeb!", 40, 140);
          pdf.text("Te deseamos un excelente viaje", 50, 150);

          pdf.save("detalle_reserva.pdf");
        });
      } else {
        pdf.save("detalle_reserva.pdf");
      }
    });
  };

  if (!reserva) return <p>Cargando reserva...</p>;

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


