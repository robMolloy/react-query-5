import React from "react";
import { getRandomNumber } from "../helpers";
import { useTodos } from "@/modules/todos/useTodos";
import { TodoListItem } from "@/modules/todos/TodoListItem";
import { LoadingSpinner } from "@/modules/commonUi/LoadingSpinner";

export const Index = () => {
  const { todos, addTodo, isAddTodoPending, pendingAddTodo } = useTodos();

  if (!todos) return <LoadingSpinner />;
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
          <div style={{ display: "flex" }}>
            <LoadingSpinner />
            <TodoListItem
              transparent
              title="pending"
              content={pendingAddTodo.content}
            />
          </div>
        )}
      </ul>
    </>
  );
};

export default Index;
