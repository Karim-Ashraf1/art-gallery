import "./AddressModal.css";
import React from "react";
import { useState } from "react";
import { addAddressService } from "../../../../services/address-services/addAddressService";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { updateAddressService } from "../../../../services/address-services/updateAddressService";
import { toast } from "react-hot-toast";
import { useAddress } from "../../../../contexts/AddressProvider.js";
import { useAuth } from "../../../../contexts/AuthProvider.js";
import { FaTimes, FaMapMarkedAlt, FaUser, FaPhone, FaMapPin } from "react-icons/fa";

export const AddressModal = () => {
  const [, setLoading] = useState(false);
  const [, setError] = useState("false");
  const { auth } = useAuth();
  const { dispatch } = useUserData();

  const dummyAddress = {
    name: "Aniket Saini",
    street: "66/6B Main Post Office",
    city: "Roorkee",
    state: "Uttarakhand",
    country: "India",
    pincode: "247667",
    phone: "963-906-0737",
  };

  const {
    setIsAddressModalOpen,
    addressForm,
    setAddressForm,
    isEdit,
    setIsEdit,
  } = useAddress();

  const updateAddress = async (address) => {
    try {
      setLoading(true);
      setError("");
      const response = await updateAddressService(address, auth.token);
      if (response.status === 200) {
        setLoading(false);
        toast.success(`${address.name}'s address updated successfully!`);
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (address) => {
    try {
      setLoading(true);
      setError("");
      const response = await addAddressService(address, auth.token);
      if (response.status === 201) {
        setLoading(false);
        toast.success("New address added successfully!");
        dispatch({ type: "SET_ADDRESS", payload: response.data.addressList });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEdit) {
      addAddress(addressForm);
    } else {
      updateAddress(addressForm);
      setIsEdit(false);
    }
    setAddressForm({
      name: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phone: "",
    });
    setIsAddressModalOpen(false);
  };

  return (
    <div className="address-modal-overlay" onClick={() => setIsAddressModalOpen(false)}>
      <div className="address-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEdit ? "Update Address" : "Add New Address"}</h2>
          <button 
            className="close-btn"
            onClick={() => setIsAddressModalOpen(false)}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="address-form">
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="input-icon" />
              <span>Full Name</span>
            </label>
            <input
              id="name"
              name="name"
              value={addressForm.name}
              required
              onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="street">
              <FaMapMarkedAlt className="input-icon" />
              <span>Street Address</span>
            </label>
            <input
              id="street"
              name="street"
              required
              value={addressForm.street}
              onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
              placeholder="Street address or P.O. Box"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                required
                value={addressForm.city}
                onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                placeholder="City"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State/Province</label>
              <input
                id="state"
                name="state"
                required
                value={addressForm.state}
                onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                placeholder="State or province"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                value={addressForm.country}
                required
                onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                placeholder="Country"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="pincode">
                <FaMapPin className="input-icon" />
                <span>Postal Code</span>
              </label>
              <input
                id="pincode"
                name="pincode"
                value={addressForm.pincode}
                required
                onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                placeholder="Postal/ZIP code"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">
              <FaPhone className="input-icon" />
              <span>Phone Number</span>
            </label>
            <input
              id="phone"
              name="phone"
              value={addressForm.phone}
              required
              minLength="8"
              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setAddressForm({ ...dummyAddress })}
            >
              Fill with Sample Data
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};