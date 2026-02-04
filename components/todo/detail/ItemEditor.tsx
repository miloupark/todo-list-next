"use client";

import { useState } from "react";
import ItemMemo from "@/components/todo/detail/ItemMemo";
import ItemButtons from "@/components/todo/detail/ItemButtons";
import ItemImageUploader from "@/components/todo/detail/ItemImageUploader";

interface ItemEditorProps {
  initialMemo: string;
  initialImageUrl?: string | null;
  onSave: (data: { memo: string; imageUrl?: string | null }) => void;
  onDelete: () => void;
}

export default function ItemEditor({
  initialMemo,
  initialImageUrl,
  onSave,
  onDelete,
}: ItemEditorProps) {
  const [baseMemo, setBaseMemo] = useState(initialMemo);
  const [baseImageUrl, setBaseImageUrl] = useState<string | null>(
    initialImageUrl ?? null,
  );

  const [memo, setMemo] = useState(initialMemo);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialImageUrl ?? null,
  );

  const isDirty = memo !== baseMemo || previewUrl !== baseImageUrl;

  const handleSave = () => {
    if (!isDirty) return;

    onSave({
      memo,
      imageUrl: initialImageUrl ?? null,
    });
    setBaseMemo(memo);
    setBaseImageUrl(previewUrl);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <ItemImageUploader
        imageUrl={previewUrl}
        onImageChange={(file) => {
          setPreviewUrl(file ? URL.createObjectURL(file) : null);
        }}
      />
      <div className="flex flex-1 flex-col gap-4">
        <ItemMemo value={memo} onChange={setMemo} />
        <ItemButtons
          isDirty={isDirty}
          onSave={handleSave}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
