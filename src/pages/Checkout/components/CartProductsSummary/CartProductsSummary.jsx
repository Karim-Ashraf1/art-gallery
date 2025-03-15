import "./CartProductsSummary.css";
import React from "react";
import { useUserData } from "../../../../contexts/UserDataProvider.js";

export const CartProductsSummary = () => {
  const { userDataState } = useUserData();
  
  return (
    <div className="cart-products-summary">
      <h3>Items in Your Bag ({userDataState.cartProducts.length})</h3>
      
      <div className="product-list">
        {userDataState.cartProducts?.map(
          ({ id, img, name, qty, discounted_price }) => (
            <div key={id} className="product-item">
              <div className="product-image">
                <img src={img} alt={name} />
                {qty > 1 && <span className="product-qty">{qty}</span>}
              </div>
              
              <div className="product-info">
                <h4>{name}</h4>
                <p className="product-price">${discounted_price}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};