# Verificação realizada — 1 de outubro de 2026

- `npm run lint`: sem erros ou avisos na rodada final.
- `npm run typecheck`: sem erros.
- `npm run build`: build de produção concluído, com rotas administrativas dinâmicas.
- `npm run test`: 42 testes aprovados (preços, validação, WhatsApp e endpoint).
- `npm run test:e2e`: 11 testes aprovados, com fluxo completo em 360, 390, 768, 1024 e 1440 px.
- Axe: nenhuma violação detectada nos critérios automatizados WCAG 2 A/AA, 2.1 AA e 2.2 AA aplicados à landing e à estimativa. Isso não equivale a certificação de acessibilidade.
- PostgreSQL 16 temporário: migração, RLS, exclusão de acesso anônimo/não administrador, atualização de status e métricas verificadas.
- Capturas de tela reais em `docs/screenshots`, revisadas visualmente em desktop e mobile.

A integração Supabase hospedada não foi configurada nesta sessão: login real, persistência pela API do projeto e fluxo administrativo autenticado precisam do roteiro manual após configurar as variáveis. Não há dados comerciais fictícios no painel.

Testes de API usam respostas controladas do adaptador de persistência, enquanto o SQL é executado em PostgreSQL real isolado. Testes públicos confirmam que nenhuma requisição de salvamento é feita antes da confirmação explícita e que falhas de configuração não abrem o WhatsApp.
