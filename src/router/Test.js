import React, { useState } from "react";
const Test = () => {
  const [text, settext] = useState("");
  const changeHandle = (e) => {
    settext(e.target.value);
    console.log(text);
  };
  return (
    <div>
      <h1>Hello</h1>
      <input type="text" id="ht" onChange={changeHandle} />
    </div>
  );
};

export default Test;
