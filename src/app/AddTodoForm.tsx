"use client";

import { useState, useTransition } from "react";

export const AddTodoForm = ({ addNewTodo }: { addNewTodo: any }) => {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="w-full flex mb-10"
      onSubmit={(e) => {
        e.preventDefault();

        if (title.trim().length === 0) {
          return;
        }

        startTransition(() => {
          addNewTodo(title);
        });

        setTitle("");
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full px-4 py-2 border-b bg-slate-500"
      />
      <button
        type="submit"
        className="block px-4 py-2 border-b bg-slate-700 ml-1"
      >
        Add
      </button>
    </form>
  );
};
