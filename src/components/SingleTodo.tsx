import { useEffect, useRef, useState } from "react"
import { Todo } from "../model"
import { MdEdit, MdDelete, MdDone } from "react-icons/md"
import { Draggable } from "react-beautiful-dnd"

type Props = {
  index: number
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDone = (id: number) => {
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    )
    setEdit(false)
  }

  const handleDelete = (id: number) => {
    setTodos(todos.filter((item) => item.id != id))
  }

  const handleEdit = (id: number, newTodo: string) => {
    setEdit(true)
    setTodos(
      todos.map((item) => (item.id === id ? { ...item, todo: newTodo } : item))
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (edit) {
      handleEdit(todo.id, editTodo)
      setEdit(false)
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={handleSubmit}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos-single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit && !todo.isDone ? (
            <input
              ref={inputRef}
              className="todos-single--text"
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value)
                handleEdit(todo.id, e.target.value)
              }}
            />
          ) : todo.isDone ? (
            <s className="todos-single--text">{todo.todo}</s>
          ) : (
            <span className="todos-single--text">{todo.todo}</span>
          )}

          <div>
            <span className="icon">
              <MdEdit onClick={handleEdit} />
            </span>
            <span className="icon">
              <MdDelete
                onClick={() => {
                  handleDelete(todo.id)
                }}
              />
            </span>
            <span
              className="icon"
              onClick={() => {
                handleDone(todo.id)
              }}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}
export default SingleTodo
