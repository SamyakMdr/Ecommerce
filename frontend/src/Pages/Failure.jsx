import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const FailurePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // For potential API calls

  // Extract params from URL (eSewa might pass transaction_uuid, etc.)
  const queryParams = new URLSearchParams(location.search);
  const reason = queryParams.get("reason");
  const transactionUuid = queryParams.get("transaction_uuid");

  useEffect(() => {
    // Optional: Log the failure to backend for analytics
    const logFailure = async () => {
      if (transactionUuid) {
        setLoading(true);
        try {
          await fetch("http://localhost:4000/logfailure", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transactionUuid, reason }),
          });
        } catch (error) {
          console.error("Failed to log failure:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    logFailure();
  }, [transactionUuid, reason]);

  const getMessage = () => {
    if (!reason) {
      return transactionUuid
        ? "Your payment could not be processed. Please check your details and try again."
        : "Something went wrong with your payment. If this persists, contact support.";
    }
    switch (reason) {
      case "payment_cancelled":
        return "Your payment was cancelled. You can try again or continue shopping.";
      case "payment_failed":
        return "The payment processing failed. Please check your payment method and try again.";
      case "server_error":
        return "A server error occurred. Please try again later or contact support.";
      default:
        return "Something went wrong with your payment. Please try again.";
    }
  };

  if (loading) {
    return <div className="failure-page">Processing...</div>;
  }

  return (
    <div className="failure-page">
      <div className="failure-card">
        <h2>Payment Failed</h2>
        <p>{getMessage()}</p>
        {transactionUuid && (
          <p>
            <strong>Transaction ID:</strong> {transactionUuid}
          </p>
        )}
        <div className="failure-actions">
          <button className="try-again" onClick={() => navigate("/cart")}>
            Try Again
          </button>
          <button className="continue" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailurePage;
