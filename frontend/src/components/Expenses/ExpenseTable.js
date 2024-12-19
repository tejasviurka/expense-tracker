

import React, { useState } from "react";
import "./Expenses.css";

function ExpenseTable({ expenses = [], setExpenses }) {
  const [editingExpense, setEditingExpense] = useState(null);
  const [editForm, setEditForm] = useState({
    category: "",
    amount: "",
    comments: "",
  });

  // Handle Edit Expense
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setEditForm({
      category: expense.category,
      amount: expense.amount,
      comments: expense.comments,
    });
  };

  // Handle Save Edited Expense
  const handleSaveEdit = () => {
    if (!editForm.category.trim() || !editForm.amount || isNaN(editForm.amount)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const updatedExpense = {
      ...editingExpense,
      ...editForm,
      amount: parseFloat(editForm.amount).toFixed(2),
    };

    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === editingExpense.id ? updatedExpense : expense
      )
    );

    setEditingExpense(null);
    setEditForm({ category: "", amount: "", comments: "" });
  };

  // Handle Delete Expense
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    }
  };

  return (
    <div className="expense-table-wrapper">
      {expenses.length > 0 ? (
        <table className="expense-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Created At</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>
                  {editingExpense?.id === expense.id ? (
                    <input
                      type="text"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    />
                  ) : (
                    expense.category
                  )}
                </td>
                <td>
                  {editingExpense?.id === expense.id ? (
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                    />
                  ) : (
                    `$${parseFloat(expense.amount).toFixed(2)}`
                  )}
                </td>
                <td>{new Date(expense.createdAt).toLocaleString()}</td>
                <td>
                  {editingExpense?.id === expense.id ? (
                    <input
                      type="text"
                      value={editForm.comments}
                      onChange={(e) => setEditForm({ ...editForm, comments: e.target.value })}
                    />
                  ) : (
                    expense.comments
                  )}
                </td>
                <td className="actions">
                  {editingExpense?.id === expense.id ? (
                    <>
                      <button onClick={handleSaveEdit} className="edit-button">
                        Save
                      </button>
                      <button onClick={() => setEditingExpense(null)} className="cancel-edit-button">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(expense)} className="edit-button">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(expense.id)} className="delete-button">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-expenses-message">No expenses to display. Add one now!</p>
      )}
    </div>
  );
}

export default ExpenseTable;
