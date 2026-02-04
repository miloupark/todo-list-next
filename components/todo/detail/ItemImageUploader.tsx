"use client";

import { cn } from "@/lib/cn";
import Image from "next/image";
import { useRef } from "react";

interface ItemImageUploaderProps {
  imageUrl?: string | null;
  onImageChange?: (file: File | null) => void;
}

export default function ItemImageUploader({
  imageUrl = null,
  onImageChange,
}: ItemImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hasImage = Boolean(imageUrl);

  const handlePickImage = () => inputRef.current?.click();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] ?? null;
    onImageChange?.(file);
    e.currentTarget.value = "";
  };

  return (
    <section
      className={cn(
        "relative flex h-77 min-w-[384px] justify-center overflow-hidden rounded-3xl",
        hasImage
          ? "border-transparent"
          : "border-2 border-dashed border-slate-300 bg-slate-50",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {hasImage ? (
        <Image
          src={imageUrl!}
          alt="첨부 이미지"
          fill
          className="object-cover"
          unoptimized
        />
      ) : (
        <Image src="/icon/img.svg" alt="" width={64} height={64} priority />
      )}

      <button
        type="button"
        onClick={handlePickImage}
        aria-label="이미지 업로드"
        className={cn(
          "absolute right-4 bottom-4 grid h-16 w-16 place-items-center rounded-full",
          hasImage
            ? "border-2 border-slate-900 bg-slate-900/50 text-white"
            : "bg-slate-200",
        )}
      >
        <Image
          src={hasImage ? "/icon/edit.svg" : "/icon/plus_lg.svg"}
          alt=""
          width={24}
          height={24}
        />
      </button>
    </section>
  );
}
