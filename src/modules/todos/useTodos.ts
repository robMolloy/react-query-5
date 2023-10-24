import z from "zod";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { db } from "./todoDb";
import { initTodoSchema, todosSchema } from "./todoSchemas";

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const parsedTodos = await db().fetchTodos();
      return parsedTodos.success
        ? parsedTodos.data
        : ([] as z.infer<typeof todosSchema>);
    },
  });

  const mutation = useMutation({
    mutationFn: async (todo: z.infer<typeof initTodoSchema>) => {
      const parsedTodo = await db().addTodo(todo);
      if (parsedTodo.success) return parsedTodo.data;
    },
    onSuccess: (data) => {
      type Todos = z.infer<typeof todosSchema>;
      const queryData = queryClient.getQueryData(["todos"]) as Todos;
      if (data)
        return queryClient.setQueryData(["todos"], [...queryData, data]);
    },
  });

  const mutationValues = mutation.isPending
    ? { isAddTodoPending: true, pendingAddTodo: mutation.variables }
    : {};

  return {
    todos,
    addTodo: mutation.mutate,
    ...mutationValues,
  } as const;
};
