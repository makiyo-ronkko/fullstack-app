import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className='Home'>
      <div className='light-overlay'>
        <div className='Home-container'>
          <h1>Daily Art Sharing</h1>
          <p>
            Share your arts and pictures daily and get ideas and inspiration
            from peer artist.
          </p>
          <button>
            <Link className='Home-button' to='/register'>
              Register
            </Link>
          </button>
          <button>
            <Link className='Home-button' to='/login'>
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
