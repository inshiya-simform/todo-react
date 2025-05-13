import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { nanoid } from "nanoid";
import { getFormattedTime } from "../../utils/getFormatedTime";
import Search from "./Search";
import type { Todo } from "../../types/types";
import { TodoContext } from "../../store/TodoContext";

const Todo = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [isDialodOpen, setIsDialogOpen] = useState(false);
  const todoRef = useRef<HTMLInputElement>(null);
  function handleAddDialog(action: string) {
    setIsDialogOpen((prev) => !prev);
    if (action === "save") {
      if (!todoRef.current) {
        return;
      }
      const todo = todoRef.current.value.trim();
      if (!todo) return;
      const currentTime = getFormattedTime();
      const newTodos = dispatch({
        type: "ADD",
        payload: {
          id: nanoid(),
          task: todo,
          isDone: false,
          createdAt: currentTime,
        },
      });
      todoRef.current.value = "";
      localStorage.setItem("todos", JSON.stringify(newTodos));
    }
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Search todos={todos} />
      <Stack direction="row" sx={{ mt: 3 }} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddDialog("add")}
        >
          Add Todo
        </Button>
      </Stack>
      <Dialog
        open={isDialodOpen}
        onClose={() => handleAddDialog("close")}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Todo</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-basic"
            label="Todo"
            variant="filled"
            inputRef={todoRef}
            fullWidth
            autoFocus
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleAddDialog("save")}
            variant="contained"
            color="success"
          >
            Save & Close
          </Button>
          <Button
            onClick={() => handleAddDialog("close")}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Outlet />
    </Box>
  );
};

export default Todo;
