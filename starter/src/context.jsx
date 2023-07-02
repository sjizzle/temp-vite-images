import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getInitialDarkmode = () => {
  const perfersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const storeDarkMode = localStorage.getItem("darkTheme") === "true";
  return storeDarkMode || perfersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkmode());
  const [searchTerm, setSearchTerm] = useState("dog");
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
    //const body = document.querySelector("body");
    //body.classList.toggle("dark-theme", newDarkTheme);
    //console.log(body);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider value={{ toggleDarkTheme, searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
