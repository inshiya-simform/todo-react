import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./component/Home/Home";
import About from "./component/About/About";
import TodoItem from "./component/TodoItem/TodoItem";
import Todo from "./component/Todo/Todo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<div>Welcome to todo app.</div>}/>
          <Route path="todo" element={<Todo />}> 
            <Route path=":paramId" element={<TodoItem />} />
          </Route>
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
