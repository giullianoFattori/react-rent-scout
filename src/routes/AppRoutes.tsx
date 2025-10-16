import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '../layouts/main/MainLayout';
import { HomePage } from '../pages/home';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
