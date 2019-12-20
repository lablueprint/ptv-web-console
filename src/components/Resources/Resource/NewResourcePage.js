import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { withAuthorization } from '../../Session';
import NewResourceForm from './NewResourceForm';
import useCategoryFromURLId from './useCategoryFromURLId';


function NewResourcePage() {
  const { categoryURLId } = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const { data, loading, error } = useCategoryFromURLId(categoryURLId, isMounted);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <div>
      <ClipLoader loading={loading} />
      {!loading && (
        <>
          <h1>{`Create a new resource in ${data.title} category`}</h1>
          {error && <p>{error.message}</p>}
          <NewResourceForm categoryURLId={categoryURLId} categoryFirestoreId={data.id} />
        </>
      )}
    </div>
  );
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(NewResourcePage);
