import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TodoItem, TodoItemPatch } from "@/types/todo";

type TodoItemCreate = Pick<TodoItem, "name"> &
  Partial<Pick<TodoItem, "memo" | "imageUrl">>;

type TodoStore = {
  todos: TodoItem[];
  addTodo: (input: TodoItemCreate) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, patch: TodoItemPatch) => void;
  deleteTodo: (id: string) => void;
};

const makeId = () => crypto.randomUUID();

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: ({ name, memo = "", imageUrl = null }) =>
        set((s) => ({
          todos: [
            {
              id: makeId(),
              tenantId: "default",
              name,
              memo,
              imageUrl,
              isCompleted: false,
            },
            ...s.todos,
          ],
        })),

      toggleTodo: (id) =>
        set((s) => ({
          todos: s.todos.map((t) =>
            t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
          ),
        })),

      updateTodo: (id, patch) =>
        set((s) => ({
          todos: s.todos.map((t) => (t.id === id ? { ...t, ...patch } : t)),
        })),

      deleteTodo: (id) =>
        set((s) => ({
          todos: s.todos.filter((t) => t.id !== id),
        })),
    }),
    { name: "todos-store" },
  ),
);
