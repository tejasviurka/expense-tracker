
import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./components/Authentication/Login";
import AddExpense from "./components/Expenses/AddExpense";
import ExpenseTable from "./components/Expenses/ExpenseTable";
import "./App.css";

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);

  return (
    <div className="app">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div className="dashboard">
          <button onClick={logout} className="logout-button">
            Logout
          </button>
          <AddExpense expenses={expenses} setExpenses={setExpenses} />
          <ExpenseTable expenses={expenses} setExpenses={setExpenses} />
        </div>
      )}
    </div>
  );
}

export default App;
