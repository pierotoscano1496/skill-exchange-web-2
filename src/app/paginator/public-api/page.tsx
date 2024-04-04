"use client";

import Categoria from "@/interfaces/models/Categoria";
import axios, { AxiosInstance } from "axios";
import { todo } from "node:test";
import { useEffect, useState } from "react";

type TodoType = {
    userId: number,
    id: number,
    title: string,
    completed: boolean
};

type Todo = {
    nombre: string;

}

const axiosBackend: AxiosInstance = axios.create({
    baseURL: "/api/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

console.log(process.env.NEXT_PUBLIC_MAIN_URL_BACKEND)

const TodoItem = ({ todo }: { todo: TodoType }) => {
    return (
        <div>
            <h2>{todo.title}</h2>
            <p>{todo.completed ? "Completo" : "Incompleto"}</p>
        </div>
    )
}

export default () => {
    const [listCategorias, setListCategorias] = useState<TodoType[]>([]);

    useEffect(() => {
        axiosBackend.get("todos")
            .then(response => setListCategorias(response.data as TodoType[]));
    }, []);

    const addTodo = async () => {
        const response = await axiosBackend.post("todos", {
            userId: 1,
            title: "delectus aut autem",
            completed: false
        });

        const result = response.data;
        if (result.id) {
            alert("Inserted " + result.id)
        }
    }

    return (
        <div>
            <button onClick={() => addTodo()}>Añadir Todo</button>
            {listCategorias.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
};

