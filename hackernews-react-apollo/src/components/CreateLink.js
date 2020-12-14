import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { LINKS_PER_PAGE } from '../constants';
import { FEED_QUERY } from './LinkList';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = () => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const history = useHistory();

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description,
      url,
    },
    update: (cache, { data: { post } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: 'desc' };
      const data = cache.readQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      cache.writeQuery({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
        data: {
          feed: {
            links: [post, ...data.feed.links],
          },
        },
      });
    },
    onCompleted: () => history.push('/'),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createLink();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-column mt3">
          <input
            type="text"
            className="mb2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A description for the link"
          />
          <input
            type="text"
            className="mb2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
