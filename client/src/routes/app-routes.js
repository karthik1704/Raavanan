import { Routes, Route } from 'react-router-dom';

import MainLayout from 'layouts/main-layout';

import Home from 'pages/home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
