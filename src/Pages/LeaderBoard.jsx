import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Leaderboard = () => {
  const [donors, setDonors] = useState(
    [
      {
        "id": 1,
        "name": "John Doe",
        "amount": 15000
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "amount": 12000
      },
      {
        "id": 3,
        "name": "Michael Johnson",
        "amount": 11000
      },
      {
        "id": 4,
        "name": "Emily Davis",
        "amount": 10500
      },
      {
        "id": 5,
        "name": "William Brown",
        "amount": 9500
      },
      {
        "id": 6,
        "name": "Olivia Wilson",
        "amount": 9000
      },
      {
        "id": 7,
        "name": "James Taylor",
        "amount": 8500
      },
      {
        "id": 8,
        "name": "Linda Martinez",
        "amount": 8000
      },
      {
        "id": 9,
        "name": "Robert Anderson",
        "amount": 7500
      },
      {
        "id": 10,
        "name": "Patricia Thomas",
        "amount": 7000
      }
    ]
  );
  useEffect(() => {
    axios.get('https://example.com/api/top-donors')
      .then(response => {
        setDonors(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the donors!", error);
      });
  }, []);
  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Top 10 Donors</h1>
      <div className="leaderboard">
        {donors.map((donor, index) => (
          <div className="leaderboard-item" key={donor.id}>
            <span className="leaderboard-rank">{index + 1}</span>
            <div className="leaderboard-details">
              <span className="leaderboard-name">{donor.name}</span>
              <span className="leaderboard-amount">{donor.amount.toLocaleString()} دعوة</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;