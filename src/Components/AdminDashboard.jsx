import React, { useState, useContext } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import UserCRUD from '../Components/Usercrud';  
import OperatorCRUD from '../Components/Operatorcrud';  
import BusCRUD from '../Components/Buscrud';
import BusRouteCRUD from '../Components/BusRoutecrud';
import '../Components/AdminDashboard.css';
import AuthContext from './AuthContext';

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const { auth } = useContext(AuthContext); 

  const handleSelectionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const isAdmin = auth && auth.role === 'Admin';
  const isBusOperator = auth && auth.role === 'BusOperator';

  return (
    <div className='admin-dashboard'>
      <h1>Admin Control</h1>

      {isAdmin || isBusOperator? (
        <>
            <select onChange={handleSelectionChange} value={selectedOption}>
              <option value="">Select an option</option>
              {isAdmin && <option value="users">Users</option>}
              {isAdmin && <option value="operators">Bus Operators</option>}
              <option value="buses">Buses</option>
              <option value="busroutes">Bus Routes</option>
          </select>

          <div>
            {/* Conditionally render CRUD components based on selection */}
            {selectedOption === 'users' && isAdmin && <UserCRUD />}
            {selectedOption === 'operators' && isAdmin && <OperatorCRUD />}
            {selectedOption === 'buses' && <BusCRUD />}
            {selectedOption === 'busroutes' && <BusRouteCRUD />}
          </div>
        </>
      ) : (
        <p>Only Admin can access this page</p>
      )}

      {/* Provide links to the different sections for better navigation */}
    
    </div>
  );
};

export default AdminDashboard;
