"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { UserCircle, PencilLine, UserPlus } from "lucide-react";

export default function CriarRachaPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("Pizza Sexta");
  const [participantes, setParticipantes] = useState([
    { id: 1, nome: "Miguel Araújo" },
    { id: 2, nome: "João Pedro" },
    { id: 3, nome: "Nathan Godinho" },
  ]);
  const [novoParticipante, setNovoParticipante] = useState("");
  const [editando, setEditando] = useState(false);

  const adicionarParticipante = () => {
    if (novoParticipante.trim()) {
      setParticipantes([
        ...participantes,
        { id: Date.now(), nome: novoParticipante.trim() },
      ]);
      setNovoParticipante("");
    }
  };

  const handleRachar = () => {
    if (participantes.length > 0) {
      // Armazenar dados no localStorage para uso nas próximas telas
      localStorage.setItem(
        "rachaAtual",
        JSON.stringify({
          titulo,
          participantes,
          itens: [],
          data: new Date().toISOString(),
        })
      );
      router.push("/racha");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Novo Racha" />

      <div className="flex flex-col flex-grow p-6 space-y-6">
        <div className="flex items-center justify-between">
          {editando ? (
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="text-xl font-semibold"
              onBlur={() => setEditando(false)}
              autoFocus
            />
          ) : (
            <h2 className="text-xl font-semibold">{titulo}</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setEditando(!editando)}
          >
            <PencilLine className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <span>Adicionar Integrante</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => {
                setNovoParticipante("");
                document.getElementById("novo-participante")?.focus();
              }}
            >
              <UserPlus className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex space-x-2">
            <Input
              id="novo-participante"
              value={novoParticipante}
              onChange={(e) => setNovoParticipante(e.target.value)}
              placeholder="Nome do participante"
              onKeyDown={(e) => e.key === "Enter" && adicionarParticipante()}
            />
            <Button onClick={adicionarParticipante}>Adicionar</Button>
          </div>

          <div className="space-y-3 mt-4">
            {participantes.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 border rounded-lg"
              >
                <div className="flex items-center">
                  <UserCircle className="w-5 h-5 mr-2" />
                  <span>{p.nome}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setParticipantes(
                      participantes.filter((part) => part.id !== p.id)
                    )
                  }
                >
                  <span className="sr-only">Remover</span>
                  &times;
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <Button
          className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-4 rounded-full"
          onClick={handleRachar}
          disabled={participantes.length === 0}
        >
          Rachar
        </Button>
      </div>
    </div>
  );
}
