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

const addTodoToDb = (initTodo: InitTodo) => {
  const todo = { ...initTodo, id: `id${getRandomNumber(10)}` } as Todo;
  todos.push(todo);
  return todo;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await delay(1000);

  if (req.method === "GET") return res.json(todos);

  if (req.method === "POST") {
    const initTodo = JSON.parse(req.body);
    const parsedInitTodo = initTodoSchema.safeParse(initTodo);
    if (parsedInitTodo.success) {
      const todo = addTodoToDb(parsedInitTodo.data);
      return res.json(todo);
    }
  }

  return await delay(0, { shouldReject: true });
};
export default handler;
