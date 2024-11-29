import React, {useState, useEffect} from "react";
import 
{ getPayments,createPayments,updatePayments,deletePayments } from "../Services/PaymentService";


const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [newPayment, setNewPayment] = useState({
        id :"",
        bookingId: "",
        paymentAmount: "",
        paymentMode: "",
        status: "",
        paymentDate: ""
      });
      const [isEdit, setIsEdit] = useState(false);  // Track edit state
      const [errors, setErrors] = useState({
        id : "",
        bookingId: "",
        paymentAmount: "",
        paymentMode: "",
        status: "",
        paymentDate: ""
      });
      useEffect(() => {
        fetchPayments(); 
      }, []);

      const fetchPayments = async () => {
        try {
          const data = await getPayments();  // Call the backend API to get users
          if (data && data.$values) {
            setPayments(data.$values);  // Set users if the response is valid
          } else {
            console.log("Invalid data structure", data);
          }
        } catch (error) {
          console.log("Error fetching payment:", error);
        }
      };
      const validateForm = () => {
        let formErrors = {};
        if (!newPayment.id) formErrors.id = "PaymentId Required.";
        if (!newPayment.bookingId) formErrors.bookingId = "BookingId Required.";
        if (!newPayment.paymentAmount) formErrors.paymentAmount = "paymentAmount Required.";
        if (!newPayment.paymentMode) formErrors.paymentMode = "paymentMode Required.";
        if (!newPayment.status) formErrors.status = "status Required.";
        if (!newPayment.paymentDate) formErrors.paymentDate = "paymentDate Required.";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
      };
      const handleCreate = async () => {
        if (!validateForm()) return;
    
        try {
          await createPayments(newPayment);  // Create new payment through the service
          fetchPayments();  // Reload the user list
          setNewPayment({
            id : "",
            bookingId: "",
            paymentAmount: "",
            paymentMode: "",
            status: "",
            paymentDate: ""
          });
        } catch (error) {
          console.log("Error creating payment:", error);
        }
      };
      const handleUpdate = async () => {
        if (!validateForm()) return;
    
        try {
          await updatePayments( newPayment);  // Update the existing user
          setPayments(
            payments.map((payment) =>
                payment.id === newPayment.id ? newPayment : payment

            )
          );
          setIsEdit(false);
          setNewPayment({
            id : "",
            bookingId: "",
            paymentAmount: "",
            paymentMode: "",
            status: "",
            paymentDate: ""
          });
        } catch (error) {
          console.log("Error updating payment:", error);
        }
      };
    
      const handleEdit = (payment) => {
        setNewPayment(payment);  // Pre-fill the form with the selected user's data
        setIsEdit(true);  // Set editing state to true
      };
      const handleDelete = async (id) => {
        try {
          const token = localStorage.getItem('token');
          await deletePayments(id, token);  
          setPayments(payments.filter((payment) => payment.id !== id));  
        } catch (error) {
          console.log("Error deleting payment:", error);
        }
      };
      return (
        <div>
            <h1>Payments</h1>
            <ul>
                {payments.map((payment) => (
                <li key={payment.id}>
                    <div>Booking Id: {payment.bookingId}</div>
                    <div> Payment Amount : {payment.paymentAmount}</div>
                    <div> Payment Mode : {payment.paymentMode}</div>
                    <div> Status: {payment.status}</div>
                    <div> Payment Date : {payment.paymentDate}</div>
                

                        
                    <div>
                    <button onClick={() => handleEdit(payment)}>Edit</button>
                    <button onClick={() => handleDelete(payment.id)}>Delete</button>
                    </div>
                
                </li>
                ))}
            </ul>
          
            <div >
                <h2>{"Edit Payment"}</h2>

                <div>
                <input
                    type="text"
                    placeholder="Name"
                    value={newPayment.bookingId}
                    onChange={(e) => setNewPayment({ ...newPayment, bookingId: e.target.value })}
                />
                {errors.bookingId && <span style={{ color: "Red" }}>{errors.bookingId}</span>}
                </div>
            
                <div>
                <input
                    type="text"
                    placeholder="Payment amount"
                    value={newPayment.paymentAmount}
                    onChange={(e) =>
                    setNewPayment({ ...newPayment, paymentAmount: e.target.value })
                    }
                />
                {errors.paymentAmount && <span style={{ color: "Red" }}>{errors.paymentAmount}</span>}
                </div>
                <div>
                <input
                    type="text"
                    placeholder="Payment Mode"
                    value={newPayment.paymentMode}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentMode: e.target.value })}
                />
                {errors.paymentMode && <span style={{ color: "Red" }}>{errors.paymentMode}</span>}
                </div>

            
                <div>
                <input
                    type="text"
                    placeholder="Status"
                    value={newPayment.status}
                    onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
                />
                {errors.status && <span style={{ color: "Red" }}>{errors.status}</span>}
                </div>
            
                <div>
                <input
                    type="datetime-local"
                    placeholder="Payment Date"
                    value={newPayment.paymentDate}
                    onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })}
                />
                {errors.paymentDate && <span style={{ color: "Red" }}>{errors.paymentDate}</span>}
                </div>

                <button onClick={handleUpdate}>
                    Update
                </button>

            </div>
        </div>
      )   

}
export default Payment;