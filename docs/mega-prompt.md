# MEGA PROMPT — MVP DE BUFFET / COZINHA PARA EVENTOS

Quero que você atue como um engenheiro de software full stack sênior, arquiteto de software, product designer e especialista em UX.

Sua missão é construir um MVP completo e funcional de uma plataforma digital para contratação de buffet, cozinha e bar para eventos.

Não quero apenas protótipos ou telas estáticas.

Quero uma aplicação real, executável, responsiva, com banco de dados, regras de negócio, formulário público, cálculo de orçamento estimado, geração de mensagem para WhatsApp e painel administrativo.

---

# 1. CONTEXTO DO NEGÓCIO

A aplicação será utilizada por um buffet/cozinha móvel que atende eventos particulares e corporativos.

A proposta é permitir que uma pessoa configure sua experiência gastronômica antes de entrar em contato com o buffet.

O cliente deverá conseguir informar:

- tipo do evento;
- quantidade de convidados;
- data;
- duração;
- localização;
- tipo de comida;
- petiscos;
- pratos;
- drinks;
- bebidas sem álcool;
- quantidade de profissionais;
- serviços adicionais.

Ao final, a aplicação deverá apresentar uma estimativa inicial de preço.

Depois disso, o cliente poderá solicitar o orçamento definitivo pelo WhatsApp.

O fechamento da venda continuará sendo manual no MVP.

---

# 2. PROBLEMA QUE O PRODUTO RESOLVE

Organizar alimentação e bebidas para um evento geralmente exige:

- procurar fornecedores;
- trocar diversas mensagens;
- explicar repetidamente quantidade de pessoas;
- informar data e endereço;
- solicitar cardápios;
- perguntar preços;
- esperar orçamento;
- escolher profissionais;
- calcular bebida;
- calcular quantidade de comida.

A aplicação deverá reduzir essa fricção.

A pessoa deverá conseguir configurar o evento antes de falar com o buffet.

---

# 3. TESE DO MVP

A principal hipótese que o MVP deverá testar é:

> Pessoas organizando pequenos e médios eventos preferem configurar previamente comida, bebidas e serviços, visualizar uma estimativa de preço e somente depois entrar em contato com o buffet.

Hipóteses secundárias:

H1 — Clientes valorizam visualizar uma estimativa antes de conversar com um vendedor.

H2 — Clientes gostam de personalizar comida, bebidas e equipe.

H3 — Pacotes pré-configurados reduzem a dificuldade de escolha.

H4 — Mostrar uma estimativa imediatamente aumenta a quantidade de solicitações de orçamento.

H5 — Enviar automaticamente os dados do evento para o WhatsApp reduz a fricção comercial.

---

# 4. OBJETIVO DO MVP

Construir uma aplicação com quatro áreas principais:

1. Landing page pública;
2. Configurador de evento;
3. Solicitação de orçamento via WhatsApp;
4. Painel administrativo.

Não criar marketplace.

Não integrar pagamento neste momento.

Não construir ERP.

Não criar sistema complexo de logística.

Não criar sistema de folha de pagamento.

Não implementar funcionalidades que não sejam necessárias para validar a tese principal.

---

# 5. STACK TECNOLÓGICA

Utilize preferencialmente:

```text
Next.js
TypeScript
React
Tailwind CSS
PostgreSQL
Supabase
Supabase Auth
Zod
React Hook Form
Lucide Icons
```

Use Next.js com App Router.

Utilize TypeScript estrito.

Não utilize JavaScript puro quando TypeScript puder ser utilizado.

O Supabase deverá ser utilizado para:

```text
Banco PostgreSQL
Autenticação administrativa
Persistência de leads
Persistência dos eventos
Persistência das configurações
```

Não exponha Service Role Key no frontend.

Variáveis sensíveis devem existir somente em:

```text
.env.local
```

Crie:

```text
.env.example
```

com os nomes das variáveis necessárias, mas sem valores reais.

Nunca versione:

```text
tokens
senhas
API keys
Service Role Keys
credenciais
```

---

# 6. NOME PROVISÓRIO

Utilize provisoriamente:

```text
Mesa & Bar Eventos
```

Mas organize o projeto para que o nome seja facilmente alterado depois.

Evite espalhar strings do nome da empresa por dezenas de componentes.

Centralize informações da marca em um arquivo de configuração.

Exemplo:

```text
src/config/brand.ts
```

---

# 7. IDENTIDADE VISUAL

Quero uma identidade sofisticada, moderna e gastronômica.

Evite aparência genérica de template SaaS.

Referências conceituais:

```text
gastronomia
eventos privados
coquetelaria
rooftop
experiência gastronômica
hospitalidade
jantares
celebrações
```

Paleta sugerida:

```text
Fundo principal:
#FAF8F4

Texto:
#211F1C

Destaque vinho:
#722F37

Dourado discreto:
#B28A52

Cinza:
#6B6862

Branco:
#FFFFFF
```

Não exagere no dourado.

O visual deve transmitir:

```text
elegância
qualidade
gastronomia
confiança
simplicidade
```

---

# 8. DESIGN UNIVERSAL

A aplicação deve seguir princípios de design universal.

Ela deve proporcionar uma boa experiência para o maior número possível de usuários.

Implementar:

- navegação por teclado;
- contraste adequado;
- labels em todos os campos;
- estados de foco visíveis;
- botões grandes;
- áreas de clique confortáveis;
- mensagens de erro compreensíveis;
- linguagem simples;
- responsividade;
- não depender exclusivamente de cores;
- HTML semântico;
- aria-label quando necessário;
- textos legíveis;
- tamanho mínimo de fonte adequado;
- formulários utilizáveis no celular.

Utilize como referência WCAG 2.2 AA sempre que razoavelmente possível.

---

# 9. RESPONSIVIDADE

A aplicação deve funcionar corretamente em:

```text
smartphones
tablets
notebooks
desktops
```

Priorize experiência mobile-first no configurador.

Testar especialmente larguras aproximadas:

```text
360px
390px
768px
1024px
1440px
```

Não permitir:

```text
scroll horizontal
elementos cortados
textos sobrepostos
botões inacessíveis
cards quebrados
```

---

# 10. LANDING PAGE

Criar rota:

```text
/
```

A landing page deverá ter as seguintes seções.

---

## HERO

Título:

```text
Seu evento. Seu cardápio. Sua experiência.
```

Subtítulo:

```text
Monte uma experiência gastronômica personalizada para seu evento e receba uma estimativa em poucos minutos.
```

CTA principal:

```text
Montar meu evento
```

CTA secundário:

```text
Conhecer os pacotes
```

O botão principal deverá levar para:

```text
/montar-evento
```

---

# 11. COMO FUNCIONA

Mostrar três passos:

```text
1. Conte sobre seu evento
2. Escolha comida, bebidas e serviços
3. Receba uma estimativa e fale conosco
```

---

# 12. TIPOS DE EVENTOS

Apresentar cards para:

```text
Aniversários
Confraternizações
Eventos corporativos
Rooftops
Eventos em condomínios
Recepções
Jantares privados
Happy hours
```

---

# 13. PACOTES

Criar inicialmente quatro pacotes.

## ESSENCIAL

Inclui:

```text
petiscos básicos
bebidas sem álcool
estrutura básica
```

---

## HAPPY HOUR

Inclui:

```text
petiscos
drinks
bartender
estrutura de bar
```

---

## GOURMET

Inclui:

```text
petiscos premium
pratos
drinks
bartender
equipe de atendimento
```

---

## EXPERIÊNCIA COMPLETA

Inclui:

```text
chef
bartender
garçons
petiscos premium
pratos
drinks
estrutura
montagem
```

Cada pacote deve possuir botão:

```text
Montar este evento
```

O botão deverá abrir o configurador com o pacote pré-selecionado.

---

# 14. CONFIGURADOR DE EVENTO

Criar rota:

```text
/montar-evento
```

Criar um formulário dividido em etapas.

Evitar formulário gigante em uma única tela.

Criar indicador de progresso.

Exemplo:

```text
1 Evento
2 Gastronomia
3 Bebidas
4 Equipe
5 Dados
6 Estimativa
```

---

# 15. ETAPA 1 — EVENTO

Campos:

```text
tipo do evento
data
horário inicial
duração
quantidade de convidados
cidade
bairro
local do evento
```

Tipos:

```text
Aniversário
Evento corporativo
Confraternização
Happy hour
Casamento pequeno
Recepção
Jantar privado
Evento em condomínio
Rooftop
Outro
```

Quantidade mínima:

```text
10 pessoas
```

Quantidade máxima no MVP:

```text
300 pessoas
```

Caso seja superior a 300:

mostrar:

```text
Para eventos acima de 300 pessoas, entre em contato diretamente com nossa equipe.
```

---

# 16. ETAPA 2 — GASTRONOMIA

Permitir selecionar:

```text
Petiscos básicos
Petiscos premium
Finger foods
Tábuas e frios
Mini sanduíches
Massas
Pratos empratados
Churrasco
Sobremesas
```

Permitir múltipla seleção.

Adicionar campo:

```text
restrições alimentares
```

Opções:

```text
Nenhuma
Vegetariano
Vegano
Sem lactose
Sem glúten
Outro
```

Adicionar textarea:

```text
Observações sobre alimentação
```

---

# 17. ETAPA 3 — BEBIDAS

Perguntar:

```text
Deseja serviço de bar?
```

Opções:

```text
Não
Sim
```

Caso não:

mostrar apenas bebidas não alcoólicas.

Caso sim:

permitir:

```text
Drinks clássicos
Drinks premium
Caipirinhas
Gin
Spritz
Drinks autorais
Cerveja
Espumante
Vinho
Bebidas sem álcool
Mocktails
```

Adicionar:

```text
Quantidade estimada de drinks por pessoa
```

Opções:

```text
2
3
4
5
Livre
```

---

# 18. ETAPA 4 — EQUIPE

Permitir selecionar:

```text
Chef
Auxiliar de cozinha
Bartender
Garçom
Recepcionista
```

Inicialmente, calcular uma sugestão automática da quantidade de profissionais.

Exemplo inicial:

```text
1 bartender para aproximadamente 40 convidados
1 garçom para aproximadamente 20 convidados
1 auxiliar de cozinha para aproximadamente 50 convidados
```

Essas regras devem ficar centralizadas e facilmente modificáveis.

---

# 19. SERVIÇOS ADICIONAIS

Permitir selecionar:

```text
Louças
Taças
Copos
Talheres
Guardanapos
Mesa de apoio
Estrutura de bar
Decoração de mesa
Gelo
Transporte
Montagem
Desmontagem
```

---

# 20. ETAPA 5 — DADOS DO CLIENTE

Solicitar:

```text
nome
WhatsApp
e-mail
```

E-mail pode ser opcional.

WhatsApp obrigatório.

Adicionar checkbox obrigatório:

```text
Concordo em fornecer estes dados para receber contato sobre meu orçamento.
```

Criar link para:

```text
Política de Privacidade
```

---

# 21. MOTOR DE PRECIFICAÇÃO

Criar módulo separado.

Exemplo:

```text
src/lib/pricing/
```

Não espalhar cálculos nos componentes.

Criar funções puras e testáveis.

Estrutura sugerida:

```text
calculateFoodPrice()
calculateDrinksPrice()
calculateStaffPrice()
calculateExtrasPrice()
calculateEventEstimate()
```

---

# 22. PREÇOS INICIAIS

Estes valores são apenas exemplos para o MVP.

Centralize tudo em configuração.

Não escrever preços diretamente nos componentes.

Exemplo:

```text
src/config/pricing.ts
```

Valores iniciais:

```text
Petiscos básicos:
R$ 45 por pessoa

Petiscos premium:
R$ 70 por pessoa

Finger foods:
R$ 65 por pessoa

Tábuas e frios:
R$ 55 por pessoa

Mini sanduíches:
R$ 35 por pessoa

Massas:
R$ 50 por pessoa

Pratos empratados:
R$ 85 por pessoa

Churrasco:
R$ 80 por pessoa

Sobremesas:
R$ 25 por pessoa
```

Bar:

```text
Drinks clássicos:
R$ 35 por pessoa

Drinks premium:
R$ 55 por pessoa

Mocktails:
R$ 25 por pessoa

Bebidas sem álcool:
R$ 18 por pessoa
```

Equipe:

```text
Bartender:
R$ 350

Garçom:
R$ 250

Chef:
R$ 500

Auxiliar:
R$ 220

Recepcionista:
R$ 250
```

Adicionais:

```text
Louças:
R$ 12 por pessoa

Taças:
R$ 8 por pessoa

Talheres:
R$ 5 por pessoa

Decoração:
R$ 300

Estrutura de bar:
R$ 450

Montagem:
R$ 300

Desmontagem:
R$ 250
```

---

# 23. AVISO SOBRE ESTIMATIVA

A aplicação não deverá apresentar o cálculo como orçamento definitivo.

Mostrar claramente:

```text
Esta é uma estimativa inicial.

O valor final poderá variar de acordo com disponibilidade, local do evento, logística, cardápio escolhido e necessidades específicas.
```

---

# 24. TELA DE RESULTADO

Após concluir:

mostrar:

```text
Seu evento está quase pronto!
```

Mostrar resumo visual.

Exemplo:

```text
Evento:
Happy Hour

Convidados:
40

Duração:
4 horas

Gastronomia:
Petiscos premium

Bar:
Drinks clássicos

Equipe:
1 bartender
2 garçons

Estimativa:
R$ 4.850
```

Mostrar divisão:

```text
Gastronomia
Bar
Equipe
Adicionais
Total estimado
```

---

# 25. WHATSAPP

Criar botão destacado:

```text
Solicitar orçamento pelo WhatsApp
```

O número deverá vir de variável/configuração.

Exemplo:

```text
NEXT_PUBLIC_WHATSAPP_NUMBER
```

Gerar mensagem automaticamente.

Formato:

```text
Olá! Montei um evento pelo site e gostaria de confirmar disponibilidade e orçamento.

Evento: Happy Hour
Data: 20/12/2026
Convidados: 40
Duração: 4 horas

Gastronomia:
- Petiscos premium
- Finger foods

Bebidas:
- Drinks clássicos
- Mocktails

Equipe:
- 1 bartender
- 2 garçons

Adicionais:
- Taças
- Estrutura de bar

Estimativa apresentada no site:
R$ 4.850

Meu nome é João.
```

Usar:

```text
encodeURIComponent()
```

para montar corretamente a URL do WhatsApp.

---

# 26. SALVAMENTO DO LEAD

Antes de abrir o WhatsApp:

salvar o orçamento no banco.

Registrar:

```text
id
nome
email
whatsapp
tipo_evento
data_evento
hora_evento
duracao
convidados
cidade
bairro
local
gastronomia
bebidas
equipe
adicionais
restricoes
observacoes
valor_estimado
status
created_at
updated_at
```

Status inicial:

```text
novo
```

---

# 27. BANCO DE DADOS

Criar estrutura organizada.

Sugestão de tabelas:

```text
leads
events
event_items
admin_users
```

Se uma estrutura mais simples for suficiente, utilize:

```text
leads
```

com campos JSONB para itens selecionados.

Escolha a abordagem mais adequada para um MVP.

Priorize simplicidade.

Documente a decisão no README.

---

# 28. STATUS COMERCIAL

Os leads poderão possuir:

```text
novo
contatado
orcamento_enviado
negociacao
fechado
perdido
evento_realizado
```

---

# 29. PAINEL ADMINISTRATIVO

Criar:

```text
/admin
```

Área protegida por autenticação.

Usuários públicos nunca devem acessar dados administrativos.

---

# 30. LOGIN ADMINISTRATIVO

Criar:

```text
/admin/login
```

Utilizar Supabase Auth.

Inicialmente apenas:

```text
email
senha
```

Não implementar cadastro público de administradores.

---

# 31. DASHBOARD

Mostrar cards:

```text
Novos leads
Orçamentos enviados
Eventos fechados
Eventos próximos
Receita potencial
```

Receita potencial:

soma das estimativas de:

```text
novo
contatado
orcamento_enviado
negociacao
```

Deixar claro que é:

```text
Receita potencial
```

e não receita realizada.

---

# 32. LISTAGEM DE LEADS

Criar tabela responsiva.

Campos principais:

```text
Cliente
Evento
Data
Convidados
Estimativa
Status
WhatsApp
Criado em
```

Permitir:

```text
buscar cliente
filtrar status
filtrar período
ordenar data
```

---

# 33. DETALHES DO LEAD

Criar:

```text
/admin/leads/[id]
```

Mostrar todos os dados do evento.

Permitir alterar status.

Botão:

```text
Falar pelo WhatsApp
```

---

# 34. TRANSFORMAR LEAD EM CLIENTE

Não precisa existir uma estrutura complexa.

Quando status mudar para:

```text
fechado
```

o lead deverá ser considerado cliente.

Evite duplicação desnecessária de informações.

---

# 35. EVENTOS PRÓXIMOS

No dashboard:

mostrar eventos com status:

```text
fechado
```

ordenados pela data.

Criar alertas visuais para eventos:

```text
hoje
amanhã
próximos 7 dias
```

---

# 36. LEMBRETES

Para cada evento fechado, mostrar lembretes administrativos.

Inicialmente podem ser gerados automaticamente com base na data.

Exemplo:

```text
D-7
Confirmar cardápio

D-5
Confirmar equipe

D-3
Comprar ingredientes

D-2
Confirmar cliente

D-1
Separar utensílios

D0
Evento
```

Não precisa enviar notificações externas no MVP.

Mostrar apenas no painel.

---

# 37. LGPD E PRIVACIDADE

Criar rota:

```text
/politica-de-privacidade
```

Criar texto simples explicando:

- quais dados são coletados;
- por que são coletados;
- que são utilizados para orçamento;
- que não serão vendidos;
- como solicitar exclusão.

Não inventar uma política jurídica complexa.

Deixar claro no README que o texto deve ser revisado profissionalmente antes de uso comercial definitivo.

---

# 38. VALIDAÇÕES

Utilizar Zod.

Validar tanto frontend quanto backend quando aplicável.

Não confiar somente nas validações do navegador.

Exemplos:

```text
nome obrigatório
WhatsApp obrigatório
mínimo 10 convidados
máximo 300 convidados
data futura
duração maior que zero
```

---

# 39. TRATAMENTO DE ERROS

Nunca deixar erro técnico bruto aparecer para usuário.

Criar mensagens como:

```text
Não foi possível salvar seu orçamento.

Tente novamente ou entre em contato pelo WhatsApp.
```

Registrar erros tecnicamente onde apropriado.

---

# 40. LOADING STATES

Criar estados de carregamento para:

```text
salvar formulário
carregar dashboard
carregar lead
alterar status
login
```

Evitar clique duplo.

---

# 41. EMPTY STATES

Criar estados vazios amigáveis.

Exemplo:

```text
Nenhum lead encontrado.

Quando alguém solicitar um orçamento, ele aparecerá aqui.
```

---

# 42. COMPONENTIZAÇÃO

Evitar arquivos gigantes.

Criar componentes reutilizáveis.

Sugestão:

```text
src/components/
  layout/
  landing/
  event-builder/
  pricing/
  admin/
  ui/
```

Não criar abstrações desnecessárias.

---

# 43. ESTRUTURA DO PROJETO

Organização sugerida:

```text
src/
  app/
    page.tsx

    montar-evento/
      page.tsx

    politica-de-privacidade/
      page.tsx

    admin/
      page.tsx

      login/
        page.tsx

      leads/
        page.tsx

        [id]/
          page.tsx

  components/
    landing/
    event-builder/
    admin/
    ui/

  config/
    brand.ts
    pricing.ts

  lib/
    pricing/
    supabase/
    whatsapp/
    validation/

  types/

public/

docs/

supabase/
```

Adapte caso tecnicamente necessário.

---

# 44. SEO

Configurar metadata.

Título:

```text
Mesa & Bar Eventos | Buffet e experiências gastronômicas
```

Descrição:

```text
Monte uma experiência gastronômica personalizada para seu evento, escolha comida, bebidas e serviços e receba uma estimativa.
```

Adicionar Open Graph básico.

---

# 45. PERFORMANCE

Evitar dependências pesadas sem necessidade.

Priorizar:

```text
Server Components quando adequado
lazy loading
imagens otimizadas
bundle pequeno
```

Não adicionar bibliotecas apenas por conveniência.

---

# 46. TESTES

Criar testes para o motor de precificação.

Testar pelo menos:

```text
evento apenas com comida
evento com comida + bar
evento com equipe
evento completo
10 convidados
300 convidados
cálculo dos adicionais
```

Criar também testes básicos de validação.

---

# 47. QUALIDADE

Antes de considerar o projeto concluído executar:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Todos devem finalizar sem erros.

Caso typecheck não exista, configure.

---

# 48. SEGURANÇA

Verificar:

```text
Nenhuma credencial hardcoded
Nenhuma chave Supabase privilegiada no frontend
Rotas administrativas protegidas
Inputs validados
Variáveis sensíveis ignoradas pelo Git
.env no .gitignore
.env.example sem segredos
```

Nunca salvar senha administrativa manualmente no banco.

Utilizar Supabase Auth.

---

# 49. README

Crie um README.md profissional.

Ele deverá conter obrigatoriamente:

```text
Nome do projeto
Descrição
Problema
Solução
Tese do MVP
Hipóteses
Público-alvo
Funcionalidades
Tecnologias
Arquitetura
Como executar
Configuração do Supabase
Variáveis de ambiente
Estrutura do projeto
Screenshots
Próximas evoluções
Segurança
Limitações do MVP
```

---

# 50. BUSINESS MODEL CANVAS

Adicionar seção no README:

```text
Business Model Canvas
```

Com:

## Segmentos de clientes

```text
pessoas organizando eventos particulares
empresas
condomínios
organizadores de pequenos eventos
aniversários
happy hours
```

## Proposta de valor

```text
permitir configurar rapidamente uma experiência gastronômica e receber estimativa antes do contato comercial
```

## Canais

```text
site
Instagram
WhatsApp
indicações
```

## Relacionamento

```text
autoatendimento inicial
atendimento humano no fechamento
```

## Fontes de receita

```text
buffet
bar
equipe
adicionais
pacotes
```

## Recursos principais

```text
equipe
fornecedores
estrutura
plataforma digital
marca
```

## Atividades principais

```text
gastronomia
coquetelaria
atendimento
logística
produção
```

## Parceiros

```text
fornecedores
bartenders
garçons
cozinheiros
transportadores
espaços de eventos
```

## Estrutura de custos

```text
ingredientes
bebidas
equipe
transporte
equipamentos
marketing
software
```

---

# 51. TAM, SAM E SOM

Adicionar seção explicando que os números definitivos devem ser validados com pesquisa de mercado.

Não inventar números como se fossem fatos.

Criar estrutura para:

```text
TAM
mercado total de eventos e serviços de alimentação

SAM
eventos atendidos dentro da região operacional do buffet

SOM
parcela inicialmente alcançável considerando capacidade da equipe, localização e aquisição de clientes
```

Se não houver fontes verificadas disponíveis no projeto, marcar claramente os valores como:

```text
hipóteses a validar
```

Não apresentar dados inventados como pesquisa.

---

# 52. O QUE FICA MANUAL NO MVP

Documentar explicitamente:

```text
confirmação de disponibilidade
fechamento comercial
negociação
pagamento
compra de ingredientes
contratação da equipe
organização logística
confirmação final
```

Isso é proposital.

O MVP testa aquisição, configuração e intenção de compra.

---

# 53. EVOLUÇÕES FUTURAS

Documentar:

```text
Stripe
PIX
e-mail via Resend
WhatsApp API
chatbot
n8n
Google Calendar
controle de estoque
controle de ingredientes
CRM
relatórios
cupons
cardápios sazonais
avaliações
programa de indicação
```

Não implementar agora.

---

# 54. DOCUMENTAÇÃO DO DESAFIO

Criar:

```text
docs/mega-prompt.md
```

e colocar este projeto documentado como parte do processo de construção.

Criar também:

```text
docs/mvp-hypotheses.md
```

contendo:

```text
tese
hipóteses
métricas
o que observar nos testes
```

Criar:

```text
docs/manual-test.md
```

com roteiro de teste manual.

---

# 55. MÉTRICAS DO MVP

Documentar métricas que futuramente podem ser acompanhadas:

```text
visitas
início do configurador
configuradores concluídos
orçamentos solicitados
contatos via WhatsApp
eventos fechados
ticket médio estimado
taxa de conversão
```

Não precisa implementar analytics agora.

---

# 56. TESTE MANUAL

Criar roteiro.

Exemplo:

### Cenário 1

```text
20 convidados
aniversário
petiscos básicos
sem álcool
sem equipe extra
```

Verificar cálculo.

### Cenário 2

```text
40 convidados
happy hour
petiscos premium
drinks
bartender
garçons
```

Verificar cálculo.

### Cenário 3

```text
100 convidados
corporativo
gastronomia
bar
equipe
estrutura
```

Verificar cálculo.

### Cenário 4

Tentar:

```text
5 convidados
```

Deve falhar.

### Cenário 5

Tentar:

```text
350 convidados
```

Deve orientar contato direto.

---

# 57. NÃO FAZER

Não implemente agora:

```text
marketplace
chatbot com IA
Stripe
PIX
emissão fiscal
estoque avançado
sistema de cozinha
gestão financeira
controle contábil
folha de pagamento
login de cliente
app mobile
microserviços
Kubernetes
arquitetura desnecessariamente complexa
```

O objetivo é MVP.

---

# 58. EXPERIÊNCIA DO CLIENTE

O fluxo ideal deverá ser:

```text
Landing Page

↓

Montar meu evento

↓

Informar evento

↓

Escolher gastronomia

↓

Escolher bebidas

↓

Escolher equipe

↓

Selecionar adicionais

↓

Informar contato

↓

Receber estimativa

↓

Lead salvo

↓

Abrir WhatsApp com mensagem pronta

↓

Atendimento humano
```

---

# 59. EXPERIÊNCIA ADMINISTRATIVA

```text
Login

↓

Dashboard

↓

Visualizar novos leads

↓

Abrir orçamento

↓

Contato via WhatsApp

↓

Alterar status

↓

Fechar evento

↓

Acompanhar próximos eventos
```

---

# 60. CRITÉRIOS DE ACEITE

Só considere o MVP pronto quando:

- a landing page estiver funcionando;
- for possível montar um evento;
- o orçamento for calculado corretamente;
- o formulário for validado;
- os dados forem persistidos;
- o lead aparecer no admin;
- o administrador puder alterar status;
- o link de WhatsApp for gerado corretamente;
- nenhuma credencial estiver no código;
- a aplicação estiver responsiva;
- os testes passarem;
- o TypeScript não possuir erros;
- o lint passar;
- o build funcionar;
- o README explicar como executar o projeto.

---

# 61. FORMA DE TRABALHO

Antes de começar a programar:

1. Analise todo este documento.
2. Inspecione o repositório atual.
3. Identifique se já existe código aproveitável.
4. Não apague código existente sem necessidade.
5. Defina uma arquitetura simples.
6. Apresente resumidamente o plano de implementação.
7. Depois execute o plano.

Durante a implementação:

- faça alterações diretamente nos arquivos;
- crie todos os arquivos necessários;
- não me entregue apenas exemplos;
- não deixe pseudocódigo;
- não deixe TODOs que impeçam funcionamento;
- não use dados falsos onde dados persistidos deveriam existir;
- mantenha tipagem consistente;
- rode testes frequentemente.

---

# 62. AUTONOMIA

Quando existir uma decisão técnica pequena que não altera o objetivo do produto, tome a decisão mais simples e continue.

Não interrompa constantemente perguntando detalhes.

Prefira:

```text
simplicidade
manutenção
segurança
clareza
boa UX
```

Se houver duas opções tecnicamente válidas, escolha aquela que torna o MVP mais fácil de executar, testar e publicar.

---

# 63. ETAPA FINAL

Quando terminar:

Execute:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Corrija todos os problemas encontrados.

Depois apresente um relatório final contendo:

```text
1. O que foi criado
2. Estrutura principal
3. Banco de dados criado
4. Rotas disponíveis
5. Como configurar Supabase
6. Variáveis de ambiente necessárias
7. Como executar localmente
8. Como criar o primeiro administrador
9. Resultado dos testes
10. Resultado do lint
11. Resultado do typecheck
12. Resultado do build
13. O que permanece manual no MVP
14. Próximos passos recomendados
```

Não declare que algo funciona sem ter verificado quando for possível verificar.

---

# RESULTADO ESPERADO

Ao final quero possuir um MVP funcional de uma plataforma de experiências gastronômicas para eventos em que:

```text
o cliente configura o evento
        ↓
o sistema calcula uma estimativa
        ↓
os dados são registrados
        ↓
o cliente solicita o orçamento pelo WhatsApp
        ↓
o administrador recebe o lead
        ↓
o buffet continua o atendimento
```

O produto deve parecer simples para o cliente, mesmo que exista lógica por trás.

O objetivo não é construir a plataforma definitiva.

O objetivo é construir o produto mínimo necessário para descobrir se clientes realmente querem montar e solicitar eventos dessa maneira.

Comece analisando o repositório e, em seguida, implemente o projeto.