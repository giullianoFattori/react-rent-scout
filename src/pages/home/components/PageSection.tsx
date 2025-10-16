import { ReactNode } from 'react';

import styles from './PageSection.module.css';

interface PageSectionProps {
  title: string;
  children: ReactNode;
}

export const PageSection = ({ title, children }: PageSectionProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  );
};
