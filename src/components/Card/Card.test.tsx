import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "./Card";

describe("Card component", () => {
  it("Should render missionName, rocketName and image, and calls onClick on button click", () => {
    const mockOnClick = vi.fn();

    render(
      <Card
        missionPatch="patch.png"
        missionName="Apollo 11"
        rocketName="Saturn V"
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText(/apollo 11/i)).toBeInTheDocument();
    expect(screen.getByText(/saturn v/i)).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "patch.png");

    const button = screen.getByRole("button", { name: /see more/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Should render correctly without optional props", () => {
    const mockOnClick = vi.fn();

    render(<Card missionName="Test Mission" onClick={mockOnClick} />);

    expect(screen.getByText(/test mission/i)).toBeInTheDocument();

    expect(screen.queryByRole("img")).not.toBeNull();
    expect(screen.queryByText(/see more/i)).toBeInTheDocument();
  });
});
