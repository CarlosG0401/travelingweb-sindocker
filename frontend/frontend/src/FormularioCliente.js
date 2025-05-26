//En esta pestaña el usuario cliente puede completar formulario de datos personales y documentación necesaria para la compra de un viaje y validación de requisitos.

import React, { useState } from 'react';
import './assets/styles/formulario_cliente.css';
import { useNavigate } from 'react-router-dom';


function FormularioCliente() {
   const navigate = useNavigate();
  const [nacionalidad, setNacionalidad] = useState('Chileno');
  const [tieneRut, setTieneRut] = useState('Sí');
  const [requierePasaporte, setRequierePasaporte] = useState('No');

  const handleNacionalidadChange = (e) => setNacionalidad(e.target.value);
  const handleTieneRutChange = (e) => setTieneRut(e.target.value);
  const handleRequierePasaporteChange = (e) => setRequierePasaporte(e.target.value);

  return (
    <div className="formulario-cliente-container">
      <h1>Formulario de Cliente y Documentación</h1>

      <div className="formulario-cliente-grid">
        {/* Cuadro 1 - Cliente */}
        <div className="formulario-cliente-box">
          <h2>Datos del Cliente</h2>
          <input type="text" placeholder="Nombres" required />
          <input type="text" placeholder="Apellidos" required />
          <input type="date" placeholder="Fecha de Nacimiento" required />
          <input type="email" placeholder="Correo Electrónico" required />
          <input type="tel" placeholder="Número de Teléfono" required />

          <label>Nacionalidad:</label>
          <select value={nacionalidad} onChange={handleNacionalidadChange}>
            <option value="Chileno">Chileno</option>
            <option value="Extranjero">Extranjero</option>
          </select>
        </div>

        {/* Cuadro 2 - Documentación */}
        <div className="formulario-cliente-box">
          <h2>Datos de Documentación</h2>

          {nacionalidad === 'Extranjero' ? (
            <>
              <label>¿Tiene RUT?</label>
              <select value={tieneRut} onChange={handleTieneRutChange}>
                <option>Sí</option>
                <option>No</option>
              </select>

              {tieneRut === 'No' ? (
                <>
                  <input type="text" placeholder="Nº Pasaporte" />
                  <input type="date" placeholder="Fecha Emisión Pasaporte" />
                  <input type="date" placeholder="Fecha Expiración Pasaporte" />
                </>
              ) : (
                <>
                  <input type="text" placeholder="Nº RUT" />
                  <input type="date" placeholder="Fecha Emisión RUT" />
                  <input type="date" placeholder="Fecha Expiración RUT" />
                </>
              )}

              <label>Visado:</label>
              <select>
                <option>Temporal</option>
                <option>Definitivo</option>
                <option>Estudiante</option>
              </select>

              <input type="date" placeholder="Fecha Emisión Visa" />
              <input type="date" placeholder="Fecha Expiración Visa" />

              <label>Nacionalidad:</label>
              <select>
                <option>Seleccione Nacionalidad</option>
                <option value="Afganistán">Afganistán</option>
                <option value="Albania">Albania</option>
                <option value="Alemania">Alemania</option>
                <option value="Andorra">Andorra</option>
                <option value="Angola">Angola</option>
                <option value="Antigua y Barbuda">Antigua y Barbuda</option>
                <option value="Arabia Saudita">Arabia Saudita</option>
                <option value="Argelia">Argelia</option>
                <option value="Argentina">Argentina</option>
                <option value="Armenia">Armenia</option>
                <option value="Australia">Australia</option>
                <option value="Austria">Austria</option>
                <option value="Azerbaiyán">Azerbaiyán</option>
                <option value="Bahamas">Bahamas</option>
                <option value="Bangladés">Bangladés</option>
                <option value="Barbados">Barbados</option>
                <option value="Baréin">Baréin</option>
                <option value="Bélgica">Bélgica</option>
                <option value="Belice">Belice</option>
                <option value="Benín">Benín</option>
                <option value="Bielorrusia">Bielorrusia</option>
                <option value="Birmania">Birmania</option>
                <option value="Bolivia">Bolivia</option>
                <option value="Bosnia y Herzegovina">Bosnia y Herzegovina</option>
                <option value="Botsuana">Botsuana</option>
                <option value="Brasil">Brasil</option>
                <option value="Brunéi">Brunéi</option>
                <option value="Bulgaria">Bulgaria</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="Burundi">Burundi</option>
                <option value="Cabo Verde">Cabo Verde</option>
                <option value="Camboya">Camboya</option>
                <option value="Camerún">Camerún</option>
                <option value="Canadá">Canadá</option>
                <option value="Catar">Catar</option>
                <option value="China">China</option>
                <option value="Chipre">Chipre</option>
                <option value="Colombia">Colombia</option>
                <option value="Comoras">Comoras</option>
                <option value="Corea del Norte">Corea del Norte</option>
                <option value="Corea del Sur">Corea del Sur</option>
                <option value="Costa de Marfil">Costa de Marfil</option>
                <option value="Costa Rica">Costa Rica</option>
                <option value="Croacia">Croacia</option>
                <option value="Cuba">Cuba</option>
                <option value="Dinamarca">Dinamarca</option>
                <option value="Dominica">Dominica</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Egipto">Egipto</option>
                <option value="El Salvador">El Salvador</option>
                <option value="Emiratos Árabes Unidos">Emiratos Árabes Unidos</option>
                <option value="Eritrea">Eritrea</option>
                <option value="Eslovaquia">Eslovaquia</option>
                <option value="Eslovenia">Eslovenia</option>
                <option value="España">España</option>
                <option value="Estados Unidos">Estados Unidos</option>
                <option value="Estonia">Estonia</option>
                <option value="Esuatini">Esuatini</option>
                <option value="Etiopía">Etiopía</option>
                <option value="Filipinas">Filipinas</option>
                <option value="Finlandia">Finlandia</option>
                <option value="Francia">Francia</option>
                <option value="Gabón">Gabón</option>
                <option value="Gambia">Gambia</option>
                <option value="Georgia">Georgia</option>
                <option value="Ghana">Ghana</option>
                <option value="Granada">Granada</option>
                <option value="Grecia">Grecia</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Guinea">Guinea</option>
                <option value="Guinea-Bisáu">Guinea-Bisáu</option>
                <option value="Guinea Ecuatorial">Guinea Ecuatorial</option>
                <option value="Guyana">Guyana</option>
                <option value="Haití">Haití</option>
                <option value="Honduras">Honduras</option>
                <option value="Hungría">Hungría</option>
                <option value="India">India</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Irak">Irak</option>
                <option value="Irán">Irán</option>
                <option value="Irlanda">Irlanda</option>
                <option value="Islandia">Islandia</option>
                <option value="Islas Marshall">Islas Marshall</option>
                <option value="Islas Salomón">Islas Salomón</option>
                <option value="Israel">Israel</option>
                <option value="Italia">Italia</option>
                <option value="Jamaica">Jamaica</option>
                <option value="Japón">Japón</option>
                <option value="Jordania">Jordania</option>
                <option value="Kazajistán">Kazajistán</option>
                <option value="Kenia">Kenia</option>
                <option value="Kirguistán">Kirguistán</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Laos">Laos</option>
                <option value="Lesoto">Lesoto</option>
                <option value="Letonia">Letonia</option>
                <option value="Líbano">Líbano</option>
                <option value="Liberia">Liberia</option>
                <option value="Libia">Libia</option>
                <option value="Liechtenstein">Liechtenstein</option>
                <option value="Lituania">Lituania</option>
                <option value="Luxemburgo">Luxemburgo</option>
                <option value="Macedonia del Norte">Macedonia del Norte</option>
                <option value="Madagascar">Madagascar</option>
                <option value="Malasia">Malasia</option>
                <option value="Malaui">Malaui</option>
                <option value="Maldivas">Maldivas</option>
                <option value="Malí">Malí</option>
                <option value="Malta">Malta</option>
                <option value="Marruecos">Marruecos</option>
                <option value="Mauricio">Mauricio</option>
                <option value="Mauritania">Mauritania</option>
                <option value="México">México</option>
                <option value="Micronesia">Micronesia</option>
                <option value="Moldavia">Moldavia</option>
                <option value="Mónaco">Mónaco</option>
                <option value="Mongolia">Mongolia</option>
                <option value="Montenegro">Montenegro</option>
                <option value="Mozambique">Mozambique</option>
                <option value="Namibia">Namibia</option>
                <option value="Nauru">Nauru</option>
                <option value="Nepal">Nepal</option>
                <option value="Nicaragua">Nicaragua</option>
                <option value="Níger">Níger</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Noruega">Noruega</option>
                <option value="Nueva Zelanda">Nueva Zelanda</option>
                <option value="Omán">Omán</option>
                <option value="Países Bajos">Países Bajos</option>
                <option value="Pakistán">Pakistán</option>
                <option value="Palaos">Palaos</option>
                <option value="Palestina">Palestina</option>
                <option value="Panamá">Panamá</option>
                <option value="Papúa Nueva Guinea">Papúa Nueva Guinea</option>
                <option value="Paraguay">Paraguay</option>
                <option value="Perú">Perú</option>
                <option value="Polonia">Polonia</option>
                <option value="Portugal">Portugal</option>
                <option value="Reino Unido">Reino Unido</option>
                <option value="República Centroafricana">República Centroafricana</option>
                <option value="República Checa">República Checa</option>
                <option value="República del Congo">República del Congo</option>
                <option value="República Democrática del Congo">República Democrática del Congo</option>
                <option value="República Dominicana">República Dominicana</option>
                <option value="Ruanda">Ruanda</option>
                <option value="Rumanía">Rumanía</option>
                <option value="Rusia">Rusia</option>
                <option value="Samoa">Samoa</option>
                <option value="San Cristóbal y Nieves">San Cristóbal y Nieves</option>
                <option value="San Marino">San Marino</option>
                <option value="San Vicente y las Granadinas">San Vicente y las Granadinas</option>
                <option value="Santa Lucía">Santa Lucía</option>
                <option value="Santo Tomé y Príncipe">Santo Tomé y Príncipe</option>
                <option value="Senegal">Senegal</option>
                <option value="Serbia">Serbia</option>
                <option value="Seychelles">Seychelles</option>
                <option value="Sierra Leona">Sierra Leona</option>
                <option value="Singapur">Singapur</option>
                <option value="Siria">Siria</option>
                <option value="Somalia">Somalia</option>
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="Sudáfrica">Sudáfrica</option>
                <option value="Sudán">Sudán</option>
                <option value="Sudán del Sur">Sudán del Sur</option>
                <option value="Suecia">Suecia</option>
                <option value="Suiza">Suiza</option>
                <option value="Surinam">Surinam</option>
                <option value="Tailandia">Tailandia</option>
                <option value="Tanzania">Tanzania</option>
                <option value="Tayikistán">Tayikistán</option>
                <option value="Timor Oriental">Timor Oriental</option>
                <option value="Togo">Togo</option>
                <option value="Tonga">Tonga</option>
                <option value="Trinidad y Tobago">Trinidad y Tobago</option>
                <option value="Túnez">Túnez</option>
                <option value="Turkmenistán">Turkmenistán</option>
                <option value="Turquía">Turquía</option>
                <option value="Tuvalu">Tuvalu</option>
                <option value="Ucrania">Ucrania</option>
                <option value="Uganda">Uganda</option>
                <option value="Uruguay">Uruguay</option>
                <option value="Uzbekistán">Uzbekistán</option>
                <option value="Vanuatu">Vanuatu</option>
                <option value="Vaticano">Vaticano</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Yemen">Yemen</option>
                <option value="Yibuti">Yibuti</option>
                <option value="Zambia">Zambia</option>
                <option value="Zimbabue">Zimbabue</option>
              </select>

              <input type="text" placeholder="Nº Pasaporte (Adicional)" />
              <input type="date" placeholder="Fecha Emisión" />
              <input type="date" placeholder="Fecha Expiración" />

              <input type="text" placeholder="Nº Visa Turista (si aplica)" />
              <input type="date" placeholder="Fecha Emisión Visa" />
              <input type="date" placeholder="Fecha Expiración Visa" />

              <label>¿Requiere Consejos de Viaje?</label>
              <select>
                <option>Sí</option>
                <option>No</option>
              </select>
            </>
          ) : (
            <>
              <input type="text" placeholder="Nº RUT" />
              <input type="date" placeholder="Fecha Emisión RUT" />
              <input type="date" placeholder="Fecha Expiración RUT" />

              <label>¿Su destino requiere pasaporte?</label>
              <select value={requierePasaporte} onChange={handleRequierePasaporteChange}>
                <option>Sí</option>
                <option>No</option>
              </select>

              {requierePasaporte === 'Sí' && (
                <>
                  <input type="text" placeholder="Nº Pasaporte" />
                  <input type="date" placeholder="Fecha Emisión" />
                  <input type="date" placeholder="Fecha Expiración" />
                </>
              )}

              <input type="text" placeholder="Nº Visa Waiver (si aplica)" />
              <input type="date" placeholder="Fecha Emisión Visa" />
              <input type="date" placeholder="Fecha Expiración Visa" />

              <label>¿Requiere Consejos de Viaje?</label>
              <select>
                <option>Sí</option>
                <option>No</option>
              </select>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        className="boton-enviar"
        onClick={async () => {
            const data = {
            nombres: document.querySelector('input[placeholder="Nombres"]').value,
            apellidos: document.querySelector('input[placeholder="Apellidos"]').value,
            fecha_nacimiento: document.querySelector('input[placeholder="Fecha de Nacimiento"]').value,
            correo: document.querySelector('input[placeholder="Correo Electrónico"]').value,
            telefono: document.querySelector('input[placeholder="Número de Teléfono"]').value,
            nacionalidad: nacionalidad,
            tiene_rut: tieneRut,
            rut_numero: document.querySelector('input[placeholder="Nº RUT"]')?.value || '',
            rut_fecha_emision: document.querySelectorAll('input[type="date"]')[1]?.value || '',
            rut_fecha_expiracion: document.querySelectorAll('input[type="date"]')[2]?.value || '',
            requiere_pasaporte: requierePasaporte,
            pasaporte_numero: document.querySelector('input[placeholder="Nº Pasaporte"]')?.value || '',
            pasaporte_fecha_emision: document.querySelectorAll('input[type="date"]')[3]?.value || '',
            pasaporte_fecha_expiracion: document.querySelectorAll('input[type="date"]')[4]?.value || '',
            visa_waiver_numero: document.querySelector('input[placeholder="Nº Visa Waiver (si aplica)"]')?.value || '',
            visa_waiver_fecha_emision: document.querySelectorAll('input[type="date"]')[5]?.value || '',
            visa_waiver_fecha_expiracion: document.querySelectorAll('input[type="date"]')[6]?.value || '',
            consejos_viaje: document.querySelectorAll('select')[document.querySelectorAll('select').length - 1]?.value || ''
            };

           try {
            const response = await fetch('http://localhost:8000/guardar_cliente.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
                body: JSON.stringify(data),
            });

            const result = await response.json();
            alert(result.message);
            if (result.status === "success") {
            navigate("/seleccion-asientos");
            }
            } catch (error) {
            alert("Error al guardar datos");
            }
        }}
        >
        Enviar
        </button>
    </div>
  );
}

export default FormularioCliente;

