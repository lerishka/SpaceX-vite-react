https://lerishka.github.io/SpaceX-vite-react/

У меня не вышло покрыть сценарий открытия модалки из-за ошибки с createPortal - тесты не проходились никак, даже с условием дефолтного создания "modal-root" в тесте на верхнем уровне теста. Не знаю как решить этот момент - оставила просто базовый тест на отрисовку для CardList. Возможно там проблемы с какими-то совместимостями, или я что-то делаю не так. Но вот весь код теста, когда я пыталась сделать проверку открытия модалки по кнопке:

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
  beforeAll(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  });

  afterAll(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      modalRoot.remove();
    }
  });

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

  it("Should open the correct modal", async () => {
    render(<CardList />);

    await waitFor(() => {
      expect(screen.getByText(/test1/i)).toBeInTheDocument();
      expect(screen.getByText(/test2/i)).toBeInTheDocument();
    });

    const buttons = screen.getAllByRole("button", { name: /see more/i });
    expect(buttons.length).toBe(2);

    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(screen.getByRole("modal")).toBeInTheDocument();
    });
  });
});

