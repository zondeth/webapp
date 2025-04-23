import { Link, NavLink } from "react-router-dom";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => (
    <header className="fixed top-0 inset-x-0 backdrop-blur supports-[backdrop-filter]:bg-white/50 shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                <img src="/logo.png" alt="Zond Atomic Swap" className="w-8 h-8" />
                {/* eslint-disable-next-line */}
                Zond ↔ EVM
            </Link>
            <nav className="hidden md:flex gap-6 font-medium">
                {[
                    { to: "/swap", label: "Swap" },
                    { to: "/active-swaps", label: "Active Swaps" },
                    { to: "/history", label: "History" },
                ].map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>
            <Button variant="default" className="gap-2 cursor-pointer">
                <Wallet className="w-5 h-5" /> Connect
            </Button>
        </div>
    </header>
);