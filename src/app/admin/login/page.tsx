import { LoginForm } from "@/components/admin/login-form";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;
  return (
    <div className="container narrow">
      <p className="eyebrow">ÁREA ADMINISTRATIVA</p>
      <h1 className="page-title">Bem-vindo à mesa.</h1>
      <p>Acesse os orçamentos e acompanhe seus próximos eventos.</p>
      {erro && (
        <p className="alert">Esta conta não possui acesso administrativo.</p>
      )}
      <LoginForm />
    </div>
  );
}
