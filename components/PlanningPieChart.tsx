import { Check, ChevronsUpDown, AlertTriangle, X, Ellipsis } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

interface PlanningData {
    name: string;
    value: number;
    count: number;
    color: string;
    bgColor: string;
}

interface PlanningPieChartProps {
    data: PlanningData[];
    averageAlignment: number;
    totalClients: number;
}

export const PlanningPieChart = ({ data, averageAlignment, totalClients }: PlanningPieChartProps) => {
    const chartConfig = {
        value: { label: "Clientes" },
        "Superior a 90%": { label: "Superior a 90%", color: "#22c55e" },
        "90% a 70%": { label: "90% a 70%", color: "#eab308" },
        "70% a 50%": { label: "70% a 50%", color: "#f97316" },
        "Inferior a 50%": { label: "Inferior a 50%", color: "#ef4444" },
    };

    const getDisplayIcon = () => {
        if (averageAlignment > 90) return <Check className="h-8 w-8 text-green-500" />;
        if (averageAlignment > 70) return <ChevronsUpDown className="h-8 w-8 text-yellow-500" />;
        if (averageAlignment > 50) return <AlertTriangle className="h-8 w-8 text-orange-500" />;
        return <X className="h-8 w-8 text-red-500" />;
    };

    const getDisplayColor = () => {
        if (averageAlignment > 90) return data[0].bgColor;
        if (averageAlignment > 70) return data[1].bgColor;
        if (averageAlignment > 50) return data[2].bgColor;
        return data[3].bgColor;
    };

    return (
        <Card className="p-2 col-span-1">
            <CardHeader className="p-1">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Clientes com planejamento</CardTitle>
                    <Ellipsis className="size-6 text-zinc-400" />
                </div>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent className="flex-1 p-0 flex justify-center items-center space-x-4">
                <div className="relative w-[240px] h-[240px]">
                    <ChartContainer
                        config={chartConfig}
                        className="w-full h-full"
                        style={{ filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.3))' }}
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie
                                    data={data.filter(item => item.count > 0)}
                                    dataKey="count"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    strokeWidth={2}
                                    startAngle={90}
                                    endAngle={450}
                                    style={{ filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.1))' }}
                                >
                                    {data.filter(item => item.count > 0).map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            style={{ filter: `drop-shadow(0 0 10px ${entry.color}80)` }}
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div
                            className="flex items-center justify-center rounded-full w-16 h-16"
                            style={{
                                backgroundColor: getDisplayColor(),
                                boxShadow: `0 0 20px ${getDisplayColor()}`
                            }}
                        >
                            {getDisplayIcon()}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-white">{averageAlignment}%</div>
                    <div className="text-sm text-zinc-400">{totalClients} clientes</div>
                </div>
            </CardContent>
        </Card>
    );
};