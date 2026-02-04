"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import { useRef } from "react";

export default function ItemImageUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handlePickImage = () => inputRef.current?.click();

  return (
    <section className="relative flex h-77 min-w-[384px] justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" />

      {/* placeholder 이미지 */}
      <Image src="/icon/img.svg" alt="" width={64} height={64} />

      <button
        type="button"
        onClick={handlePickImage}
        aria-label="이미지 업로드"
        className={cn(
          "absolute right-4 bottom-4 grid h-16 w-16 place-items-center rounded-full bg-slate-200",
        )}
      >
        <Image src="/icon/plus_lg.svg" alt="" width={24} height={24} />
      </button>
    </section>
  );
}
