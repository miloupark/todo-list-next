"use client";

import ItemEditor from "@/components/todo/detail/ItemEditor";
import TodoListItem from "@/components/todo/TodoListItem";
import { useTodoStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { itemId } = useParams<{ itemId: string }>();

  const todo = useTodoStore((s) => s.todos.find((t) => t.id === itemId));
  const toggleTodo = useTodoStore((s) => s.toggleTodo);
  const updateTodo = useTodoStore((s) => s.updateTodo);
  const deleteTodo = useTodoStore((s) => s.deleteTodo);

  if (!todo) return null;

  const onSave = (data: { memo: string; imageUrl?: string | null }) => {
    updateTodo(todo.id, { memo: data.memo, imageUrl: data.imageUrl ?? null });
  };

  const onDelete = () => {
    deleteTodo(todo.id);
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
