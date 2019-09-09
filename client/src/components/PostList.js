import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import moment from 'moment';

function Post({ post }) {
  return (
    <div>
      <div>
        {post.content}
      </div>
      <div>
        {post.postedBy.name}, {moment(post.createdAt).fromNow()}
      </div>
    </div>
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
  return data.posts.map(post => <Post post={post} />);
}

export default PostList;
