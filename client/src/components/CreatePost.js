import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {
  Button,
  Flex,
  Stack,
  Textarea,
} from '@chakra-ui/core';
import theme from '../styles/theme';

const POST_MUTATION = gql`
  mutation PostMutation($content: String!) {
    createPost(content: $content) {
      content
    }
  }
`;

function CreatePost({ history }) {
  const [content, setContent] = useState();
  const [createPost, { data }] = useMutation(POST_MUTATION);
  if (data) {
    history.push('/');
  }

  return (
    <Flex width={["80%", "70%", "40%"]}>
      <Stack width="100%">
        <Textarea
          width="100%"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What joy shall we make today?"
        />
        <Button
          bg={theme.colors.blonde}
          _hover={{ bg: theme.colors.naplesYellow }}
          color={theme.colors.silver}
          onClick={() => createPost({
            variables: { content },
          })}>
          Share rainbows
        </Button>
      </Stack>
    </Flex>
  );
}

export default CreatePost;
