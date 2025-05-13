import {
  Autocomplete,
  TextField,
  Box,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import ListTodo from "./ListTodo";
import type { Todo } from "../../types/types";

interface SearchProp {
  todos: {
    todos: Array<Todo>;
  };
}
export default function Search({ todos }: SearchProp) {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Array<Todo>>(
    todos.todos
  );
  let options: Array<string> = [];
  if (todos.todos.length != 0) {
    options = todos.todos.map((todo: Todo) => todo.task);
  }
  const handleInputChange = (
    event: React.SyntheticEvent,
    newInputValue: string
  ) => {
    setInputValue(newInputValue);
    const newFiltered = todos.todos.filter((todo: Todo) =>
      todo.task.toLowerCase().includes(newInputValue.toLowerCase())
    );
    setFilteredOptions(newFiltered);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4,width:'100%' }}>
      <Paper elevation={3} sx={{ p: 3, width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Search Todo
        </Typography>

        <Autocomplete
          options={options}
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          inputValue={inputValue}
          disabled={options.length === 0}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Todo"
              placeholder="Type to search"
              variant="outlined"
              fullWidth
            />
          )}
          sx={{ mb: 3 }}
        />

        {options.length === 0 ? (
          <Alert severity="info">
            No todos available. Please add some to search.
          </Alert>
        ) : (
          <Paper elevation={1} sx={{ p: 2 }}>
            <ListTodo todos={filteredOptions.length !== 0? filteredOptions :todos.todos} />
          </Paper>
        )}
      </Paper>
    </Box>
  );
}
