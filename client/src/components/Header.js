import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import {
  Button,
  Flex,
  Image,
} from '@chakra-ui/core';
import CreatePost from './CreatePost';
import theme from '../styles/theme';

function Header({ history }) {
  const token = localStorage.getItem('AUTH_TOKEN');
  return (
    <Flex
      align="center"
      direction="row"
      justify="center"
      width="100%"
      bg={theme.colors.lilac}
      paddingTop="3"
      paddingBottom="5"
    >
      <Flex>
        <Link to="/" >
          <Image
            src={theme.landingLogo}
            alt="unicorn"
            rounded="full"
            size="100px"
            marginRight="3"
          />
        </Link>
      </Flex>
      { token ?
        <CreatePost />
        :
        <Flex
          direction="column"
          align="center"
        >
          <Flex fontSize="2em" color={theme.colors.silver} marginBottom="2">
            What joy will you share today?
          </Flex>
          <Flex height="100%" direction="column" width="100%">
            <Link to="/login">
              <Button
                width="100%"
                marginRight="3"
                bg={theme.colors.naplesYellow}
                _hover={{ bg: theme.colors.blonde }}
                color={theme.colors.jet}
              >
                Login
              </Button>
            </Link>
          </Flex>
        </Flex>
      }
      {token &&
        <Button
          onClick={() => {
            localStorage.removeItem('AUTH_TOKEN');
            history.push('/');
          }}
          marginRight="3"
          bg={theme.colors.naplesYellow}
          _hover={{ bg: theme.colors.blonde }}
          color={theme.colors.silver}
        >
          Logout
        </Button>
      }
    </Flex>
  );
}

export default withRouter(Header);
