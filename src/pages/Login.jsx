import React, { useState } from "react";
import { Input, Button } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }
    setErro("");
    try {
      const token = await signIn(email, senha);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login com Google não implementado.");
  };

  const handleLinkedinLogin = () => {
    console.log("Login com LinkedIn não implementado.");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full p-6 shadow border rounded-md">
        <h1 className="text-xl font-bold text-center mb-6">Efetue seu login</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block font-medium mb-1">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-400 px-3 py-2 rounded"
              required
            />
          </div>

          <div className="text-sm text-left mb-4">
            <Link to="/esqueci-senha" className="text-blue-600 underline">
              Esqueci minha senha
            </Link>
          </div>

          <div className="flex gap-3 mb-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-1/2 border border-black text-black bg-white rounded py-2 font-medium gap-2"
            >
              <FaGoogle size={16} />
              Google
            </button>

            <button
              type="button"
              onClick={handleLinkedinLogin}
              className="flex items-center justify-center w-1/2 border border-black text-black bg-white rounded py-2 font-medium gap-2"
            >
              <FaLinkedinIn size={16} />
              LinkedIn
            </button>
          </div>

          {erro && (
            <p className="text-red-600 text-sm font-semibold text-center mb-4">
              {erro}
            </p>
          )}

          <div className="mb-4">
            <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
              Acessar
            </Button>
          </div>
        </form>

        <div className="text-center text-sm">
          Não possui uma conta?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Registre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
