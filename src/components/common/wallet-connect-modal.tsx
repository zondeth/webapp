"use client"

import { useState } from "react"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "react-toastify"
import { SYSTEM_EVM_ADDRESS, SYSTEM_ZOND_ADDRESS } from "@/lib/constants"

interface WalletConnectModalProps {
    isOpen: boolean
    onClose: () => void
    walletType: "ZOND" | "EVM"
    onConnect: (address: string) => void
    direction: "ZOND_TO_EVM" | "EVM_TO_ZOND"
}

export function WalletConnectModal({ isOpen, onClose, walletType, onConnect, direction }: WalletConnectModalProps) {
    const [manualAddress, setManualAddress] = useState("")
    const [isConnecting, setIsConnecting] = useState(false)

    const handleConnectWallet = async () => {
        setIsConnecting(true)
        try {
            // This is a placeholder for actual wallet connection logic
            // In a real implementation, you would use a library like ethers.js or web3.js
            let address = ""

            if (walletType === "EVM") {
                // Connect to EVM wallet (e.g., MetaMask)
                if (typeof window.ethereum !== "undefined") {
                    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
                    address = accounts[0]
                } else {
                    alert("Please install MetaMask or another EVM-compatible wallet")
                    setIsConnecting(false)
                    return
                }
            } else {
                // Connect to ZOND wallet
                // This would depend on the specific ZOND wallet implementation
                alert("ZOND wallet connection not implemented in this demo")
                setIsConnecting(false)
                return
            }

            onConnect(address)
            onClose()
        } catch (error) {
            console.error("Error connecting wallet:", error)
            toast.error("Failed to connect wallet. Please try again.")
        } finally {
            setIsConnecting(false)
        }
    }

    const handleManualConnect = () => {
        if (!manualAddress.trim()) {
            alert("Please enter a valid address")
            return
        }
        onConnect(manualAddress)
        onClose()
    }

    const handleSystemWalletConnect = () => {
        if (walletType === "ZOND") {
            onConnect(SYSTEM_ZOND_ADDRESS)
        } else {
            onConnect(SYSTEM_EVM_ADDRESS)
        }
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    {
                        walletType === "ZOND" ?
                            direction === "ZOND_TO_EVM" ? (
                                <>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Wallet className="h-5 w-5" />
                                        Enter {walletType} Wallet
                                    </DialogTitle>
                                    <DialogDescription>Enter the recipient {walletType} address</DialogDescription>
                                </>
                            ) : (
                                <>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Wallet className="h-5 w-5" />
                                        Connect {walletType} Wallet
                                    </DialogTitle>
                                    <DialogDescription>Connect your wallet or enter your address manually</DialogDescription>
                                </>
                            ) :
                            direction === "EVM_TO_ZOND" ? (
                                <>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Wallet className="h-5 w-5" />
                                        Enter {walletType} Wallet
                                    </DialogTitle>
                                    <DialogDescription>Enter the recipient {walletType} address</DialogDescription>
                                </>
                            ) : (
                                <>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Wallet className="h-5 w-5" />
                                        Connect {walletType} Wallet
                                    </DialogTitle>
                                    <DialogDescription>Connect your wallet or enter your address manually</DialogDescription>
                                </>
                            )
                    }
                </DialogHeader>

                <Tabs defaultValue="connect" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        {
                            walletType === "ZOND" ?
                                direction === "ZOND_TO_EVM" ? (
                                    <>
                                        <TabsTrigger value="connect" className="cursor-pointer">
                                            System Wallet
                                        </TabsTrigger>
                                        <TabsTrigger value="manual" className="cursor-pointer">Manual Input</TabsTrigger>
                                    </>
                                ) : (
                                    <>
                                        <TabsTrigger value="connect" className="cursor-pointer">Connect Wallet</TabsTrigger>
                                        <TabsTrigger value="manual" className="cursor-pointer">Manual Input</TabsTrigger>
                                    </>
                                ) :
                                direction === "EVM_TO_ZOND" ? (
                                    <>
                                        <TabsTrigger value="connect" className="cursor-pointer">
                                            System Wallet
                                        </TabsTrigger>
                                        <TabsTrigger value="manual" className="cursor-pointer">Manual Input</TabsTrigger>
                                    </>
                                ) : (
                                    <>
                                        <TabsTrigger value="connect" className="cursor-pointer">Connect Wallet</TabsTrigger>
                                        <TabsTrigger value="manual" className="cursor-pointer">Manual Input</TabsTrigger>
                                    </>
                                )
                        }
                    </TabsList>

                    <TabsContent value="connect" className="space-y-4 py-4">

                        {
                            walletType === "ZOND" ?
                                direction === "ZOND_TO_EVM" ? (
                                    <>
                                        <label htmlFor="zond-address" className="text-sm font-medium">
                                            {walletType} Address
                                        </label>
                                        <Input type="text" id="zond-address" className="text-center" value={SYSTEM_ZOND_ADDRESS} disabled />
                                        <Button onClick={handleSystemWalletConnect} className="w-full cursor-pointer">
                                            Confirm Address
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-muted-foreground">
                                            Connect your {walletType} wallet to automatically use your address
                                        </p>
                                        <Button onClick={handleConnectWallet} className="w-full cursor-pointer" disabled={isConnecting}>
                                            {isConnecting ? "Connecting..." : `Connect ${walletType} Wallet`}
                                        </Button>
                                    </>
                                ) :
                                direction === "EVM_TO_ZOND" ? (
                                    <>
                                        <label htmlFor="evm-address" className="text-sm font-medium">
                                            {walletType} Address
                                        </label>
                                        <Input type="text" id="evm-address" className="text-center" value={SYSTEM_EVM_ADDRESS} disabled />
                                        <Button onClick={handleSystemWalletConnect} className="w-full cursor-pointer">
                                            Confirm Address
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-muted-foreground">
                                            Connect your {walletType} wallet to automatically use your address
                                        </p>
                                        <Button onClick={handleConnectWallet} className="w-full cursor-pointer" disabled={isConnecting}>
                                            {isConnecting ? "Connecting..." : `Connect ${walletType} Wallet`}
                                        </Button>
                                    </>
                                )
                        }
                    </TabsContent>

                    <TabsContent value="manual" className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="address" className="text-sm font-medium">
                                {walletType} Address
                            </label>
                            <Input
                                id="address"
                                placeholder={`Enter your ${walletType} address`}
                                onChange={(e) => setManualAddress(e.target.value)}
                            />
                        </div>
                        <Button onClick={handleManualConnect} className="w-full cursor-pointer">
                            Confirm Address
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
