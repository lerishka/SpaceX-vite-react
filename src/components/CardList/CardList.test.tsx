import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import CardList from "./CardList";

const mockCards = [
  {
    mission_name: "test1",
    links: {
      mission_patch_small: "patch1.png",
    },
    rocket: {
      rocket_name: "rocket1",
    },
  },
  {
    mission_name: "test2",
    links: {
      mission_patch_small: "patch2.png",
    },
    rocket: {
      rocket_name: "rocket2",
    },
  },
];

describe("CardList testing", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockCards),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should render cards", async () => {
    render(<CardList />);

    await waitFor(() => {
      expect(screen.getByText(/test1/i)).toBeInTheDocument();
      expect(screen.getByText(/test2/i)).toBeInTheDocument();
    });
  });
});
