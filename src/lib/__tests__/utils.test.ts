import { cn } from "../utils";

describe("cn", () => {
  it("deve combinar classes simples", () => {
    const result = cn("class1", "class2");
    expect(result).toBeTruthy();
  });

  it("deve mesclar classes condicionalmente", () => {
    const result = cn("base", false && "hidden", "active");
    expect(result).toBeTruthy();
  });

  it("deve mesclar classes com objetos", () => {
    const result = cn("base", { active: true, disabled: false });
    expect(result).toBeTruthy();
  });

  it("deve mesclar classes com arrays", () => {
    const result = cn(["base", "secondary"], "active");
    expect(result).toBeTruthy();
  });

  it("deve remover classes duplicadas", () => {
    const result = cn("text-red-500", "text-blue-500");
    // tailwind-merge deve remover a primeira e manter a última
    expect(result).toBeTruthy();
  });

  it("deve lidar com valores undefined e null", () => {
    const result = cn("base", undefined, null, "active");
    expect(result).toBeTruthy();
  });

  it("deve mesclar classes complexas", () => {
    const result = cn(
      "base-class",
      "another-class",
      { conditional: true },
      ["array", "classes"],
      false && "hidden"
    );
    expect(result).toBeTruthy();
  });
});

