export type TodoListItem = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export type TodoItem = {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
};

export type TodoItemPatch = Partial<
  Pick<TodoItem, "name" | "memo" | "imageUrl" | "isCompleted">
>;

export type DeleteResponse = {
  message: string;
};

export type ImageUploadResponse = {
  imageUrl: string;
};
