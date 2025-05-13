import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { TodoProvider } from "../../store/TodoContext";
const MainPage = () => {
  return (
    <div>
      <Navbar />
      <TodoProvider>
        <Outlet />
      </TodoProvider>
    </div>
  );
};

export default MainPage;
