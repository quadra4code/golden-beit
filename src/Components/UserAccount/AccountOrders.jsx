import React,{useContext, useState} from "react";
import axios from "axios";
import ErrorPage from "../../Pages/ErrorPage";
import AppContext from "../../Context/AppContext";
import { useQuery } from "@tanstack/react-query";
const AccountOrders = () => {
  const { token } = useContext(AppContext);
  const [orders, setOrders] = useState()
  const fetchAccOrders = async () => {
    try {
      const response = await axios.post(
        "https://api.goldenbeit.com/core/paginated-client-requests",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch account orders");
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["AccOrders"], 
    queryFn: fetchAccOrders,  
    staleTime: 10000, // Data remains fresh for 10 seconds
  });
  if (isLoading) return <p>جاري تحميل البيانات</p>;
  if (error) return <ErrorPage />;
  console.log(data);
  return (
    <div className="orders-table">
      <h2 className="orders-title">طلباتي</h2>
      {data && data.length>0 ?
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>المسلسل</th>
              <th>العنوان</th>
              <th>المشروع</th>
              <th>النوع</th>
              <th>المدينة</th>
              <th>المنطقة</th>
              <th>حالة الطلب</th>
              <th>تاريخ الطلب</th>
              <th>الاجمالي</th>
              <th>الاوفر</th>
              <th>خيارات</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 && data.map((order) => (
              <tr key={order.id}>
                <td>
                  <a href={`/all-units/${order.id}`} className="order-link">#{order.id}</a>
                </td>
                <td>{order.unit_title}</td>
                <td>{order.unit_project}</td>
                <td>{order.unit_proposal}</td>
                <td>{order.unit_city}</td>
                <td>{order.unit_area}</td>
                <td>{order.created_at}</td>
                <td>{order.request_status_obj.name}</td>
                <td>{order.total_price_obj.price_value}</td>
                <td>{order.over_price_obj.price_value}</td>
                <td>
                  <button className="view-button">عرض</button>
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
