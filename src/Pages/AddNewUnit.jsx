import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import NumberInput from '../Components/InputNumber';
import axios from 'axios';
const AddNewUnit = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const { filterData, token, openNotificationWithIcon } = useContext(AppContext)
  console.log(filterData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({
    project_type_id: selectedType,
    project_id: selectedProject,
    city_id: '',
    area: '',
    description: '',
    property_number: '',
    payment_method: 'CS',
    building_or_region: '',
    installment_period: 0,
    first_installment_value: 0,
    phone_number: '',
    price: '',
    floor: '',
    title: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
    
    axios
    .post('https://golden-gate-three.vercel.app/core/propose-property',
      {
        project_type_id:formData.project_type_id,
        project_id:formData.project_id,
        city_id:formData.city_id,
        area:formData.area,
        description:formData.description,
        property_number:formData.property_number,
        payment_method:formData.payment_method,
        building_or_region:formData.building_or_region,
        installment_period:formData.installment_period,
        first_installment_value:formData.first_installment_value,
        phone_number:formData.phone_number,
        price:formData.price,
        floor:formData.floor,
        title:formData.title,
      },
      {
        headers: { 'Authorization': `Bearer ${token}` },
      }
    )  
    .then((res)=>{
      openNotificationWithIcon('success', 'عملية ناجحة ', 'تم اضافة وحدتك بنجاح')
    })
    .catch((err)=>openNotificationWithIcon('error', 'عملية خاطئه ', err.response.data.msg))
  };
  // State to track the selected type (e.g., "شقة" or "أرض")
  // State to track the selected project
  // Handle radio button change
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value); // Update selected type
    setSelectedProject(''); // Reset selected project when type changes
  };
  // Filter projects based on the selected type
  const filteredProjects = formData.project_type_id
    ? filterData&& filterData.unit_types.find((type) => type.id.toString() === formData.project_type_id)?.projects || []
    : [];
  const handlePaymentChange = (e)=> {
    console.log(formData.payment_method);
    setFormData((prevData) => ({
      ...prevData, 
      payment_method: e,
    }));
  }
    return (
    <main className='add_unit'>
      <div className="add-build-unit">
        <h2>اضافة وحدة جديدة</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="unitNumber">نوع المشروع</label>
            <div className='radio-cont'>
              <div className='radio'>
                <input
                  type="radio" 
                  id="flat" 
                  name="project_type_id" 
                  value='2' 
                  checked={formData.project_type_id === '2'}
                  onChange={handleChange}
                />
                <label for="flat">شقة</label>
              </div>
              <div className='radio'>
                <input
                  type="radio" 
                  id="land" 
                  name="project_type_id" 
                  value="1" 
                  checked={formData.project_type_id === '1'}
                  onChange={handleChange}
                />
                <label for="land">أرض</label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="unitName">اسم المشروع </label>
            <select value={formData.project_id} name="project_id" id="unit" onChange={handleChange}>
              <option value="" disabled>
                اختر مشروع
              </option>
              {filteredProjects.map((project) => (
              <option key={project.id}  value={project.id}>
                {project.name}
              </option>
              ))}
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
              <option value="" disabled>أختر الموقع</option>
              {filterData&& filterData.cities.map((city)=>
                <option key={city.id} value={city.id}>{city.name}</option>
              )}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="area">رقم الوحدة / القطعة</label>
            <input
              type="number"
              id="area"
              name="property_number"
              value={formData.property_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitType">رقم العمارة / اسم المنطقة</label>
            <input
              type="text"
              id="area"
              name="building_or_region"
              value={formData.building_or_region}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="saleStatus">طريقة الدفع</label>
            <select
              id="saleStatus"
              name="payment_method"
              value={formData.payment_method}
              onChange={(e)=>handlePaymentChange(e.target.value)}
              required
            >
              <option value="" disabled>أختر طريقة الدفع</option>
              <option value="CS">كاش</option>
              <option value="IN">تقسيط</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">مدة التقسيط</label>
            <input
              type="number"
              id="price"
              name="installment_period"
              value={formData.installment_period}
              onChange={handleChange}
              required
              disabled={formData.payment_method==='CS'?true:false}
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
              required
              disabled={formData.payment_method==='CS'?true:false}
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
            <label htmlFor="price">السعر</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
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
              required
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
          <div className="form-group">
            <label htmlFor="currency">الدور</label>
            <select
              id="currency"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              required
            >
              <option value="" disabled>أختر الدور</option>
              {filterData&& filterData.floors.map((type)=>
                <option value={type.id}>{type.name}</option>
              )}
            </select>
          </div>
          <button type="submit">أضف وحدتك</button>
        </form>
      </div>
    </main>
  );
};

export default AddNewUnit;