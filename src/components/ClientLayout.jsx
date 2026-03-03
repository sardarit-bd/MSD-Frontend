"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current path is admin dashboard
  const isAdminDashboard = pathname?.startsWith('/dashboard/admin');
  
  return (
    <>
      {!isAdminDashboard && <Navbar />}
      
      <main className="min-h-screen">
        {children}
      </main>
      
      {!isAdminDashboard && <Footer />}
    </>
  );
}