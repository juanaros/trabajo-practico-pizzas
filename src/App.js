import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "./Context";
import Navbar from "./components/Navbar";
import Home from "./components/Pizzas";
import Pizza from "./components/PizzaDetails";
import Order from "./components/OrderDetail";

function App() {
  const [info, setInfo] = useState([]);
  const [price, setPrice] = useState(0);
  const [chosenPizzas, setChosenPizzas] = useState([]);

  const getInfo = async () => {
    const response = await fetch(`${process.env.PUBLIC_URL}/pizzas.json`);
    const data = await response.json();
    setInfo(data);
  };

  useEffect(() => {
    getInfo();
  },[]);

  const globalState = { info, setInfo, price, setPrice, chosenPizzas, setChosenPizzas };

  return (
    <div className="App">
      <Context.Provider value={globalState}>
        <BrowserRouter basename="/">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
