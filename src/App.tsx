import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/layout/Navbar";
import { BridgePage } from "@/pages/BridgePage";
import { OrderbookPage } from "@/pages/OrderbookPage";
import { HistoryPage } from "@/pages/HistoryPage";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <Routes>
          <Route path="/" element={<Navigate to="/bridge" replace />} />
          <Route path="/bridge" element={<BridgePage />} />
          <Route path="/orderbook" element={<OrderbookPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
      <ToastContainer position="top-right" theme="dark" autoClose={4000} />
    </>
  );
}