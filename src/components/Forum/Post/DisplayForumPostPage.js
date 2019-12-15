import React from 'react';
import useCollectionSnapshot from '../../../hooks/useCollectionSnapshot';
import ForumPostsList from './ForumPostsList';

export default function DisplayPostPage() {
  const { data, loading, error } = useCollectionSnapshot('forum_posts');

  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <ForumPostsList posts={data} />
    </div>
  );
}
