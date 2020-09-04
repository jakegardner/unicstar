import React, { useState } from 'react';

import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/core';

function PasswordInput({ onChange, value }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Password"
        onChange={onChange}
        value={value}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export default PasswordInput;
