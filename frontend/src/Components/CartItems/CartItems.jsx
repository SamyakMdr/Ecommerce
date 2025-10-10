import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import CryptoJS from "crypto-js";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  // ✅ eSewa v2 payment function
  const handleEsewaPayment = () => {
    const totalAmount = getTotalCartAmount().toString();

    // Test URLs - use your actual domain
    const successUrl = "https://yourdomain.com/success";
    const failureUrl = "https://yourdomain.com/failure";

    // Generate unique transaction ID
    const transaction_uuid = "ORDER_" + Date.now();

    // Your eSewa merchant credentials
    const secretKey = "8gBm/:&EnhH.1/q";
    const product_code = "EPAYTEST";

    // Generate signature for v2 API
    const message = `total_amount=${totalAmount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const signature = CryptoJS.HmacSHA256(message, secretKey);
    const signatureBase64 = CryptoJS.enc.Base64.stringify(signature);

    // Create a form element
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    // Required eSewa v2 fields
    const params = {
      amount: totalAmount,
      tax_amount: "0",
      total_amount: totalAmount,
      product_service_charge: "0",
      product_delivery_charge: "0",
      transaction_uuid: transaction_uuid,
      product_code: product_code,
      success_url: successUrl,
      failure_url: failureUrl,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature: signatureBase64,
    };

    // Add params to form
    for (const key in params) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main ">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={e.image}
                  alt={e.name}
                  className="carticon-product-icon"
                />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>

          <div>
            <button onClick={handleEsewaPayment}>PAY WITH eSewa</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
