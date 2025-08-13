interface AllocationItem {
    assetClass: string;
    percentage: number;
    currentValue: number;
}

interface AllocationComparisonProps {
    allocations: AllocationItem[];
    alignmentPercent: number;
    profile: string;
}

export const AllocationComparison = ({
    allocations,
    alignmentPercent,
    profile
}: AllocationComparisonProps) => (
    <div className="bg-card border shadow rounded-xl p-6 h-full">
        <h1 className="text-lg font-medium mb-4">Comparação de Alocações</h1>
        <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-medium">{alignmentPercent.toFixed(0)}%</span>
            <span className="text-sm text-gray-400">Perfil: {profile || 'N/A'}</span>
        </div>

        <div className="space-y-4">
            {allocations.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                        <span className="text-sm text-gray-400 w-20">{item.assetClass}</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2 relative">
                            <div
                                className="h-2 rounded-full"
                                style={{
                                    width: `${item.percentage}%`,
                                    backgroundColor: index % 2 === 0 ? '#10B981' : '#3B82F6'
                                }}
                            />
                        </div>
                    </div>
                    <span className="text-sm text-gray-400 w-8">{item.percentage}%</span>
                </div>
            ))}
        </div>
    </div>
);