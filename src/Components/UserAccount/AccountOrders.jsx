import React,{useContext, useState, useEffect} from "react";
import axios from "axios";
import ErrorPage from "../../Pages/ErrorPage";
import AppContext from "../../Context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { ImCancelCircle } from "react-icons/im";
const AccountOrders = () => {
  const { token, notificationRef } = useContext(AppContext);
  const [orders, setOrders] = useState()
    useEffect(() => {
      axios.post('https://api.goldenbeit.com/core/paginated-client-requests',
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          setOrders(response.data.data);
          console.log(response);
        })
        .catch((error) => {
          notificationRef.current.show('error', error.response.data.msg);
          console.error("Error deleting unit:", error);
        });
    }, []);
    console.log(orders);
    const handleCancelReq = (id) => {
      axios.get(`https://api.goldenbeit.com/core/cancel-request/${id}`, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((response) => {
          console.log(response);
          notificationRef.current.show('success', 'تم إلغاء الطلب بنجاح');
          setOrders(orders.filter((unit) => unit.id !== id)); 
        })
        .catch((error) => {
          notificationRef.current.show('error', error.response.data.msg);
          console.error("Error deleting unit:", error);
        });
    }
  
  // const fetchAccOrders = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://api.goldenbeit.com/core/paginated-client-requests",
  //       {},
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     return response.data.data;
  //   } catch (error) {
  //     throw new Error("Failed to fetch account orders");
  //   }
  // };
  // const { data, isLoading, error } = useQuery({
  //   queryKey: ["AccOrders"], 
  //   queryFn: fetchAccOrders,  
  //   staleTime: 10000, // Data remains fresh for 10 seconds
  // });
  // if (isLoading) return <p>جاري تحميل البيانات</p>;
  // if (error) return <ErrorPage />;
  console.log(orders);
  return (
    <div className="orders-table">
      <h2 className="orders-title">طلباتي</h2>
      {orders && orders.length>0 ?
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>المسلسل</th>
              <th>العنوان</th>
              <th>المشروع</th>
              <th>النوع</th>
              <th>المدينة</th>
              {/* <th>المنطقة</th> */}
              <th>حالة الطلب</th>
              <th>تاريخ الطلب</th>
              {/* <th>الاجمالي</th> */}
              <th>الاوفر</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 && orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <a href={`/all-units/${order.id}`} className="order-link">#{order.id}</a>
                </td>
                <td>{order.unit_title}</td>
                <td>{order.unit_project}</td>
                <td>{order.unit_type}</td>
                <td>{order.unit_city}</td>
                {/* <td>{order.unit_area}</td> */}
                <td>{order.request_status_obj.name}</td>
                <td>{order.created_at}</td>
                {/* <td>{order.total_price_obj.price_value}</td> */}
                <td>{order.over_price_obj.price_value}</td>
                <td>
                  <span className="order-options">
                    <button onClick={()=>handleCancelReq(order.id)} className="view-button">إلغاء الطلب</button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      :
      <div className="no-units">
        <h2>لايوجد وحدات</h2>
      </div>
      }
    </div>
  );
};

export default AccountOrders;
