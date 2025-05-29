// import React, { useState, useContext, useEffect } from 'react';
// import AppContext from '../Context/AppContext';
// import NumberInput from '../Components/InputNumber';
// import axios from 'axios';
// import Popup from '../Components/Popup';
// const AddNewUnit = () => {
//   const [selectedProject, setSelectedProject] = useState('');
//   const [selectedType, setSelectedType] = useState(null);
//   const {handleUnAuth, filterData, token, openNotificationWithIcon, contextHolder } = useContext(AppContext)
//   console.log(filterData);
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const [formData, setFormData] = useState({
//     project_type_id: selectedType,
//     project_id: selectedProject,
//     proposal_id: '',
//     city_id: '',
//     floor: null,
//     facade: null,
//     area: '',
//     description: '',
//     unit_number: '',
//     payment_method: 'CS',
//     building_number: '',
//     installment_period: 0,
//     first_installment_value: 0,
//     phone_number: '',
//     total_price: '',
//     over_price: '',
//     meter_price: '',
//     floor: '',
//     title: '',
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Handle form submission logic
//     if (!formData.meter_price && !formData.over_price && !formData.total_price) {
//       openNotificationWithIcon('error', 'يجب إدخال سعر الأوفر أو إجمالى السعر أو سعر المتر على الأقل');
//       return;
//     }
//     axios
//     .post('https://api.goldenbeit.com/core/propose-unit',
//       {
//         unit_type_id:formData.project_type_id,
//         project_id:formData.project_id,
//         proposal_id:formData.proposal_id,
//         city_id:formData.city_id,
//         floor:formData.floor,
//         facade:formData.facade,
//         area:formData.area,
//         description:formData.description,
//         unit_number:formData.unit_number,
//         payment_method:formData.payment_method,
//         building_number:formData.building_number,
//         installment_period:formData.installment_period,
//         first_installment_value:formData.first_installment_value,
//         phone_number:formData.phone_number,
//         total_price:formData.total_price,
//         over_price:formData.over_price,
//         meter_price:formData.meter_price,
//         floor:formData.floor,
//         title:formData.title,
//       },
//       {
//         headers: { 'Authorization': `Bearer ${token}` },
//       }
//     )  
//     .then((res)=>{
//       console.log(res);
//       openNotificationWithIcon('success', 'عملية ناجحة ', 'تم اضافة وحدتك بنجاح')
//     })
//     .catch((err)=>{
//       if(err.status===401){
//         handleUnAuth()
//       }
//       console.log(err);
//       openNotificationWithIcon('error', 'عملية خاطئه ', err.response.data.msg)
//     })
//   };
//   // State to track the selected type (e.g., "شقة" or "أرض")
//   // State to track the selected project
//   // Handle radio button change
//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value); // Update selected type
//     setSelectedProject(''); // Reset selected project when type changes
//   };
//   // Filter projects based on the selected type
//   const filteredProjects = formData.project_type_id
//     ? filterData&& filterData.unit_types.find((type) => type.id.toString() === formData.project_type_id)?.projects || []
//     : [];
//   const handlePaymentChange = (e)=> {
//     console.log(formData.payment_method);
//     setFormData((prevData) => ({
//       ...prevData, 
//       payment_method: e,
//     }));
//   }
//     return (
//     <main className='add_unit'>
//       {contextHolder}
//       <Popup/>
//       <div className="add-build-unit">
//         <h2>اضافة وحدة جديدة</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="unitNumber">نوع المشروع</label>
//             <div className='radio-cont'>
//               <div className='radio'>
//                 <input
//                   type="radio" 
//                   id="flat" 
//                   name="project_type_id" 
//                   value='2' 
//                   checked={formData.project_type_id === '2'}
//                   onChange={handleChange}
//                 />
//                 <label for="flat">شقة</label>
//               </div>
//               <div className='radio'>
//                 <input
//                   type="radio" 
//                   id="land" 
//                   name="project_type_id" 
//                   value="1" 
//                   checked={formData.project_type_id === '1'}
//                   onChange={handleChange}
//                 />
//                 <label for="land">أرض</label>
//               </div>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="unitName">اسم المشروع </label>
//             <select value={formData.project_id} name="project_id" id="unit" onChange={handleChange}>
//               <option value="" disabled>
//                 اختر مشروع
//               </option>
//               {filteredProjects.map((project) => (
//               <option key={project.id}  value={project.id}>
//                 {project.name}
//               </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="floorNumber">الطرح</label>
//             <select
//               id="unitType"
//               name="proposal_id"
//               value={formData.proposal_id}
//               onChange={handleChange}
//               required
//             >
//               <option value="" disabled>أختر الطرح</option>
//               {filterData&& filterData.proposals.map((proposal)=>
//                 <option key={proposal.id} value={proposal.id}>{proposal.name}</option>
//               )}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="floorNumber">الموقع</label>
//             <select
//               id="unitType"
//               name="city_id"
//               value={formData.city_id}
//               onChange={handleChange}
//               required
//             >
//               <option value="" disabled>أختر الموقع</option>
//               {filterData&& filterData.cities.map((city)=>
//                 <option key={city.id} value={city.id}>{city.name}</option>
//               )}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="floorNumber">الواجهة</label>
//             <select
//               id="unitType"
//               name="facade"
//               value={formData.facade}
//               onChange={handleChange}
//               required
//             >
//               <option value="" disabled>أختر الواجهة</option>
//               {filterData&& filterData.facades.map((facade)=>
//                 <option key={facade.id} value={facade.id}>{facade.name}</option>
//               )}
//             </select>
//           </div>
//           {formData.project_type_id==='2'&&
//           <div className="form-group">
//             <label htmlFor="floorNumber">الطابق</label>
//             <select
//               id="unitType"
//               name="floor"
//               value={formData.floor}
//               onChange={handleChange}
//               required
//             >
//               <option value="" disabled>أختر الطابق</option>
//               {filterData&& filterData.floors.map((floor)=>
//                 <option key={floor.id} value={floor.id}>{floor.name}</option>
//               )}
//             </select>
//           </div>
//           }
//           <div className="form-group">
//             <label htmlFor="area">رقم الوحدة / القطعة</label>
//             <input
//               type="number"
//               id="area"
//               name="unit_number"
//               value={formData.unit_number}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           {formData.project_type_id==='2'&&
//           <div className="form-group">
//             <label htmlFor="unitType">رقم العمارة</label>
//             <input
//               type="text"
//               id="area"
//               name="building_number"
//               value={formData.building_number}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           }
//           <div className="form-group">
//             <label htmlFor="saleStatus">طريقة الدفع</label>
//             <select
//               id="saleStatus"
//               name="payment_method"
//               value={formData.payment_method}
//               onChange={(e)=>handlePaymentChange(e.target.value)}
//               required
//             >
//               <option value="" disabled>أختر طريقة الدفع</option>
//               <option value="CS">كاش</option>
//               <option value="IN">تقسيط</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">مدة التقسيط</label>
//             <input
//               type="number"
//               id="price"
//               name="installment_period"
//               value={formData.installment_period}
//               onChange={handleChange}
//               required
//               disabled={formData.payment_method==='CS'?true:false}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">قيمة أول قسط</label>
//             <input
//               type="number"
//               id="price"
//               name="first_installment_value"
//               value={formData.first_installment_value}
//               onChange={handleChange}
//               required
//               disabled={formData.payment_method==='CS'?true:false}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">المساحة بالمتر</label>
//             <input
//               type="number"
//               id="price"
//               name="area"
//               value={formData.area}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">سعر المتر</label>
//             <input
//               type="number"
//               id="price"
//               name="meter_price"
//               value={formData.meter_price}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">قيمة الاوفر</label>
//             <input
//               type="number"
//               id="price"
//               name="over_price"
//               value={formData.over_price}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">اجمالى السعر</label>
//             <input
//               type="number"
//               id="price"
//               name="total_price"
//               value={formData.total_price}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">العنوان</label>
//             <input
//               type="text"
//               id="price"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">الوصف</label>
//             <input
//               type="text"
//               id="price"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="price">رقم الهاتف للتواصل</label>
//             <input
//               type="number"
//               id="price"
//               name="phone_number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit">أضف وحدتك</button>
//         </form>
//       </div>
//     </main>
//   );
// };

// export default AddNewUnit;

import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import axios from 'axios';
import Popup from '../Components/Popup';
import { FaTrashAlt } from 'react-icons/fa';
import CustomInpSelect from '../Components/CustomInpSelect';
import MiniLoader from '../Components/Miniloader';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import { Modal } from 'antd';
const AddNewUnit = () => {
  // const [selectedProject, setSelectedProject] = useState('');
  // const [selectedType, setSelectedType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  
  const [defCountry, setDefCountry] = useState('eg');
  const [isValid, setIsValid] = useState(false);
  const { handleUnAuth, filterData, token, notificationRef } = useContext(AppContext);
  const [formData, setFormData] = useState({
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
    paid_amount_currency: null,
    remaining_amount_currency: null,
    building_number: null,
    installment_period: null,
    first_installment_value: null,
    first_installment_value_currency: null,
    phone_number: null,
    total_price: null,
    total_price_currency: null,
    over_price: null,
    over_price_currency: null,
    meter_price: null,
    meter_price_currency: null,
    floor: null,
    title: null,
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showImageFields, setShowImageFields] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
    console.log(formData);
    if (!formData.meter_price && !formData.over_price && !formData.total_price) {
      notificationRef.current.show('error','خطأ', 'يجب إدخال سعر الأوفر أو إجمالى السعر أو سعر المتر على الأقل');
      return;
    }
    if(!isValid ){
      notificationRef.current.show('error','خطأ', 'رقم الهاتف غير صحيح');
      return;
    }
    if (images.length === 0) {
      setError('يجب إضافة صورة واحدة على الأقل');
      return;
    }
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataToSubmit.append(key, formData[key]);
      }
    });
    // Append images as an array
    images.forEach((image) => {
      formDataToSubmit.append('images', image);
      console.log(formDataToSubmit);
    });
    console.log(formDataToSubmit);
    setIsLoading(true)
    axios
      .post('https://api.goldenbeit.com/core/propose-unit', formDataToSubmit, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(true);
        // notificationRef.current.show('success','عملية ناجحة ', 'تم اضافة وحدتك بنجاح');
      })
      .catch((err) => {
        if (err.status === 401) {
          handleUnAuth();
        }
        console.log(err);
        notificationRef.current.show('error','عملية خاطئه ', err.response.data.msg);
      })
      .finally(() => {
        setIsLoading(false);
      });
      
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   if (!formData.meter_price && !formData.over_price && !formData.total_price) {
  //     openNotificationWithIcon('error', 'يجب إدخال سعر الأوفر أو إجمالى السعر أو سعر المتر على الأقل');
  //     return;
  //   }
  //   const formDataToSubmit = new FormData();
  //   Object.keys(formData).forEach(key => {
  //     formDataToSubmit.append(key, formData[key]);
  //   });
  //   images.forEach((image, index) => {
  //     formDataToSubmit.append(`images[${index}]`, image);
  //   });
  //   axios
  //     .post('https://api.goldenbeit.com/core/propose-unit', formDataToSubmit, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       openNotificationWithIcon('success', 'عملية ناجحة ', 'تم اضافة وحدتك بنجاح');
  //     })
  //     .catch((err) => {
  //       if (err.status === 401) {
  //         handleUnAuth();
  //       }
  //       console.log(err);
  //       openNotificationWithIcon('error', 'عملية خاطئه ', err.response.data.msg);
  //     });
  // };
  // const handleTypeChange = (event) => {
  //   setSelectedType(event.target.value);
  //   setSelectedProject('');
  // };
  const filteredProjects = formData.unit_type_id
    ? filterData && filterData.unit_types.find((type) => type.id.toString() === formData.unit_type_id)?.projects || []
    : [];
  // const handlePaymentChange = (e) => {
  //   console.log(formData.payment_method);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     payment_method: e,
  //   }));
  // };
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
        <Modal
        title="إشعار تأكيد الإضافة"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        okText="تم"
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={handleOk}
        onCancel={handleCancel}
        >
          <p
          style={{fontSize: '1.5rem', textAlign: 'center', color: '#4CAF50'}}
          >تم إضافة الوحدة بنجاح!</p>
        </Modal>
        <Popup />
        <div className="add-build-unit">
          <h2>اضافة وحدة جديدة</h2>
          <form onSubmit={handleSubmit} 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          >
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
              <label htmlFor="unitName">اسم المشروع <span className='req'>(مطلوب)</span></label>
              <select required value={formData.project_id} name="project_id" id="unit" onChange={handleChange}>
                <option value="" disabled hidden selected>
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
              <label htmlFor="floorNumber">الطرح <span className='req'>(مطلوب)</span></label>
              <select
                id="unitType"
                name="proposal_id"
                value={formData.proposal_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled selected hidden>أختر الطرح</option>
                {filterData && filterData.proposals.map((proposal) =>
                  <option key={proposal.id} value={proposal.id}>{proposal.name}</option>
                )}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="floorNumber">المدينة <span className='req'>(مطلوب)</span></label>
              <select
                id="unitType"
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
                <label htmlFor="floorNumber">الطابق <span className='req'>(مطلوب)</span></label>
                <select
                  id="unitType"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled hidden selected>أختر الطابق</option>
                  {filterData && filterData.floors.map((floor) =>
                    <option key={floor.id} value={floor.id}>{floor.name}</option>
                  )}
                </select>
              </div>
            }
            <div className="form-group">
              <label htmlFor="area">رقم الوحدة / القطعة <span className='req'>(مطلوب)</span></label>
              <input
                type="number"
                id="area"
                name="unit_number"
                value={formData.unit_number}
                onChange={handleChange}
                required
                onWheel={(e) => e.target.blur()} 
                onFocus={(e) => e.target.select()}
              />
            </div>
            {formData.unit_type_id === '2' &&
              <div className="form-group">
                <label htmlFor="unitType">رقم العمارة <span className='req'>(مطلوب)</span></label>
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
              <label htmlFor="unitType">نظام السداد <span className='req'>(مطلوب)</span></label>
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
              <label htmlFor="unitType">المدفوع <span className='req'>(مطلوب)</span></label>
              <CustomInpSelect
                value={formData.paid_amount}
                isReq={true}
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
                isReq={true}
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
              <label htmlFor="price">مدة التقسيط </label>
              <input
                type="number"
                id="price"
                onWheel={(e) => e.target.blur()} 
                onFocus={(e) => e.target.select()}
                name="installment_period"
                value={formData.installment_period}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">قيمة أول قسط </label>
              <CustomInpSelect
                isReq={false}
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
              <label htmlFor="price">المساحة بالمتر <span className='req'>(مطلوب)</span></label>
              <input
                type="number"
                onWheel={(e) => e.target.blur()} 
                onFocus={(e) => e.target.select()}
                id="price"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">سعر المتر </label>
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
            </div>
            <div className="form-group">
              <label htmlFor="price"> الإجمالى بدون الأوڤر <span className='req'>(مطلوب)</span></label>
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
              <label htmlFor="price">العنوان <span className='req'>(مطلوب)</span></label>
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
              <label htmlFor="price">المميزات</label>
              <textarea
                type="text"
                id="price"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">رقم الهاتف للتواصل <span className='req'>(مطلوب)</span></label>
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
                id="price"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              /> */}
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
              {images.length==0 && <p className="error-message">{error}</p>}
            </div>
            <button type="submit">أضف وحدتك</button>
          </form>
        </div>
      </main>
      )}
    </>
  );
};

export default AddNewUnit;

