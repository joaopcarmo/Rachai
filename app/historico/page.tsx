"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Header } from "@/components/header";
import { PencilLine } from "lucide-react";

interface HistoricoItem {
  id: number;
  titulo: string;
  total: number;
  data: string;
}

export default function HistoricoPage() {
  const router = useRouter();
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("historico");
    if (data) {
      setHistorico(JSON.parse(data));
    }
  }, []);

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Histórico" />
      <div className="flex flex-col flex-grow p-6 space-y-4 overflow-y-auto">
        {historico.length > 0 ? (
          historico.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{item.titulo}</h3>
                    <Button variant="ghost" size="icon" className="ml-1">
                      <PencilLine className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatarData(item.data)}
                  </p>
                </div>
                <span className="font-medium">R$ {item.total.toFixed(2)}</span>
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
