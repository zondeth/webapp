import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const HistoryPage = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-2xl">
        <Clock className="w-6 h-6" /> Recent Activity
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">Coming soon…</p>
    </CardContent>
  </Card>
);