export const toggleProductStatus = (productId) => {
    return {
      type: "TOGGLE_PRODUCT_STATUS",
      payload: productId,
    };
  };
  
  export const deleteProduct = (productId) => {
    return {
      type: "DELETE_PRODUCT",
      payload: productId,
    };
  };
  
  export const editProduct = (product) => {
    return {
      type: "EDIT_PRODUCT",
      payload: product,
    };
  };
  