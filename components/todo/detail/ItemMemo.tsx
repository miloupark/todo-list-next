import Image from "next/image";
import { useState } from "react";

export default function ItemMemo() {
  const [memo, setMemo] = useState("");

  return (
    <section className="relative h-77 w-full">
      {/* 메모 배경 이미지 */}
      <Image
        src="/img/memo.svg"
        alt="메모 배경"
        fill
        className="rounded-3xl object-cover"
        priority
      />

      {/* 메모 타이틀 */}
      <p className="absolute top-4 right-0 left-0 text-center font-bold text-amber-800">
        Memo
      </p>

      {/* 메모 입력 영역 */}
      <div className="absolute top-14 right-6 bottom-6 left-6">
        <textarea
          value={memo}
          aria-label="메모 입력"
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력하세요"
          className="memo-scroll h-full w-full resize-none overflow-y-auto bg-transparent px-4 py-2 text-slate-800 outline-none"
        />
      </div>
    </section>
  );
}
