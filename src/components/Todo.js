import React, { useState, useEffect } from "react";
import imag from "../images/8136021.jpg";
import { MdAddCircle } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { Toaster, toast } from "react-hot-toast";
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [doneTodos, setDoneTodos] = useState({});

  useEffect(() => {
    // Load todos from localStorage on component mount
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever it changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleKeyPress = (e) => {
    addTask();
  };
  // function to add a todo
  const addTask = () => {
    toast.dismiss();
    if (input.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: input }]);
      toast.success("Todo Added Successfully !!", {
        position: "top-center",
      });
      setInput("");
    }
  };
  // function to delete a todo
  const deleteTodo = (id) => {
    toast.dismiss();
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.error("Todo Deleted !!", {
      position: "top-center",
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <div
        className="container-fluid p-0 "
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#C2D9FF",
        }}
      >
        <div
          style={{ display: "flex", backgroundColor: "#190482", width: "100%" }}
        >
          <h1 style={{ color: "white", padding: "1rem" }}>Toodiify </h1>
        </div>
        <div
          style={{
            display: "flex",
            zIndex: "-3",
            position: "absolute",
          }}
        >
          {/* <img style={{ height: "100vh", width: "100%" }} src={imag} alt="" /> */}
        </div>
        <div
          className="d-flex p-3 w-100"
          style={{
            backgroundColor: "",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="  Enter Your TODO"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleKeyPress();
              }
            }}
            style={{
              width: "50%",
              height: "2.5rem",
              borderRadius: "20px",
              border: ".5px solid grey",
            }}
          />
          <button
            className="btn"
            style={{
              borderRadius: "20px",
              backgroundColor: "#190482",
              color: "white",
            }}
            onClick={addTask}
          >
            <MdAddCircle style={{ fontSize: "20px" }} />
          </button>
        </div>
        <div
          className="p-3 w-100 h-100"
          style={{
            backgroundColor: "",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "auto",
            scrollbarWidth: "none",
            textAlign: "justify",
            overflowX: "hidden",
            textJustify: "inter-word",
          }}
        >
          {todos.map((todo) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 2rem",
              }}
            >
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                style={{
                  width: "2rem",
                  height: "2rem",
                  padding: "1rem",
                  margin: "0 .5rem",
                }}
                onChange={(e) => {
                  toast.dismiss();
                  setDoneTodos({
                    ...doneTodos,
                    [todo.id]: e.target.checked,
                  });
                  if (e.target.checked) {
                    toast.success("Marked As Done !!");
                  }
                }}
              />
              <div
                className="container d-flex "
                style={{
                  //   gap: "2rem",
                  backgroundColor: doneTodos[todo.id] ? "#8DECB4" : "#190482",
                  color: doneTodos[todo.id] ? "black" : "white",
                  width: "100%",
                  borderRadius: "50px",
                  alignItems: "center",
                  flexDirection: "row",
                  textAlign: "justify",
                  textJustify: "inter-word",
                  overflowX: "hidden",
                  justifyContent: "space-between",
                  margin: "0.5rem 0",
                }}
              >
                <p style={{ paddingTop: "1rem", marginLeft: "1rem" }}>
                  {todo.text}
                </p>
                <button
                  className="btn btn-danger"
                  style={{ borderRadius: "18px" }}
                  onClick={() => deleteTodo(todo.id)}
                >
                  <MdDelete style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Todo;
