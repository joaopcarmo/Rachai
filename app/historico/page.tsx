"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PencilLine } from "lucide-react";

interface Participante {
  id: number;
  nome: string;
}

interface Item {
  id: number;
  nome: string;
  valor: number;
  responsavelIds?: number[];
}

interface RachaCalculado {
  id?: number;
  titulo: string;
  participantes?: Participante[];
  itens?: Item[];
  data: string;
  total: number;
  incluiTaxa?: boolean;
  origem?: "historico" | "atual";
}

export default function HistoricoPage() {
  const router = useRouter();
  const [historico, setHistorico] = useState<RachaCalculado[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("historico");
    if (data) {
      try {
        const parsed = JSON.parse(data) as RachaCalculado[];
        setHistorico(parsed);
      } catch (e) {
        console.error("Erro ao carregar histórico:", e);
      }
    }
  }, []);

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const abrirDetalhes = (racha: RachaCalculado) => {
    const dadosComOrigem: RachaCalculado = {
      ...racha,
      origem: "historico",
      itens: racha.itens || [],
      participantes: racha.participantes || [],
      incluiTaxa: racha.incluiTaxa ?? false,
    };
    localStorage.setItem("rachaCalculado", JSON.stringify(dadosComOrigem));
    router.push("/detalhes");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Histórico" />
      <div className="flex flex-col flex-grow p-6 space-y-4 overflow-y-auto">
        {historico.length > 0 ? (
          historico.map((racha) => (
            <Card
              key={racha.id}
              className="p-4 hover:cursor-pointer hover:bg-gray-100"
              onClick={() => abrirDetalhes(racha)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium mr-2">{racha.titulo}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirDetalhes(racha);
                      }}
                    >
                      <PencilLine className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatarData(racha.data)}
                  </p>
                </div>
                <span className="font-medium">R$ {racha.total.toFixed(2)}</span>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p>Nenhum histórico encontrado</p>
            <Button
              variant="link"
              onClick={() => router.push("/opcoes")}
              className="mt-2"
            >
              Voltar para opções
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
