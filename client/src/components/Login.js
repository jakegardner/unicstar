import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginUser, { data }] = useMutation(LOGIN_MUTATION);
  if (data) {
    const { token } = data.login;
    localStorage.setItem('AUTH_TOKEN', token);
    history.push('/');
  }

  return (
    <div>
      <h4>Login</h4>
      <div>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email address"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
      </div>
      <div>
        <div
          onClick={() => loginUser({
            variables: { email, password },
          })}>
          enter the kingdom
        </div>
        <div
          onClick={() => history.push('/signup')}
        >
          need to create an account?
        </div>
      </div>
    </div>
  );
}

export default Login;
