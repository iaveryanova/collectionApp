import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home-page/HomePage';
import RegisterForm from '../pages/auth-page/register-form/RegisterForm';
import AuthForm from '../pages/auth-page/auth-form/AuthForm';
import CollectionPage from '../pages/collection-page/CollectionPage';
import CreateCollectionPage from '../pages/create-collection-page/CreateCollectionPage';
import CreateItemPage from '../pages/create-item-page/CreateItemPage';
import ManageUserPage from '../pages/manage-user-page/ManageUserPage';
import PersonalPage from '../pages/personal-page/PersonalPage';
import ViewCollectionPage from '../pages/view-collection-page/ViewCollectionPage';
import ViewItemPage from '../pages/view-item-page/ViewItemPage';
import { UserContext } from '../App';
import AdminPage from "../pages/admin/AdminPage";

const AppRoutes: React.FC = () => {
  const context = useContext(UserContext);
  const [token, setToken] = useState(context?.token)
  return (
    context?.token ?
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection/:colId" element={<CollectionPage />} />
        <Route path="/createcollection" element={<CreateCollectionPage />} />
        <Route path="/collection/:id/edit" element={<CreateCollectionPage />} />
        <Route path="/collection/:id/createitem" element={<CreateItemPage />} />
        <Route path="/manageuser" element={<ManageUserPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/viewcollection" element={<ViewCollectionPage />} />
        <Route path="/viewitem" element={<ViewItemPage />} />
        <Route path="/item/:id" element={<ViewItemPage />} />
        <Route path="/item/:itemId/edit" element={<CreateItemPage />} />

        {context?.is_admin &&
          <>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user/:id" element={<PersonalPage />} />
          <Route path="/user/:userId/collection/:id/edit" element={<CreateCollectionPage />} />
          <Route path="/user/:userId/createcollection" element={<CreateCollectionPage />} />
        </>
      }

        <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
    :
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/viewcollection" element={<ViewCollectionPage />} />
        <Route path="/viewitem" element={<ViewItemPage />} />

        <Route path="*" element={<Navigate to="/" replace/>} />
    </Routes>
  )
}

export default AppRoutes;