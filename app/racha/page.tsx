"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/header";
import { Trash2, Plus } from "lucide-react";

interface Item {
  id: number;
  nome: string;
  valor: number;
}

interface RachaData {
  titulo: string;
  participantes: { id: number; nome: string }[];
  itens: Item[];
  data: string;
}

export default function RachaPage() {
  const router = useRouter();
  const [rachaData, setRachaData] = useState<RachaData | null>(null);
  const [novoItem, setNovoItem] = useState("");
  const [novoValor, setNovoValor] = useState("");
  const [incluirTaxa, setIncluirTaxa] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("rachaAtual");
    if (data) {
      setRachaData(JSON.parse(data));
    } else {
      router.push("/opcoes");
    }
  }, [router]);

  const adicionarItem = () => {
    if (
      novoItem.trim() &&
      novoValor.trim() &&
      !isNaN(Number.parseFloat(novoValor))
    ) {
      if (rachaData) {
        const novosItens = [
          ...rachaData.itens,
          {
            id: Date.now(),
            nome: novoItem.trim(),
            valor: Number.parseFloat(novoValor),
          },
        ];

        const novoRachaData = {
          ...rachaData,
          itens: novosItens,
        };

        setRachaData(novoRachaData);
        localStorage.setItem("rachaAtual", JSON.stringify(novoRachaData));
        setNovoItem("");
        setNovoValor("");
      }
    }
  };

  const removerItem = (id: number) => {
    if (rachaData) {
      const novosItens = rachaData.itens.filter((item) => item.id !== id);
      const novoRachaData = {
        ...rachaData,
        itens: novosItens,
      };

      setRachaData(novoRachaData);
      localStorage.setItem("rachaAtual", JSON.stringify(novoRachaData));
    }
  };

  const calcularTotal = () => {
    if (rachaData) {
      let total = rachaData.itens.reduce((sum, item) => sum + item.valor, 0);
      if (incluirTaxa) {
        total *= 1.1; // 10% de taxa
      }
      return total;
    }
    return 0;
  };

  const handleCalcular = () => {
    if (rachaData && rachaData.itens.length > 0) {
      const total = calcularTotal();
      const valorPorPessoa = total / rachaData.participantes.length;

      // Armazenar os valores calculados
      const calculoData = {
        ...rachaData,
        total,
        incluiTaxa: incluirTaxa,
        valorPorPessoa,
      };

      localStorage.setItem("rachaCalculado", JSON.stringify(calculoData));
      router.push("/total");
    }
  };

  if (!rachaData) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title={rachaData.titulo} />

      <div className="flex flex-col flex-grow p-6 space-y-6 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex items-center">
            <span>Adicionar Item +</span>
          </div>

          <div className="flex space-x-2">
            <Input
              value={novoItem}
              onChange={(e) => setNovoItem(e.target.value)}
              placeholder="Item..."
              className="flex-grow"
              onKeyDown={(e) => e.key === "Enter" && adicionarItem()}
            />
            <Input
              value={novoValor}
              onChange={(e) =>
                setNovoValor(
                  e.target.value.replace(/[^0-9.,]/g, "").replace(",", ".")
                )
              }
              placeholder="$"
              className="w-20"
              type="text"
              inputMode="decimal"
              onKeyDown={(e) => e.key === "Enter" && adicionarItem()}
            />
            <Button onClick={adicionarItem} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2 mt-6">
            <h3 className="font-medium">Itens</h3>

            {rachaData.itens.length > 0 ? (
              <div className="space-y-2">
                {rachaData.itens.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 border rounded-lg"
                  >
                    <span>{item.nome}</span>
                    <div className="flex items-center space-x-2">
                      <span>R$ {item.valor.toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removerItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                Nenhum item adicionado
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="incluir-taxa"
              checked={incluirTaxa}
              onCheckedChange={(checked) => setIncluirTaxa(checked === true)}
            />
            <label htmlFor="incluir-taxa" className="text-sm">
              Incluir 10%
            </label>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Button
          className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white font-semibold py-4 rounded-full"
          onClick={handleCalcular}
          disabled={rachaData.itens.length === 0}
        >
          Calcular
        </Button>
      </div>
    </div>
  );
}
