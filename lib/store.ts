import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TodoItem, TodoItemPatch, TodoListItem } from "@/types/todo";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoList,
  patchTodo,
} from "@/lib/api/todo";
import { TENANT_ID } from "@/lib/constant";

type TodoItemCreate = Pick<TodoItem, "name">;

type TodoStore = {
  todos: TodoItem[];
  fetchTodos: (page?: number, pageSize?: number) => Promise<void>;
  fetchTodo: (itemId: number) => Promise<void>;
  addTodo: (input: TodoItemCreate) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, patch: TodoItemPatch) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
};

function mergeList(
  prevTodos: TodoItem[],
  list: TodoListItem[],
  tenantId: string,
): TodoItem[] {
  const prevById = new Map(prevTodos.map((t) => [t.id, t]));

  return list.map((t) => {
    const prev = prevById.get(t.id);

    return {
      ...(prev ?? {
        id: t.id,
        tenantId,
        memo: "",
        imageUrl: "",
      }),
      id: t.id,
      tenantId,
      name: t.name,
      isCompleted: t.isCompleted,
    };
  });
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      todos: [],

      fetchTodos: async (page = 1, pageSize = 10) => {
        const list = await getTodoList(TENANT_ID, page, pageSize);

        set((s) => ({
          todos: mergeList(s.todos, list, TENANT_ID),
        }));
      },

      fetchTodo: async (itemId: number) => {
        const item = await getTodo(TENANT_ID, itemId);

        set((s) => ({
          todos: s.todos.some((t) => t.id === itemId)
            ? s.todos.map((t) => (t.id === itemId ? item : t))
            : [...s.todos, item],
        }));
      },

      addTodo: async ({ name }) => {
        const item = await createTodo(TENANT_ID, { name });
        set((s) => ({ todos: [item, ...s.todos] }));
      },

      toggleTodo: async (id: number) => {
        const t = get().todos.find((x) => x.id === id);
        if (!t) return;

        const item = await patchTodo(TENANT_ID, id, {
          isCompleted: !t.isCompleted,
        });

        set((s) => ({
          todos: s.todos.map((x) => (x.id === id ? item : x)),
        }));
      },

      updateTodo: async (id: number, patch: TodoItemPatch) => {
        const item = await patchTodo(TENANT_ID, id, patch);

        set((s) => ({
          todos: s.todos.map((t) => (t.id === id ? item : t)),
        }));
      },

      deleteTodo: async (id: number) => {
        await deleteTodo(TENANT_ID, id);
        set((s) => ({ todos: s.todos.filter((t) => t.id !== id) }));
      },
    }),
    { name: "todos-store" },
  ),
);
