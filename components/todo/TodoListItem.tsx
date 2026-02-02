"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";

type Variant = "list" | "detail";

type TodoListItemProps = {
  todoText: string;
  checked: boolean;
  variant?: Variant;
  onToggle?: () => void;
  onClick?: () => void;
};

export default function TodoListItem({
  todoText,
  checked,
  variant = "list",
  onToggle,
  onClick,
}: TodoListItemProps) {
  const isDetail = variant === "detail";

  const checkboxSrc = checked
    ? "/icon/check_active.svg"
    : "/icon/check_default.svg";

  return (
    <li
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className={cn(
        "w-full border-2 border-slate-900",
        "flex cursor-pointer items-center select-none",
        checked ? "bg-violet-100" : "bg-white",
        isDetail
          ? "h-16 justify-center gap-4 rounded-3xl px-3"
          : "h-12.5 justify-start gap-4 rounded-full px-3",
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
        aria-label={checked ? "완료 해제" : "완료"}
        className="shrink-0"
      >
        {/* alt는 비워두고 접근성은 버튼 aria-label로 처리 */}
        <Image src={checkboxSrc} alt="" width={32} height={32} />
      </button>
      <span
        className={cn(
          "text-base text-slate-900",
          isDetail ? "underline underline-offset-1" : checked && "line-through",
        )}
      >
        {todoText}
      </span>
    </li>
  );
}
