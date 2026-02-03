"use client";

import EmptyState from "@/components/todo/EmptyState";
import StatusBadge from "@/components/todo/StatusBadge";
import TodoListItem from "@/components/todo/TodoListItem";
import TodoInputBar from "@/components/todo/TodoSearchBar";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TodoItem = {
  id: string;
  text: string;
  isCompleted: boolean;
};

export default function Home() {
  const router = useRouter();

  const [items, setItems] = useState<TodoItem[]>([]);

  const todoItems = items.filter((item) => !item.isCompleted);
  const doneItems = items.filter((item) => item.isCompleted);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
  };

  const add = (text: string) => {
    setItems((prev) => [
      { id: crypto.randomUUID(), text, isCompleted: false },
      ...prev,
    ]);
  };

  return (
    <main className="flex flex-col gap-6 p-4 md:gap-10 md:p-6">
      <TodoInputBar onAdd={add} />

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
                  todoText={item.text}
                  checked={item.isCompleted}
                  onToggle={() => toggle(item.id)}
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
                  todoText={item.text}
                  checked={item.isCompleted}
                  onToggle={() => toggle(item.id)}
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
