import { useState } from "react";
import "./assets/styles/AdminLogin.css";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/reportes"); 
  };

  return (
    <div className="login-admin-wrapper">
      <form className="login-admin-form" onSubmit={handleSubmit}>
        <h2>Ingreso Administrador</h2>
        
        <label htmlFor="username">Usuario</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Ingrese su usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Ingrese su contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-login">Ingresar</button>
      </form>
    </div>
  );
}
