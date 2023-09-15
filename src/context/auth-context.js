import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogin: (email, password) => {},
  onLogout: () => {},
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
    React.useEffect(() => {
      const localIsLoggedIn = localStorage.getItem("isLoggedIn");
  
      if (localIsLoggedIn === "1") setIsLoggedIn(true);
    }, []);
  
    const loginHandler = (email, password) => {
      //some code validation
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "1");
    };
  
    const logoutHandler = () => {
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "0");
    };
  
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLogin: loginHandler,
          onLogout: logoutHandler,
        }}
      >
        {props.children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;
