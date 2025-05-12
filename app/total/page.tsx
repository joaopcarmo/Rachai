"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";

interface Participante {
  id: number;
  nome: string;
}

interface Item {
  id: number;
  nome: string;
  valor: number;
}

interface RachaCalculado {
  titulo: string;
  participantes: Participante[];
  itens: Item[];
  data: string;
  total: number;
  incluiTaxa: boolean;
  valorPorPessoa: number;
}

export default function TotalPage() {
  const router = useRouter();
  const [rachaData, setRachaData] = useState<RachaCalculado | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("rachaCalculado");
    if (data) {
      setRachaData(JSON.parse(data));
    } else {
      router.push("/opcoes");
    }
  }, [router]);

  const salvarRacha = () => {
    if (rachaData) {
      // Salvar no histórico
      const historico = JSON.parse(localStorage.getItem("historico") || "[]");
      historico.push({
        ...rachaData,
        id: Date.now(),
        data: new Date().toISOString(),
      });
      localStorage.setItem("historico", JSON.stringify(historico));

      // Limpar dados do racha atual
      localStorage.removeItem("rachaAtual");
      localStorage.removeItem("rachaCalculado");
      router.push("/opcoes");
    }
  };

  const verDetalhes = () => {
    router.push("/detalhes");
  };

  if (!rachaData) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title={rachaData.titulo} />
      <div className="flex flex-col flex-grow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-center">Total</h2>
        <div className="space-y-4 mt-4">
          {rachaData.participantes.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-2">
              <span>{p.nome}</span>
              <span className="font-medium">
                R$ {rachaData.valorPorPessoa.toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total:</span>
              <span>R$ {rachaData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-3">
        <Button
          className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-4 rounded-full"
          onClick={salvarRacha}
        >
          Salvar
        </Button>
        <Button
          variant="outline"
          className="w-full border-[#4CAF50] text-[#4CAF50] font-semibold py-4 rounded-full"
          onClick={verDetalhes}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}
