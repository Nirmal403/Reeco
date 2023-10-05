import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import avocado from "../Avocado Hass.jpg"
import { editProduct } from "../redux/Action/actions";
import "./Productlist.css";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const debouncedFilterProducts = debounce((search) => {
    if (search) {
      const filtered = products.filter((product) =>
        product.name && product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      // If search term is empty, show all products
      setFilteredProducts(products);
    }
  }, 300);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    debouncedFilterProducts(searchTerm);
  }, [searchTerm]);

  const handleApprove = (productId) => {
    const approvedProduct = products.find(
      (product) => product.id === productId
    );
    if (approvedProduct) {
      dispatch(editProduct({ ...approvedProduct, status: "Approved" }));
    }
  };

  const handleReject = (product) => {
    // Display a popup with the "Missing" product title
    window.alert(`Product "${product.name}" is marked as Missing.`);
     const updatedProduct = { ...product, status: "Missing" };
    dispatch(editProduct(updatedProduct));
  };

  const handleEdit = (product) => {
    const editedProduct = {
      ...product,
      name: prompt("Edit product name:", product.name),
    };
    dispatch(editProduct(editedProduct));
  };

  return (
    <div>
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search by Product Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
              <div className="product-info-container">
                <img
                  src={avocado}
                  alt={product.name}
                  className="product-image"
                />
                <td>{product.name}</td>
                </div>
              </td>
              
              <td>{product.brand}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>${product.total}</td>
              <td
                className={
                  product.status === "Approved" ? "approved" : "missing"
                }
              >
                {product.status}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faCheckCircle} // Use the tick icon here
                  className="action-icon"
                  onClick={() => handleApprove(product.id)}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className="action-icon action-icon-red"
                  onClick={() => handleReject(product)}
                />

                <button onClick={() => handleEdit(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ProductList;
