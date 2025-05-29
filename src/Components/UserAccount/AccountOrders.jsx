import React,{useContext, useState, useEffect} from "react";
import axios from "axios";
import ErrorPage from "../../Pages/ErrorPage";
import AppContext from "../../Context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { ImCancelCircle } from "react-icons/im";
import { Modal } from 'antd';
const AccountOrders = () => {
  const { token, notificationRef } = useContext(AppContext);
  const [orders, setOrders] = useState()
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setSelectedOrderId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleCancelReq(selectedOrderId);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          setIsModalOpen(false);
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
      <Modal
        title="إلغاء الطلب"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="نعم"
        cancelText="إغلاق"
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "1.4rem",
            color: "#f00",
          }}
        >هل انت متأكد من إلغاء الطلب</p>
      </Modal>
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
              <th>آخر تحديث</th>
              {/* <th>تاريخ الطلب</th> */}
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
                <td>{order.updated_at ? order.updated_at : order.created_at}</td>
                {/* <td>{order.total_price_obj.price_value}</td> */}
                <td>{order.over_price_obj.price_value}</td>
                <td>
                  <span className="order-options">
                    <button onClick={()=>showModal(order.id)} className="view-button">إلغاء الطلب</button>
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
