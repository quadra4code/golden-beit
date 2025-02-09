import React, { useState, useContext, useEffect } from 'react';
import Pagination from '../Components/Pagination';
import AppContext from '../Context/AppContext';
import Loader from '../Components/Loader';

const Table = () => {
  const { winnersData, loading } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  useEffect(() => {
    if (winnersData && winnersData.length > 0) {
      setCurrentPage(1); 
    }
  }, [winnersData]);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };
  const filteredData = winnersData && winnersData.filter(item =>
    item.winner_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className='table_page'>
          <div className="container">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="ابحث باسمك ..."
            />
            <table>
              <thead>
                <tr>
                  <th>المسلسل</th>
                  <th>اسم الفائز</th>
                  <th>رقم الوحدة / القطعة</th>
                  <th>رقم العمارة / المنطقة</th>
                  <th>الدور</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.winner_name}</td>
                      <td>{item.property_number}</td>
                      <td>{item.building_or_region}</td>
                      <td>{item.floor}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filteredData ? filteredData.length : 0}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </main>
      )}
    </>
  );
};

export default Table;