import type { Metadata } from "next";
import Link from "next/link";
import { Wine } from "lucide-react";
import { brand } from "@/config/brand";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: `${brand.name} | Buffet e experiências gastronômicas`,
  description: brand.description,
  openGraph: {
    title: brand.name,
    description: brand.description,
    locale: "pt_BR",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip" href="#main">
          Ir para o conteúdo
        </a>
        <header className="header">
          <Link href="/" className="brand">
            <Wine aria-hidden="true" />
            <span>
              {brand.shortName}
              <small>EXPERIÊNCIAS GASTRONÔMICAS</small>
            </span>
          </Link>
          <nav aria-label="Principal">
            <Link href="/#pacotes">Pacotes</Link>
            <Link href="/montar-evento" className="button small">
              Montar meu evento
            </Link>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer>
          <Link className="brand" href="/">
            {brand.shortName}
          </Link>
          <p>Boa comida. Bons encontros. Memórias à mesa.</p>
          <div>
            <Link href="/politica-de-privacidade">Privacidade</Link>
            <Link href="/admin">Área administrativa</Link>
          </div>
          <small>
            © {new Date().getFullYear()} {brand.name}
          </small>
        </footer>
      </body>
    </html>
  );
}
