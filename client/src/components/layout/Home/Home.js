import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.loading]);

  return (
    <div className='Home'>
      <div className='light-overlay'>
        <div className='Home-container'>
          <h1>Daily Art Sharing</h1>
          <p>
            Share your arts and pictures daily and get ideas and inspiration
            from peer artists.
          </p>
          <button>
            <Link className='Home-login' to='/login'>
              Login
            </Link>
          </button>
          <div className='Home-register-text'>
            Haven't registered yet?
            <Link to='/register' className='Home-register'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
