import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [fetched, setFetched] = useState(false);
  async function fetchData(api) {
    try {
      let response = await fetch(api);
      if (!response.ok) {
        throw new Error('failed to fetch data');
      }
      let datas = await response.json();
      setData(datas);
      setFetched(true);
    } catch (error) {
      alert('failed to fetch data');
      setFetched(false);
    }
  }

  useEffect(() => {
    const api = 'https://geektrus.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';
    fetchData(api);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
        {fetched ? (
            currentItems.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.role}</td>
              </tr>
            ))
          ) : (
            <tr >
              <td style={{textAlign:'centre'}}>Failed to fetch data</td>
            </tr>
          )}
        </tbody>
      </table>
      {fetched? (<div className="pagination">
        <button onClick={prevPage} >
        {/* disabled={currentPage === 1} */}
          Previous
        </button>
        <span>
          {currentPage}
        </span>
        <button onClick={nextPage} >
        {/* disabled={currentPage === totalPages} */}
          Next
        </button>
      </div>):(<></>)}
    </div>
  );
}

export default App;
