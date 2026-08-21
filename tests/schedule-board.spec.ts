import { test, expect, type Page } from "@playwright/test";
import {
  crews,
  enhancementWeeks,
  laborDay,
  roster,
  weeks,
} from "../content/schedule";

/**
 * El tablero de producción (/calendar/).
 *
 * Lo que de verdad puede romperse aquí es la GEOMETRÍA: el roster y el Gantt se
 * pintan en dos columnas independientes y solo se alinean porque comparten el
 * alto de fila, y los tramos se posicionan en porcentajes que se resuelven
 * contra cajas distintas según dónde cuelguen. Un cambio de padding o de orden
 * en el DOM no rompe ningún test de humo, pero sí el tablero.
 */

const ROUTE = "/calendar/";

const rosterRows = roster.flatMap((group) => group.rows);
const timelineWeek = (n: number) => (n / weeks.length) * 100;

async function board(page: Page) {
  return page.getByRole("region", { name: "Production board" });
}

test.describe("Production board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");
  });

  test("renders every client on the roster, in board order", async ({ page }) => {
    const clients = await page
      .locator("[data-roster-row]")
      .evaluateAll((els) => els.map((el) => el.getAttribute("data-roster-row")));

    expect(clients).toEqual(rosterRows.map((row) => row.client));
  });

  test("roster and timeline rows line up", async ({ page }) => {
    // La alineación es lo único que hace legible el tablero: roster y Gantt son
    // dos columnas independientes que solo casan por el alto de fila.
    const drift = await page.evaluate(() => {
      const mid = (el: Element) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      };
      return [...document.querySelectorAll("[data-roster-row]")].map((rosterRow) => {
        const client = rosterRow.getAttribute("data-roster-row")!;
        const ganttRow = document.querySelector(`[data-gantt-row="${CSS.escape(client)}"]`);
        return { client, drift: ganttRow ? Math.abs(mid(rosterRow) - mid(ganttRow)) : null };
      });
    });

    expect(drift.length).toBe(rosterRows.length);
    for (const row of drift) {
      expect(row.drift, `${row.client}: no hay fila de Gantt`).not.toBeNull();
      expect(row.drift!, `${row.client}: la fila se ha desalineado`).toBeLessThan(1.5);
    }
  });

  test("every bar starts and ends on the week it is scheduled for", async ({ page }) => {
    const measured = await page.evaluate(() => {
      return [...document.querySelectorAll("[data-gantt-row]")]
        .map((row) => {
          const bar = row.querySelector("[data-bar]");
          if (!bar) return null;
          const track = row.getBoundingClientRect();
          const r = bar.getBoundingClientRect();
          return {
            client: row.getAttribute("data-gantt-row")!,
            start: ((r.left - track.left) / track.width) * 100,
            width: (r.width / track.width) * 100,
          };
        })
        .filter(Boolean);
    });

    const expected = rosterRows.filter((row) => row.bar);
    expect(measured.length).toBe(expected.length);

    for (const row of expected) {
      const got = measured.find((m) => m!.client === row.client)!;
      expect(
        Math.abs(got.start - timelineWeek(row.bar!.start)),
        `${row.client}: el tramo no arranca en su semana`,
      ).toBeLessThan(0.5);
      expect(
        Math.abs(got.width - timelineWeek(row.bar!.span)),
        `${row.client}: el tramo no dura las semanas que dice`,
      ).toBeLessThan(0.5);
    }
  });

  test("Labor Day is marked on the same week in the timeline and the crew band", async ({
    page,
  }) => {
    const marks = page.locator("[data-labor-day], span.bg-marker-orange");
    const orange = page.locator("span").filter({ hasText: /^$/ });
    void marks;
    void orange;

    const lines = await page.evaluate(() => {
      const el = [...document.querySelectorAll("span")].filter((s) => {
        const cs = getComputedStyle(s);
        return cs.backgroundColor === "rgb(235, 138, 32)" && s.offsetWidth <= 3;
      });
      return el.map((s) => {
        const r = s.getBoundingClientRect();
        const parent = s.parentElement!.getBoundingClientRect();
        return { offset: ((r.left - parent.left) / parent.width) * 100 };
      });
    });

    expect(lines.length, "una raya en el Gantt y otra en las cuadrillas").toBe(2);
    for (const line of lines) {
      expect(Math.abs(line.offset - timelineWeek(laborDay.week))).toBeLessThan(0.5);
    }
    // Y ambas en la misma columna: es la misma semana.
    expect(Math.abs(lines[0].offset - lines[1].offset)).toBeLessThan(0.3);
  });

  test("the Labor Day line is not painted over by crew job boxes", async ({ page }) => {
    // Regresión: las cajas de obra tienen fondo opaco y, en orden de documento,
    // borraban la raya a lo largo de toda la banda de cuadrillas.
    const visible = await page.evaluate(() => {
      const lines = [...document.querySelectorAll("span")].filter((s) => {
        const cs = getComputedStyle(s);
        return cs.backgroundColor === "rgb(235, 138, 32)" && s.offsetWidth <= 3;
      });
      const line = lines[lines.length - 1];
      line.scrollIntoView({ block: "center" });
      const r = line.getBoundingClientRect();
      const hits = [0.25, 0.5, 0.75].map((f) =>
        document.elementFromPoint(r.left + 1, r.top + r.height * f),
      );
      return hits.filter((h) => h === line).length;
    });

    expect(visible, "la raya de Labor Day queda tapada en las cuadrillas").toBeGreaterThan(0);
  });

  test("every crew job box stays inside the timeline", async ({ page }) => {
    const overflow = await page.evaluate(() => {
      const lanes = [...document.querySelectorAll("div.relative.mb-3")];
      return lanes.flatMap((lane) => {
        const lr = lane.getBoundingClientRect();
        return [...lane.querySelectorAll("span")]
          .filter((s) => s.textContent?.trim())
          .map((s) => s.getBoundingClientRect().right - lr.right)
          .filter((d) => d > 1);
      });
    });

    expect(overflow, "hay cajas de obra que se salen del marco").toEqual([]);
  });

  test("the enhancements panel lists both weeks with their day columns", async ({
    page,
  }) => {
    for (const week of enhancementWeeks) {
      const table = page.getByRole("table", {
        name: `Enhancements scheduled for ${week.label}`,
      });
      await expect(table).toBeVisible();

      for (const day of week.days) {
        await expect(
          table.getByRole("columnheader", { name: day, exact: true }),
        ).toBeVisible();
      }
      for (const row of week.rows) {
        await expect(
          table.getByRole("rowheader", { name: row.client, exact: true }),
        ).toBeVisible();
      }
    }
  });

  test("enhancement bars cover exactly the days they are booked for", async ({ page }) => {
    const booked = enhancementWeeks.flatMap((week) =>
      week.rows.filter((row) => row.days).map((row) => ({ week, row })),
    );
    expect(booked.length).toBeGreaterThan(3);

    for (const { week, row } of booked) {
      const table = page.getByRole("table", {
        name: `Enhancements scheduled for ${week.label}`,
      });
      const tr = table.locator("tr").filter({
        has: page.getByRole("rowheader", { name: row.client, exact: true }),
      });

      const marked = await tr.evaluate((el) =>
        [...el.querySelectorAll("td")].map((td) =>
          [...td.querySelectorAll("span")].some(
            (s) => getComputedStyle(s).backgroundColor === "rgb(221, 42, 92)",
          ),
        ),
      );

      const expected = week.days.map(
        (_, i) => i >= row.days![0] && i <= row.days![1],
      );
      expect(marked, `${week.label} · ${row.client}`).toEqual(expected);
    }
  });

  test("crew names and their clients are on the board", async ({ page }) => {
    for (const crew of crews) {
      await expect(page.getByText(crew.name, { exact: true })).toBeVisible();
    }
  });

  test("the board is reachable and scrollable with the keyboard", async ({ page }) => {
    const region = await board(page);
    await expect(region).toBeVisible();

    await region.focus();
    await expect(region).toBeFocused();

    expect(
      await region.evaluate((el) => el.scrollWidth - el.clientWidth),
      "el tablero no desborda: el test no prueba nada",
    ).toBeGreaterThan(0);

    for (let i = 0; i < 8; i++) await page.keyboard.press("ArrowRight");
    await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);

    await page.keyboard.press("Home");
    await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBe(0);

    // End lleva al final de la pared, que es donde vive enero.
    await page.keyboard.press("End");
    await expect
      .poll(() => region.evaluate((el) => el.scrollWidth - el.clientWidth - el.scrollLeft))
      .toBeLessThan(2);
  });

  test("scrolling the board does not widen the document", async ({ page }) => {
    // Regresión: un <caption class="sr-only"> se posicionaba contra el bloque
    // inicial, escapaba del contenedor con scroll y estiraba el documento.
    const region = await board(page);
    await region.evaluate((el) => el.scrollTo({ left: el.scrollWidth }));

    const overflowing = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflowing).toBe(false);
  });

  test("the timeline ruler runs from the first Monday to the last", async ({ page }) => {
    const times = page.locator("time[datetime]");
    await expect(times).toHaveCount(weeks.length);

    expect(await times.first().getAttribute("datetime")).toBe(weeks[0].iso);
    expect(await times.last().getAttribute("datetime")).toBe(
      weeks[weeks.length - 1].iso,
    );
  });
});

test.describe("Today marker", () => {
  test("is absent when the date is outside the board window", async ({ page }) => {
    await page.clock.setFixedTime(new Date("2027-06-01T12:00:00Z"));
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("[data-today-marker]")).toHaveCount(0);
  });

  test("lands on the right week when the date is inside it", async ({ page }) => {
    // weeks[0] es el lunes 24 de agosto; este instante cae en la semana 5.
    const week = 5;
    const at = new Date(
      Date.parse(`${weeks[0].iso}T00:00:00Z`) + week * 7 * 24 * 60 * 60 * 1000,
    );
    await page.clock.setFixedTime(at);
    await page.goto(ROUTE);
    await page.waitForLoadState("networkidle");

    const markers = page.locator("[data-today-marker]");
    await expect(markers).toHaveCount(2);

    const offsets = await markers.evaluateAll((els) =>
      els.map((el) => {
        const r = el.getBoundingClientRect();
        const p = el.parentElement!.getBoundingClientRect();
        return ((r.left - p.left) / p.width) * 100;
      }),
    );

    for (const offset of offsets) {
      expect(Math.abs(offset - timelineWeek(week))).toBeLessThan(0.5);
    }
  });
});
