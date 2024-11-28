import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import BookingList from './BookingList';
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import BookingHistory from './bookingHistory';
import BusRouteSearch from './findBus';
import AdminControl from './AdminList';
import Admin from './Components/Admincrud';

function App() {
  return (
    <Router>
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          {/* <Route path="/bookingList" element={<BookingList />} /> */}
          <Route path="/bookingHistory" element={<BookingHistory />} />
          <Route path="/findBus" element={<BusRouteSearch />} />
          <Route path="/admins" element={<Admin />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </AuthProvider>
  </Router>
  );
}

export default App;