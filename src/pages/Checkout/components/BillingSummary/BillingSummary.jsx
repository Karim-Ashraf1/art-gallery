import React from "react";
import "./BillingSummary.css";
import { useUserData } from "../../../../contexts/UserDataProvider.js";

export const BillingSummary = () => {
  const { userDataState } = useUserData();
  
  const originalTotal = Number(userDataState.orderDetails?.cartItemsTotal || 0);
  const discountedTotal = Number(userDataState.orderDetails?.cartItemsDiscountTotal || 0);
  const savedAmount = originalTotal - discountedTotal;

  return (
    <div className="billing-summary">
      <h3>Price Details</h3>
      
      <div className="price-breakdown">
        <div className="price-row">
          <span>Subtotal</span>
          <span className="price">${originalTotal.toFixed(2)}</span>
        </div>

        <div className="price-row discount">
          <span>Discount</span>
          <span className="price savings">-${savedAmount.toFixed(2)}</span>
        </div>

        <div className="price-row">
          <span>Shipping</span>
          <span className="price free">Free</span>
        </div>
        
        <div className="price-row total">
          <span>Total</span>
          <span className="price">${discountedTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};