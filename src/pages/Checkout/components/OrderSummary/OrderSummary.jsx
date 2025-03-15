import "./OrderSummary.css";
import React from "react";
import { CartProductsSummary } from "../CartProductsSummary/CartProductsSummary";
import { BillingSummary } from "../BillingSummary/BillingSummary";
import { DeliveryAddress } from "../DeliveryAddress/DeliveryAddress";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { MdInfo } from "react-icons/md";

export const OrderSummary = () => {
  const { userDataState } = useUserData();
  const hasAddress = userDataState.orderDetails.orderAddress;

  return (
    <div className="order-summary">
      <h2 className="section-title">Order Summary</h2>
      
      <CartProductsSummary />
      <BillingSummary />
      
      {hasAddress ? (
        <DeliveryAddress />
      ) : (
        <div className="no-address-alert">
          <MdInfo size={20} />
          <p>Please select an address to proceed with your order</p>
        </div>
      )}
    </div>
  );
};