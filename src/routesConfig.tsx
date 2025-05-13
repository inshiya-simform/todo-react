import MainPage from "./component/MainPage/MainPage";
import About from "./component/About/About";
import TodoItem from "./component/TodoItem/TodoItem";
import Todos from "./component/Todo/Todo";
import Home from "./component/Home/Home";

export type RouteItems = {
    path: string;
    element: React.FC;
    children?: RouteItems[];
    index?:boolean;
};

export const routes: RouteItems[] = [
    {
        path:'/',
        element:MainPage,
        children:[
            {
                path:"/",
                index:true,
                element:Home,
            },
            {
                path:"todo",
                element:Todos,
                children: [
                    {
                        path:":paramId",
                        element:TodoItem,
                    }
                ]
            },
            {
                path:"about",
                element:About,
            }
        ]
    }
]