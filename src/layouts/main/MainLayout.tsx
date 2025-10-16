import { Outlet } from 'react-router-dom';

import { PageContainer } from '../../support/styles/PageContainer';
import { AppHeader } from '../../components/common/AppHeader';

export const MainLayout = () => {
  return (
    <PageContainer>
      <AppHeader title="Rent Scout" />
      <main>
        <Outlet />
      </main>
    </PageContainer>
  );
};
