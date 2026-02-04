import { cn } from "@/lib/cn";
import Image from "next/image";

type ItemButtonsProps = {
  isDirty: boolean;
};

export default function ItemButtons({ isDirty }: ItemButtonsProps) {
  return (
    <div className="flex justify-center gap-2 md:justify-end">
      <button
        type="button"
        disabled={!isDirty}
        className={cn(
          "flex h-14 w-42 shrink-0 items-center justify-center gap-1 rounded-full border-2 border-slate-900 shadow-[3px_4px_0_0_#0f172a]",
          isDirty ? "bg-lime-300" : "bg-slate-200",
        )}
      >
        <Image src={"/icon/check_stroke.svg"} alt="" width={16} height={16} />
        <span className="font-bold">수정 완료</span>
      </button>
      <button
        type="button"
        className="flex h-14 w-42 shrink-0 items-center justify-center gap-1 rounded-full border-2 border-slate-900 bg-rose-500 text-white shadow-[3px_4px_0_0_#0f172a]"
      >
        <Image src={"/icon/x.svg"} alt="" width={16} height={16} />
        <span className="font-bold">삭제하기</span>
      </button>
    </div>
  );
}
