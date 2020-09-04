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
    <Flex align="center" justify="center" direction="column" width="100%" height="100%" bg={theme.colors.lilac}>
      <Flex justify="center" marginBottom="8">
        <Image
          src={theme.landingLogo}
          alt="unicorn"
          rounded="full"
          size="300px"
        />
      </Flex>
      <Stack spacing={2} direction="column" marginBottom="4" width="300px">
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
      </Stack>
      <Flex direction="row" justify="center">
        <Button
          size="md"
          onClick={() => loginUser({
            variables: { email, password },
          })}
          marginRight="2"
          bg={theme.colors.naplesYellow}
          _hover={{ bg: theme.colors.blonde }}
          color={theme.colors.jet}
        >
          Login
        </Button>
        <Button
          size="md"
          onClick={() => history.push('/signup')}
          bg={theme.colors.turquoise}
          _hover={{ bg: theme.colors.celeste }}
          color={theme.colors.jet}
        >
          Signup
        </Button>
      </Flex>
    </Flex>
  );
}

export default Login;
