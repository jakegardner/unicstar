import React, { useState } from 'react';

import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';

type PasswordInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value?: string,
};

const PasswordInput: React.FC<PasswordInputProps> = ({ onChange, value }) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? 'text' : 'password'}
        placeholder="Password"
        onChange={onChange}
        value={value}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
