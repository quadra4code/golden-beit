import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
const Leaderboard = () => {
  const [donors, setDonors] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    setDataLoaded(false)
    axios.get('https://api.goldenbeit.com/accounts/leaderboard')
      .then(response => {
        setDonors(response.data.data);
        console.log(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the donors!", error);
      })
      .finally(()=>setDataLoaded(true))
  }, []);
  return (
    <>
    {!dataLoaded? 
      <Loader/>
      :
      <div className="leaderboard-container">
        <h1 className="leaderboard-title">لوحة المتصدرين</h1>
        <div className="leaderboard">
          {donors&& donors.map((donor, index) => (
            <div className="leaderboard-item" key={donor.id}>
              <span className="leaderboard-rank">{donor.rank}</span>
              <div className="leaderboard-details">
                <span className="leaderboard-name">{donor.name}</span>
                <span className="leaderboard-amount">{donor.referral_count.toLocaleString()} دعوة</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      }
    </>
  );
};

export default Leaderboard;