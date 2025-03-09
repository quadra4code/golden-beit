import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../Context/AppContext';
import axios from 'axios';
import Popup from '../Components/Popup';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [consultationFaq, setConsultationFaq] = useState(null);
  const {contextHolder , setLoading} =useContext(AppContext)
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const params = useParams()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setLoading(true)
    axios.get(`https://golden-gate-three.vercel.app/core/consultations/${params.id}`)
    .then(response => {
      console.log(response.data.data);
      setConsultationFaq(response.data.data)
    })
    .catch(error => console.error(error))
    .finally(()=>{
      setLoading(false)
      setDataLoaded(true)
    })
  }, []);
  console.log(consultationFaq);
  
  return (
    <>
      {dataLoaded
        ? 
        <main className='faq-main'>
          <Popup/>
          {contextHolder}
          <div className="faq-page">
            <div className='faq-header'>
              <span> 
                <h1>
                  الأسئلة الشائعة 
                </h1>
                فيما يلي إجابات لبعض الأسئلة الأكثر شيوعًا حول العقارات بشكل عام  .
              </span>
            </div>
            <div className="faq-list">
              {consultationFaq&& consultationFaq.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-question" onClick={() => toggleAnswer(index)}>
                    <h2>{faq.title}</h2>
                    <span>{openIndex === index ? '-' : '+'}</span>
                  </div>
                  <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                    <p>{faq.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        :
        <Loader/>
      }
    </>
  );
};

export default FAQ;