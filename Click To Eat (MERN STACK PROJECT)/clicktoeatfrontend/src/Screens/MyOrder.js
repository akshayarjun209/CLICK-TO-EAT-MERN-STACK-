import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
//import { Link } from 'react-router-dom';

const MyOrder = () => {
    const [myOrderData, setMyOrderData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        const email = localStorage.getItem('userEmail');
        try {
            const response = await axios.post('http://localhost:8001/api/getmyorderdata', { email });
            console.log(response.data);
            if (response.data.success) {
                setMyOrderData(response.data.previousOrderData);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.message);
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    {myOrderData.length > 0 ? myOrderData.map((order, index) => (
                        <div key={index}>
                            <div className="m-auto mt-5">
                                <h5>Order Date: {order.orderDate}</h5>
                                <hr />
                            </div>
                            {order.orderItem.map((item, idx) => (
                                <div className="col-12 col-md-6 col-lg-3" key={idx}>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                <span className="m-1">{item.qty}</span>
                                                <span className="m-1">{item.size}</span>
                                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )) : <h1>No Previous Orders Found</h1>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrder;