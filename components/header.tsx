import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function Header({ title, showBackButton = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        {showBackButton && (
          <Link href="/opcoes">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        )}
        <h1 className="text-lg font-medium">{title}</h1>
      </div>

      <div className="w-8 h-8 relative">
        <Image
          src="/images/rachai-logo.png"
          alt="RachAí Logo"
          width={32}
          height={32}
          className="object-contain"
        />
      </div>
    </header>
  );
}
