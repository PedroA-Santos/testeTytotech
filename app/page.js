"use client"; 
import useLogin from "./hooks/useLogin";

//ESTÁ É A PAGINA DE LOGIN QUE CONSUMIRA O HOOK USELOGIN PARA LOGAR O USUÁRIO

export default function Home() {

  const { usuario, loading, error, success, handleChange, handleLogin } = useLogin();


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={usuario.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Digite sua senha"
          value={usuario.senha}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
