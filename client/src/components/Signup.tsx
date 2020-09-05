import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { History } from 'history';

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

type SignupProps = {
  history: History,
};

const Signup: React.SFC<SignupProps> = ({ history }) => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [age, setAge] = useState<string>();
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          value={name}
        />
        <Input
          variant="outline"
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          value={email}
        />
        <PasswordInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          marginTop="2"
          variant="outline"
          placeholder="Age"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(e.target.value)}
          value={age}
        />
      </Stack>
      <Flex direction="column" justify="center" align="center">
        <Button
          size="md"
          onClick={() => signupUser({
            variables: {
              email, password, name, age: Number(age),
            },
          })}
          marginBottom="3"
          bg={theme.colors.naplesYellow}
          _hover={{ bg: theme.colors.blonde }}
          color={theme.colors.silver}
        >
          Create account
        </Button>
        <Button
          size="md"
          onClick={() => history.push('/login')}
          bg={theme.colors.turquoise}
          _hover={{ bg: theme.colors.celeste }}
          color={theme.colors.silver}
        >
          Already have account?
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signup;
