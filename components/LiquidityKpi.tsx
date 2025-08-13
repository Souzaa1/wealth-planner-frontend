import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface LiquidityKpiProps {
    data: { month: string; value: number }[];
    totalValue: number;
    totalIncome?: number;
    totalExpenses?: number;
}

export const LiquidityKpi = ({
    data,
    totalValue,
    totalIncome,
    totalExpenses
}: LiquidityKpiProps) => (
    <div className="bg-card border shadow rounded-xl p-6 h-full">
        <div className="flex justify-between items-start mb-6">
            <div>
                <div className="text-sm text-gray-400 mb-1">Esperado + Emergência</div>
                <div className="text-2xl font-bold">{totalValue.toFixed(0)}k</div>
            </div>
            <div className="text-right">
                <div className="text-sm text-gray-400 mb-1">
                    {totalIncome?.toFixed(0) || 0}k
                </div>
                <div className="text-sm text-gray-400">
                    {totalExpenses?.toFixed(0) || 0}k
                </div>
            </div>
        </div>
        <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="horizontal">
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    />
                    <Bar dataKey="value" fill="#06B6D4" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);