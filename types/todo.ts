// Todo 목록 조회
export type TodoListItem = {
  id: string;
  name: string;
  isCompleted: boolean;
};

// Todo 상세 조회
export type TodoItem = {
  id: string;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string | null;
  isCompleted: boolean;
};

// Todo 항목 수정 요청 타입
export type TodoItemPatch = Partial<
  Pick<TodoItem, "name" | "memo" | "imageUrl" | "isCompleted">
>;

// Todo 항목 삭제 API 응답 타입
export type DeleteResponse = {
  message: string;
};

// 이미지 업로드 API 응답 타입
export type ImageUploadResponse = {
  url: string;
};
