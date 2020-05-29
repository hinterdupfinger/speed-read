import { newE2EPage } from "@stencil/core/testing";

describe("speed-read", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent("<speed-read></speed-read>");
    const element = await page.find("speed-read");
    expect(element).toHaveClass("hydrated");
  });

  it("renders changes to the text attribute", async () => {
    const page = await newE2EPage();

    await page.setContent("<speed-read></speed-read>");
    const component = await page.find("speed-read");
    const element = await page.find("speed-read >>> div");
    expect(element.textContent).toEqual(``);

    component.setProperty("text", "Stencil");
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Stencil`);
  });
});
