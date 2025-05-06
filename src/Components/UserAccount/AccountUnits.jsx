import React,{useContext, useState} from "react";
import axios from "axios";
import ErrorPage from "../../Pages/ErrorPage";
import AppContext from "../../Context/AppContext";
import { useQuery } from "@tanstack/react-query";
const AccountUnits = () => {
  const { token } = useContext(AppContext);
  const fetchAccUnits = async () => {
    try {
      const response = await axios.post(
        "https://api.goldenbeit.com/core/paginated-client-units",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data.all;
    } catch (error) {
      throw new Error("Failed to fetch account orders");
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["AccUnits"], 
    queryFn: fetchAccUnits,  
    staleTime: 10000, // Data remains fresh for 10 seconds
  });
  if (isLoading) return <p>جاري تحميل البيانات</p>;
  if (error) return <ErrorPage />;
  console.log(data);
  return (
    <div className="orders-table">
      <h2 className="orders-title">وحداتي</h2>
      {data && data.length>0 ?
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>المسلسل</th>
              <th>العنوان</th>
              <th>المشروع</th>
              <th>الحالة</th>
              <th>المدينة</th>
              <th>المنطقة</th>
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
                <td>{order.title}</td>
                <td>{order.project}</td>
                <td>{order.status.name}</td>
                <td>{order.city}</td>
                <td>{order.area}</td>
                <td>{order.total_price_obj.price_value}</td>
                <td>{order.over_price_obj.price_value}</td>
                <td>
                  <span className="order-options">
                    <a href={`/edit-unit/${order.id}`} className="view-button">تعديل</a>
                    <a href={`/all-units/${order.id}`} className="view-button">مشاهدة</a>
                  </span>
                  {/* <button className="view-button">View</button> */}
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

export default AccountUnits;
