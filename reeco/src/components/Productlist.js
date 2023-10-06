import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import avocado from "../Avocado Hass.jpg";
import { editProduct } from "../redux/Action/actions";
import "./Productlist.css";
import debounce from "lodash.debounce";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import { CheckCircle, Close, Print, AddCircle } from "@mui/icons-material";
const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [editedProduct, setEditedProduct] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const componentRef = useRef();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedFilterProducts = debounce((search) => {
    if (search) {
      const filtered = products.filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
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
    const updatedProducts = filteredProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, status: "Approved" };
      }
      return product;
    });

    setFilteredProducts(updatedProducts);
  };

  const handleReject = (product) => {
    const updatedProducts = filteredProducts.map((p) => {
      if (p.id === product.id) {
        return { ...p, status: "Missing" };
      }
      return p;
    });

    setFilteredProducts(updatedProducts);
  };
  const handleEdit = (product) => {
    const editedProduct = {
      ...product,
      name: prompt("Edit product name:", product.name),
    };

    const updatedProducts = filteredProducts.map((p) => {
      if (p.id === editedProduct.id) {
        return editedProduct;
      }
      return p;
    });

    setFilteredProducts(updatedProducts);
  };


  const handlePrint = () => {
    window.print();
  };

  // Function to open the form
  const openForm = () => {
    setIsFormOpen(true);
  };

  // Function to close the form
  const closeForm = () => {
    setIsFormOpen(false);
  };
  const handleSave = () => {
    // Validate the new product name (you can add more validation as needed)
    if (newProductName.trim() === "") {
      alert("Product name cannot be empty");
      return;
    }

    // Create a new product object with a unique ID (you can generate this as needed)
    const newProduct = {
      id: Date.now(), // Example: Use the current timestamp as the ID
      name: newProductName,
      brand: newProductBrand, // Capture brand from form field
      price: parseFloat(newProductPrice), // Capture price from form field and parse it as a float
      quantity: parseInt(newProductQuantity), // Capture quantity from form field and parse it as an integer
      total: parseFloat(newProductPrice) * parseInt(newProductQuantity), // Calculate total based on price and quantity
      status: "Pending", // Example: New products start with "Pending" status
    };

    // Add the new product to the filteredProducts array
    setFilteredProducts([...filteredProducts, newProduct]);

    // Close the form and reset the new product name
    setIsFormOpen(false);
    setNewProductName("");
    setNewProductBrand("");
    setNewProductPrice("");
    setNewProductQuantity("");
  };
  return (
    <div>
      <h2>Product List</h2>
      <TextField
        placeholder="Search by Product Name"
        value={searchTerm}
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        startIcon={<Print />}
        style={{
          marginLeft: "50px",
          backgroundColor: "white",
          color: "#51dfab",
          borderRadius: "5px",
        }}
      ></Button>
      <Button
        variant="contained"
        color="primary"
        style={{
          marginLeft: "50px",
          backgroundColor: "white",
          color: "#51dfab",
          borderRadius: "5px",
        }}
        onClick={openForm} // Open the form when this button is clicked
      >
        Add Item
      </Button>
      <div className="table-container">
        <TableContainer component={Paper} ref={componentRef}>
          <Table className="product-table">
            <TableHead>
              <TableRow>
                <TableCell className="custom-table-head">
                  Product Name
                </TableCell>
                <TableCell className="custom-table-head">Brand</TableCell>
                <TableCell className="custom-table-head">Price</TableCell>
                <TableCell className="custom-table-head">Quantity</TableCell>
                <TableCell className="custom-table-head">Total</TableCell>
                <TableCell className="custom-table-head">Status</TableCell>
                <TableCell className="custom-table-head">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="product-info-container">
                      <img
                        src={avocado}
                        alt={product.name}
                        className="product-image"
                      />
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>${product.total}</TableCell>
                  <TableCell>
                    <span
                      className={`${
                        product.status === "Approved" ? "approved" : "missing"
                      } ${product.status === "Pending" ? "pending" : ""}`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell
                    className="product-info-container"
                    style={{ width: "150px" }}
                  >
                    <IconButton onClick={() => handleApprove(product.id)}>
                      <CheckCircle />
                    </IconButton>
                    <IconButton onClick={() => handleReject(product)}>
                      <Close color="error" />
                    </IconButton>
                    <span
                      className="button-text"
                      onClick={() => handleEdit(product)}
                      style={{ cursor: "pointer" }}
                    >
                      Edit
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

                
      {/* Form Dialog */}
      <Dialog open={isFormOpen} onClose={closeForm}>
        <DialogContent style={{ padding: "20px", overflowX: "hidden" }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeForm}
            style={{ position: "absolute", right: "8px", top: "8px" }}
            maxWidth="md"
          >
            <CloseIcon />
          </IconButton>
          <h2 style={{ marginBottom: "20px" }}>Add Item</h2>
          <TextField
            label="Product Name"
            fullWidth
            // Add more form fields as needed
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="Brand"
            fullWidth
            value={newProductBrand}
            onChange={(e) => setNewProductBrand(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={newProductQuantity}
            onChange={(e) => setNewProductQuantity(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductList;
