import React, { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import { v4 as uuidv4 } from "uuid";

const arr = () => {
  let data = localStorage.getItem("data");
  if (data) return JSON.parse(localStorage.getItem("data"));
  else return [];
};

function App() {
  const [item, setItem] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState();
  const [list, setList] = useState(arr);
  const [error, setError] = useState("");
  const [activeState, setActiveState] = useState(false);

  const handleSubmit = (e) => {
    const newItem = {
      id: uuidv4(),
      item: item,
      complete: false,
    };
    e.preventDefault();
    if (item && item.length <= 35 && !edit) {
      setList([...list, newItem]);
      setItem("");
      setError("");
    } else if (item && item.length <= 35 && edit && editId) {
      setList(
        list.map((el) => {
          if (el.id === editId) {
            return { ...el, item: item };
          }
          return el;
        })
      );
      setItem("");
      setEditId(null);
      setEdit(false);
      setError("");
    } else if (!item) setError("Ничего не делать это отлично! Но нужно что-то придумать. Например: Поучить английский..");
    else if (item.length > 35) setError("Максимальное значение: 35 символов.");
  };

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="App">
      <h1>Список дел:</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={item}
          placeholder="Сделать домашку..."
          onChange={handleChange}
        />
        {edit ? (
          <button className="btn" type="submit">
            Изменить дело
          </button>
        ) : (
          <button className="btn" type="submit">
            Добавить
          </button>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <div>
        {list.map((c, id) => (
          <Item
            key={id}
            id={c.id}
            item={c.item}
            list={list}
            setList={setList}
            complete={c.complete}
            setItem={setItem}
            setEdit={setEdit}
            setEditId={setEditId}
          />
        ))}
      </div>
    </div>
  );
}

export default App;