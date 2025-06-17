import React, { useState } from "react";
import { Navbar, Logo, Title, Input, Button } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const token = await signIn(email, senha);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-4">
        <div className="text-center">
          <Logo />
        </div>

        <div className="pt-6 pb-4">
          <Title title="Efetue seu login" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="pb-4">
            <Input
              label="Email"
              placeholder="Digite seu email..."
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="pb-4">
            <Input
              label="Senha"
              placeholder="Digite sua senha..."
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center my-4">
            <button
              type="button"
              className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
            >
              {/* Ícone Google */}
              <svg width="20" height="20" viewBox="0 0 48 48">
                <g>
                  <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                  <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 17.1 19.4 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"/>
                  <path fill="#FBBC05" d="M24 44c5.6 0 10.6-1.9 14.5-5.2l-6.7-5.5c-2 1.4-4.6 2.2-7.8 2.2-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C6.7 39.1 14.1 44 24 44z"/>
                  <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.2 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C17.4 41.9 20.5 44 24 44c5.6 0 10.6-1.9 14.5-5.2l-6.7-5.5c-2 1.4-4.6 2.2-7.8 2.2-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C6.7 39.1 14.1 44 24 44z"/>
                </g>
              </svg>
              Entrar com Google
            </button>
            <button
              type="button"
              className="flex items-center gap-2 border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition"
            >
              {/* Ícone LinkedIn */}
              <svg width="20" height="20" viewBox="0 0 32 32">
                <path fill="#0077B5" d="M29 0H3C1.3 0 0 1.3 0 3v26c0 1.7 1.3 3 3 3h26c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3zM9.4 27H5.3V12h4.1v15zm-2-17.1c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm19.6 17.1h-4.1v-7.2c0-1.7-.6-2.8-2.1-2.8-1.1 0-1.7.7-2 1.4-.1.3-.1.7-.1 1.1V27h-4.1s.1-13.7 0-15h4.1v2.1c.5-.8 1.4-2 3.5-2 2.6 0 4.5 1.7 4.5 5.3V27z"/>
              </svg>
              Entrar com LinkedIn
            </button>
          </div>
          {erro && <p style={{ color: "red" }}>{erro}</p>}

          <div className="text-center pt-4">
            <Button type="submit">Acessar</Button>
          </div>
        </form>

        <div className="text-center pt-8">
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Não possui uma conta? <strong>Registre-se</strong>
          </Link>
        </div>
      </div>
    </>
  );
}