import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [360, 390, 768, 1024, 1440])
  test(`public layout ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Seu evento.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `docs/screenshots/landing-${width}.png`,
      fullPage: true,
    });
    await page.goto("/montar-evento");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.getByLabel("Quantidade de convidados")).toBeVisible();
  });
for (const width of [360, 390, 768, 1024, 1440])
  test(`accessible complete configurator ${width}px`, async ({ page }) => {
    await page.goto("/");
    const landing = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(landing.violations).toEqual([]);
    await page.setViewportSize({ width, height: 844 });
    let submissions = 0;
    page.on("request", (req) => {
      if (req.url().endsWith("/api/leads")) submissions++;
    });
    await page.goto("/montar-evento?pacote=happy-hour");
    await page.getByLabel("Data", { exact: true }).fill("2099-12-20");
    await page.getByLabel("Cidade", { exact: true }).fill("São Paulo");
    await page.getByLabel("Bairro", { exact: true }).fill("Centro");
    await page.getByLabel("Local do evento").fill("Salão de festas");
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Sabores para compartilhar" }),
    ).toBeVisible();
    await expect(page.getByLabel("Petiscos básicos")).toBeChecked();
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect(page.getByLabel("Drinks clássicos")).toBeChecked();
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await page
      .getByRole("button", { name: "Aplicar sugestão de equipe" })
      .click();
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await page.getByLabel("Nome", { exact: true }).fill("Pessoa de Teste");
    await page.getByLabel("WhatsApp com DDD").fill("11999991234");
    await page.getByLabel("Concordo em fornecer").check();
    await page.getByRole("button", { name: "Continuar", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Seu evento está quase pronto!" }),
    ).toBeVisible();
    await expect(page.getByText("Pessoa de Teste · 11999991234")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
    expect(submissions).toBe(0);
    await page.screenshot({
      path: `docs/screenshots/configurador-${width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Solicitar orçamento pelo WhatsApp" })
      .click();
    await expect(
      page.getByRole("alert").filter({ hasText: "O atendimento online" }),
    ).toContainText("ainda está sendo configurado");
    expect(page.url()).toContain("montar-evento");
  });
test("invalid guests and protected admin", async ({ page }) => {
  await page.goto("/montar-evento");
  await page.getByLabel("Quantidade de convidados").fill("350");
  await page.getByRole("button", { name: "Continuar", exact: true }).click();
  await expect(
    page.getByText(
      "Para eventos acima de 300 pessoas, entre em contato diretamente com nossa equipe.",
    ),
  ).toBeVisible();
  await page.goto("/admin");
  await expect(page).toHaveURL(/admin\/login/);
  await page.goto("/admin/leads");
  await expect(page).toHaveURL(/admin\/login/);
});
