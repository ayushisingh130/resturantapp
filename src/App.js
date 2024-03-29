import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header, CreateContainer, MainContainer } from "./components";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import MenuContainer from "./components/MenuContainer";

const App = () => {
  const [foodItems, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      await getAllFoodItems().then((data) => {
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        });
      });
    };
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary ">
        <Header />
        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/MenuContainer" element={<MenuContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
