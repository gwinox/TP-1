import React, { useState } from 'react';
import axios from './Axios';

const IpInput = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/iplocation/', { ip_address: ipAddress });
            setResponseData(response.data);
        } catch (error) {
            console.error('Error processing IP:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    placeholder="Enter IP Address"
                />
                <button type="submit">Submit</button>
            </form>
            {responseData && <div>{JSON.stringify(responseData)}</div>}
        </div>
    );
};

export default IpInput;