import React, { useState, useEffect } from 'react';

const FetchIPAddress = () => {
  const [ipAddress, setIPAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
          throw new Error('Failed to fetch IP address');
        }
        const data = await response.json();
        setIPAddress(data.ip);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchIPAddress();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {ipAddress && <p>Your IP Address: {ipAddress}</p>}
    </div>
  );
};

export default FetchIPAddress;
