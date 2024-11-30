import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserCRUD from '../Components/Usercrud';  // Make sure this path is correct
import OperatorCRUD from '../Components/Operatorcrud';  // Make sure this path is correct

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>Admin Control</h1>
      
      {/* Dropdown for Users and Operators */}
      <select onChange={handleSelectionChange} value={selectedOption}>
        <option value="">Select an option</option>
        <option value="users">Users</option>
        <option value="operators">Bus Operators</option>
      </select>

      <div>
        {/* Conditionally render the User or Operator CRUD component */}
        {selectedOption === 'users' && <UserCRUD />}
        {selectedOption === 'operators' && <OperatorCRUD />}
      </div>
    </div>
  );
};

export default AdminDashboard;
