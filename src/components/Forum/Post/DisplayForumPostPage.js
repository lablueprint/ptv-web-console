import React, { useMemo } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import ForumPostsList from './ForumPostsList';
import 'firebase/firestore';

export default function DisplayPostPage() {
  const [snapshot, loading, error] = useCollection(firebase.firestore().collection('forum_posts'));
  const data = useMemo(() => snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    [snapshot.docs]);

  return (
    <div>
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      <ForumPostsList posts={data} />
    </div>
  );
}
