import { cn } from "@/lib/cn";
import Image from "next/image";
import { useState } from "react";

type TodoSearchBarProps = {
  onAdd: (text: string) => void;
};

export default function TodoSearchBar({ onAdd }: TodoSearchBarProps) {
  const [value, setValue] = useState("");

  const trimmed = value.trim();
  const isDisabled = trimmed.length === 0;

  const submit = () => {
    if (isDisabled) return;
    onAdd(trimmed);
    setValue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex items-center gap-2 md:gap-4"
    >
      <label htmlFor="todo" className="sr-only">
        할 일 입력
      </label>

      <input
        id="todo"
        name="todo"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="할 일을 입력해주세요."
        className="h-14 w-full rounded-full border-2 border-slate-900 bg-slate-100 px-6 shadow-[3px_4px_0_0_#0f172a] focus:bg-violet-50 focus:outline-none"
      />

      <button
        type="submit"
        disabled={isDisabled}
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center gap-2 rounded-3xl border-2 border-slate-900 shadow-[3px_4px_0_0_#0f172a] md:w-40.5 md:gap-1 md:rounded-full lg:w-42",
          isDisabled
            ? "bg-slate-200 text-slate-900"
            : "bg-violet-600 text-white",
        )}
      >
        <Image
          src={
            isDisabled ? "/icon/plus_sm_black.svg" : "/icon/plus_sm_white.svg"
          }
          alt=""
          width={16}
          height={16}
        />
        <span className="hidden font-bold md:block">추가하기</span>
      </button>
    </form>
  );
}
