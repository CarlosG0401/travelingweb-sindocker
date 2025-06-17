import { useState } from "react";
import "./assets/styles/AdminLogin.css";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/login_admin.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // ✅ Guardamos el nombre del administrador en localStorage
        localStorage.setItem("admin_username", formData.username);

        // ✅ Redirigimos al panel de reportes
        navigate("/admin/reportes");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="login-admin-wrapper">
      <form className="login-admin-form" onSubmit={handleSubmit}>
        <h2>Ingreso Administrador</h2>

        {error && <p className="error-msg">{error}</p>}

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

