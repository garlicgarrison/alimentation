import React, { useContext } from "react";

const MyContext = React.createContext({});
export default MyContext;
export const useMyContext = () => useContext(MyContext);