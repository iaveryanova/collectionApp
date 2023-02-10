import React from 'react'
import { Route, Routes } from 'react-router-dom'
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

const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/collectpage" element={<CollectionPage />} />
        <Route path="/createcollect" element={<CreateCollectionPage />} />
        <Route path="/createitem" element={<CreateItemPage />} />
        <Route path="/manageuser" element={<ManageUserPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/viewcollect" element={<ViewCollectionPage />} />
        <Route path="/viewitem" element={<ViewItemPage />} />
    </Routes>
  )
}

export default AppRoutes;