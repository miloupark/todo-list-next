import { api } from "./client";
import type {
  TodoItem,
  TodoListItem,
  TodoItemPatch,
  DeleteResponse,
  ImageUploadResponse,
} from "@/types/todo";

// 목록 조회
export const getTodoList = (tenantId: string, page = 1, pageSize = 10) => {
  const qs = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  return api<TodoListItem[]>(`/api/${tenantId}/items?${qs.toString()}`);
};

// 상세 조회
export const getTodo = (tenantId: string, itemId: number) =>
  api<TodoItem>(`/api/${tenantId}/items/${itemId}`);

// 생성
export const createTodo = (
  tenantId: string,
  body: { name: string; memo?: string; imageUrl?: string | null },
) => {
  const { name, memo, imageUrl } = body;

  const payload: { name: string; memo?: string; imageUrl?: string | null } = {
    name,
  };

  if (memo != null) payload.memo = memo;
  if (imageUrl != null && imageUrl !== "") payload.imageUrl = imageUrl;

  return api<TodoItem>(`/api/${tenantId}/items`, {
    method: "POST",
    body: payload,
  });
};

// 수정
export const patchTodo = (
  tenantId: string,
  itemId: number,
  patch: TodoItemPatch,
) =>
  api<TodoItem>(`/api/${tenantId}/items/${itemId}`, {
    method: "PATCH",
    body: patch,
  });

// 삭제
export const deleteTodo = (tenantId: string, itemId: number) =>
  api<DeleteResponse>(`/api/${tenantId}/items/${itemId}`, { method: "DELETE" });

// 이미지 업로드
export const uploadImage = (tenantId: string, file: File) => {
  const form = new FormData();
  form.append("image", file);

  return api<ImageUploadResponse>(`/api/${tenantId}/images/upload`, {
    method: "POST",
    formData: form,
  });
};
