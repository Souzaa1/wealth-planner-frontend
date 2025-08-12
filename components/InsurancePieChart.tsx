import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface InsurancePieChartProps {
    data: { name: string; value: number }[];
    totalClients: number;
    filteredClients: number;
    color: string;
}

export const InsurancePieChart = ({
    data,
    totalClients,
    filteredClients,
    color
}: InsurancePieChartProps) => {
    return (
        <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        startAngle={90}
                        endAngle={450}
                        style={{ filter: 'drop-shadow(0 0 15px rgba(103, 108, 253, 0.1))' }}
                    >
                        <Cell
                            fill={color}
                            style={{ filter: `drop-shadow(0 0 10px ${color}80)` }}
                        />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col items-center justify-center text-center">
                <div className="text-3xl font-bold text-white">
                    {totalClients > 0
                        ? `${Math.round((filteredClients / totalClients) * 100)}%`
                        : '0%'}
                </div>
                <div className="text-sm text-zinc-400">
                    {data[0].value} clientes
                </div>
            </div>
        </div>
    );
};