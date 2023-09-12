import React, { createContext, useState } from "react";

export const CardContext = createContext();

export const initialValues = {
  id: "",
  title: "",
  image: "",
  text: "",
  email: "",
  date: "",
};

const CardContextProvider = ({ children }) => {
  const [addCard, setAddCard] = useState(initialValues);
  const [cards, setCards] = useState(addCard);

  return (
    <CardContext.Provider value={{ addCard, setAddCard, cards, setCards }}>
      {children}
    </CardContext.Provider>
  );
};
export default CardContextProvider;
