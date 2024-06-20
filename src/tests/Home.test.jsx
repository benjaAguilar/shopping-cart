import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { describe, expect, it } from "vitest";

describe("home component", () => {
  it("renders correct h1", () => {
    render(<Home />);
    const h1 = screen.getByRole("heading");
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent("Hello home");
  });
});
