import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

function Header({ history }) {
  const token = localStorage.getItem('AUTH_TOKEN');
  return (
    <div>
      <div>
        <div>Unicorn Kingdom</div>
        <Link to="/" >
          home
        </Link>
        <p>|</p>
        {token ?
          <div>
            <div
              onClick={() => {
                localStorage.removeItem('AUTH_TOKEN');
                history.push('/');
              }}
            >
              logout
            </div>
            <Link to="/new">
              new post
            </Link>
          </div>
          :
          <Link to="/login">
            login
          </Link>
        }
      </div>
    </div>
  );
}

export default withRouter(Header);
