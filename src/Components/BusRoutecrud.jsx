import React,{useState, useEffect} from "react";
import '../Components/Admincrud.css';
import {
    getBusRoutes,
    createBusRoutes,
    updateBusRoutes,
    deleteBusRoutes
} from "../Services/AdminService";

const BusRoute = () =>{
    const [busRoutes, setBusRoutes] = useState([]);  // Store users data
    const [newBusRoute, setNewBusRoute] = useState({
      RouteId: 0,
      SourcePoint: "",
      Destination: "",
      BusId: "",
      DepartureTime:"",
      ArrivalTime:""
    });
    const [isEdit, setIsEdit] = useState(false);  // Track edit state
    const [errors, setErrors] = useState({
        SourcePoint: "",
        Destination: "",
        BusId: "",
        DepartureTime:"",
        ArrivalTime:""
    });
    useEffect(() => {
        fetchBusRoutes();  // Fetch BusRoutes when component mounts
      }, []);
      const fetchBusRoutes = async () => {
        try {
          const data = await getBusRoutes();  // Call the backend API to get users
          if (data && data.$values) {
            setBusRoutes(data.$values);  // Set Busroutes if the response is valid
          } else {
            console.log("Invalid data structure", data);
          }
        } catch (error) {
          console.log("Error fetching BusRoutes:", error);
        }
      };
      const validateForm = () => {
        let formErrors = {};
        if (!newBusRoute.SourcePoint) formErrors.SourcePoint = "SourcePoint Required.";
        if (!newBusRoute.Destination) formErrors.Destination = "Destination  Required.";
        if (!newBusRoute.BusId) formErrors.BusId = "BusId Required.";
        if (!newBusRoute.DepartureTime) formErrors.DepartureTime = "DepartureTime Required.";
        if (!newBusRoute.ArrivalTime) formErrors.ArrivalTime = "ArrivalTime  Required.";
        
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
      };
      const handleCreate = async () => {
        if (!validateForm()) return;
    
        try {
          await createBusRoutes(newBusRoute);  // Create new user through the service
          fetchBusRoutes();  // Reload the user list
          setNewBusRoute({
            RouteId: 0,
            SourcePoint: "",
            Destination: "",
            BusId: "",
            DepartureTime:"",
            ArrivalTime:""
          });
        } catch (error) {
          console.log("Error creating BusRoute:", error);
        }
      };
      const handleUpdate = async () => {
        if (!validateForm()) return;
    
        try {
          await updateBusRoutes(newBusRoute);  // Update the existing user
          setBusRoutes(
            busRoutes.map((busRoute) =>
              busRoute.RouteId === newBusRoute.RouteId ? newBusRoute : busRoute
            )
          );
          setIsEdit(false);
          setNewBusRoute({
            RouteId: 0,
            SourcePoint: "",
            Destination: "",
            BusId: "",
            DepartureTime:"",
            ArrivalTime:""
          });
        } catch (error) {
          console.log("Error updating busroute:", error);
        }
      };
      const handleEdit = (busRoute) => {
        setNewBusRoute(busRoute);  // Pre-fill the form with the selected user's data
        setIsEdit(true);  // Set editing state to true
      };
      const handleDelete = async (id) => {
        try {
          const token = localStorage.getItem('token');
          await deleteBusRoutes(id, token);  // Call the delete user API
          setBusRoutes(busRoutes.filter((busRoute) => busRoute.RouteId !== id));  // Remove deleted user from state
        } catch (error) {
          console.log("Error deleting busroute:", error);
        }
      };
      return (
        <div className="user-list">
            <h1>Bus Routes</h1>
            <ul className="user-grid">
                {busRoutes.map((busRoute) => (
                <li key={busRoute.RouteId} className="user-container">
                    <div>Source Point : {busRoute.SourcePoint}</div>
                    <div> Destination : {busRoute.Destination}</div>
                    <div> Bus Id : {busRoute.BusId}</div>
                    <div> Departure Time : {busRoute.DepartureTime}</div>
                    <div> Arrival Time : {busRoute.ArrivalTime}</div>
                                           
                    <div className="buttons">
                    <button className="edit-button" onClick={() => handleEdit(busRoute)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(busRoute.RouteId)}>Delete</button>
                    </div>
                
                </li>
                ))}
            </ul>
            <div className="user-info">
            <h2>{isEdit ? "Edit BusRoute" : "Add New BusRoute"}</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Source Point"
                        value={newBusRoute.SourcePoint}
                        onChange={(e) => setNewBusRoute({ ...newBusRoute, SourcePoint: e.target.value })}
                    />
                    {errors.SourcePoint && <span style={{ color: "Red" }}>{errors.SourcePoint}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Destination Point"
                        value={newBusRoute.Destination}
                        onChange={(e) => setNewBusRoute({ ...newBusRoute, Destination: e.target.value })}
                    />
                    {errors.Destination && <span style={{ color: "Red" }}>{errors.Destination}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Bus ID"
                        value={newBusRoute.BusId}
                        onChange={(e) => setNewBusRoute({ ...newBusRoute, BusId: e.target.value })}
                    />
                    {errors.BusId && <span style={{ color: "Red" }}>{errors.BusId}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Departure Time"
                        value={newBusRoute.DepartureTime}
                        onChange={(e) => setNewBusRoute({ ...newBusRoute, DepartureTime: e.target.value })}
                    />
                    {errors.DepartureTime && <span style={{ color: "Red" }}>{errors.DepartureTime}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Arrival Time"
                        value={newBusRoute.ArrivalTime}
                        onChange={(e) => setNewBusRoute({ ...newBusRoute, ArrivalTime: e.target.value })}
                    />
                    {errors.ArrivalTime && <span style={{ color: "Red" }}>{errors.ArrivalTime}</span>}
                </div>
                <button className="edit-button" onClick={isEdit ? handleUpdate : handleCreate}>
                        {isEdit ? "Update" : "Add"}
                </button>
            
            </div>

        </div>
      )

}
export default BusRoute;