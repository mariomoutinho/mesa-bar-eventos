import { Builder } from "@/components/event-builder/builder";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ pacote?: string }>;
}) {
  const { pacote } = await searchParams;
  return (
    <div className="container">
      <p className="eyebrow">SEU PRÓXIMO BOM ENCONTRO</p>
      <h1 className="page-title">Vamos montar seu evento?</h1>
      <p>Escolha os detalhes. A estimativa acompanha você.</p>
      <Builder packageId={pacote} />
    </div>
  );
}
