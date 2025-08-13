interface KpiAllocationProps {
    wallets: {
        assetClass: string;
        percentage: number;
        currentValue: number;
    }[];
}

export const KpiAllocation = ({ wallets }: KpiAllocationProps) => (
    <div className="bg-card border shadow rounded-xl p-6 h-full">
        <h1 className="text-lg font-medium mb-4">KPI Alocação</h1>
        <div className="flex gap-4 mb-4">
            <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">Categoria</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm">Indexador</button>
            <button className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm">Gestorado</button>
        </div>

        <div className="space-y-3">
            {wallets.map((wallet, index) => (
                <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded ${index === 1 ? 'bg-orange-600' : 'bg-gray-700'
                        }`}
                >
                    <span className="text-sm">{wallet.assetClass}</span>
                    <div className="text-right">
                        <div className="text-sm font-medium">{wallet.percentage}%</div>
                        <div className="text-xs text-gray-400">
                            R$ {(wallet.currentValue / 1000).toLocaleString('pt-BR')}k
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);