import { type ReactNode } from 'react';
import SideNavigation from '../_components/SideNavigation';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <div className='grid grid-cols-[16rem_1fr] h-full gap-12'>
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
