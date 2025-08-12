import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Ellipsis } from "lucide-react";
import { ClientProps } from "@/types/interface";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

interface ClientsTableProps {
    clients: ClientProps[];
    itemsPerPage?: number;
}

export const ClientsTable = ({ clients, itemsPerPage = 5 }: ClientsTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(clients.length / itemsPerPage);

    const paginatedClients = clients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const formatCurrency = (value: number) => {
        return `R$ ${value.toLocaleString('pt-BR')}`;
    };

    const diffInMonths = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const years = endDate.getFullYear() - startDate.getFullYear();
        const months = endDate.getMonth() - startDate.getMonth();
        return years * 12 + months;
    };

    return (
        <Card className="p-2 col-span-2">
            <CardHeader className="p-1">
                <div className="flex items-center justify-between">
                    <CardTitle>Atualização de planejamento</CardTitle>
                    <Ellipsis className="size-6 text-zinc-500" />
                </div>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Patrimônio</TableHead>
                            <TableHead className="text-center">Última atualização</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedClients.map((client, index) => (
                            <TableRow key={index}>
                                <TableCell className="capitalize">{client.name}</TableCell>
                                <TableCell>
                                    {formatCurrency(
                                        client.wallets.reduce(
                                            (sum, wallet) => sum + Number(wallet.currentValue || 0),
                                            0
                                        )
                                    )}
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className={`rounded-full ${diffInMonths(client.createdAt.toString(), client.updatedAt.toString()) > 6 ? "bg-red-500 text-red-500" : "bg-emerald-950 text-emerald-500"}`}>
                                        {diffInMonths(client.createdAt.toString(), client.updatedAt.toString())} meses
                                    </div>
                                </TableCell>
                                <TableCell className="flex items-center justify-end">
                                    <Ellipsis className="size-6 text-zinc-500" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex justify-center items-center gap-2 mt-4">
                    <Button
                        size='icon'
                        className="px-2 py-1 bg-zinc-200 disabled:opacity-50"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeft className="size-6 text-zinc-500" />
                    </Button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <Button
                        size='icon'
                        className="px-2 py-1 bg-zinc-200 disabled:opacity-50"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <ArrowRight className="size-6 text-zinc-500" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};