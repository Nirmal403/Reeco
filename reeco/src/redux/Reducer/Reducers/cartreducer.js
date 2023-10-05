import productsData from "../../../db.json"

const initialState = {
  products: productsData,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_PRODUCT_STATUS":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, status: product.status === "active" ? "inactive" : "active" }
            : product
        ),
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.payload),
      };

    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    default:
      return state;
  }
};

export default productReducer;
