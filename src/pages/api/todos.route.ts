import { getRandomNumber } from "@/helpers";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const initTodoSchema = z.object({ content: z.string() });
const todoSchema = z.object({ id: z.string(), content: z.string() });
const todosSchema = z.array(todoSchema);
type InitTodo = z.infer<typeof initTodoSchema>;
type Todo = z.infer<typeof todoSchema>;
type Todos = z.infer<typeof todosSchema>;

const delay = (x: number, config?: { shouldReject?: boolean }) =>
  new Promise((res, rej) =>
    setTimeout(() => (config?.shouldReject ? rej(true) : res(true)), x)
  );

const todos: Todos = [
  { id: "id1", content: "todo1" },
  { id: "id2", content: "todo2" },
];

const addTodoToDb = (initTodo: InitTodo): Todo => {
  const todo = { ...initTodo, id: `id${getRandomNumber(10)}` };
  todos.push(todo);
  return todo;
};
const safeAddTodoToDb = (payload: unknown): Todo | undefined => {
  const parsedPayload = initTodoSchema.safeParse(payload);
  if (parsedPayload.success) return addTodoToDb(parsedPayload.data);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await delay(1000);

  if (req.method === "GET") return res.json(todos);

  if (req.method === "POST") {
    const payload = JSON.parse(req.body);
    const todo = safeAddTodoToDb(payload);
    return res.json(todo);
  }

  return await new Promise((_res, rej) => rej());
};
export default handler;
