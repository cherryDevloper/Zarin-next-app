"use client";
import { Button } from "antd";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface LayoutProps {
  header?: ReactNode;
  sidebar?: ReactNode;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ sidebar, children }) => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col w-screen">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 ">
        <Button onClick={() => router.push('/')}>{"<Back"}</Button>
      </header>

      <div className="flex flex-1">
        {sidebar && <aside className="bg-gray-200 w-64 p-4">{sidebar}</aside>}

        {/* Main content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
