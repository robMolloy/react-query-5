import z from "zod";
import { initTodoSchema } from "./todoSchemas";

export const TodoListItem = (
  p: { transparent?: boolean; title: string } & z.infer<typeof initTodoSchema>
) => {
  const style = p.transparent ? { opacity: 0.5 } : {};
  return <li style={style}>{`${p.title}: ${p.content}`}</li>;
};
