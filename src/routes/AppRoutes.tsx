import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainLayout } from '../layouts/main/MainLayout';
import { Home } from '../pages/Home';
import Results from '../pages/Results';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="results" element={<Results />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
