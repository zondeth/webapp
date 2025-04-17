import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BridgeWidget } from "@/components/bridge/BridgeWidget";
import { ArrowUpDown } from "lucide-react";

export const BridgePage = () => (
    <Card className="mx-auto max-w-xl">
        <CardHeader>
            <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
                <ArrowUpDown className="w-6 h-6" /> Bridge Assets
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="zond2evm" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    {/* eslint-disable-next-line */}
                    <TabsTrigger value="zond2evm">Zond → EVM</TabsTrigger>
                    {/* eslint-disable-next-line */}
                    <TabsTrigger value="evm2zond">EVM → Zond</TabsTrigger>
                </TabsList>
                <TabsContent value="zond2evm">
                    <BridgeWidget direction="ZOND_TO_EVM" />
                </TabsContent>
                <TabsContent value="evm2zond">
                    <BridgeWidget direction="EVM_TO_ZOND" />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
);