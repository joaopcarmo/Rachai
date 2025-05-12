"use client";

import { useEffect, useState } from "react";
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
  responsavelIds: number[];
}

interface RachaCalculado {
  titulo: string;
  participantes: Participante[];
  itens: Item[];
  incluiTaxa: boolean;
  data: string;
  total: number;
}

export default function TotalPage() {
  const router = useRouter();
  const [racha, setRacha] = useState<RachaCalculado | null>(null);
  const [valoresIndividuais, setValoresIndividuais] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    const data = localStorage.getItem("rachaCalculado");
    if (data) {
      const parsed = JSON.parse(data);
      setRacha(parsed);

      const valores: Record<number, number> = {};
      parsed.participantes.forEach((p: Participante) => (valores[p.id] = 0));

      parsed.itens.forEach((item: Item) => {
        const qtd = item.responsavelIds.length;
        if (qtd > 0) {
          const valorPorPessoa = item.valor / qtd;
          item.responsavelIds.forEach((id: number) => {
            valores[id] += valorPorPessoa;
          });
        }
      });

      if (parsed.incluiTaxa) {
        for (const id in valores) {
          valores[id] *= 1.1;
        }
      }

      setValoresIndividuais(valores);
    } else {
      router.push("/opcoes");
    }
  }, [router]);

  if (!racha) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Total por pessoa" />

      <div className="flex flex-col flex-grow p-6 space-y-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          Total geral: R$ {racha.total.toFixed(2)}
        </h2>

        {Object.entries(valoresIndividuais)
          .sort(([, a], [, b]) => b - a)
          .map(([id, valor]) => {
            const p = racha.participantes.find(
              (part) => part.id === Number(id)
            );
            return (
              <div
                key={id}
                className="flex justify-between items-center p-4 border rounded-lg"
              >
                <span>{p?.nome}</span>
                <span className="font-semibold">R$ {valor.toFixed(2)}</span>
              </div>
            );
          })}
      </div>

      <div className="p-6">
        <Button
          variant="outline"
          className="w-full mb-2"
          onClick={() => router.push("/detalhes")}
        >
          Ver detalhes da divisão
        </Button>
        <Button className="w-full" onClick={() => router.push("/opcoes")}>
          Novo Racha
        </Button>
      </div>
    </div>
  );
}
