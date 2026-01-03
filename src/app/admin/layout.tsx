"use client";

import { useState, useEffect } from "react";
import { HeaderAdmin, Sidebar } from "@/shared";
import { useAuth } from "@/shared/contexts/AuthContext";
import styles from "./layout.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar onToggle={setIsSidebarCollapsed} />

      <div
        className={`${styles.mainWrapper} ${
          isSidebarCollapsed ? styles.expanded : ""
        }`}
      >
        <HeaderAdmin
          adminName={user?.fullname || "Usuario"}
          adminRole={user?.roleName || "Admin"}
          notificationCount={3}
          hideLogo={!isSidebarCollapsed}
        />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
