import { newSpecPage } from "@stencil/core/testing";
import { SpeedRead } from "./speed-read";

describe("speed-read", () => {
  it("renders", async () => {
    const { root } = await newSpecPage({
      components: [SpeedRead],
      html: "<speed-read></speed-read>",
    });
    expect(root).toEqualHtml(`
      <speed-read>
        <mock:shadow-root>
          <div class="reader"></div>
        </mock:shadow-root>
      </speed-read>
    `);
  });

  it("renders with values", async () => {
    const { root } = await newSpecPage({
      components: [SpeedRead],
      html: `<speed-read text="Stencil" ></speed-read>`,
    });
    expect(root).toEqualHtml(`
      <speed-read text="Stencil">
        <mock:shadow-root>
          <div class="reader">
            <span class="start">
              St
            </span>
            <span class="focus">
              e
            </span>
            <span class="end">
              ncil
            </span>
          </div>
        </mock:shadow-root>
      </speed-read>
    `);
  });
});
