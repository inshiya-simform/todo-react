import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { TodoContext } from "../../store/TodoContext";

type RouteParam = {
  paramId: string;
};
const TodoItem = () => {
  const { paramId } = useParams<RouteParam>();
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos, dispatch } = useContext(TodoContext);
  const todo = todos.todos.find((todo) => todo.id === paramId)!;

  function handleEdit() {
    setIsEdit(true);
    if (!todo) return;
    if (isEdit === true) {
      dispatch({
        type: "EDIT",
        payload: {
          id: todo.id,
          task: inputRef.current?.value ? inputRef.current?.value : todo.task,
        },
      });
      setIsEdit(false);
    }
  }
  function markAsDone() {
    dispatch({
      type: "MARK_AS_DONE",
      payload: { id: todo.id },
    });
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, maxWidth: 500, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Todo Item: {paramId}
        </Typography>

        <Box sx={{ mb: 2 }}>
          {isEdit ? (
            <TextField
              inputRef={inputRef}
              variant="filled"
              fullWidth
              label="Edit Task"
              defaultValue={todo.task}
            />
          ) : (
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {todo.task}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Chip label={`Created at: ${todo.createdAt}`} variant="outlined" />
          {todo.isDone && <Chip label="Completed" color="success" />}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            onClick={handleEdit}
            variant="contained"
            color={isEdit ? "primary" : "success"}
            fullWidth
          >
            {isEdit ? "Save" : "Edit"}
          </Button>
          <Button
            onClick={markAsDone}
            variant="contained"
            color={todo.isDone ? "inherit" : "warning"}
            fullWidth
          >
            {todo.isDone ? "Marked as Done" : "Mark as Done"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default TodoItem;
