import { TrendingUpDown } from "lucide-react";

interface TotalAllocationCardProps {
    totalAllocated: number;
    alignmentPercent?: number;
}

export const TotalAllocationCard = ({
    totalAllocated,
    alignmentPercent
}: TotalAllocationCardProps) => (
    <div className="mb-8">
        <p className="text-gray-400 text-sm mb-2">Total Alocado</p>
        <div className="flex items-center gap-4">
            <span className="text-4xl font-light">
                R$ {(totalAllocated / 1000).toLocaleString('pt-BR')}
            </span>
            <span className="text-orange-500 text-sm">.00</span>
            <div className="flex items-center text-green-400 text-sm">
                <TrendingUpDown size={16} className="mr-1" />
                {alignmentPercent ? `+${alignmentPercent.toFixed(2)}%` : 'N/A'}
            </div>
        </div>
    </div>
);