import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/Store/store";
import { BrowserRouter as Router } from "react-router-dom";
import ProductList from "./components/Productlist";
import Navbar from "./components/Navbar/Navbar";
import OrderSummary from "./components/OrderSummary";

function App() {
  const supplierName = "East coast fruits & vegetables";
  const shippingDate = "October 15, 2023";
  const total = 1234.56;

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <OrderSummary
            supplierName={supplierName}
            shippingDate={shippingDate}
            total={total}
          />
          <ProductList />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
