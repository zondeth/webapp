import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtomicSwapWidget } from "@/components/atomicSwap/AtomicSwapWidget";
import { ArrowUpDown } from "lucide-react";

export const AtomicSwapPage = () => (
    <Card className="mx-auto max-w-xl">
        <CardHeader>
            <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
                <ArrowUpDown className="w-6 h-6" /> Atomic Swap
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="zond2evm" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    {/* eslint-disable-next-line */}
                    <TabsTrigger value="zond2evm" className="cursor-pointer">Zond → EVM</TabsTrigger>
                    {/* eslint-disable-next-line */}
                    <TabsTrigger value="evm2zond" className="cursor-pointer">EVM → Zond</TabsTrigger>
                </TabsList>
                <TabsContent value="zond2evm">
                    <AtomicSwapWidget direction="ZOND_TO_EVM" />
                </TabsContent>
                <TabsContent value="evm2zond">
                    <AtomicSwapWidget direction="EVM_TO_ZOND" />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
);