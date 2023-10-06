import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/Store/store";
import { BrowserRouter as Router } from "react-router-dom";
import ProductList from "./components/Productlist";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <ProductList />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
