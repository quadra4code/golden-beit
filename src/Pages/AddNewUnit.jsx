import React, { useState } from 'react';
const AddNewUnit = () => {
  const [formData, setFormData] = useState({
    unitName: '',
    unitNumber: '',
    floorNumber: '',
    area: '',
    unitType: '',
    saleStatus: '',
    price: '',
    currency: ''
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
    console.log('Form Data Submitted', formData);
  };

  return (
    <main className='add_unit'>
      <div className="add-build-unit">
        <h2>اضافة وحدة جديدة</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="unitName">نوع المشروع </label>
            <select
              id="unitType"
              name="unitType"
              value={formData.unitType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="unitNumber">اسم المشروع</label>
            <select
              id="unitType"
              name="unitType"
              value={formData.unitType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="floorNumber">الموقع</label>
            <select
              id="unitType"
              name="unitType"
              value={formData.unitType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="studio">Studio</option>
              <option value="penthouse">Penthouse</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="area">رقم الوحدة / القطعة</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unitType">رقم العمارة</label>
            <input
              type="text"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="saleStatus">طريقة الدفع</label>
            <select
              id="saleStatus"
              name="saleStatus"
              value={formData.saleStatus}
              onChange={handleChange}
              required
            >
              <option value="CS">كاش</option>
              <option value="IN">تقسيط</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="price">مدة التقسيط</label>
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
            <label htmlFor="price">قيمة أول قسط</label>
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
            <label htmlFor="price">المساحة بالمتر</label>
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
              type="فثء"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">الوصف</label>
            <input
              type="فثء"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">رقم الهاتف للتواصل</label>
            <input
              type="فثء"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="currency">الدور</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
            >
              <option value="">Select Currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="EGP">EGP</option>
            </select>
          </div>
          <button type="submit">Add Unit</button>
        </form>
      </div>
    </main>
  );
};

export default AddNewUnit;