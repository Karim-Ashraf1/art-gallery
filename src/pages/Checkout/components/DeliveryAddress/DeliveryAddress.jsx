import "./DeliveryAddress.css";
import React from "react";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../../contexts/AuthProvider.js";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaPhoneAlt, FaUser, FaLock } from "react-icons/fa";

export const DeliveryAddress = () => {
  const { userDataState, dispatch, clearCartHandler } = useUserData();
  const navigate = useNavigate();
  const { auth, setCurrentPage } = useAuth();

  const {
    cartProducts,
    addressList,
    orderDetails: { cartItemsDiscountTotal, orderAddress },
  } = userDataState;

  const KEY_ID = "rzp_test_VAxHG0Dkcr9qc6";
  const totalAmount = cartItemsDiscountTotal;
  const userContact = addressList?.find(
    ({ _id }) => _id === orderAddress?._id
  )?.phone;

  const successHandler = (response) => {
    const paymentId = response.razorpay_payment_id;
    const orderId = uuid();
    
    const order = {
      paymentId,
      orderId,
      amountPaid: totalAmount,
      orderedProducts: [...cartProducts],
      deliveryAddress: { ...orderAddress },
    };

    dispatch({ type: "SET_ORDERS", payload: order });
    clearCartHandler(auth.token);
    setCurrentPage("orders");
    navigate("/profile/orders");
  };

  const razorpayOptions = {
    key: KEY_ID,
    currency: "INR",
    amount: Number(totalAmount) * 100,
    name: "Art Waves Unleashed",
    description: "Order for products",
    prefill: {
      name: auth.firstName,
      email: auth.email,
      contact: userContact,
    },
    notes: { address: orderAddress },
    theme: { color: "#000000" },
    handler: (response) => successHandler(response),
  };

  const placeOrderHandler = () => {
    if (orderAddress) {
      const razorpayInstance = new window.Razorpay(razorpayOptions);
      razorpayInstance.open();
    } else {
      toast("Please select an address!");
    }
  };

  return (
    <div className="delivery-address">
      <h3>Delivery Information</h3>
      
      <div className="delivery-details">
        <div className="detail-row">
          <FaUser />
          <div>
            <label>Name</label>
            <p>{orderAddress?.name}</p>
          </div>
        </div>
        
        <div className="detail-row">
          <FaMapMarkerAlt />
          <div>
            <label>Address</label>
            <p>
              {orderAddress?.street}, {orderAddress?.city}, {orderAddress?.state}, {orderAddress?.country} {orderAddress?.pincode}
            </p>
          </div>
        </div>
        
        <div className="detail-row">
          <FaPhoneAlt />
          <div>
            <label>Phone</label>
            <p>{orderAddress?.phone}</p>
          </div>
        </div>
      </div>
      
      <button onClick={placeOrderHandler} className="place-order-btn">
        <FaLock className="lock-icon" /> Place Order
      </button>
    </div>
  );
};