'use client'

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCookie } from "@/lib/getCookie";
import { ClientProps } from "@/types/interface";
import { Separator } from "@/components/ui/separator";
import { Ellipsis } from "lucide-react";
import { ClientStatsCard } from "@/components/ClientStatsCard";
import { PlanningPieChart } from "@/components/PlanningPieChart";
import { ClientsTable } from "@/components/ClientsTable";
import { InsurancePieChart } from "@/components/InsurancePieChart";

const Dashboard = () => {
    const token = getCookie("token");
    const [clients, setClients] = useState<ClientProps[]>([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4000/api/v1/clients?page=1&limit=10&sortBy=createdAt&sortOrder=desc",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setClients(response.data?.data || []);
            } catch (error) {
                console.error("Error fetching clients:", error);
                setClients([]);
            }
        };
        fetchClients();
    }, [token]);

    const totalClients = clients.length || 1;

    const clientsWithPlanning = useMemo(() => [
        {
            name: "Superior a 90%",
            value: Math.round((clients.filter(c => Number(c.wallets[0]?.alignmentPercent) > 90).length / totalClients) * 100),
            count: clients.filter(c => Number(c.wallets[0]?.alignmentPercent) > 90).length,
            color: "#22c55e",
            bgColor: '#022c22',
        },
        {
            name: "90% a 70%",
            value: Math.round((clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 90 && Number(c.wallets[0]?.alignmentPercent) > 70).length / totalClients) * 100),
            count: clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 90 && Number(c.wallets[0]?.alignmentPercent) > 70).length,
            color: "#eab308",
            bgColor: '#422006',
        },
        {
            name: "70% a 50%",
            value: Math.round((clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 70 && Number(c.wallets[0]?.alignmentPercent) > 50).length / totalClients) * 100),
            count: clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 70 && Number(c.wallets[0]?.alignmentPercent) > 50).length,
            color: "#f97316",
            bgColor: '#431407',
        },
        {
            name: "Inferior a 50%",
            value: Math.round((clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 50).length / totalClients) * 100),
            count: clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 50).length,
            color: "#ef4444",
            bgColor: '#450a0a',
        },
    ], [clients, totalClients]);

    const averageAlignment = useMemo(() => {
        if (clients.length === 0) return 0;
        const sum = clients.reduce((acc, client) => {
            return acc + (Number(client.wallets[0]?.alignmentPercent) || 0);
        }, 0);
        return Math.round(sum / clients.length);
    }, [clients]);

    return (
        <div className="w-full h-screen p-6 space-y-6 flex items-center justify-center">
            <div className="w-full max-w-6xl grid grid-cols-3 gap-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full col-span-2">
                    <ClientStatsCard
                        title="Alinhamento com planejamento"
                        stats={clientsWithPlanning.map(({ name, value, color }) => ({ name, value, color }))}
                    />

                    <PlanningPieChart
                        data={clientsWithPlanning}
                        averageAlignment={averageAlignment}
                        totalClients={totalClients}
                    />

                    <ClientsTable clients={clients} />
                </div>

                <div className="flex-1">
                    <Card className="h-full p-2 col-span-1">
                        <CardHeader className="p-1">
                            <div className="flex items-center justify-between">
                                <CardTitle>Resumo do Planejamento</CardTitle>
                                <Ellipsis className="size-6 text-zinc-500" />
                            </div>
                        </CardHeader>
                        <Separator className="my-4" />
                        <CardContent>
                            <InsurancePieChart
                                data={[{
                                    name: 'Vida',
                                    value: clients.reduce((acc, client) => acc + client.insurances.filter(i => i.type === 'LIFE').length, 0),
                                }]}
                                totalClients={clients.length}
                                filteredClients={clients.filter(client => client.insurances.some(i => i.type === 'LIFE')).length}
                                color="#676CFD"
                            />

                            <InsurancePieChart
                                data={[{
                                    name: 'Inabilidade',
                                    value: clients.reduce((acc, client) => acc + client.insurances.filter(i => i.type === 'DISABILITY').length, 0),
                                }]}
                                totalClients={clients.length}
                                filteredClients={clients.filter(client => client.insurances.some(i => i.type === 'DISABILITY')).length}
                                color="#676CFD"
                            />

                            <InsurancePieChart
                                data={[{
                                    name: 'Propriedade',
                                    value: clients.reduce((acc, client) => acc + client.insurances.filter(i => i.type === 'PROPERTY').length, 0),
                                }]}
                                totalClients={clients.length}
                                filteredClients={clients.filter(client => client.insurances.some(i => i.type === 'PROPERTY')).length}
                                color="#676CFD"
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;