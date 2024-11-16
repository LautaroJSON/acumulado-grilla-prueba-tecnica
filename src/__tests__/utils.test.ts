import { __MOCK__ARTICLES__ } from "../__mock__/articles.mock";
import { filterArticlesBySubtype, formatDate } from "../server/utils";

describe("filterArticlesBySubtype", () => {
  it("debe filtrar artículos por subtype", () => {
    const result = filterArticlesBySubtype(__MOCK__ARTICLES__, "7");

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(__MOCK__ARTICLES__[0]);
  });

  it("debe devolver un array vacio si no hay articulos que coincidan", () => {
    const result = filterArticlesBySubtype(__MOCK__ARTICLES__, "5");

    expect(result).toEqual([]);
  });

  it("debe devolver un array vacio si no se proporcionan articulos", () => {
    const result = filterArticlesBySubtype(undefined, "7");
    expect(result).toEqual([]);
  });
});

describe("formatDate", () => {
  it("debe formatear una fecha correctamente", () => {
    const input = "2024-11-16T00:00:00Z";
    const result = formatDate(input);

    expect(result).toBe("15 de noviembre de 2024");
  });

  it("manejar fechas invalidas", () => {
    const input = "invalid-date";
    const result = formatDate(input);

    expect(result).toBe("Sin fecha");
  });
});
