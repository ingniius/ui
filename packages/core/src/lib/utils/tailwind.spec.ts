import { describe, expect, it } from "vitest";

import { cn, cv } from "./tailwind";

describe("#cn", () => {
  it("should merge multiple class strings", () => {
    expect(cn("p-4", "m-2")).toBe("p-4 m-2");
  });

  it("should handle conditional classes via objects", () => {
    expect(cn({ "text-red-500": true, hidden: false }, "p-4")).toBe(
      "text-red-500 p-4",
    );
  });

  it("should handle arrays of classes", () => {
    expect(cn(["bg-blue-500", null, "text-white"])).toBe(
      "bg-blue-500 text-white",
    );
  });

  it("should merge conflicting classes correctly", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });
});

describe("#cv", () => {
  it("should return base styles by default", () => {
    const ui = cv({ base: "flex" });
    expect(ui()).toBe("flex");
  });

  it("should apply variant classes", () => {
    const ui = cv({
      base: "flex",
      variants: {
        direction: {
          row: "flex-row",
          col: "flex-col",
        },
      },
      defaultVariants: {
        direction: "row",
      },
    });

    expect(ui()).toBe("flex flex-row");
    expect(ui({ direction: "col" })).toBe("flex flex-col");
  });

  it("should respect defaulcvariants", () => {
    const ui = cv({
      base: "flex",
      variants: {
        size: {
          sm: "text-sm",
          lg: "text-lg",
        },
      },
      defaultVariants: {
        size: "sm",
      },
    });

    expect(ui()).toBe("flex text-sm");
  });

  it("should apply compoundVariants", () => {
    const ui = cv({
      base: "flex",
      variants: {
        size: {
          sm: "text-sm",
          lg: "text-lg",
        },
        color: {
          red: "text-red-500",
          blue: "text-blue-500",
        },
      },
      compoundVariants: [
        {
          size: "lg",
          color: "red",
          class: "font-bold",
        },
      ],
    });

    expect(ui({ size: "lg", color: "red" })).toBe(
      "flex text-lg text-red-500 font-bold",
    );
    expect(ui({ size: "sm", color: "red" })).toBe("flex text-sm text-red-500");
  });

  it("should merge extra className passed in", () => {
    const ui = cv({ base: "flex" });
    expect(ui({ class: "justify-center" })).toBe("flex justify-center");
  });
});
