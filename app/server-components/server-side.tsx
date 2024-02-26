// server-side.js
'use client'
// server-side.js
import { useEffect, useState } from 'react';

const ServerSideComponent = () => {
  const [serverSideData, setServerSideData] = useState([]);

  useEffect(() => {
    // Simulate server-side data fetching
    setServerSideData([
      
    ]);
  }, []);

  return (
    <div>
      <ul>
        {serverSideData.map(post => (
          <li key={post}>
            <strong> Add your new data </strong>
            <p>name , email , phone number</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServerSideComponent;
