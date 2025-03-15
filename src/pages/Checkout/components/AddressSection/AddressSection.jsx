import "./AddressSection.css";
import React from "react";
import { useAddress } from "../../../../contexts/AddressProvider.js";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { AddressModal } from "../AddressModal/AddressModal";
import { FaPlus } from "react-icons/fa";

export const AddressSection = () => {
  const { userDataState, dispatch } = useUserData();
  const { isAddressModalOpen, setIsAddressModalOpen } = useAddress();

  return (
    <div className="address-section">
      <h2 className="section-title">Shipping Address</h2>
      <div className="address-container">
        {userDataState.addressList?.map((address, index) => {
          const { name, street, city, state, country, pincode, phone, _id } = address;
          const isSelected = _id === userDataState.orderDetails?.orderAddress?._id;

          return (
            <div key={_id} className={`address-card ${isSelected ? 'selected' : ''}`}>
              <div className="address-radio">
                <input
                  checked={isSelected}
                  onChange={() => {
                    dispatch({
                      type: "SET_ORDER",
                      payload: { orderAddress: address },
                    });
                  }}
                  name="address"
                  id={_id}
                  type="radio"
                />
              </div>
              <label className="address-details" htmlFor={_id}>
                <p className="name">{name}</p>
                <p className="address">
                  {street}, {city}, {state}, {country} {pincode}
                </p>
                <p className="phone">Phone: {phone}</p>
              </label>
            </div>
          );
        })}
      </div>
      
      <button
        className="add-new-address-btn"
        onClick={() => setIsAddressModalOpen(true)}
      >
        <FaPlus /> Add New Address
      </button>

      {isAddressModalOpen && <AddressModal />}
    </div>
  );
};