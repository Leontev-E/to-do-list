import React from "react";
import "./Item.css";
import { Pencil, Check2All, Trash } from "react-bootstrap-icons";

const Item = ({
    id,
    item,
    list,
    setEdit,
    setEditId,
    setItem,
    setList,
    complete,
}) => {
    const remove = (id) => {
        setList(list.filter((el) => el.id !== id));
    };

    const handleComplete = (id) => {
        setList(
            list.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        complete: !item.complete,
                    };
                }
                return item;
            })
        );
    };

    const handleItem = (id) => {
        const editItem = list.find((el) => el.id === id);
        setItem(editItem.item);
        setEdit(true);
        setEditId(id);
    };

    return (
        <div className="item">
            <Check2All onClick={() => handleComplete(id)} className={complete ? "Check2All red" : "Check2All"} />
            <input
                type="text"
                value={item}
                style={{
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "white",
                    fontSize: "20px",
                }}
                className={complete ? "complete" : ""}
            />
            <Pencil onClick={() => handleItem(id)} className="Check2All pointer" />
            <Trash onClick={() => remove(id)} className="Check2All Trash" />
        </div>
    );
};
export default Item;