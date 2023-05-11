import { Todo } from "@/types";
import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";

const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

const jsonDirectory = () => {
  return path.join(process.cwd(), "src/app/api/todos");
};

async function fetchJsonData() {
  const data = await fs.readFile(jsonDirectory() + "/todos.json", "utf-8");
  return data;
}

export async function GET() {
  console.log("GET");
  const data = await fetchJsonData();
  const dataJson = JSON.parse(data) as Todo[];

  const onlyNotCompleted = dataJson.filter((todo) => !todo.completed);

  return new Response(JSON.stringify(onlyNotCompleted), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const existingJsonData: Array<Todo> = JSON.parse(await fetchJsonData());

  const body = await request.json();
  const randomId = generateRandomId();
  const newTodo = {
    id: randomId,
    title: body.title,
    completed: false,
  };

  const newJsonData = [...existingJsonData, newTodo];

  await fs.writeFile(
    jsonDirectory() + "/todos.json",
    JSON.stringify(newJsonData),
    {
      encoding: "utf-8",
    }
  );

  return new Response(JSON.stringify(body), {
    status: 200,
  });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const existingJsonData: Array<Todo> = JSON.parse(await fetchJsonData());
  const id = searchParams.get("id");

  console.log("id", id);

  const newJsonData = existingJsonData.filter(
    (todo) => `${todo.id}` !== `${id}`
  );
  await fs.writeFile(
    jsonDirectory() + "/todos.json",
    JSON.stringify(newJsonData),
    {
      encoding: "utf-8",
    }
  );

  return new Response("Deleted", {
    status: 200,
  });
}
