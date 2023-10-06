import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import avocado from "../Avocado Hass.jpg";
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
  DialogTitle,
  DialogActions
} from "@mui/material";
import { CheckCircle, Close, Print, AddCircle } from "@mui/icons-material";
import OrderSummary from "./OrderSummary";
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


  const supplierName = "East coast fruits & vegetables";
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  const shippingDate = formattedDate;


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
    setEditedProduct(product);
    setIsEditDialogOpen(true);
  };
  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };
  const saveEditedProduct = () => {
  
    const updatedProducts = filteredProducts.map((p) =>
      p.id === editedProduct.id ? { ...p, name: editedProduct.name, brand: editedProduct.brand,
        price: parseFloat(editedProduct.price),
        quantity: parseInt(editedProduct.quantity),
        total: parseFloat(editedProduct.price) * parseInt(editedProduct.quantity),
       } : p
    );
  
    setFilteredProducts(updatedProducts);
    closeEditDialog();
  };
    


  const handlePrint = () => {
    window.print();
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };
  const handleSave = () => {
    if (newProductName.trim() === "") {
      alert("Product name cannot be empty");
      return;
    }

    const newProduct = {
      id: Date.now(), 
      name: newProductName,
      brand: newProductBrand, 
      price: parseFloat(newProductPrice), 
      quantity: parseInt(newProductQuantity), 
      total: parseFloat(newProductPrice) * parseInt(newProductQuantity), 
      status: "Pending", 
    };

    
    setFilteredProducts([...filteredProducts, newProduct]);

   
    setIsFormOpen(false);
    setNewProductName("");
    setNewProductBrand("");
    setNewProductPrice("");
    setNewProductQuantity("");
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
  
    for (const product of filteredProducts) {
      totalPrice += product.total;
    }
  
    return totalPrice;
  };
  const total = calculateTotalPrice();
  return (
    <div>
       <OrderSummary
       supplierName={supplierName}
       shippingDate={shippingDate}
        total={total} // Pass the 'total' value as a prop
      />
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
          // marginLeft: 0,
          // marginRight: '50px', 
          // backgroundColor: 'white',
          // color: '#51dfab',
          // borderRadius:'5px',
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
      <div className="table-container" ref={componentRef}>
        <TableContainer component={Paper} >
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

      <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
  <DialogTitle>Edit Product</DialogTitle>
  <DialogContent>
    <TextField
      label="Product Name"
      fullWidth
      value={editedProduct ? editedProduct.name : ""}
      onChange={(e) =>
        setEditedProduct({ ...editedProduct, name: e.target.value })
      }
      style={{ marginBottom: "15px" }}
    />
    <TextField
      label="Brand"
      fullWidth
      value={editedProduct ? editedProduct.brand : ""}
      onChange={(e) =>
        setEditedProduct({ ...editedProduct, brand: e.target.value })
      }
      style={{ marginBottom: "15px" }}
    />
    <TextField
      label="Price"
      fullWidth
      type="number"
      value={editedProduct ? editedProduct.price : ""}
      onChange={(e) =>
        setEditedProduct({
          ...editedProduct,
          price: parseFloat(e.target.value),
        })
      }
      style={{ marginBottom: "15px" }}
    />
    <TextField
      label="Quantity"
      type="number"
      fullWidth
      value={editedProduct ? editedProduct.quantity : ""}
      onChange={(e) =>
        setEditedProduct({
          ...editedProduct,
          quantity: parseInt(e.target.value),
        })
      }
      style={{ marginBottom: "20px" }}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={closeEditDialog} color="primary">
      Cancel
    </Button>
    <Button onClick={saveEditedProduct} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

        
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
