import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';
import {
  Avatar,
  Flex,
} from '@chakra-ui/core';
import Header from './Header';
import theme from '../styles/theme';

function Post({ post }) {
  return (
    <Flex
      width="100%"
      direction="column"
      paddingBottom="3"
      borderBottomWidth="0.5px"
      borderBottomColor={theme.colors.silver}
    >
      <Flex
        fontSize="md"
        paddingTop="3"
        paddingBottom="3"
        paddingLeft="1"
        paddingRight="1"
        color={theme.colors.silver}
      >
        {post.content}
      </Flex>
      <Flex direction="row" align="center" justify="space-between">
        <Flex>
          <Flex marginRight="2">
            <Avatar size="sm" bg={theme.colors.amethyst} name={post.postedBy.name} />
          </Flex>
          <Flex direction="row" align="center" fontSize="sm" color={theme.colors.silver}>
            {post.postedBy.name}
          </Flex>
        </Flex>
        <Flex fontSize="sm">
          {moment(post.createdAt).fromNow()}
        </Flex>
      </Flex>
    </Flex>
  );
}

const POSTLIST_QUERY = gql`
  {
    posts {
      id
      createdAt
      postedBy {
        name
      }
      content
    }
  }
`;

function PostList() {
  const { loading, error, data } = useQuery(POSTLIST_QUERY);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error loading data!</p>;
  return (
    <Flex align="center" justify="center" direction="column" width="100%" height="100%" bg={theme.colors.lilac}>
      <Header />
      <Flex direction="column" width={["80%", "70%", "40%"]} height="100%" bg={theme.colors.lilac}>
        {data.posts.map(post => <Post post={post} />)}
      </Flex>
    </Flex>
  );
}

export default PostList;
