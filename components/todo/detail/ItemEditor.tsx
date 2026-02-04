"use client";

import { useState } from "react";
import ItemMemo from "@/components/todo/detail/ItemMemo";
import ItemButtons from "@/components/todo/detail/ItemButtons";
import ItemImageUploader from "@/components/todo/detail/ItemImageUploader";
import { uploadImage } from "@/lib/api/todo";
import { TENANT_ID } from "@/lib/constant";

interface ItemEditorProps {
  initialMemo: string;
  initialImageUrl?: string | null;
  onSave: (data: { memo: string; imageUrl?: string | null }) => void;
  onDelete: () => void;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ENGLISH_FILENAME_REGEX = /^[A-Za-z0-9._-]+$/;

function validateImageFile(file: File): string | null {
  if (file.size > MAX_IMAGE_SIZE) {
    return "이미지는 5MB 이하만 업로드할 수 있어요.";
  }
  if (!ENGLISH_FILENAME_REGEX.test(file.name)) {
    return "파일명은 영어만 사용해주세요.";
  }
  return null;
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
      imageUrl: previewUrl ?? null,
    });
    setBaseMemo(memo);
    setBaseImageUrl(previewUrl);
  };

  const handleImageChange = async (file: File | null) => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const error = validateImageFile(file);
    if (error) {
      alert(error);
      return;
    }

    try {
      const { url } = await uploadImage(TENANT_ID, file);
      setPreviewUrl(url);
    } catch (e) {
      console.error("이미지 업로드 실패", e);
      alert("이미지 업로드에 실패했어요.");
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
      <ItemImageUploader
        imageUrl={previewUrl}
        onImageChange={handleImageChange}
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
