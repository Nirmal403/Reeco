import React from "react";

const OrderSummary = ({ supplierName, shippingDate, total }) => {
  return (
    <div className="order-summary">
      <div className="order-box-container">
        <div className="order-box">
          <h3>Supplier</h3>
          <p>{supplierName}</p>
        </div>
        <div className="order-box">
          <h3>Shipping Date</h3>
          <p>{shippingDate}</p>
        </div>
        <div className="order-box">
          <h3>Total</h3>
          <p>${total.toFixed(2)}</p>
        </div>
        {/* Add three more boxes here */}
      </div>
    </div>
  );
};

export default OrderSummary;
