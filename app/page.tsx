import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 space-y-12">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src="/images/rachai-logo.png"
            alt="RachAí Logo"
            width={150}
            height={150}
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-[#1b4332]">RachAí</h1>
      </div>
      <Link href="/opcoes" className="w-full max-w-[200px]">
        <Button className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-semibold py-6 rounded-full">
          Entrar
        </Button>
      </Link>
    </div>
  );
}
