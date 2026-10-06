import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Username atau password salah.");
        return;
      }

      // Simpan data admin yang berhasil login
      localStorage.setItem(
        "admin",
        JSON.stringify(data.admin)
      );

      // Login berhasil → Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error login:", error);

      setError(
        "Tidak dapat terhubung ke server. Pastikan backend sedang berjalan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* BACKGROUND */}
      <div className="login-background" />

      {/* LOGIN CARD */}
      <div className="login-card">
        {/* LOGO */}
        <div className="login-logo">
          <img src="/Logo-Digi.png" alt="Digi" />
        </div>

        {/* FORM */}
        <form className="login-form" onSubmit={handleLogin}>
          {/* USERNAME */}
          <div className="login-field">
            <img
              src="/user-login.svg"
              alt=""
              className="login-field-icon"
            />

            <div className="login-input-wrapper">
              <input
                type="text"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="login-field">
            <img
              src="/password-login.svg"
              alt=""
              className="login-field-icon password-icon"
            />

            <div className="login-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                <img
                  src={
                    showPassword
                      ? "/eye-password-open.svg"
                      : "/eye-password.svg"
                  }
                  alt=""
                />
              </button>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "LOADING..." : "LOGIN"}
          </button>
        </form>

        {/* COPYRIGHT */}
        <p className="login-copyright">
          Copyright © 2025 PT Digi Tekno Indonesia
        </p>
      </div>
    </div>
  );
}

export default Login;