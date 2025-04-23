import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/layout/Navbar";
import { AtomicSwapPage } from "@/pages/AtomicSwapPage";
import { ActiveSwapsPage } from "@/pages/ActiveSwapsPage";
import { HistoryPage } from "@/pages/HistoryPage";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Routes>
          <Route path="/" element={<Navigate to="/swap" replace />} />
          <Route path="/swap" element={<AtomicSwapPage />} />
          <Route path="/active-swaps" element={<ActiveSwapsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" theme="dark" autoClose={4000} />
    </>
  );
}