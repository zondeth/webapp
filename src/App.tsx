import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/layout/Navbar";
import { AtomicSwapPage } from "@/pages/AtomicSwapPage";
import { ActiveSwapsPage } from "@/pages/ActiveSwapsPage";
import { HistoryPage } from "@/pages/HistoryPage";
import { Seo } from "@/components/seo/Seo";

export default function App() {
  return (
    <>
      <Seo
        title="Zond ↔ Ethereum Atomic Swap Protocol | Non-Custodial Peer-to-Peer Exchange"
        description="Direct, peer-to-peer atomic swap protocol for exchanging ZND and ETH without wrapping or relayers. Experience non-custodial, two-way swaps using Hashed Timelock Contracts (HTLCs) to ensure trust minimization and deterministic finality."
        canonical="https://zondeth.com"
      />
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