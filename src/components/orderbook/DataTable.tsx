import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const DataTable = () => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Side</TableHead>
          <TableHead>Amount (ZND)</TableHead>
          <TableHead>Price (ETH)</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 4 }).map((_, i) => (
          <TableRow key={i} className="animate-pulse">
            <TableCell className="font-medium">—</TableCell>
            <TableCell>—</TableCell>
            <TableCell>—</TableCell>
            <TableCell>—</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);