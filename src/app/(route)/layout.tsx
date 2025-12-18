'use client';

import Header from '@/components/layout/header';
import Aside from '@/components/layout/aside';
import Content from '@/components/layout/content';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Aside type="flight" />
      <div className="flex-1 flex flex-col min-w-0 h-screen w-full relative overflow-hidden">
        <Header type="flight" />
        <Content>{children}</Content>
      </div>
    </div>
  );
}