import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  Button,
  Flex,
  Image,
  Input,
  Stack,
} from '@chakra-ui/core';
import theme from '../styles/theme';
import PasswordInput from './PasswordInput';

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
    <Flex align="center" justify="center" direction="column" width="100%" height="100%" bg={theme.colors.lilac}>
      <Flex justify="center" marginBottom="8">
        <Image
          src={theme.landingLogo}
          alt="unicorn"
          rounded="full"
          size="300px"
        />
      </Flex>
      <Stack spacing={2} direction="column" marginBottom="5" width="300px">
        <Input
          variant="outline"
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          value={name}
          focusBorderColor={theme.colors.darkgreen}
        />
        <Input
          variant="outline"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          focusBorderColor={theme.colors.darkgreen}
        />
        <PasswordInput
          onChange={e => setPassword(e.target.value)}
          value={password}
          focusBorderColor={theme.colors.darkgreen}
        />
        <Input
          marginTop="2"
          variant="outline"
          placeholder="Age"
          onChange={e => setAge(e.target.value)}
          value={age}
          focusBorderColor={theme.colors.darkgreen}
        />
      </Stack>
      <Flex direction="column" justify="center" align="center">
        <Button
          size="md"
          onClick={() => signupUser({
            variables: { email, password, name, age: Number(age) },
          })}
          marginBottom="3"
          bg={theme.colors.naplesYellow}
          _hover={{ bg: theme.colors.blonde }}
          color={theme.colors.jet}
        >
          Create account
        </Button>
        <Button
          size="md"
          onClick={() => history.push('/login')}
          bg={theme.colors.turquoise}
          _hover={{ bg: theme.colors.celeste }}
          color={theme.colors.jet}
        >
          Already have account?
        </Button>
      </Flex>
    </Flex>
  );
}

export default Signup;
