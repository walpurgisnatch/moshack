import cn from 'classnames';

import styles from './styles.module.scss';

type TPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export const Panel = ({
  children,
  className
}: TPanelProps) => {
  return (
    <div className={cn(className, styles.panel)}>
      {children}
    </div>
  );
};
