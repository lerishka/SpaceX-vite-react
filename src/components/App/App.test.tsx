import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App testing", () => {
  it("Should render the page title", () => {
    render(<App />);

    const header = screen.getByText(/spacex launches 2020/i);
    expect(header).toBeInTheDocument();
  });
});
