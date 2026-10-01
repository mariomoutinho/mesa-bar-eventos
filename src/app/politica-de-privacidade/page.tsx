import { brand } from "@/config/brand";
import { whatsappUrl } from "@/lib/whatsapp";
export default function Page() {
  return (
    <article className="container narrow privacy">
      <p className="eyebrow">TRANSPARÊNCIA À MESA</p>
      <h1 className="page-title">Política de Privacidade</h1>
      <p>Última atualização: 1 de outubro de 2026.</p>
      <h2>Quais dados coletamos</h2>
      <p>
        {brand.name} recebe seu nome, WhatsApp, e-mail opcional e as informações
        do evento: data, local, convidados, escolhas de cardápio, equipe e
        serviços. Também registramos seu consentimento e a estimativa
        apresentada.
      </p>
      <h2>Como usamos suas informações</h2>
      <p>
        Usamos esses dados para preparar seu orçamento, verificar
        disponibilidade e entrar em contato sobre o evento. Evite incluir
        informações pessoais de convidados nas observações. Restrições
        alimentares podem ser descritas de forma geral, sem identificar pessoas.
      </p>
      <h2>Compartilhamento e armazenamento</h2>
      <p>
        Seus dados não serão vendidos. O armazenamento usa a infraestrutura do
        Supabase, e apenas administradores autorizados têm acesso aos
        orçamentos. Ao continuar para o WhatsApp, você compartilha a mensagem
        com esse serviço, sujeito à política de privacidade dele.
      </p>
      <h2>Seus dados, sua escolha</h2>
      <p>
        Você pode solicitar acesso, correção ou exclusão dos dados pelo mesmo
        WhatsApp usado no atendimento, informando que se trata de uma
        solicitação de privacidade. Os dados são mantidos enquanto necessários
        ao atendimento e às obrigações aplicáveis.
      </p>
      {brand.whatsapp && (
        <a
          className="button"
          href={whatsappUrl(
            brand.whatsapp,
            "Olá! Quero fazer uma solicitação sobre meus dados pessoais.",
          )}
        >
          Solicitar atendimento sobre privacidade
        </a>
      )}
      <h2>Cookies</h2>
      <p>
        A área administrativa utiliza cookies necessários para autenticação.
        Este MVP não utiliza cookies de publicidade ou ferramentas de analytics.
      </p>
    </article>
  );
}
