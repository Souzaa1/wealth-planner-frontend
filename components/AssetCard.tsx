import { DollarSign, Home } from "lucide-react";

interface AssetCardProps {
    type: 'financial' | 'immobilized';
    assetClass: string;
    currentValue: number;
    alignmentPercent?: number;
}

export const AssetCard = ({
    type,
    assetClass,
    currentValue,
    alignmentPercent
}: AssetCardProps) => (
    <div className="bg-card border shadow rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${type === 'financial' ? 'bg-orange-500' : 'bg-purple-500'
                }`}>
                {type === 'financial' ? <DollarSign size={16} /> : <Home size={16} />}
            </div>
            <span className="text-sm text-gray-400">{assetClass}</span>
        </div>
        <div className="text-xl font-medium">
            R$ {currentValue / 1000}k
        </div>
        {type === 'financial' ? (
            <div className="text-xs text-green-400">
                +{parseFloat(alignmentPercent?.toString() || '0').toFixed(2)}%
            </div>
        ) : (
            <div className="text-xs text-gray-400"></div>
        )}
    </div>
);