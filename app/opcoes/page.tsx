import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/header";

export default function OpcoesPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header title="RachAí" showBackButton={false} />
      <div className="flex flex-col flex-grow p-6 space-y-6">
        <Link href="/criar-racha" className="w-full">
          <Card className="bg-[#1b4332] hover:bg-[#2d6a4f] text-white p-6 rounded-xl transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Criar novo racha</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Card>
        </Link>
        <Link href="/historico" className="w-full">
          <Card className="bg-gray-200 hover:bg-gray-300 p-6 rounded-xl transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Histórico recente</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
