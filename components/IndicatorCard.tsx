interface IndicatorCardProps {
    retirementAge: string | number;
    desiredIncome?: number;
    targetYield?: number;
}

export const IndicatorCard = ({
    retirementAge,
    desiredIncome,
    targetYield
}: IndicatorCardProps) => (
    <div className="bg-card border shadow rounded-xl p-4 space-y-4 h-full">
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">🎯 Aposentadoria</span>
            <span className="text-sm">{retirementAge} anos</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">💰 Renda desejada/mês</span>
            <span className="text-sm">
                {desiredIncome ? `R$${(desiredIncome / 1000).toLocaleString('pt-BR')}k` : 'N/A'}
            </span>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">🎯 Target rendimento</span>
            <span className="text-sm text-orange-400">
                {targetYield ? `IPCA + ${(targetYield / 10).toFixed(2)}%` : 'N/A'}
            </span>
        </div>
    </div>
);