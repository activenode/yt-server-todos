import { Todo } from "@/types";
import { AddTodoForm } from "./AddTodoForm";
import { TodoItem } from "./TodoItem";
import * as TodoApi from "@/utils/api-utils/todo-api";
import { revalidatePath } from "next/cache";

type Todos = Array<Todo>;

export default async function Home() {
  const todos: Todos = await TodoApi.getTodos();

  const addNewTodo = async (title: string) => {
    "use server";
    await TodoApi.addTodo(title);
    revalidatePath("/");
  };

  const deleteTodo = async (id: string | number) => {
    "use server";
    await TodoApi.deleteTodo(id);
    revalidatePath("/");
  };

  return (
    <div className="w-[400px] max-w-[97%] mx-auto flex flex-col items-center justify-center min-h-screen py-2">
      <AddTodoForm addNewTodo={addNewTodo} />

      <ul className="w-full flex flex-col space-y-2">
        {(todos || []).map((todo) => (
          <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}
