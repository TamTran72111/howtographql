import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

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
