import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 space-y-12">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-4">
  <Image
    src="/images/rachai-logo.png"
    alt="RachAí Logo"
    fill
    className="object-contain"
    priority
  />
</div>

      </div>
      <Link href="/opcoes" className="w-full max-w-[200px]">
        <Button className="w-full bg-[#1b4332] hover:bg-[#2d6a4f] text-white font-semibold py-6 rounded-full">
          Entrar
        </Button>
      </Link>
    </div>
  );
}
