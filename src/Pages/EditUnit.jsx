import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import axios from 'axios';
import Popup from '../Components/Popup';
import { FaTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import CustomInpSelect from '../Components/CustomInpSelect';
import MiniLoader from '../Components/Miniloader';
import PhoneInput from 'react-phone-input-2'
const EditUnit = () => {
  const param = useParams();
  console.log(param);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  
  const [error, setError] = useState();
  const [unitImages, setUnitImages] = useState([]);
  const [showImageFields, setShowImageFields] = useState([]);
    const [defCountry, setDefCountry] = useState('eg');
      const [isValid, setIsValid] = useState(false);
  const { handleUnAuth, filterData, token, notificationRef } = useContext(AppContext);
  const [formData, setFormData] = useState({
    id: param.id,
    unit_type_id: null,
    project_id: null,
    // proposal_id: null,
    proposal_str: null,
    city_id: null,
    floor: null,
    facade: null,
    area: null,
    description: null,
    unit_number: null,
    payment_method: null,
    paid_amount: null,
    paid_amount_currency: null,
    remaining_amount: null,
    remaining_amount_currency: null,
    building_number: null,
    installment_period: 0,
    first_installment_value: 0,
    first_installment_value_currency: 0,
    phone_number: null,
    total_price_currency: null,
    total_price: null,
    over_price_currency: null,
    over_price: null,
    meter_price_currency: null,
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
    .get(`https://api.goldenbeit.com/core/get-update-unit/${param.id}`, {
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
  const handleCurrencyChange = (field, currency) => {
    setFormData({
      ...formData,
      [field]: currency,
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
    e.preventDefault();
    console.log(`added images: ${images}`,`old images: ${unitImages}`);
    console.log(formData);
    if (!formData.meter_price && !formData.over_price && !formData.total_price) {
      notificationRef.current.show('error','خطأ', 'يجب إدخال سعر الأوفر أو إجمالى السعر أو سعر المتر على الأقل');
      return;
    }
    if (images.length === 0 && unitImages.length === 0) {
      setError('يجب إضافة صورة واحدة على الأقل');
      return;
    }
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      if (key != 'images' && formData[key] !== null && formData[key] !== undefined) {
        formDataToSubmit.append(key, formData[key]);
      }
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
    setIsLoading(true)
    axios
      .put('https://api.goldenbeit.com/core/update-unit', formDataToSubmit, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        notificationRef.current.show('success','عملية ناجحة', 'تم تعديل وحدتك بنجاح');
      })
      .catch((err) => {
        if (err.status === 401) {
          handleUnAuth();
        }
        console.log(err);
        notificationRef.current.show('error','عملية خاطئه', err.response.data.msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const filteredProjects = formData.unit_type_id
    ? filterData && filterData.unit_types.find((type) => type.id.toString() === formData.unit_type_id)?.projects || []
    : [];
  const handleRemoveImage = (image) => {
    const updatedImages = unitImages.filter((img) => img !== image);
    setUnitImages(updatedImages);
  };
  
  const countryLengths = {
    eg: 10,
    sa: 9,
    ae: 9,
    qa: 7,
    bh: 8,
    kw: 8,
  };
  const handlePhoneChange = (value, countryData) => {
    const countryCode = countryData?.countryCode;
    const dialCode = countryData?.dialCode;
    // Better phone number processing
    // let phoneWithoutDialCode = value;
    //  Remove country code if present (more robust handling)
    // if (dialCode && value.startsWith(`+${dialCode}`)) {
    //   phoneWithoutDialCode = value.slice(dialCode.length ); // +1 for the '+' sign
    // }
    // console.log('Processed number:', phoneWithoutDialCode);
    setDefCountry(countryCode);
    const maxLength = countryLengths[countryCode] || 0;
    const isValidLength = value.slice(dialCode.length).length === maxLength;
    setIsValid(isValidLength);
    // Only update if number is valid length or empty
    if (value.slice(dialCode.length).length <= maxLength) {
      console.log('e.name');
      setFormData({
      ...formData,
      phone_number: value
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <MiniLoader />
      ) : (
        <main className='add_unit'>
          <Popup />
          <div className="add-build-unit">
            <h2>تعديل الوحدة</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="unitNumber">نوع المشروع <span className='req'>(مطلوب)</span></label>
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
                <label htmlFor="unit">اسم المشروع <span className='req'>(مطلوب)</span></label>
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
                {/* <label htmlFor="floorNumber">الطرح <span className='req'>(مطلوب)</span></label>
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
                </select> */}
                <label htmlFor="proposalStr">الطرح <span className='req'>(مطلوب)</span></label>
                <input
                  type="text"
                  id="proposalStr"
                  name="proposal_str"
                  value={formData.proposal_str}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">المدينة <span className='req'>(مطلوب)</span></label>
                <select
                  id="city"
                  name="city_id"
                  value={formData.city_id}
                  onChange={handleChange}
                  required
                >
                  <option value="" selected disabled hidden>أختر المدينة</option>
                  {filterData && filterData.cities.map((city) =>
                    <option key={city.id} value={city.id}>{city.name}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="facadeId">الواجهة</label>
                <select
                  id="facadeId"
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
                  <label htmlFor="floorNumber">الطابق <span className='req'>(مطلوب)</span></label>
                  <select
                    id="floorNumber"
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
                <label htmlFor="unitNumber">رقم الوحدة / القطعة <span className='req'>(مطلوب)</span></label>
                <input
                  type="number"
                  id="unitNumber"
                  name="unit_number"
                  onWheel={(e) => e.target.blur()} 
                  onFocus={(e) => e.target.select()}
                  value={formData.unit_number}
                  onChange={handleChange}
                  required
                />
              </div>
              {formData.unit_type_id === '2' &&
                <div className="form-group">
                  <label htmlFor="buildingNumber">رقم العمارة <span className='req'>(مطلوب)</span></label>
                  <input
                    type="text"
                    id="buildingNumber"
                    name="building_number"
                    value={formData.building_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              }
              <div className="form-group">
                <label htmlFor="paymentMethod">نظام السداد <span className='req'>(مطلوب)</span></label>
                <input
                  type="text"
                  id="paymentMethod"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="unitType">المدفوع <span className='req'>(مطلوب)</span></label>
                <CustomInpSelect
                  value={formData.paid_amount}
                  onChange={(value) => setFormData({ ...formData, paid_amount: value })}
                  currency={formData.paid_amount_currency}
                  onCurrencyChange={(currency)=>
                    handleCurrencyChange('paid_amount_currency',currency)
                  }
                />
                {/* <input
                  type="text"
                  id="area"
                  name="paid_amount"
                  value={formData.paid_amount}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="form-group">
                <label htmlFor="unitType"> المتبقي <span className='req'>(مطلوب)</span></label>
                <CustomInpSelect
                  value={formData.remaining_amount}
                  onChange={(value) => setFormData({ ...formData, remaining_amount: value })}
                  currency={formData.remaining_amount_currency}
                  onCurrencyChange={(currency)=>
                    handleCurrencyChange('remaining_amount_currency',currency)
                  }
                />
                {/* <input
                  type="text"
                  id="area"
                  name="remaining_amount"
                  value={formData.remaining_amount}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="form-group">
                <label htmlFor="installmentPeriod">مدة التقسيط</label>
                <input
                  type="number"
                  id="installmentPeriod"
                  name="installment_period"
                  value={formData.installment_period}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">قيمة أول قسط</label>
                <CustomInpSelect
                  value={formData.first_installment_value}
                  onChange={(value) => setFormData({ ...formData, first_installment_value: value })}
                  currency={formData.first_installment_value_currency}
                  onCurrencyChange={(currency)=>
                    handleCurrencyChange('first_installment_value_currency',currency)
                  }
                />
                {/* <input
                  type="number"
                  id="price"
                  name="first_installment_value"
                  value={formData.first_installment_value}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="form-group">
                <label htmlFor="areaMeter">المساحة بالمتر <span className='req'>(مطلوب)</span></label>
                <input
                  type="number"
                  id="areaMeter"
                  name="area"
                  onWheel={(e) => e.target.blur()} 
                  onFocus={(e) => e.target.select()}
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">سعر المتر</label>
                <CustomInpSelect
                  value={formData.meter_price}
                  onChange={(value) => setFormData({ ...formData, meter_price: value })}
                  currency={formData.meter_price_currency}
                  onCurrencyChange={(currency)=>
                    handleCurrencyChange('meter_price_currency',currency)
                  }
                />
                {/* <input
                  type="number"
                  id="price"
                  name="meter_price"
                  value={formData.meter_price}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="form-group">
                <label htmlFor="price">قيمة الاوفر <span className='req'>(مطلوب)</span></label>
                <CustomInpSelect
                  value={formData.over_price}
                  isReq={true}
                  onChange={(value) => setFormData({ ...formData, over_price: value })}
                  currency={formData.over_price_currency}
                  onCurrencyChange={(currency)=>
                    handleCurrencyChange('over_price_currency',currency)
                  }
                />
                {/* <input
                  type="number"
                  id="price"
                  name="over_price"
                  value={formData.over_price}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="form-group">
                <label htmlFor="price">اجمالى السعر <span className='req'>(مطلوب)</span></label>
                <CustomInpSelect
                  value={formData.total_price}
                  isReq={true}
                  onChange={(value) => setFormData({ ...formData, total_price: value })}
                  currency={formData.total_price_currency}
                  onCurrencyChange={(currency)=>
                    handleCurrencyChange('total_price_currency',currency)
                  }
                />
                {/* <input
                  type="number"
                  id="price"
                  name="total_price"
                  value={formData.total_price}
                  onChange={handleChange}
                /> */}
              </div>
              <div className="form-group">
                <label htmlFor="unitTitle">العنوان <span className='req'>(مطلوب)</span></label>
                <input
                  type="text"
                  id="unitTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="benefits">المميزات</label>
                <input
                  type="text"
                  id="benefits"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumberContact">رقم الهاتف للتواصل <span className='req'>(مطلوب)</span></label>
                <PhoneInput
                  country={defCountry} // Default country (Egypt)
                  onlyCountries={['eg', 'sa', 'ae', 'qa', 'bh', 'kw']}
                  value={formData.phone_number}
                  onChange={handlePhoneChange }
                  inputProps={{
                    required: true,
                    name: 'phone_number',
                    placeholder: 'رقم الهاتف',
                  }}
                  containerStyle={{ direction: 'ltr',  }}
                  // inputStyle={{ width: '100%', paddingLeft: '48px', direction: 'ltr' }}
                  buttonStyle={{ direction: 'ltr' }}
                />
                {/* <input
                  type="number"
                  id="phoneNumberContact"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                /> */}
              </div>
              <div className="form-group-images">
                {unitImages.map((image, index) => (
                  <div key={`existing-${index}`} className="image-upload-field">
                    <img src={image} alt={`Unit ${index}`} />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveImage(image)} 
                      className="delete-image-button"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
                {/* {unitImages.map((image) => (
                  <div key={image} className="image-upload-field">
                    <img src={image} alt="Unit" />  
                    <button onClick={() => handleRemoveImage(image)} className="delete-image-button">
                      <FaTrashAlt />  
                    </button>
                  </div>
                ))} */}
                {/* <img src="" alt="" /> */}
              </div>
              <div className="form-group">
                <label>صور الوحدة <span className='req'>(مطلوب)</span></label>
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
                {error && <p className="error-message">{error}</p>}
              </div>
              <button type="submit">حفظ</button>
            </form>
          </div>
        </main>
      )}
    </>
  );
};

export default EditUnit;
