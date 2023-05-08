import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [showModal,setShowModal] = useState(false);
  return <AppContext.Provider value={{
    showModal,setShowModal
  }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContextProvider };
