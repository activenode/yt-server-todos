import { Todo } from "@/types";

const API_PATH = "http://127.0.0.1:3000/api/todos";

export const getTodos = async () => {
  return (await (
    await fetch(API_PATH, {
      next: {
        revalidate: 0,
      },
    })
  ).json()) as unknown as Array<Todo>;
};

export const deleteTodo = async (id: string | number) => {
  return await fetch(`${API_PATH}?id=${id}`, {
    next: {
      revalidate: 0,
    },
    method: "DELETE",
  });
};

export const addTodo = async (title: string) => {
  return await fetch(API_PATH, {
    next: {
      revalidate: 0,
    },
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
