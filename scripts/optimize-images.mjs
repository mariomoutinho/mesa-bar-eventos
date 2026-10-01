import sharp from "sharp";
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
const source = process.argv[2];
if (!source) throw new Error("Informe a pasta com as oito imagens originais.");
const names = [
  "aniversario-ao-por-do-sol",
  "confraternizacao-com-buffet",
  "evento-corporativo",
  "rooftop-ao-entardecer",
  "evento-em-condominio",
  "recepcao-com-espumante",
  "jantar-privado",
  "happy-hour-com-drinks",
];
const files = (await readdir(source)).filter((name) =>
  /^Imagem do ChatGPT 1 de out\. de 2026, .*-[1-8]\.png$/.test(name),
);
if (files.length !== 8)
  throw new Error("Esperadas as oito imagens numeradas de 1 a 8.");
await mkdir("public/images", { recursive: true });
const results = [];
for (const [index, name] of names.entries()) {
  const original = files.find((file) => file.endsWith(`-${index + 1}.png`));
  if (!original) throw new Error(`Imagem ${index + 1} não encontrada.`);
  const input = path.join(source, original),
    output = `public/images/${name}.webp`;
  const info = await sharp(input)
    .rotate()
    .resize({ width: index === 3 ? 1440 : 1200, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(output);
  results.push({
    original,
    output,
    width: info.width,
    height: info.height,
    originalBytes: (await stat(input)).size,
    optimizedBytes: info.size,
  });
}
await writeFile(
  "docs/image-optimization.json",
  JSON.stringify(results, null, 2) + "\n",
);
const before = results.reduce((n, r) => n + r.originalBytes, 0),
  after = results.reduce((n, r) => n + r.optimizedBytes, 0);
console.log(
  JSON.stringify(
    {
      images: results.length,
      originalBytes: before,
      optimizedBytes: after,
      reductionPercent: ((1 - after / before) * 100).toFixed(1),
    },
    null,
    2,
  ),
);
