"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

  return (
    <div className="flex flex-col h-screen">
      <Header title={rachaData.titulo} />
      <div className="flex flex-col flex-grow p-6 space-y-6 overflow-y-auto">
        <h2 className="text-xl font-semibold">Detalhes</h2>
        <div className="space-y-6">
          {rachaData.participantes.map((p) => (
            <div key={p.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span>{p.nome}</span>
                <span className="font-medium">
                  R$ {rachaData.valorPorPessoa.toFixed(2)}
                </span>
              </div>
              <div className="pl-4 text-sm text-gray-600 space-y-1 border-l-2 border-gray-200">
                {rachaData.itens.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>-{item.nome}:</span>
                    <span>
                      R${" "}
                      {(item.valor / rachaData.participantes.length).toFixed(2)}
                    </span>
                  </div>
                ))}
                {rachaData.incluiTaxa && (
                  <div className="flex justify-between">
                    <span>-Taxa de serviço (10%):</span>
                    <span>
                      R${" "}
                      {(
                        (rachaData.total -
                          rachaData.itens.reduce(
                            (sum, item) => sum + item.valor,
                            0
                          )) /
                        rachaData.participantes.length
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
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
    </div>
  );
}
