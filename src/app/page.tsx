import Image from "next/image";
import { gallery } from "@/config/gallery";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  UtensilsCrossed,
  Wine,
  Heart,
  ArrowRight,
} from "lucide-react";
import { packages, food, drinks, staff, extras } from "@/config/pricing";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">FEITO PARA CELEBRAR, DO SEU JEITO</p>
          <h1>
            Seu evento.
            <br />
            Seu cardápio.
            <br />
            <em>Sua experiência.</em>
          </h1>
          <p className="intro">
            Monte uma experiência gastronômica personalizada para seu evento e
            receba uma estimativa em poucos minutos.
          </p>
          <div className="actions">
            <Link className="button" href="/montar-evento">
              Montar meu evento <ArrowUpRight size={19} />
            </Link>
            <Link className="text-link" href="#pacotes">
              Conhecer os pacotes <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-note">
            <span>10 a 300 convidados</span>
            <span>Personalizado para você</span>
          </div>
        </div>
        <div className="hero-art">
          <Image
            src={gallery[6].src}
            alt={gallery[6].alt}
            fill
            sizes="(max-width: 767px) 90vw, 45vw"
            preload
            className="hero-photo"
          />
          <span className="art-caption">
            O EXTRAORDINÁRIO
            <br />
            COMEÇA À MESA.
          </span>
          <div className="art-label">
            <Wine size={26} />
            <span>
              Um brinde aos
              <br />
              <strong>bons encontros.</strong>
            </span>
          </div>
        </div>
      </section>
      <section className="strip">
        <span>
          <UtensilsCrossed />
          Gastronomia com cuidado
        </span>
        <span>
          <Wine />
          Bar com personalidade
        </span>
        <span>
          <Heart />
          Hospitalidade em cada detalhe
        </span>
      </section>
      <section className="section" id="como-funciona">
        <p className="eyebrow">SIMPLES DO PRIMEIRO AO ÚLTIMO PASSO</p>
        <h2>
          Você imagina.
          <br />
          <em>A gente prepara.</em>
        </h2>
        <div className="grid three">
          {[
            "Conte sobre seu evento",
            "Escolha comida, bebidas e serviços",
            "Receba uma estimativa e fale conosco",
          ].map((t, i) => (
            <article className="step-card" key={t}>
              <span className="step-number">0{i + 1}</span>
              <h3>{t}</h3>
              <p>
                {
                  [
                    "Uma data especial, o lugar e as pessoas que você quer por perto.",
                    "Combine sabores e escolha o apoio que faz sentido para você.",
                    "Veja o valor inicial e converse com nossa equipe pelo WhatsApp.",
                  ][i]
                }
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="occasions section">
        <div>
          <p className="eyebrow">HÁ SEMPRE UM BOM MOTIVO</p>
          <h2>
            Para todos os seus
            <br />
            <em>bons momentos.</em>
          </h2>
        </div>
        <div className="occasion-grid">
          {gallery.map((occasion, i) => (
            <Link
              className="occasion-card"
              href="/montar-evento"
              key={occasion.label}
            >
              <div className="occasion-photo">
                <Image
                  src={occasion.src}
                  alt={occasion.alt}
                  fill
                  sizes="(max-width: 540px) 90vw, (max-width: 1100px) 44vw, 22vw"
                />
              </div>
              <div className="occasion-caption">
                <span className="occasion-number">0{i + 1}</span>
                <h3>{occasion.label}</h3>
                <ArrowUpRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section" id="pacotes">
        <p className="eyebrow">UM PONTO DE PARTIDA, MIL POSSIBILIDADES</p>
        <h2>
          Escolha o clima.
          <br />
          <em>Personalize os detalhes.</em>
        </h2>
        <p>Comece com um pacote e ajuste tudo no configurador.</p>
        <div className="grid four">
          {packages.map((p, i) => (
            <article
              className={`package ${i === 1 ? "featured" : ""}`}
              key={p.id}
            >
              <span className="eyebrow">EXPERIÊNCIA 0{i + 1}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <ul>
                {[
                  [food, p.food],
                  [drinks, p.drinks],
                  [staff, p.staff],
                  [extras, p.extras],
                ].flatMap(([catalog, ids]) =>
                  (catalog as typeof food)
                    .filter((x) => (ids as string[]).includes(x.id))
                    .map((x) => (
                      <li key={x.label}>
                        <Check size={15} />
                        {x.label}
                      </li>
                    )),
                )}
              </ul>
              <Link className="button" href={`/montar-evento?pacote=${p.id}`}>
                Montar este evento <ArrowUpRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="closing">
        <Image
          src={gallery[3].src}
          alt=""
          fill
          sizes="100vw"
          className="closing-photo"
        />
        <div className="closing-content">
          <p className="eyebrow">O PRÓXIMO ENCONTRO COMEÇA AQUI</p>
          <h2>
            Vamos criar uma
            <br />
            <em>boa memória?</em>
          </h2>
          <Link className="button light" href="/montar-evento">
            Montar meu evento <ArrowUpRight size={18} />
          </Link>
          <p>
            Estimativa inicial, sem compromisso. Atendimento humano no
            fechamento.
          </p>
        </div>
      </section>
    </>
  );
}
