import { apiUrl } from "@/constants/index";
import z from "zod";
import { todosSchema, todoSchema, initTodoSchema } from "./todoSchemas";

const fetchTodos = async () => (await fetch(apiUrl)).json();
const fetchParsedTodos = async () => todosSchema.safeParse(await fetchTodos());

const addTodo = async (todo: z.infer<typeof initTodoSchema>) => {
  const fetchConfig = { method: "POST", body: JSON.stringify(todo) };
  return (await fetch(apiUrl, fetchConfig)).json();
};
const addParsedTodo = async (todo: z.infer<typeof initTodoSchema>) => {
  const resp = await addTodo(todo);
  return todoSchema.safeParse(resp);
};

export const todoDbInterface = () => ({
  fetchTodos: fetchParsedTodos,
  addTodo: addParsedTodo,
});
