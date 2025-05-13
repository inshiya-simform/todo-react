import { List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import type { Todo } from "../../types/types";

interface ListTodoProp {
  todos: Array<Todo>;
}

const ListTodo = ({ todos }: ListTodoProp) => {
  return (
    <div>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Link to={`/todo/${todo.id}`}>{todo.task}</Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListTodo;
