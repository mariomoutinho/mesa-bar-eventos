export type Item = {
  id: string;
  label: string;
  price: number;
  unit: "person" | "fixed";
};
const person = (id: string, label: string, price: number): Item => ({
  id,
  label,
  price,
  unit: "person",
});
const fixed = (id: string, label: string, price: number): Item => ({
  id,
  label,
  price,
  unit: "fixed",
});
export const food = [
  person("basicos", "Petiscos básicos", 45),
  person("premium", "Petiscos premium", 70),
  person("finger", "Finger foods", 65),
  person("tabuas", "Tábuas e frios", 55),
  person("sanduiches", "Mini sanduíches", 35),
  person("massas", "Massas", 50),
  person("pratos", "Pratos empratados", 85),
  person("churrasco", "Churrasco", 80),
  person("sobremesas", "Sobremesas", 25),
];
export const drinks = [
  person("classicos", "Drinks clássicos", 35),
  person("premium", "Drinks premium", 55),
  person("caipirinhas", "Caipirinhas", 30),
  person("gin", "Gin", 40),
  person("spritz", "Spritz", 40),
  person("autorais", "Drinks autorais", 55),
  person("cerveja", "Cerveja", 25),
  person("espumante", "Espumante", 45),
  person("vinho", "Vinho", 40),
  person("sem-alcool", "Bebidas sem álcool", 18),
  person("mocktails", "Mocktails", 25),
];
export const staff = [
  fixed("chef", "Chef", 500),
  fixed("auxiliar", "Auxiliar de cozinha", 220),
  fixed("bartender", "Bartender", 350),
  fixed("garcom", "Garçom", 250),
  fixed("recepcionista", "Recepcionista", 250),
];
export const extras = [
  person("loucas", "Louças", 12),
  person("tacas", "Taças", 8),
  person("copos", "Copos", 4),
  person("talheres", "Talheres", 5),
  person("guardanapos", "Guardanapos", 2),
  fixed("mesa", "Mesa de apoio", 150),
  fixed("bar", "Estrutura de bar", 450),
  fixed("decoracao", "Decoração de mesa", 300),
  person("gelo", "Gelo", 3),
  fixed("transporte", "Transporte", 200),
  fixed("montagem", "Montagem", 300),
  fixed("desmontagem", "Desmontagem", 250),
];
export const rules = {
  guestsPerBartender: 40,
  guestsPerWaiter: 20,
  guestsPerAssistant: 50,
  includedHours: 4,
  extraHourRate: 0.25,
  drinkFactors: { "2": 2 / 3, "3": 1, "4": 4 / 3, "5": 5 / 3, livre: 2 },
};
export const packages = [
  {
    id: "essencial",
    name: "Essencial",
    description: "O prazer de reunir, com leveza.",
    food: ["basicos"],
    drinks: ["sem-alcool"],
    staff: [],
    extras: ["mesa", "copos", "guardanapos"],
  },
  {
    id: "happy-hour",
    name: "Happy Hour",
    description: "Boas conversas pedem um brinde.",
    food: ["basicos"],
    drinks: ["classicos"],
    staff: ["bartender"],
    extras: ["bar"],
  },
  {
    id: "gourmet",
    name: "Gourmet",
    description: "Sabores que fazem parte da memória.",
    food: ["premium", "pratos"],
    drinks: ["classicos"],
    staff: ["bartender", "garcom"],
    extras: [],
  },
  {
    id: "completa",
    name: "Experiência Completa",
    description: "Cada detalhe, cuidadosamente servido.",
    food: ["premium", "pratos"],
    drinks: ["premium"],
    staff: ["chef", "bartender", "garcom"],
    extras: ["bar", "loucas", "talheres", "montagem"],
  },
];
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export const estimateNotice =
  "Esta é uma estimativa inicial. O valor final poderá variar de acordo com disponibilidade, local do evento, logística, cardápio escolhido e necessidades específicas.";
