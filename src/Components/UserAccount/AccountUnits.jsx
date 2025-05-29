import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AppContext from "../../Context/AppContext";
import { FaRegTrashCan } from "react-icons/fa6";
import { Modal } from 'antd';
const AccountUnits = () => {
  const { token, notificationRef } = useContext(AppContext);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const showModal = (id) => {
    setSelectedUnitId(id);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleDeleteUnit(selectedUnitId);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios.post('https://api.goldenbeit.com/core/paginated-client-units',
      {}, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        setData(response.data.data.all);
        console.log(response);
      })
      .catch((error) => {
        notificationRef.current.show('error', error.response.data.msg);
        console.error("Error deleting unit:", error);
      });
  }, []);
  console.log(data);
  const handleDeleteUnit = (id) => {
    axios.delete(`https://api.goldenbeit.com/core/delete-unit/${id}`, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        console.log(response);
        notificationRef.current.show('success', 'تم حذف الوحدة بنجاح');
        setData(data.filter((unit) => unit.id !== id)); 
      })
      .catch((error) => {
        notificationRef.current.show('error', error.response.data.msg);
        console.error("Error deleting unit:", error);
      });
  }
  return (
    <div className="orders-table">
      <Modal
        title="حذف الوحدة"
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
        >هل انت متأكد من حذف هذه الوحدة</p>
      </Modal>
      <h2 className="orders-title">وحداتي</h2>
      <span>{`${<h1>hello</h1>}`}</span>
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
              <th>رقم الوحدة / القطعة</th>
              <th>رقم العمارة</th>
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
                <td>
                  {order.is_approved ?(order.status.name)  :
                  (
                    <>
                      <b>مرفوضة بسبب </b> : {order.approver_message}
                    </>
                  )}
                </td>
                <td>{order.city}</td>
                <td>{order.unit_number}</td>
                <td>{order.building_number ? order.building_number : "----"}</td>
                <td>{order.over_price_obj.price_value} {order.over_price_obj.currency}</td>
                <td>
                  <span className="order-options">
                    <a href={`/edit-unit/${order.id}`} className="view-button">تعديل</a>
                    <a href={`/all-units/${order.id}`} className="view-button">مشاهدة</a>
                    <button onClick={()=>showModal(order.id)} className="del-button"><FaRegTrashCan/></button>
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
