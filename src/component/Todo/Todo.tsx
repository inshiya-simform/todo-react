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
import { TodoContext } from "../../store/TodoContext";
import { ACTION } from "../../Constants";

type Action = keyof typeof ACTION

const Todos = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [isDialodOpen, setIsDialogOpen] = useState(false);
  const todoRef = useRef<HTMLInputElement>(null);
  function handleAddDialog(action:Action) {
    setIsDialogOpen((prev) => !prev);
    if (action === 'SAVE') {
      console.log("dsuj")
      if (!todoRef.current) {
        return;
      }
      const todo = todoRef.current.value.trim();
      if (!todo) return;
      const currentTime = getFormattedTime();
      dispatch({
        type: "ADD",
        payload: {
          id: nanoid(),
          task: todo,
          isDone: false,
          createdAt: currentTime,
        },
      });
      todoRef.current.value = "";
    }
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Search todos={todos} />
      <Stack direction="row" sx={{ mt: 3 }} spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddDialog('ADD')}
        >
          Add Todo
        </Button>
      </Stack>
      <Dialog
        open={isDialodOpen}
        onClose={() => handleAddDialog('CLOSE')}
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
            onClick={() => handleAddDialog('SAVE')}
            variant="contained"
            color="success"
          >
            Save & Close
          </Button>
          <Button
            onClick={() => handleAddDialog('CLOSE')}
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

export default Todos;
