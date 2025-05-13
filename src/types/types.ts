export interface Todo {
    id: string;
    isDone: boolean;
    task: string;
    createdAt: string;
  }
  
  export type TodoState = {
    todos: Todo[];
  };
  
  export type TodoAction =
    | { type: "ADD"; payload: Todo }
    | { type: "EDIT"; payload: { id: string; task: string } }
    | { type: "MARK_AS_DONE"; payload: { id: string } }
    | { type: "DELETE"; payload: { id: string } }
    | { type: "FILTER_BY_TITLE"; payload: { task: string } };