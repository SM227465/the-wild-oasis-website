import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <div className='grid grid-cols-[16rem_1fr] h-full gap-12'>
      <div>Navigation</div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
