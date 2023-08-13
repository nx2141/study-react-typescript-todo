import { isConstructorDeclaration } from "typescript";
import "./App.css";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [todoLists, setTodoLists] = useState<Todo[]>([]);
  const [listValue, setListValue] = useState("");

  type Todo = {
    todoValue: string;
    id: number;
    checked: boolean;
  };
  //テキスト入力内容を取得
  function handleChange(e: string) {
    setListValue(e);
    console.log(listValue);
  }
  //Todoを登録
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // 新しいTodoオブジェクトの作成
    const newTodo: Todo = {
      todoValue: listValue,
      id: todoLists.length, // ここでは単純に配列の長さをIDとして使用しますが、通常はユニークなIDを生成するべきです
      checked: false,
    };
    if (newTodo.todoValue === "") {
      console.log("BLANK SUBMIT");
      return;
    }
    console.log("SUBMIT!");
    let newTodoList: Todo[] = [...todoLists, newTodo];
    setTodoLists(newTodoList);
    setListValue(""); // 入力欄をクリア
  }
  //Todoを削除
  function handleDelete(id: number) {
    console.log("delete of ID:", id);
    const newTodoList = todoLists.filter((todo) => todo.id !== id);
    setTodoLists(newTodoList);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="TEXT HERE"
          onChange={(e) => handleChange(e.target.value)}
          value={listValue}
        ></input>
        <button type="submit">
          登録
          <SendIcon />
        </button>
      </form>
      <hr />
      <ul className="todoList">
        {todoLists.map((todoList) => (
          <li key={todoList.id}>
            {todoList.todoValue}
            <button type="button" onClick={() => handleDelete(todoList.id)}>
              <DeleteIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
