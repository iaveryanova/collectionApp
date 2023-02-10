import React from 'react';
import AppRoutes from './components/AppRoutes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
     <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
