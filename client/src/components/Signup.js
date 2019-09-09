import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!, $age: Int!) {
    signup(email: $email, password: $password, name: $name, age: $age) {
      token
    }
  }
`;

function Signup({ history }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [signupUser, { data }] = useMutation(SIGNUP_MUTATION);

  if (data) {
    const { token } = data.signup;
    localStorage.setItem('AUTH_TOKEN', token);
    history.push('/');
  }

  return (
    <div>
      <h4>Signup</h4>
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
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <input
          value={age}
          onChange={e => setAge(e.target.value)}
          type="text"
          placeholder="Age"
        />
      </div>
      <div>
        <div
          onClick={() => signupUser({
            variables: { email, password, name, age: Number(age) },
          })}>
          join the kingdom
        </div>
        <div
          onClick={() => history.push('/login')}
        >
          already have an account?
        </div>
      </div>
    </div>
  );
}

export default Signup;
