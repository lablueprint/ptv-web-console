import React from 'react';
import firebase from 'firebase/app';
import { Admin, Resource } from 'react-admin';
import { RestProvider, AuthProvider } from 'ra-data-firestore-client/';
import {
  UserCreate, UserEdit, UserList, UserShow,
} from '../Users';
import {
  CategoryCreate, CategoryEdit, CategoryList, CategoryShow,
  ResourceCreate, ResourceEdit, ResourceList, ResourceShow,
} from '../Resources';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const trackedResources = [
  { name: 'resource_categories' },
  { name: 'users' },
  { name: 'resources' },
];

const dataProvider = RestProvider(firebaseConfig, { trackedResources });

const authConfig = {
  userProfilePath: '/users/',
  userAdminProp: 'isAdmin',
};

const authProvider = AuthProvider(authConfig);

export default function App() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="users" show={UserShow} list={UserList} edit={UserEdit} create={UserCreate} />
      <Resource name="resource_categories" show={CategoryShow} list={CategoryList} edit={CategoryEdit} create={CategoryCreate} options={{ label: 'Categories' }} />
      <Resource name="resources" show={ResourceShow} list={ResourceList} edit={ResourceEdit} create={ResourceCreate} />
    </Admin>
  );
}
