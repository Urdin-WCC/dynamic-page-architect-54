
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

type PageLayoutProps = {
  children: ReactNode;
  showSidebar?: boolean;
  className?: string;
};

const PageLayout = ({ children, showSidebar = true, className }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container flex flex-col lg:flex-row">
          {showSidebar && (
            <Sidebar className="hidden lg:block" />
          )}
          
          <div className={cn("py-8 lg:py-12 w-full", 
            showSidebar ? "lg:pl-8" : "",
            className
          )}>
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
