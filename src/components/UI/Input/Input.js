import React from "react";
import classes from "./Input.module.css";

export default React.forwardRef(function Input (props, ref) {
  const inputRef = React.useRef();

  function activate() {
    inputRef.current.focus();
  }

  React.useImperativeHandle(ref, () => {
    return {focusInput: activate}
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
})
