import React from "react";
import "./OrderSummary.css";
import {
  FaHeart,
  FaStar,
  FaSmile,
  FaThumbsUp,
  FaCamera,
  FaCode,
  FaMusic,
  FaRocket,
} from "react-icons/fa";

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
        <div className="order-box">
          <h3>Category</h3>
          <p>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ flex: "25%", textAlign: "center", fontSize: "10px" }}>
        <FaHeart size={10} />
        {/* <p>Heart</p> */}
      </div>
      <div style={{ flex: "25%", textAlign: "center", fontSize: "10px" }}>
        <FaStar size={10} />
        {/* <p>Star</p> */}
      </div>
      <div style={{ flex: "25%", textAlign: "center", fontSize: "10px" }}>
        <FaSmile size={10} />
        {/* <p>Smile</p> */}
      </div>
      <div style={{ flex: "25%", textAlign: "center", fontSize: "10px" }}>
        <FaThumbsUp size={10} />
        {/* <p>Thumbs Up</p> */}
      </div>
      <div style={{ flex: "25%", textAlign: "center", fontSize: "10px" }}>
        <FaCamera size={10} />
        {/* <p>Camera</p> */}
      </div>
      <div style={{ flex: "25%", textAlign: "center", fontSize: "10px" }}>
        <FaCode size={10} />
        {/* <p>Code</p> */}
      </div>
      <div style={{ flex: "25%", textAlign: "center", fontSize: "10px" }}>
        <FaMusic size={10} />
        {/* <p>Music</p> */}
      </div>
      <div style={{ flex: "25%", textAlign: "center", fontSize: "10px" }}>
        <FaRocket size={10} />
        {/* <p>Rocket</p> */}
      </div>
    </div>
            
          </p>
        </div>
        <div className="order-box">
          <h3>Department</h3>
          <p>300-444-678</p>
        </div>
        
        <div className="order-box">
          <h3>Status</h3>
          <p>Awaiting your approval</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
