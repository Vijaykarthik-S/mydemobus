import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import UserCRUD from '../Components/Usercrud';  
import OperatorCRUD from '../Components/Operatorcrud';  
import BusCRUD from '../Components/Buscrud';
import BusRouteCRUD from '../Components/BusRoutecrud';
import '../Components/AdminDashboard.css';

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='admin-dashboard'>
      <h1>Admin Control</h1>
      
      {/* Dropdown for Users and Operators */}
      <select onChange={handleSelectionChange} value={selectedOption}>
        <option value="">Select an option</option>
        <option value="users">Users</option>
        <option value="operators">Bus Operators</option>
        <option value="buses">Buses</option>
        <option value="busroutes">Bus Routes</option>
      </select>

      <div>
        {/* Conditionally render the User or Operator CRUD component */}
        {selectedOption === 'users' && <UserCRUD />}
        {selectedOption === 'operators' && <OperatorCRUD />}
        {selectedOption === 'buses' && <BusCRUD />}
        {selectedOption === 'busroutes' && <BusRouteCRUD />}
      </div>
    </div>
  );
};

export default AdminDashboard;
