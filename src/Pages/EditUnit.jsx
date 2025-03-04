import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import axios from 'axios';
import Popup from '../Components/Popup';
import { FaTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
const EditUnit = () => {
  const param = useParams();
  console.log(param);
  const [images, setImages] = useState([]);
  const [unitImages, setUnitImages] = useState([]);
  const [showImageFields, setShowImageFields] = useState([]);
  const { handleUnAuth, filterData, token, openNotificationWithIcon, contextHolder } = useContext(AppContext);
  const [formData, setFormData] = useState({
    id: param.id,
    unit_type_id: null,
    project_id: null,
    proposal_id: null,
    city_id: null,
    floor: null,
    facade: null,
    area: null,
    description: null,
    unit_number: null,
    payment_method: null,
    paid_amount: null,
    remaining_amount: null,
    building_number: null,
    installment_period: 0,
    first_installment_value: 0,
    phone_number: null,
    total_price: null,
    over_price: null,
    meter_price: null,
    floor: null,
    title: null,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(images);
  }, []);
  useEffect(() => {
    axios
    .get(`https://golden-gate-three.vercel.app/core/get-update-unit/${param.id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(res);
      setFormData(res.data.data);
      setUnitImages(res.data.data.images);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };
  const handleAddImageField = () => {
    setShowImageFields([...showImageFields, true]);
  };
  const handleRemoveImageField = (index) => {
    const updatedImageFields = [...showImageFields];
    updatedImageFields.splice(index, 1);
    setShowImageFields(updatedImageFields);
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const handleSubmit = (e) => {
    console.log(images);
    e.preventDefault();
    console.log(formData);
    if (!formData.meter_price && !formData.over_price && !formData.total_price) {
      openNotificationWithIcon('error', 'يجب إدخال سعر الأوفر أو إجمالى السعر أو سعر المتر على الأقل');
      return;
    }
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });
    // Append images as an array
    images.forEach((image) => {
      formDataToSubmit.append('images', image);
      console.log(formDataToSubmit);
    });
    unitImages.forEach((image) => {
      formDataToSubmit.append('old_images', image);
      console.log(formDataToSubmit);
    });
    console.log(formDataToSubmit);
    axios
      .put('https://golden-gate-three.vercel.app/core/update-unit', formDataToSubmit, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        openNotificationWithIcon('success', 'عملية ناجحة ', 'تم اضافة وحدتك بنجاح');
      })
      .catch((err) => {
        if (err.status === 401) {
          handleUnAuth();
        }
        console.log(err);
        openNotificationWithIcon('error', 'عملية خاطئه ', err.response.data.msg);
      });
  };
  const filteredProjects = formData.unit_type_id
    ? filterData && filterData.unit_types.find((type) => type.id.toString() === formData.unit_type_id)?.projects || []
    : [];
  const handleRemoveImage = (image) => {
    const updatedImages = unitImages.filter((img) => img !== image);
    setUnitImages(updatedImages);
  };
  return (
    <main className='add_unit'>
      {contextHolder}
      <Popup />
      <div className="add-build-unit">
        <h2>تعديل الوحدة</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="unitNumber">نوع المشروع</label>
            <div className='radio-cont'>
              <div className='radio'>
                <input
                  type="radio"
                  id="flat"
                  name="unit_type_id"
                  value='2'
                  checked={formData.unit_type_id === '2'}
                  onChange={handleChange}
                />
                <label htmlFor="flat">شقة</label>
              </div>
              <div className='radio'>
                <input
                  type="radio"
                  id="land"
                  name="unit_type_id"
                  value="1"
                  checked={formData.unit_type_id === '1'}
                  onChange={handleChange}
                />
                <label htmlFor="land">أرض</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="unitName">اسم المشروع </label>
            <select value={formData.project_id} name="project_id" id="unit" onChange={handleChange}>
              <option value="" disabled hidden>
                اختر مشروع
              </option>
              {filteredProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="floorNumber">الطرح</label>
            <select
              id="unitType"
              name="proposal_id"
              value={formData.proposal_id}
              onChange={handleChange}
              required
            >
              <option value="" selected disabled hidden>أختر الطرح</option>
              {filterData && filterData.proposals.map((proposal) =>
                <option key={proposal.id} value={proposal.id}>{proposal.name}</option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="floorNumber">الموقع</label>
            <select
              id="unitType"
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              required
            >
              <option value="" selected disabled hidden>أختر الموقع</option>
              {filterData && filterData.cities.map((city) =>
                <option key={city.id} value={city.id}>{city.name}</option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="floorNumber">الواجهة</label>
            <select
              id="unitType"
              name="facade"
              value={formData.facade}
              onChange={handleChange}
              
            >
              <option value="" disabled hidden selected>أختر الواجهة</option>
              {filterData && filterData.facades.map((facade) =>
                <option key={facade.id} value={facade.id}>{facade.name}</option>
              )}
            </select>
          </div>
          {formData.unit_type_id === '2' &&
            <div className="form-group">
              <label htmlFor="floorNumber">الطابق</label>
              <select
                id="unitType"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>أختر الطابق</option>
                {filterData && filterData.floors.map((floor) =>
                  <option key={floor.id} value={floor.id}>{floor.name}</option>
                )}
              </select>
            </div>
          }
          <div className="form-group">
            <label htmlFor="area">رقم الوحدة / القطعة</label>
            <input
              type="number"
              id="area"
              name="unit_number"
              value={formData.unit_number}
              onChange={handleChange}
              required
            />
          </div>
          {formData.unit_type_id === '2' &&
            <div className="form-group">
              <label htmlFor="unitType">رقم العمارة</label>
              <input
                type="text"
                id="area"
                name="building_number"
                value={formData.building_number}
                onChange={handleChange}
                required
              />
            </div>
          }
          <div className="form-group">
            <label htmlFor="unitType">نظام السداد</label>
            <input
              type="text"
              id="area"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitType">المدفوع </label>
            <input
              type="text"
              id="area"
              name="paid_amount"
              value={formData.paid_amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitType"> المتبقي</label>
            <input
              type="text"
              id="area"
              name="remaining_amount"
              value={formData.remaining_amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">مدة التقسيط</label>
            <input
              type="number"
              id="price"
              name="installment_period"
              value={formData.installment_period}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">قيمة أول قسط</label>
            <input
              type="number"
              id="price"
              name="first_installment_value"
              value={formData.first_installment_value}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">المساحة بالمتر</label>
            <input
              type="number"
              id="price"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">سعر المتر</label>
            <input
              type="number"
              id="price"
              name="meter_price"
              value={formData.meter_price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">قيمة الاوفر</label>
            <input
              type="number"
              id="price"
              name="over_price"
              value={formData.over_price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">اجمالى السعر</label>
            <input
              type="number"
              id="price"
              name="total_price"
              value={formData.total_price}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">العنوان</label>
            <input
              type="text"
              id="price"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">الوصف</label>
            <input
              type="text"
              id="price"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">رقم الهاتف للتواصل</label>
            <input
              type="number"
              id="price"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-images">
            {unitImages.map((image) => (
              <div key={image} className="image-upload-field">
                <img src={image} alt="Unit" />  
                <button onClick={() => handleRemoveImage(image)} className="delete-image-button">
                  <FaTrashAlt />  
                </button>
              </div>
            ))}
            <img src="" alt="" />
          </div>
          <div className="form-group">
            <label>صور الوحدة</label>
            {showImageFields.map((_, index) => (
              <div key={index} className="image-upload-field">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                />
                {images[index] && (
                  <img
                    src={URL.createObjectURL(images[index])}
                    alt="Uploaded"
                    className="uploaded-image-preview"
                  />
                )}
                <button type="button" onClick={() => handleRemoveImageField(index)} className="delete-image-button">
                  <FaTrashAlt />
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddImageField} className="add-image-button">
              إضافة صورة 
            </button>
          </div>
          <button type="submit">حفظ</button>
        </form>
      </div>
    </main>
  );
};

export default EditUnit;
