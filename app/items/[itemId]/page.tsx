"use client";

import ItemEditor from "@/components/todo/detail/ItemEditor";
import TodoListItem from "@/components/todo/TodoListItem";
import { useTodoStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { itemId } = useParams<{ itemId: string }>();

  const id = Number(itemId);

  const todo = useTodoStore((s) => s.todos.find((t) => t.id === id));
  const fetchTodo = useTodoStore((s) => s.fetchTodo);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  useEffect(() => {
    if (!Number.isNaN(id)) {
      fetchTodo(id);
    }
  }, [id, fetchTodo]);

  if (!todo) return null;

  const onSave = async (data: { memo: string; imageUrl?: string | null }) => {
    await updateTodo(todo.id, {
      memo: data.memo,
      imageUrl: data.imageUrl ?? "",
    });
    router.push("/");
  };

  const onDelete = async () => {
    await deleteTodo(todo.id);
    router.push("/");
  };

  return (
    <main className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
      <TodoListItem
        todoText={todo.name}
        checked={todo.isCompleted}
        variant="detail"
        onToggle={() => toggleTodo(todo.id)}
      />

      <ItemEditor
        key={todo.id}
        initialMemo={todo.memo ?? ""}
        initialImageUrl={todo.imageUrl ?? null}
        onSave={onSave}
        onDelete={onDelete}
      />
    </main>
  );
}
