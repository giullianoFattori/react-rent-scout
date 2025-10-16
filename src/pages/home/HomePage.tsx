import { HelloWorld } from '../../components/common/HelloWorld';
import { PageSection } from './components/PageSection';

export const HomePage = () => {
  return (
    <PageSection title="Visão Geral">
      <HelloWorld message="Olá, mundo!" />
    </PageSection>
  );
};
