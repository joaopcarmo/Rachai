"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

interface Participante {
  id: number;
  nome: string;
}

interface Item {
  id: number;
  nome: string;
  valor: number;
  responsavelIds: number[];
}

interface RachaCalculado {
  titulo: string;
  participantes: Participante[];
  itens: Item[];
  data: string;
  total: number;
  incluiTaxa: boolean;
}

export default function DetalhesPage() {
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

  if (!rachaData) {
    return <div className="p-6">Carregando...</div>;
  }

  const calcularValorTaxa = () => {
    const totalBruto = rachaData.itens.reduce(
      (sum, item) => sum + item.valor,
      0
    );
    return rachaData.incluiTaxa ? totalBruto * 0.1 : 0;
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title={rachaData.titulo} />
      <div className="flex flex-col flex-grow p-6 space-y-6 overflow-y-auto">
        <h2 className="text-xl font-semibold">Detalhes dos Itens</h2>

        <div className="space-y-4">
          {rachaData.itens.map((item) => (
            <div key={item.id} className="p-4 border rounded-lg">
              <div className="flex justify-between font-medium">
                <span>{item.nome}</span>
                <span>R$ {item.valor.toFixed(2)}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Dividido entre:{" "}
                {item.responsavelIds
                  .map(
                    (id) =>
                      rachaData.participantes.find((p) => p.id === id)?.nome
                  )
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
          ))}

          {rachaData.incluiTaxa && (
            <div className="p-4 border rounded-lg bg-yellow-50">
              <span className="text-sm text-gray-700">
                Foi adicionada uma taxa de 10% (R${" "}
                {calcularValorTaxa().toFixed(2)}) ao total.
              </span>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between font-semibold">
              <span>Total com taxa:</span>
              <span>R$ {rachaData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full" onClick={() => router.push("/total")}>
            Ver total por pessoa
          </Button>
        </div>
      </div>
    </div>
  );
}
