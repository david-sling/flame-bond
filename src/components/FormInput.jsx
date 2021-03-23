import React from "react";

export default function FormInput({ type, value, setValue }) {
  switch (type) {
    case "text":
      return <input value={value} onChange={(e) => setValue(e.target.value)} />;
    case "markdown":
      return (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      );
    default:
      return <p>Invalid Data Type</p>;
  }
}
