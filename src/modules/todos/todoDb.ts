import { apiUrl } from "@/constants/index";
import z from "zod";
import { todosSchema, todoSchema, initTodoSchema } from "./todoSchemas";

export const fetchTodos = async () => (await fetch(apiUrl)).json();
export const fetchParsedTodos = async () =>
  todosSchema.safeParse(await fetchTodos());

export const addTodo = async (todo: z.infer<typeof initTodoSchema>) => {
  const fetchConfig = { method: "POST", body: JSON.stringify(todo) };
  return (await fetch(apiUrl, fetchConfig)).json();
};
export const addParsedTodo = async (todo: z.infer<typeof initTodoSchema>) => {
  const resp = await addTodo(todo);
  return todoSchema.safeParse(resp);
};

export const db = () => ({
  fetchTodos: fetchParsedTodos,
  addTodo: addParsedTodo,
});
