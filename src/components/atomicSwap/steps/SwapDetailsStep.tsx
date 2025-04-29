import { useState } from "react"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EVM_TOKEN_LIST, ZOND_TOKEN_LIST } from "@/lib/constants"
import { motion } from "framer-motion"
import type { SwapDetails } from "@/pages/AtomicSwapPage"
import { WalletConnectModal } from "@/components/common/wallet-connect-modal"

interface SwapDetailsStepProps {
  swapDetails: SwapDetails
  setSwapDetails: (details: SwapDetails) => void
  isLoading?: boolean
  goToNextStep?: () => void
}

export const SwapDetailsStep: React.FC<SwapDetailsStepProps> = ({ swapDetails, setSwapDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentWalletType, setCurrentWalletType] = useState<"ZOND" | "EVM">("EVM")
  const [evmAddress, setEvmAddress] = useState("")
  const [zondAddress, setZondAddress] = useState("")

  const handleChange = (field: keyof SwapDetails, value: string) => {
    setSwapDetails({
      ...swapDetails,
      [field]: value,
    })
  }

  const openWalletModal = (type: "ZOND" | "EVM") => {
    setCurrentWalletType(type)
    setIsModalOpen(true)
  }

  const handleWalletConnect = (address: string) => {
    if (currentWalletType === "EVM") {
      setEvmAddress(address)
      handleChange("evmAddress", address)
    } else {
      setZondAddress(address)
      handleChange("zondAddress", address)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-1">
        <label htmlFor="direction" className="text-sm font-medium text-muted-foreground">
          Direction
        </label>
        <Input
          id="direction"
          placeholder={swapDetails.direction === "ZOND_TO_EVM" ? "ZOND → EVM" : "EVM → ZOND"}
          readOnly
          value={swapDetails.direction === "ZOND_TO_EVM" ? "ZOND → EVM" : "EVM → ZOND"}
        />
      </div>

      <motion.div className="flex flex-col gap-4" layout>
        <motion.div className={`grid gap-1 ${swapDetails.direction === "ZOND_TO_EVM" ? "order-2" : "order-1"}`} layout>
          <label className="text-sm font-medium text-muted-foreground">
            {swapDetails.direction === "ZOND_TO_EVM" ? "Receiving Amount (EVM)" : "Sending Amount (EVM)"}
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="0.0"
              inputMode="decimal"
              type="number"
              value={swapDetails.evmAmount}
              onChange={(e) => handleChange("evmAmount", e.target.value)}
              className="flex-1"
            />

            <Select value={swapDetails.evmToken} onValueChange={(value) => handleChange("evmToken", value)}>
              <SelectTrigger className="w-[120px] cursor-pointer">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {EVM_TOKEN_LIST.map((token) => (
                  <SelectItem className="cursor-pointer" key={token.address} value={token.address}>
                    <div className="flex items-center gap-2">
                      <img
                        src={token.icon || "/token-placeholder.png"}
                        alt={token.symbol}
                        className="w-5 h-5 rounded-full"
                      />
                      {token.symbol}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="default" className="gap-2 cursor-pointer w-[90px]" onClick={() => openWalletModal("EVM")}>
              <Wallet className="w-5 h-5" /> EVM
              {evmAddress && (
                <span className="sr-only">
                  Connected: {evmAddress.substring(0, 6)}...{evmAddress.substring(evmAddress.length - 4)}
                </span>
              )}
            </Button>
          </div>
          {evmAddress && (
            <p className="text-xs text-muted-foreground mt-1 truncate">
              Address: {evmAddress.substring(0, 6)}...{evmAddress.substring(evmAddress.length - 4)}
            </p>
          )}
        </motion.div>

        <motion.div className={`grid gap-1 ${swapDetails.direction === "ZOND_TO_EVM" ? "order-1" : "order-2"}`} layout>
          <label className="text-sm font-medium text-muted-foreground">
            {swapDetails.direction === "ZOND_TO_EVM" ? "Sending Amount (ZOND)" : "Receiving Amount (ZOND)"}
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="0.0"
              inputMode="decimal"
              type="number"
              value={swapDetails.zondAmount}
              onChange={(e) => handleChange("zondAmount", e.target.value)}
              className="flex-1"
            />

            <Select value={swapDetails.zondToken} onValueChange={(value) => handleChange("zondToken", value)}>
              <SelectTrigger className="w-[120px] cursor-pointer">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                {ZOND_TOKEN_LIST.map((token) => (
                  <SelectItem className="cursor-pointer" key={token.address} value={token.address}>
                    <div className="flex items-center gap-2">
                      <img
                        src={token.icon || "/token-placeholder.png"}
                        alt={token.symbol}
                        className="w-5 h-5 rounded-full"
                      />
                      {token.symbol}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="default" className="gap-2 cursor-pointer w-[90px]" onClick={() => openWalletModal("ZOND")}>
              <Wallet className="w-5 h-5" /> ZOND
              {zondAddress && (
                <span className="sr-only">
                  Connected: {zondAddress.substring(0, 6)}...{zondAddress.substring(zondAddress.length - 4)}
                </span>
              )}
            </Button>
          </div>
          {zondAddress && (
            <p className="text-xs text-muted-foreground mt-1 truncate">
              Address: {zondAddress.substring(0, 6)}...{zondAddress.substring(zondAddress.length - 4)}
            </p>
          )}
        </motion.div>
      </motion.div>

      <div className="grid gap-1">
        <label className="text-sm font-medium text-muted-foreground">Expiry (T₁)</label>
        <Input
          type="datetime-local"
          value={swapDetails.expiry}
          onChange={(e) => handleChange("expiry", e.target.value)}
        />
      </div>

      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        walletType={currentWalletType}
        onConnect={handleWalletConnect}
        direction={swapDetails.direction}
      />
    </div>
  )
}
