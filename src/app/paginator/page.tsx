type TodoType = {
    nombre: string,
    descripcion: string
};

type Todo = {
    nombre: string;

}

const TodoItem = ({ nombre, descripcion }: TodoType) => {
    return (
        <div>
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
        </div>
    )
}

export default () => {
    const listTodos: TodoType[] = [
        { nombre: 'nombre1', descripcion: 'Desc1' },
        { nombre: 'nombre2', descripcion: 'Desc2' }
    ];


    return (
        <div>
            {listTodos.map(todo => (
                <TodoItem key={todo.nombre} nombre={todo.nombre} descripcion={todo.descripcion} />
            ))}
        </div>
    )
};

