# Roteiro de teste manual

## Preparação

Instale dependências, aplique a migração em Supabase dedicado, configure `.env.local` e crie um administrador conforme README. Use apenas contatos de teste sob seu controle. Execute `npm run dev`.

## Cálculos (4 horas, 3 drinks por pessoa)

1. **20 pessoas / aniversário:** petiscos básicos, bebidas sem álcool, nenhuma equipe/adicional. Comida 900 + bebida 360 = **R$ 1.260**.
2. **40 pessoas / happy hour:** petiscos premium, drinks clássicos, 1 bartender e 2 garçons, sem adicionais. 2.800 + 1.400 + 850 = **R$ 5.050**.
3. **100 pessoas / corporativo:** finger foods, drinks clássicos, bebidas sem álcool, 1 chef, 2 auxiliares, 3 bartenders, 5 garçons, bar e montagem. Comida 6.500; bebidas 5.300; equipe 3.240; adicionais 750; total **R$ 15.790**.
4. **5 convidados:** não avança; informa mínimo 10.
5. **350 convidados:** não avança; orienta contato direto para mais de 300.
6. **10 e 300 pessoas:** devem ser aceitas. Data passada/hoje, duração zero, nome vazio, WhatsApp inválido e falta de consentimento devem falhar.
7. Selecionar apenas bebidas e avançar sem gastronomia; desativar bar deve remover escolhas alcoólicas. Verificar 2/3/4/5/Livre e equipe acima de 4 horas.

## Persistência e WhatsApp em Supabase real (pendente de configuração)

- Concluir o formulário. Confirmar linha em `leads` antes de seguir para o WhatsApp.
- Conferir dados, valor, consentimento, status `novo` e timestamps.
- Conferir destinatário, acentos, data, local, restrições e itens na mensagem. Não é necessário enviar a mensagem real para testar o link.
- Com rede interrompida ou banco indisponível, nenhuma mensagem deve abrir; dados do formulário permanecem para nova tentativa.
- Repetir a mesma requisição com o mesmo UUID: deve existir uma única linha.
- Tentar enviar valor de total adulterado: o banco deve registrar o preço recalculado no servidor.
- Alterar `app_settings.accepting_quotes` para `false`: API deve recusar novos pedidos com mensagem amigável. Reativar após o teste.

## Administração em Supabase real (pendente de configuração)

- Sem login, `/admin`, `/admin/leads` e detalhes devem redirecionar ao login.
- Conta autenticada fora de `admin_users` não pode acessar leads; testar também diretamente pela API pública do Supabase.
- Entrar com administrador. Localizar lead criado, filtrar nome/status/datas, mudar ordenação e navegar páginas.
- Abrir detalhes. Conferir todos os dados e a estimativa registrada.
- Mudar status por todas as opções. Atualizar página e confirmar persistência.
- Ao fechar, conferir contagem, redução da receita potencial, inclusão nos próximos eventos e lembretes D−7, D−5, D−3, D−2, D−1, D0.
- Eventos de hoje, amanhã e próximos 7 dias devem possuir rótulos visíveis. Eventos passados fechados não aparecem nos próximos.
- Sair e tentar acessar novamente. Verificar que cache não expõe dados.

## Interface e acessibilidade

Verificar 360, 390, 768, 1024 e 1440 px em todas as etapas: sem rolagem horizontal, sobreposição ou botão inacessível. Tabela administrativa pode rolar dentro de seu contêiner.

Navegar somente com Tab/Shift+Tab/Enter/Espaço. Foco visível; título recebe foco ao avançar; labels e erros identificáveis; sem dependência exclusiva de cor. Testar zoom 200%, leitor de tela e dispositivo móvel real. Axe não substitui avaliação humana.

## Verificação automatizada

`npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run test:e2e` e `bash scripts/test-database.sh`.

Os testes SQL verificam PostgreSQL/RLS; os testes unitários de API usam banco controlado. Autenticação e integração com um Supabase hospedado não foram verificadas nesta entrega por falta de configuração real.
