import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface PatrimonyOverviewProps {
    data: { name: string; value: number }[];
    alignmentPercent: number;
}

export const PatrimonyOverview = ({ data, alignmentPercent }: PatrimonyOverviewProps) => (
    <div className="bg-card border shadow rounded-xl p-6 h-full">
        <h1 className="text-lg font-medium mb-4">KPI Liquidez carteira</h1>
        <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">-20%</span>
            <span className="text-sm text-gray-400">-10%</span>
            <span className="text-sm text-gray-400">{alignmentPercent.toFixed(0)}%</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-400">Patrimônio atual</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-gray-400">Realização</span>
            </div>
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-400">Meta do ano</span>
            </div>
        </div>
        <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#9CA3AF' }}
                    />
                    <YAxis hide />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);