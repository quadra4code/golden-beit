// import React, { useState, useEffect, useContext } from 'react';
// import defaultImage from '../../Images/user-image.webp';
// import axios from 'axios';
// import AppContext from '../../Context/AppContext';

// const AccountDetails = () => {
//   const [userData, setUserData] = useState();
//   const [originalUserData, setOriginalUserData] = useState(userData);
//   const [userImage, setUserImage] = useState(null);
//   const [hasChanges, setHasChanges] = useState(false);
//   const {token} = useContext(AppContext)
//   useEffect(()=>{
//     if(token){
//       axios
//       .get('https://api.goldenbeit.com/accounts/account-view',
//         {
//           headers:{'Authorization':`Bearer ${token}`}
//         }
//       )
//       .then((response)=>{
//         console.log(response.data.data);
//         setUserData(response.data.data)
//       })
//       .catch((err)=>console.log(err))
//     }
//   },[])
//   useEffect(() => {
//     setHasChanges(JSON.stringify(userData) !== JSON.stringify(originalUserData));
//   }, [userData]);
//   const handleInputChange = (event, index) => {
//     console.log(event,index);
//     setUserData({ ...userData, phone_numbers: [index].number == event.target.value});
//   };
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setUserImage(file);
//     setHasChanges(true); 
//   };
//   const handleChangeUserData = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };
//   const handleUpdateUserData = () => {
//     if (!hasChanges) return; 
//     console.log('Sending updated data:', userData);
//     setOriginalUserData(userData); 
//     setHasChanges(false);
//   };
//   return (
//     <div className='account-details'>
//       <div className='image-container'>
//         {userImage ? (
//           <img src={URL.createObjectURL(userImage)} alt="Uploaded" />
//         ) : (
//           <img src={defaultImage} alt="defaultImage" />
//         )}
//         <span className="change-user-image">
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </span>
//       </div>
//       <div className='user-data'>
//         <input type="text" name='first_name' placeholder='الاسم الاول' onChange={handleChangeUserData} value={userData&& userData.first_name} />
//         <input type="text" name='last_name' placeholder='الاسم الاخير' onChange={handleChangeUserData} value={userData&& userData.last_name} />
//         <input type="email" name='email' placeholder='البريد الالكتروني' onChange={handleChangeUserData} value={userData&& userData.email} />
//         {userData&& userData.phone_numbers.map((phone, index) => (
//           <input
//             type="text"
//             key={phone.pn_id}
//             value={phone.number}
//             onChange={(e) => handleInputChange(e, index)}
//             placeholder='رقم الهاتف'
//           />
//         ))}
//         <button className='btn' onClick={handleUpdateUserData} disabled={!hasChanges}>
//           {hasChanges ? 'حفظ التعديلات' : 'لا يوجد تغييرات'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AccountDetails;
// import React, { useState, useEffect, useContext } from 'react';
// import defaultImage from '../../Images/user-image.webp';
// import axios from 'axios';
// import AppContext from '../../Context/AppContext';
// import Loader from '../Loader';

// const AccountDetails = () => {
//   const [userData, setUserData] = useState(null);
//   const [originalUserData, setOriginalUserData] = useState(null);
//   const [userImage, setUserImage] = useState(null);
//   const [hasChanges, setHasChanges] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [phone_numbers_updated, setPhone_numbers_updated] = useState(false);
//   const { token, filterData } = useContext(AppContext);
//   useEffect(() => {
//     if (token) {
//       setLoading(true)
//       axios
//         .get('https://api.goldenbeit.com/accounts/account-view', {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((response) => {
//           const data = response.data.data;
//           console.log(data);
//           setUserData(data);
//           setOriginalUserData(data);
//         })
//         .catch((err) => console.error('Error fetching user data:', err))
//         .finally(()=>setLoading(false))
//     }
//   }, [token]); 
//   useEffect(() => {
//     if (userData && originalUserData) {
//       setHasChanges(JSON.stringify(userData) !== JSON.stringify(originalUserData));
//     }
//   }, [userData, originalUserData]);
//   const handleChangeUserData = (e) => {
//     const { name, value } = e.target;
//     setUserData((prevData) => ({ ...prevData, [name]: value }));
//   };
//   const handleInputChange = (event, index) => {
//     setPhone_numbers_updated(true)
//     const newPhoneNumbers = [...userData.phone_numbers];
//     newPhoneNumbers[index] = { ...newPhoneNumbers[index], number: event.target.value };
//     setUserData((prevData) => ({ ...prevData, phone_numbers: newPhoneNumbers }));
//   };
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setUserImage(file);
//     setHasChanges(true);
//   };
//   const handleUpdateUserData = () => {
//     if (!hasChanges) return;
//     console.log('Sending updated data:');
//     axios
//     .put('https://api.goldenbeit.com/accounts/update-account',
//       {
//         first_name: userData.first_name,
//         last_name: userData.last_name,
//         email: userData.email,
//         image: userImage,
//         interested_city : userData.interested_city,
//         phone_numbers_updated,
//         phone_numbers : userData.phone_numbers
//       },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     )
//     .then((response)=>{
//       console.log(response)
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//     setOriginalUserData(userData);
//     setHasChanges(false);
//   };
//   return (
//     <>
//       {
//         loading?
//         (
//           <Loader/>
//         )
//         :
//         (
//           <div className='account-details'>
//             <div className='image-container'>
//               <img src={userImage ? URL.createObjectURL(userImage) : defaultImage} alt="User" />
//               <span className="change-user-image">
//                 <input type="file" accept="image/*" onChange={handleImageChange} />
//               </span>
//             </div>
//             <div className='user-data'>
//               <input
//                 type="text"
//                 name='first_name'
//                 placeholder='الاسم الاول'
//                 onChange={handleChangeUserData}
//                 value={userData?.first_name || ''}
//               />
//               <input
//                 type="text"
//                 name='last_name'
//                 placeholder='الاسم الاخير'
//                 onChange={handleChangeUserData}
//                 value={userData?.last_name || ''}
//               />
//               <input
//                 type="email"
//                 name='email'
//                 placeholder='البريد الالكتروني'
//                 onChange={handleChangeUserData}
//                 value={userData?.email || ''}
//               />
//               {userData?.phone_numbers?.map((phone, index) => (
//                 <input
//                   type="text"
//                   key={phone.pn_id}
//                   value={phone.number}
//                   onChange={(e) => handleInputChange(e, index)}
//                   placeholder='رقم الهاتف'
//                 />
//               ))}
//               <select onChange={handleChangeUserData} name="interested_city" id="">
//                 {userData&& userData.interested_city? 
//                 <option selected value={userData.interested_city}>{userData.interested_city.name}</option>
//                 :
//                 <option selected disabled hidden value="أكثر مدينة مهتم بها ">أكثر مدينة مهتم بها (اختيارى)</option>
//                 }
//                 {filterData&& filterData.cities.length>0&& filterData.cities.map((city)=>
//                 <option key={city.id} value={city.id}>{city.name}</option>
//                 )}
//               </select>
//               <button className='btn' onClick={handleUpdateUserData} disabled={!hasChanges}>
//                 {hasChanges ? 'حفظ التعديلات' : 'لا يوجد تغييرات'}
//               </button>
//             </div>
//           </div>
//         )
//       }
//     </>
//   );
// };

// export default AccountDetails;

import React, { useState, useEffect, useContext } from 'react';
import defaultImage from '../../Images/user-image.webp';
import axios from 'axios';
import AppContext from '../../Context/AppContext';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash } from "react-icons/fa";
const AccountDetails = () => {
  const [userData, setUserData] = useState(null);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumbersUpdated, setPhoneNumbersUpdated] = useState(false);
  const { token, filterData, notificationRef, handleLogout } = useContext(AppContext);
  const getImageUrl = () => {
    if (userImage) {
      return URL.createObjectURL(userImage); // Show newly selected image immediately
    }
    return userData?.image_url || defaultImage; // Fallback to existing or default
  };
  useEffect(() => {
    if (token) {
      setLoading(true);
      axios
        .get('https://api.goldenbeit.com/accounts/account-view', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data.data;
          setUserData(data);
          setOriginalUserData(data);
          console.log(data);
          localStorage.setItem('user_image_url', data.image_url);
        })
        .catch((err) =>{
          if(err.status===401){
            handleLogout()
          }      
          console.error('Error fetching user data:', err)
        })
        .finally(() => setLoading(false));
    }
  }, [token]);
  useEffect(() => {
    if (userData && originalUserData) {
      setHasChanges(JSON.stringify(userData) !== JSON.stringify(originalUserData));
    }
  }, [userData, originalUserData]);
  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleInputChange = (event, index) => {
    setPhoneNumbersUpdated(true);
    const newPhoneNumbers = [...userData.phone_numbers];
    newPhoneNumbers[index] = { ...newPhoneNumbers[index], number: event.target.value };
    setUserData((prevData) => ({ ...prevData, phone_numbers: newPhoneNumbers }));
  };
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUserImage(file);
      setHasChanges(true);
    }
  }
  const handleUpdateUserData = (e) => {
    e.preventDefault();
    if (!hasChanges) return;
    const phoneNumbers = userData.phone_numbers.map(p => p.number)
    const formData = new FormData();
    formData.append('first_name', userData.first_name);
    formData.append('last_name', userData.last_name);
    formData.append('email', userData.email);
    formData.append('interested_city', userData.interested_city?.id || '');
    formData.append('phone_numbers_updated', phoneNumbersUpdated);
    formData.append('phone_numbers', JSON.stringify(phoneNumbers))
    // formData.append('phone_numbers', JSON.stringify(userData.phone_numbers));
    if (userImage) {
      formData.append('image', userImage);
    }
    setLoading(true);
    axios
      .put('https://api.goldenbeit.com/accounts/update-account', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Important for file uploads
        },
      })
      .then((response) => {
        notificationRef.current.show('success','تم حفظ التعديلات بنجاح')
        console.log('Update successful:', response);
        localStorage.setItem('user_image_url', response.data.data.image_url);
        setOriginalUserData(userData);
        setHasChanges(false);
      })
      .catch((err) =>{
        console.error('Error updating user data:', err)
        console.log(err)
        notificationRef.current.show('error',err.response.data.msg)
      } )
      .finally(() => setLoading(false));
  };
  const handleAddPhone = () => {
    setUserData(prevData => ({
      ...prevData,
      phone_numbers: [...prevData.phone_numbers, { pn_id: null, number: '' }]
      // phone_numbers: [...prevData.phone_numbers, { pn_id: null, number: '' }]
    }));
    setPhoneNumbersUpdated(true);
  };
  
  const handleRemovePhone = (index) => {
    const updatedPhones = [...userData.phone_numbers];
    updatedPhones.splice(index, 1);
    setUserData(prevData => ({
      ...prevData,
      phone_numbers: updatedPhones.length > 0 ? updatedPhones : [{ pn_id: null, number: '' }]
    }));
    setPhoneNumbersUpdated(true);
  };
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='account-details'>
          <div className='image-container'>
            <img 
              src={getImageUrl()} 
              alt="User" 
              onError={(e) => {
                e.target.src = defaultImage; // Fallback if image fails to load
              }}
            />
            {/* <img src={userData?.image_url ? userData.image_url : defaultImage} alt="User" /> */}
            <span className="change-user-image">
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </span>
          </div>
          <div className='user-data'>
            <button className='add-new-number' onClick={handleAddPhone} >
            <FaPlus />إضافة رقم هاتف</button>
            <div className="floating-label">
              <input
                type="text"
                name="first_name"
                placeholder=" "
                onChange={handleChangeUserData}
                value={userData?.first_name || ''}
              />
              <label>الاسم الأول</label>
            </div>
            <div className="floating-label">
              <input
                type="text"
                name="last_name"
                placeholder="الاسم الاخير"
                onChange={handleChangeUserData}
                value={userData?.last_name || ''}
              />
              <label>الاسم الاخير</label>
            </div>
            {userData?.phone_numbers?.map((phone, index) => (
              <div className="phone-field" key={phone.pn_id || index} style={{width:'100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="floating-label" style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={phone.number}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="رقم الهاتف"
                  />
                  <label>رقم الهاتف</label>
                </div>
                {userData.phone_numbers.length > 0 && (
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleRemovePhone(index)}
                    title="حذف الرقم"
                  >
                    <FaTrash style={{color:'red'}}/>
                  </button>
                )}
              </div>
            ))}
            {/* {userData?.phone_numbers?.map((phone, index) => (
              <div className="floating-label">
                <input
                  type="text"
                  key={phone.pn_id}
                  value={phone.number}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="رقم الهاتف"
                />
                <label>رقم الهاتف</label>
              </div>
            ))} */}
            <div className="floating-label" style={{ minWidth: '1rem' }}>
              <input
                type="email"
                name="email"
                placeholder="البريد الالكتروني"
                onChange={handleChangeUserData}
                value={userData?.email || ''}
              />
              <label>البريد الالكتروني</label>
            </div>
            <select onChange={handleChangeUserData} name="interested_city">
              {userData?.interested_city ? (
                <option value={userData.interested_city.id}>{userData.interested_city.name}</option>
              ) : (
                <option disabled hidden value="">
                  أكثر مدينة مهتم بها (اختياري)
                </option>
              )}
              {filterData?.cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <button className="btn" onClick={handleUpdateUserData} disabled={!hasChanges}>
              {hasChanges ? 'حفظ التعديلات' : 'لا يوجد تغييرات'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountDetails;


