"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container">
      <h1 className="page-title">Não foi possível carregar os dados.</h1>
      <p>
        Tente novamente. Se o problema continuar, verifique a configuração do
        banco.
      </p>
      <button className="button" onClick={reset}>
        Tentar novamente
      </button>
    </div>
  );
}
