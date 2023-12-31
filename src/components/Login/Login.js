import React, { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../context/auth-context";
import Input from "../UI/Input/Input";

const TYPE_USER_INPUT = "USER_INPUT";
const TYPE_INPUT_BLUR = "INPUT_BLUR";

function isEmailValid(email) {
  return email.includes("@");
}

function isPasswordValid(password) {
  return password.trim().length > 6;
}

function emailReducer(state, action) {
  if (action.type === TYPE_USER_INPUT)
    return { value: action.value, isValid: isEmailValid(action.value) };
  if (action.type === TYPE_INPUT_BLUR)
    return { value: state.value, isValid: isEmailValid(state.value) };
  return { value: "", isValid: false };
}

function passwordReducer(state, action) {
  if (action.type === TYPE_USER_INPUT)
    return { value: action.value, isValid: isPasswordValid(action.value) };
  if (action.type === TYPE_INPUT_BLUR)
    return { value: state.value, isValid: isPasswordValid(state.value) };
  return { value: "", isValid: false };
}

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      //console.log("Validation");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);

    return () => {
      //console.log("Clean");
      clearTimeout(timer);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: TYPE_USER_INPUT, value: event.target.value });
    // setFormIsValid(isEmailValid(event.target.value) && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: TYPE_USER_INPUT, value: event.target.value });
    // setFormIsValid(emailState.isValid && isPasswordValid(event.target.value));
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: TYPE_INPUT_BLUR });
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: TYPE_INPUT_BLUR });
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const ctx = useContext(AuthContext);
  const emailInputRef = React.useRef();
  const passwordInputRef = React.useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) ctx.onLogin(emailState.value, passwordState.value);
    else if (!emailState.isValid) emailInputRef.current.focusInput();
    else passwordInputRef.current.focusInput();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailState.isValid}
          id="email"
          label="E-Mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          isValid={passwordState.isValid}
          id="password"
          label="Password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
