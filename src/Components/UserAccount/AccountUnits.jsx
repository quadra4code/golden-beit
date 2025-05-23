import {useContext, useEffect, useState} from "react";
import axios from "axios";
import AppContext from "../../Context/AppContext";
import { FaRegTrashCan } from "react-icons/fa6";
const AccountUnits = () => {
  const { token, notificationRef } = useContext(AppContext);
  const [data, setData] = useState();
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
        notificationRef.current.show('success', 'تم  حذف الوحدة بنجاح بنجاح');
        data = data.filter((unit) => unit.id !== id); 
      })
      .catch((error) => {
        notificationRef.current.show('error', error.response.data.msg);
        console.error("Error deleting unit:", error);
      });
  }
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
                    <button onClick={()=>handleDeleteUnit(order.id)} className="del-button"><FaRegTrashCan/></button>
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
