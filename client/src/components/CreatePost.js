import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

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
    <div>
      <h4>New Post</h4>
      <div>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          type="text"
          placeholder="Your post"
        />
      </div>
      <div>
        <div
          onClick={() => createPost({
            variables: { content },
          })}>
          share rainbows
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
