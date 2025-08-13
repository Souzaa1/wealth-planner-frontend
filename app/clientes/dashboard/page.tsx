'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import SearchClient from "@/components/SearchClient";
import { getCookie } from "@/lib/getCookie";
import { ClientProps, EventProps, GoalProps, WalletProps } from "@/types/interface";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClientDataFetcher } from "@/hooks/use-client-data";
import { TotalAllocationCard } from "@/components/TotalAllocationCard";
import { AssetCard } from "@/components/AssetCard";
import { IndicatorCard } from "@/components/IndicatorCard";
import { CircularProgressCard } from "@/components/CircularProgressCard";
import { AllocationComparison } from "@/components/AllocationComparison";
import { KpiAllocation } from "@/components/KpiAllocation";
import { PatrimonyOverview } from "@/components/PatrimonyOverview";
import { LiquidityKpi } from "@/components/LiquidityKpi";


const Dashboard = () => {
    const token = getCookie("token");
    const [clients, setClients] = useState<ClientProps[]>([]);
    const [clientGoals, setClientGoals] = useState<GoalProps[]>([]);
    const [clientWallet, setClientWallet] = useState<WalletProps[]>([]);
    const [clientEvents, setClientEvents] = useState<EventProps[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientProps | null>(null);
    const [walletSummary, setWalletSummary] = useState<{ totalCurrentValue?: number; overallAlignment?: number; totalPatrimony?: number } | null>(null);
    const [eventsSummary, setEventsSummary] = useState<{ totalCurrentValue?: number; overallAlignment?: number; totalPatrimony?: number; totalInvestments?: number; totalIncome?: number; totalExpenses?: number } | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/clients",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                setClients(response.data?.data || []);
            } catch (error) {
                console.error("Error fetching clients:", error);
                setClients([]);
            }
        };
        fetchClients();
    }, [token]);

    const handleSelectClient = (clientId: string) => {
        const client = clients.find(c => c.id === clientId) || null;
        setSelectedClient(client);
    };

    const prepareGoalsChartData = () => {
        if (!clientGoals.length) return [];

        const goalsByType: Record<string, number> = {};
        clientGoals.forEach(goal => {
            if (!goalsByType[goal.type]) {
                goalsByType[goal.type] = 0;
            }
            goalsByType[goal.type] += goal.targetValue;
        });

        return Object.entries(goalsByType).map(([type, value]) => ({
            name: type,
            value: value / 100000
        }));
    };

    const prepareWalletChartData = () => {
        if (!clientWallet.length) return [];

        return clientWallet.map(wallet => ({
            month: wallet.assetClass,
            value: wallet.currentValue / 1000
        }));
    };

    const getRetirementAge = () => {
        const retirementGoal = clientGoals?.find(goal => goal.type === "RETIREMENT");
        if (!retirementGoal) return "N/A";

        const targetDate = new Date(retirementGoal.targetDate);
        const birthYear = new Date().getFullYear() - (selectedClient?.age || 0);
        const retirementYear = targetDate.getFullYear();
        return retirementYear - birthYear;
    };

    const totalAllocated = walletSummary?.totalCurrentValue || 0;

    return (
        <div className="min-h-screen w-full p-4">
            <SearchClient
                onSelect={handleSelectClient}
                clients={clients}
                selectedClient={selectedClient ? selectedClient.id : ""}
                setSelectedClient={handleSelectClient}
            />

            <ClientDataFetcher
                selectedClient={selectedClient}
                setClientGoals={setClientGoals}
                setClientWallet={setClientWallet}
                setClientEvents={setClientEvents}
                setWalletSummary={setWalletSummary}
                setEventsSummary={setEventsSummary}
            />

            {selectedClient && (
                <>
                    <TotalAllocationCard
                        totalAllocated={totalAllocated}
                        alignmentPercent={walletSummary?.overallAlignment}
                    />

                    <div className="grid grid-cols-12 gap-2 h-full py-2">
                        <Card className="col-span-12 p-6">
                            <p className="text-gray-400 text-sm mt-2">
                                Data da Alocação: {new Date().toLocaleDateString('pt-BR')}
                            </p>
                            <h3 className="text-lg font-medium mb-4">Financeiras</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {clientWallet.slice(0, 3).map((wallet, index) => (
                                    <AssetCard
                                        key={index}
                                        type="financial"
                                        assetClass={wallet.assetClass}
                                        currentValue={wallet.currentValue}
                                        alignmentPercent={parseFloat(wallet.alignmentPercent)}
                                    />
                                ))}
                            </div>

                            <div className="col-span-6">
                                <h3 className="text-lg font-medium mb-4">Imobilizadas</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {clientWallet.slice(3, 5).length > 0 ? (
                                        clientWallet.slice(3, 5).map((wallet, index) => (
                                            <AssetCard
                                                key={index}
                                                type="immobilized"
                                                assetClass={wallet.assetClass}
                                                currentValue={wallet.currentValue}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-2 text-gray-400 text-sm">
                                            Nenhum ativo imobilizado encontrado
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>

                        <h3 className="text-lg font-medium col-span-12">Indicadores</h3>

                        <div className="col-span-4 flex-1">
                            <IndicatorCard
                                retirementAge={getRetirementAge()}
                                desiredIncome={eventsSummary?.totalCurrentValue}
                                targetYield={walletSummary?.overallAlignment}
                            />
                        </div>

                        <div className="col-span-2 flex-1">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>PGBL</CardTitle>
                                </CardHeader>
                                <CardContent className="mb-2">
                                    <h1 className="text-3xl font-bold text-emerald-500 text-center">{`R$ ${walletSummary ? ((walletSummary.totalPatrimony ?? 0) / 10000).toLocaleString('pt-BR') : '0'}`}</h1>
                                </CardContent>

                                <CardFooter className="text-sm text-gray-400">
                                    Aporte anual: +R${eventsSummary?.totalInvestments
                                        ? (eventsSummary.totalInvestments * 12 / 1000).toLocaleString('pt-BR')
                                        : '0'
                                    }k
                                </CardFooter>
                            </Card>
                        </div>

                        <div className="col-span-4 flex-1">
                            
                            <CircularProgressCard
                                title="Meta Aportes"
                                value={`R$ ${walletSummary ? ((walletSummary.totalPatrimony ?? 0) / 10000).toLocaleString('pt-BR') : '0'}`}
                                subtitle={`Aporte anual: +R$${eventsSummary?.totalInvestments
                                    ? (eventsSummary.totalInvestments * 12 / 1000).toLocaleString('pt-BR')
                                    : '0'
                                    }k`}
                                progress={walletSummary?.overallAlignment || 0}
                                color="emerald"
                            />
                        </div>

                        <div className="col-span-2 flex-1 h-full">
                            <PatrimonyOverview
                                data={prepareGoalsChartData()}
                                alignmentPercent={walletSummary?.overallAlignment || 0}
                            />
                        </div>

                        <div className="col-span-6 flex-1">
                            <AllocationComparison
                                allocations={clientWallet.slice(0, 5)}
                                alignmentPercent={walletSummary?.overallAlignment || 0}
                                profile={selectedClient?.familyProfile}
                            />
                        </div>

                        <div className="col-span-4 flex-1">
                            <CircularProgressCard
                                title="Meta Rendimento"
                                value={`R$ ${walletSummary ? ((walletSummary.totalCurrentValue ?? 0) / 1000).toLocaleString('pt-BR') : '0'}k`}
                                subtitle={`R$ ${walletSummary ? ((walletSummary.totalPatrimony ?? 0) / 1000).toLocaleString('pt-BR') : '0'}k`}
                                progress={walletSummary?.overallAlignment || 0}
                                color="blue"
                            />
                        </div>



                        <div className="col-span-6 flex-1">
                            <KpiAllocation wallets={clientWallet.slice(0, 3)} />
                        </div>



                        <div className="col-span-4 flex-1">
                            <LiquidityKpi
                                data={prepareWalletChartData()}
                                totalValue={walletSummary ? ((walletSummary.totalCurrentValue ?? 0) / 1000) : 0}
                                totalIncome={(eventsSummary?.totalIncome ?? 0) / 1000}
                                totalExpenses={(eventsSummary?.totalExpenses ?? 0) / 1000}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;