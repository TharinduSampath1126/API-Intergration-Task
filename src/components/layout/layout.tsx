import type { ReactNode } from 'react';
import Navbar from '../navbar/navItem';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-[80vh] p-4">{children}</main>
    </div>
  );
};

export default Layout;