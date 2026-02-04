import { api } from "./client";
import type {
  TodoItem,
  TodoListItem,
  TodoItemPatch,
  DeleteResponse,
  ImageUploadResponse,
} from "@/types/todo";

// 목록 조회
export const getTodoList = (tenantId: string) =>
  api<TodoListItem[]>(`/api/${tenantId}/items`);

// 상세 조회
export const getTodo = (tenantId: string, itemId: string) =>
  api<TodoItem>(`/api/${tenantId}/items/${itemId}`);

// 생성
export const createTodo = (
  tenantId: string,
  body: { name: string; memo?: string; imageUrl?: string | null },
) => api<TodoItem>(`/api/${tenantId}/items`, { method: "POST", body });

// 수정
export const patchTodo = (
  tenantId: string,
  itemId: string,
  patch: TodoItemPatch,
) =>
  api<TodoItem>(`/api/${tenantId}/items/${itemId}`, {
    method: "PATCH",
    body: patch,
  });

// 삭제
export const deleteTodo = (tenantId: string, itemId: string) =>
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
