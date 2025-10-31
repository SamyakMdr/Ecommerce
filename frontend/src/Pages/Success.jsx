import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext"; // Assuming you have this for cart context

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(ShopContext); // If your context has a clearCart function
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract transaction_uuid from URL query params (eSewa passes this)
  const queryParams = new URLSearchParams(location.search);
  const transactionUuid = queryParams.get("transaction_uuid"); // e.g., from backend redirect

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!transactionUuid) {
        setError("Invalid access: No transaction details found.");
        setLoading(false);
        return;
      }

      try {
        // Fetch order from backend (requires auth token)
        const token = localStorage.getItem("auth-token"); // Assuming you store the token here
        const response = await fetch(
          `http://localhost:4000/getorder?transactionUuid=${transactionUuid}`,
          {
            headers: { "auth-token": token },
          }
        );
        const data = await response.json();

        if (data.success) {
          setOrderDetails(data.order);
          // Clear local cart if needed (backend already did it, but sync frontend)
          if (clearCart) clearCart();
        } else {
          setError(data.message || "Failed to fetch order details.");
        }
      } catch (err) {
        setError("An error occurred while fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [transactionUuid, clearCart]);

  if (loading) {
    return <div className="success-page">Loading order details...</div>;
  }

  if (error) {
    return (
      <div className="success-page">
        <h2>Payment Status</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="success-page">
      <h2>Payment Successful! 🎉</h2>
      <p>Thank you for your purchase. Your order has been confirmed.</p>
      {orderDetails && (
        <div>
          <p>
            <strong>Transaction ID:</strong> {orderDetails.transactionUuid}
          </p>
          <p>
            <strong>Total Amount:</strong> ${orderDetails.totalAmount}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(orderDetails.date).toLocaleDateString()}
          </p>
          {/* Add more details like products if stored in order */}
        </div>
      )}
      <button onClick={() => navigate("/")}>Continue Shopping</button>
    </div>
  );
};

export default SuccessPage;
