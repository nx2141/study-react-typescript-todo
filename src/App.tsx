import { isConstructorDeclaration } from "typescript";
import "./App.css";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function App() {
  //このコードでは、Todoという名前の型を定義しており、useStateで使用しています。
  // このTodoの部分は、TypeScriptにtodoListsというstateがどういう形を持っているかを教える役割を果たしています。
  // 具体的には、Todo型が次のようなオブジェクトを表すことを示しています。
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
  //TodoをCheckedに変更
  function handleChecked(id: number) {
    console.log("checked of ID:", id);
    const newTodoList = todoLists.map((todo) => {
      if (todo.id === id) {
        return { ...todo, checked: true };
      }
      return todo; // 修正後のtodoが返されない場合は元のtodoをそのまま返す
    });
    setTodoLists(newTodoList);
  }
  // Todoの値を変更
  function handleValueChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    const newTodoList = todoLists.map((todo) => {
      if (todo.id === id) {
        return { ...todo, todoValue: e.target.value };
      }
      return todo;
    });
    setTodoLists(newTodoList);
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
            <input
              type="text"
              value={todoList.todoValue}
              disabled={todoList.checked ? true : false}
              onChange={(e) => handleValueChange(e, todoList.id)}
            />
            <button type="button" onClick={() => handleChecked(todoList.id)}>
              <CheckCircleOutlineIcon />
            </button>
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
