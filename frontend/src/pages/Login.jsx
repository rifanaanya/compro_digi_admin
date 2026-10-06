import { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        },
      );

      setMessage(response.data.message);

      console.log("Admin berhasil login:", response.data.admin);
    } catch (error) {
      setMessage(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div>
      <h1>Login Admin Digi</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">LOGIN</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
