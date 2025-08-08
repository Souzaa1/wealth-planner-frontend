'use client'

import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCookie } from "@/lib/getCookie";
import { ClientProps } from "@/types/interface";
import { Separator } from "@/components/ui/separator";
import { Ellipsis, Check, AlertTriangle, X, ChevronsUpDown, TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";


const Dashboad = () => {
    const token = getCookie("token");
    const [clients, setClients] = useState<ClientProps[]>([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4000/api/v1/clients?page=1&limit=10&sortBy=createdAt&sortOrder=desc",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const data = response.data?.data || [];
                setClients(data);
            } catch (error) {
                console.error("Error fetching clients:", error);
                setClients([]);
            }
        };
        fetchClients();
    }, [token]);

    const totalClients = clients.length || 1;

    const clientsWithPlanning = [
        {
            name: "Superior a 90%",
            value: Math.round((clients.filter(c => Number(c.wallets[0]?.alignmentPercent) > 90).length / totalClients) * 100),
            count: clients.filter(c => Number(c.wallets[0]?.alignmentPercent) > 90).length,
            color: "#22c55e",
            icon: <Check className="h-8 w-8 text-green-500" />
        },
        {
            name: "90% a 70%",
            value: Math.round((clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 90 && Number(c.wallets[0]?.alignmentPercent) > 70).length / totalClients) * 100),
            count: clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 90 && Number(c.wallets[0]?.alignmentPercent) > 70).length,
            color: "#eab308",
            icon: <ChevronsUpDown className="h-8 w-8 text-yellow-500" />
        },
        {
            name: "70% a 50%",
            value: Math.round((clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 70 && Number(c.wallets[0]?.alignmentPercent) > 50).length / totalClients) * 100),
            count: clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 70 && Number(c.wallets[0]?.alignmentPercent) > 50).length,
            color: "#f97316",
            icon: <AlertTriangle className="h-8 w-8 text-orange-500" />
        },
        {
            name: "Inferior a 50%",
            value: Math.round((clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 50).length / totalClients) * 100),
            count: clients.filter(c => Number(c.wallets[0]?.alignmentPercent) <= 50).length,
            color: "#ef4444",
            icon: <X className="h-8 w-8 text-red-500" />
        },
    ];

    const chartConfig = {
        value: {
            label: "Clientes",
        },
        "Superior a 90%": {
            label: "Superior a 90%",
            color: "#22c55e",
        },
        "90% a 70%": {
            label: "90% a 70%",
            color: "#eab308",
        },
        "70% a 50%": {
            label: "70% a 50%",
            color: "#f97316",
        },
        "Inferior a 50%": {
            label: "Inferior a 50%",
            color: "#ef4444",
        },
    };

    const averageAlignment = useMemo(() => {
        if (clients.length === 0) return 0;
        const sum = clients.reduce((acc, client) => {
            return acc + (Number(client.wallets[0]?.alignmentPercent) || 0);
        }, 0);
        return Math.round(sum / clients.length);
    }, [clients]);

    const getIconForAverage = () => {
        if (averageAlignment > 90) return <Check className="h-12 w-12 text-green-500" />;
        if (averageAlignment > 70) return <ChevronsUpDown className="h-12 w-12 text-yellow-500" />;
        if (averageAlignment > 50) return <AlertTriangle className="h-12 w-12 text-orange-500" />;
        return <X className="h-12 w-12 text-red-500" />;
    };

    const clientsWithPlanningColor= clientsWithPlanning.map(client => ({
        color: client.color
    }));

    return (
        <div className="w-full h-full p-6 space-y-6 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <Card className="p-2 col-span-1">
                        <CardHeader className="p-1">
                            <div className="flex items-center justify-between">
                                <CardTitle>Alinhamento com planejamento</CardTitle>
                                <Ellipsis className="size-12 text-zinc-500" />
                            </div>
                        </CardHeader>
                        <Separator className="my-4" />
                        <CardContent>
                            {clientsWithPlanning.map((item, index) => (
                                <div key={index} className="flex items-center space-x-4 mb-4">
                                    <div className="w-40 text-sm font-medium">{item.name}</div>
                                    <div className="relative flex-1 h-12 rounded-full overflow-hidden bg-zinc-800">
                                        <div
                                            className={`h-full`}
                                            style={{
                                                width: `${item.value}%`,
                                                background: item.color,
                                                boxShadow: `(0 0 50px ${item.color})`,
                                            }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                            {item.value}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col p-4 col-span-1">
                        <CardHeader className="p-0 mb-6">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-white">Clientes com planejamento</CardTitle>
                                <Ellipsis className="size-6 text-zinc-400" />
                            </div>
                        </CardHeader>

                        <Separator className="my-4" />

                        <CardContent className="flex-1 p-0 flex flex-col items-center">
                            <div className="relative w-[240px] h-[240px]">
                                <ChartContainer
                                    config={chartConfig}
                                    className="w-full h-full"
                                    style={{
                                        filter: `drop-shadow(0 10px 25px ${clientsWithPlanningColor})`
                                    }}
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent hideLabel />}
                                            />
                                            <Pie
                                                data={clientsWithPlanning.filter(item => item.count > 0)}
                                                dataKey="count"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={70}
                                                outerRadius={100}
                                                strokeWidth={2}
                                                startAngle={90}
                                                endAngle={450}
                                            >
                                                {clientsWithPlanning.filter(item => item.count > 0).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>

                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <TrendingUp className="h-8 w-8 text-green-500 mb-2" />
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">
                                            {averageAlignment}%
                                        </div>
                                        <div className="text-sm text-zinc-400">
                                            {totalClients} clientes
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Dashboad;