import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    
<div>
      <h1>Welcome to Home Page</h1>
      <button onClick={() => navigate('/about')}>Go to About</button>
    </div>

  );
}

export default Home;