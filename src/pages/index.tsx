import React from "react";
import { getRandomNumber } from "../helpers";
import { useTodos } from "@/modules/todos/useTodos";
import { TodoListItem } from "@/modules/todos/TodoListItem";

export const Index = () => {
  const { todos, addTodo, isAddTodoPending, pendingAddTodo } = useTodos();

  return (
    <>
      <button onClick={() => addTodo({ content: `todo ${getRandomNumber()}` })}>
        add todo
      </button>
      <ul>
        {todos?.map((todo) => (
          <TodoListItem key={todo.id} title={todo.id} content={todo.content} />
        ))}
        {isAddTodoPending && (
          <TodoListItem
            transparent
            title={"pending"}
            content={pendingAddTodo.content}
          />
        )}
      </ul>
    </>
  );
};

export default Index;
