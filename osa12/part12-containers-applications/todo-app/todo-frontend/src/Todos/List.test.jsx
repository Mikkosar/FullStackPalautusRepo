import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TodoList from "./List";
import "@testing-library/jest-dom";

describe("TodoList", () => {
  it("renders todo items correctly", () => {
    const todos = [
      { text: "Buy milk", done: false },
      { text: "Walk the dog", done: true },
    ];

    const onClickDelete = vi.fn();
    const onClickComplete = vi.fn();

    render(
      <TodoList
        todos={todos}
        deleteTodo={onClickDelete}
        completeTodo={onClickComplete}
      />
    );

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Walk the dog")).toBeInTheDocument();
  });
});
