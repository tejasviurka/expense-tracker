import React, { useState } from "react";
import "./Expenses.css";

function AddExpense({ setExpenses, expenses }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");

  const handleAddExpense = () => {
    // Validate that setExpenses is provided and is a function
    if (typeof setExpenses !== "function") {
      setError("setExpenses is not provided or is not a valid function.");
      console.error("Error: setExpenses is not provided or is not a function.");
      return;
    }

    // Validate that expenses is an array
    if (!Array.isArray(expenses)) {
      setError("Expenses is not a valid array. Unable to proceed.");
      console.error("Error: expenses is not a valid array.");
      return;
    }

    // Validate input fields
    if (!category.trim()) {
      setError("Category is required.");
      return;
    }
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount greater than zero.");
      return;
    }

    // Reset error message
    setError("");

    // Create a new expense object
    const newExpense = {
      id: Date.now(),
      category: category.trim(),
      amount: parseFloat(amount).toFixed(2),
      comments: comments.trim(),
      createdAt: new Date().toISOString(),
    };

    // Update the expenses state
    try {
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    } catch (error) {
      setError("Failed to add expense. Please try again.");
      console.error("Error updating expenses:", error);
    }

    // Reset input fields
    setCategory("");
    setAmount("");
    setComments("");
  };

  return (
    <div className="expense-form">
      <h3>Add Expense</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Comments (optional)"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <button onClick={handleAddExpense} className="add-expense-button">
        Add Expense
      </button>
    </div>
  );
}

export default AddExpense;
