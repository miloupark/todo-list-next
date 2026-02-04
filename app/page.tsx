"use client";

import EmptyState from "@/components/todo/EmptyState";
import StatusBadge from "@/components/todo/StatusBadge";
import TodoListItem from "@/components/todo/TodoListItem";
import TodoInputBar from "@/components/todo/TodoSearchBar";
import { useTodoStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const todos = useTodoStore((s) => s.todos);
  const addTodo = useTodoStore((s) => s.addTodo);
  const toggleTodo = useTodoStore((s) => s.toggleTodo);

  const todoItems = todos.filter((item) => !item.isCompleted);
  const doneItems = todos.filter((item) => item.isCompleted);

  return (
    <main className="flex flex-col gap-6 p-4 md:gap-10 md:p-6">
      <TodoInputBar onAdd={(text) => addTodo({ name: text })} />

      {/* TODO 섹션 */}
      <div className="flex flex-col gap-12 md:flex-row md:gap-6">
        <section className="flex flex-col gap-4 md:flex-1">
          <StatusBadge status="todo" />
          <ul className="flex flex-col gap-4">
            {todoItems.length === 0 ? (
              <EmptyState
                image={{
                  src: "/img/todo_sm.svg",
                  alt: "할 일이 없는 상태",
                }}
                title="할 일이 없어요."
                description="TODO를 새롭게 추가해주세요!"
              />
            ) : (
              todoItems.map((item) => (
                <TodoListItem
                  key={item.id}
                  todoText={item.name}
                  checked={item.isCompleted}
                  onToggle={() => toggleTodo(item.id)}
                  onClick={() => router.push(`/items/${item.id}`)}
                />
              ))
            )}
          </ul>
        </section>

        {/* DONE 섹션 */}
        <section className="flex flex-col gap-4 md:flex-1">
          <StatusBadge status="done" />
          <ul className="flex flex-col gap-4">
            {doneItems.length === 0 ? (
              <EmptyState
                image={{
                  src: "/img/done_sm.svg",
                  alt: "할 일이 없는 상태",
                }}
                title="아직 다 한 일이 없어요."
                description="해야 할 일을 체크해보세요!"
              />
            ) : (
              doneItems.map((item) => (
                <TodoListItem
                  key={item.id}
                  todoText={item.name}
                  checked={item.isCompleted}
                  onToggle={() => toggleTodo(item.id)}
                  onClick={() => router.push(`/items/${item.id}`)}
                />
              ))
            )}
          </ul>
        </section>
      </div>
    </main>
  );
}
