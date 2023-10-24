import z from "zod";

export const initTodoSchema = z.object({ content: z.string() });
export const todoSchema = z.object({ id: z.string(), content: z.string() });
export const todosSchema = z.array(todoSchema);
