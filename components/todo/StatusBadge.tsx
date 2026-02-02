import { cn } from "@/lib/cn";

type StatusBadgeProps = {
  status: "todo" | "done";
  className?: string;
};

const LABEL: Record<StatusBadgeProps["status"], string> = {
  todo: "TO DO",
  done: "DONE",
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const base =
    "inline-flex h-9 items-center rounded-3xl w-fit px-7 py-1 font-santokki font-bold";

  const variants = {
    todo: "bg-lime-300 text-green-700",
    done: "bg-green-700 text-amber-300",
  };

  return (
    <span className={cn(base, variants[status], className)}>
      {LABEL[status]}
    </span>
  );
}
