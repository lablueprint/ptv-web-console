import 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditResourceForm from './EditResourceForm';

export default function ResourcePage() {
  const { resourceId } = useParams();

  const [resource, setResource] = useState({});
  const [resourceLoading, setResourceLoading] = useState(true);
  const [resourceErrorMessage, setResourceErrorMessage] = useState(null);

  useEffect(() => {
    setResourceLoading(true);
    firebase.firestore().collection('resources').doc(resourceId)
      .get()
      .then((snapshot) => {
        setResource({ ...snapshot.data(), id: snapshot.id });
        setResourceLoading(false);
      })
      .catch((error) => {
        setResourceErrorMessage(error.message);
        setResourceLoading(false);
      });
  }, [resourceId]);

  return (
    <div>
      {resourceLoading && <CircularProgress />}
      {!resourceLoading && (
        <>
          {resourceErrorMessage && <p>{resourceErrorMessage}</p>}

          <div>
            <table>
              <tbody>
                <tr>
                  <td>Author</td>
                  <td>{resource.author}</td>
                </tr>
                <tr>
                  <td>Created</td>
                  <td>{resource.createdAt ? resource.createdAt.toDate().toString() : null}</td>
                </tr>
                <tr>
                  <td>Updated</td>
                  <td>{resource.updatedAt ? resource.updatedAt.toDate().toString() : null}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <EditResourceForm currentState={resource} />
          </div>
        </>
      )}
    </div>
  );
}
