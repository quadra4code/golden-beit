// import React, { useState } from 'react';
// import defaultImage from '../Images/user-image.webp'

// const AccountDetails = () => {
//   const [userData, setUserData] = useState(
//     {
//       phone_numbers:[
//         {
//           id:1,
//           phone:'01183468632'
//         },
//         {
//           id:2,
//           phone:'0104549886'
//         }
//       ],
//       first_name:'معاذ ',
//       last_name:' مصطفى',
//       email:'test@gmail.com',
//       password:'pass123',
//     },
//   );
//   const [numberInpValue, setNumberInpValue] = useState();
//   const [userImage, setUserImage] = useState();
//   const handleInputChange = (event) => {
//     const inputValue = event.target.value;
//     const numericValue = inputValue.replace(/[^0-9]/g, '');
//     setUserData(numericValue);
//   };
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     setUserImage(file);
//   };
//   const handleChangeUserData = (e) => {
//     const {name, value} = e.target
//     console.log(name);
//     setUserData({
//       ...userData,
//       [name]: value
//     })
//   }
//   const handleUpdateUserData = () => {
//     console.log('done');
//   }
//   return (
//     <div className='account-details'>
//       <div className='image-container'>
//         {userImage ?
//           <img
//           src={URL.createObjectURL(userImage)}
//           alt="Uploaded"
//           />   
//         :
//           <img src={defaultImage} alt="defaultImage" />
//         }
//         <span className="change-user-image">
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </span>
//         {/* <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)}className='change-user-image'>تغير الصورة</input> */}
//       </div>
//       <div className='user-data'>
//         <input type="text" name='first_name' placeholder='الاسم الاول' onChange={(e)=>handleChangeUserData(e)} value={userData.first_name}/>
//         <input type="text" name='last_name' placeholder='الاسم الاخير' onChange={(e)=>handleChangeUserData(e)} value={userData.last_name}/>
//         <input type="email" name='email' placeholder='البريد الالكتروني' onChange={(e)=>handleChangeUserData(e)} value={userData.email}/>
//         <input type="password" name='password' placeholder='كلمة المرور' onChange={(e)=>handleChangeUserData(e)} value={userData.password}/>
//         {userData.phone_numbers&& userData.phone_numbers.length > 0 && userData.phone_numbers.map((phone,key)=>
//           <input
//           type="text"
//           key={key}
//           id="custom-number-input"
//           value={phone.phone}
//           onChange={handleInputChange}
//           placeholder='رقم الهاتف'
//         />
//         )}
//         <button className='btn' onClick={handleUpdateUserData}>حفظ التعديلات</button>
//       </div>
//     </div>
//   )
// }
// export default AccountDetails
import React, { useState, useEffect } from 'react';
import defaultImage from '../../Images/user-image.webp';

const AccountDetails = () => {
  const initialUserData = {
    phone_numbers: [
      { id: 1, main_phone: '01183468632' },
      { id: 2, second_phone: '0104549886' }
    ],
    first_name: 'معاذ',
    last_name: 'مصطفى',
    email: 'test@gmail.com',
  };
  const [userData, setUserData] = useState(initialUserData);
  const [originalUserData, setOriginalUserData] = useState(initialUserData);
  const [userImage, setUserImage] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  useEffect(() => {
    setHasChanges(JSON.stringify(userData) !== JSON.stringify(originalUserData));
  }, [userData]);
  const handleInputChange = (event, index) => {
    const updatedPhoneNumbers = [...userData.phone_numbers];
    updatedPhoneNumbers[index].phone = event.target.value;
    setUserData({ ...userData, phone_numbers: updatedPhoneNumbers });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUserImage(file);
    setHasChanges(true); 
  };
  const handleChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleUpdateUserData = () => {
    if (!hasChanges) return; 
    console.log('Sending updated data:', userData);
    setOriginalUserData(userData); 
    setHasChanges(false);
  };
  return (
    <div className='account-details'>
      <div className='image-container'>
        {userImage ? (
          <img src={URL.createObjectURL(userImage)} alt="Uploaded" />
        ) : (
          <img src={defaultImage} alt="defaultImage" />
        )}
        <span className="change-user-image">
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </span>
      </div>
      <div className='user-data'>
        <input type="text" name='first_name' placeholder='الاسم الاول' onChange={handleChangeUserData} value={userData.first_name} />
        <input type="text" name='last_name' placeholder='الاسم الاخير' onChange={handleChangeUserData} value={userData.last_name} />
        <input type="email" name='email' placeholder='البريد الالكتروني' onChange={handleChangeUserData} value={userData.email} />
        {/* {userData.phone_numbers.map((phone, index) => (
          <input
            type="text"
            key={phone.id}
            value={phone.phone}
            name={phone.name}
            onChange={(e) => handleInputChange(e, index)}
            placeholder='رقم الهاتف'
          />
        ))} */}
        <button className='btn' onClick={handleUpdateUserData} disabled={!hasChanges}>
          {hasChanges ? 'حفظ التعديلات' : 'لا يوجد تغييرات'}
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
