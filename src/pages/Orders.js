import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Order from "../components/Order";
import Navbar from "../components/Navbar";
import "../css/Orders.css";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";

const Orders = () => {
  const user = useSelector(selectUser);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    db.collection("orders")
      .orderBy("date", "desc")
      .where("user_id", "==", user.id)
      .onSnapshot((snapshot) => {
        let arr = [];
        snapshot.docs.forEach((doc) => {
          arr.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOrders(arr);
      });
  }, [user]);

  console.log(orders);

  return (
    <div className="orders">
      <Navbar />
      <h2>Your Orders: {orders.length}</h2>
      {orders.map((order) => (
        <Order
          key={order.id}
          order_id={order.data.order_id}
          items={order.data.items}
          date={order.data.date}
          total_price={order.data.total_price}
        />
      ))}
    </div>
  );
};

export default Orders;
