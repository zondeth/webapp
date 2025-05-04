import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AtomicSwapWizard } from "@/components/atomicSwap/AtomicSwapWizard"
import { useState, useEffect } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { Seo } from "@/components/seo/Seo"

export const initialSwapDetails: SwapDetails = {
    direction: "ZOND_TO_EVM",
    evmAmount: "",
    zondAmount: "",
    evmToken: "",
    zondToken: "",
    expiry: "",
    evmAddress: "",
    zondAddress: "",
}

export type SwapDirection = "ZOND_TO_EVM" | "EVM_TO_ZOND"

export interface SwapDetails {
    direction: SwapDirection
    evmAmount: string
    zondAmount: string
    evmToken: string
    zondToken: string
    expiry: string
    secret?: string
    hash?: string
    evmAddress?: string
    zondAddress?: string
}

export const AtomicSwapPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"zond2evm" | "evm2zond">("zond2evm")

    const [swapDetails, setSwapDetails] = useLocalStorage<SwapDetails>("atomic-swap-details", initialSwapDetails)

    useEffect(() => {
        setSwapDetails({
            ...swapDetails,
            direction: activeTab === "zond2evm" ? "ZOND_TO_EVM" : "EVM_TO_ZOND",
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab])

    useEffect(() => {
        setSwapDetails(initialSwapDetails)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Seo
                title="Zond ↔ EVM Atomic Swap | Secure & Decentralized Exchange"
                description="Lock assets securely with our atomic swap solution. Seamlessly swap between Zond and EVM tokens with an easy-to-use interface."
            />
            <Card className="mx-auto max-w-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
                        Create Atomic Swap
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-2 md:px-6">
                    <Tabs
                        value={activeTab}
                        onValueChange={(value) => {
                            setActiveTab(value as "zond2evm" | "evm2zond")
                        }}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="zond2evm" className="cursor-pointer">
                                Zond → EVM
                            </TabsTrigger>
                            <TabsTrigger value="evm2zond" className="cursor-pointer">
                                EVM → Zond
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="zond2evm">
                            <AtomicSwapWizard swapDetails={swapDetails} setSwapDetails={setSwapDetails} />
                        </TabsContent>
                        <TabsContent value="evm2zond">
                            <AtomicSwapWizard swapDetails={swapDetails} setSwapDetails={setSwapDetails} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    )
}
