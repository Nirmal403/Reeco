import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import avocado from "../Avocado Hass.jpg"
import { editProduct } from "../redux/Action/actions";
import "./Productlist.css";
import debounce from "lodash.debounce";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
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
} from '@mui/material';
import { CheckCircle, Close, Print } from '@mui/icons-material';
const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const componentRef = useRef();

  
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedFilterProducts = debounce((search) => {
    if (search) {
      const filtered = products.filter((product) =>
        product.name && product.name.toLowerCase().includes(search.toLowerCase())
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
    const approvedProduct = products.find(
      (product) => product.id === productId
    );
    if (approvedProduct) {
      dispatch(editProduct({ ...approvedProduct, status: "Approved" }));
    }
  };

  const handleReject = (product) => {
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

  const handlePrint = () => {
    window.print();
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
          style={{ marginLeft: '50px' }}
        >
        </Button>
      <div className="table-container">
      

<TableContainer component={Paper}  ref={componentRef}>
      <Table className="product-table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
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
                  className={
                    product.status === 'Approved' ? 'approved' : 'missing'
                  }
                >
                  {product.status}
                </span>
              </TableCell>
              <TableCell className="product-info-container"  style={{ width: '150px' }}>
                <IconButton
                  onClick={() => handleApprove(product.id)}
                >
                  <CheckCircle />
                </IconButton>
                <IconButton
                  onClick={() => handleReject(product)}
                >
                  <Close color="error" />
                </IconButton>
                <span
                  className="button-text"
                  onClick={() => handleEdit(product)}
                  style={{ cursor: 'pointer' }}
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
    </div>
  );
};

export default ProductList;
