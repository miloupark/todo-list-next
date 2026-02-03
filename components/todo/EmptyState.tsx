import Image from "next/image";

type EmptyStateProps = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
};

export default function EmptyState({
  image,
  title,
  description,
}: EmptyStateProps) {
  return (
    <li className="flex flex-col items-center text-slate-400">
      <Image
        src={image.src}
        alt={image.alt}
        width={120}
        height={120}
        className="h-auto pb-2 md:w-60"
      />
      <p>{title}</p>
      <p className="-mt-1">{description}</p>
    </li>
  );
}
