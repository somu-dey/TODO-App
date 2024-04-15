import React, { useState, useEffect } from "react";
import { MdAddCircle, MdDelete } from "react-icons/md";
import { Toaster, toast } from "react-hot-toast";

const Todo = () => {
  // State for storing todos
  const [todos, setTodos] = useState([]);
  // State for storing input value
  const [input, setInput] = useState("");
  // State for storing completed todos
  const [doneTodos, setDoneTodos] = useState({});

  // Load todos and doneTodos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    const savedDoneTodos = localStorage.getItem("doneTodos");
    if (savedDoneTodos) {
      setDoneTodos(JSON.parse(savedDoneTodos));
    }
  }, []);

  // Save todos and doneTodos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("doneTodos", JSON.stringify(doneTodos));
  }, [todos, doneTodos]);

  // Function to add a new todo
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

  // Function to delete a todo
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
        className="container-fluid p-0"
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
          <h1 style={{ color: "white", padding: "1rem" }}>Toodiify</h1>
        </div>
        <div
          className="d-flex p-3 w-100"
          style={{
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Your TODO"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
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
            overflowY: "auto",
            textAlign: "justify",
            overflowX: "hidden",
          }}
        >
          {todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 2rem",
              }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                style={{
                  width: "2rem",
                  height: "2rem",
                  padding: "1rem",
                  margin: "0 .5rem",
                }}
                checked={doneTodos[todo.id] || false}
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
                className="container d-flex"
                style={{
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
