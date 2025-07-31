import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AppToday from "./AppToday";
import AppGrowth from "./AppGrowth";
import AppProfile from "./AppProfile";

export default function AppMain() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/app/hoje" replace />} />
        <Route path="/hoje" element={<AppToday />} />
        <Route path="/crescimento" element={<AppGrowth />} />
        <Route path="/perfil" element={<AppProfile />} />
      </Routes>
    </AppLayout>
  );
}