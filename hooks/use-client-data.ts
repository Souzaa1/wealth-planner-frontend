'use client'

import { Dispatch, SetStateAction, useEffect } from "react";
import axios from "axios";
import { ClientProps, EventProps, GoalProps, WalletProps } from "@/types/interface";
import { getCookie } from "@/lib/getCookie";

interface ClientDataFetcherProps {
    selectedClient: ClientProps | null;
    setClientGoals: Dispatch<SetStateAction<GoalProps[]>>;
    setClientWallet: Dispatch<SetStateAction<WalletProps[]>>;
    setClientEvents: Dispatch<SetStateAction<EventProps[]>>;
    setWalletSummary: Dispatch<SetStateAction<{ totalCurrentValue?: number; overallAlignment?: number; totalPatrimony?: number } | null>>;
    setEventsSummary: Dispatch<SetStateAction<{ totalCurrentValue?: number; overallAlignment?: number; totalPatrimony?: number } | null>>;
}

export const ClientDataFetcher = ({
    selectedClient,
    setClientGoals,
    setClientWallet,
    setClientEvents,
    setWalletSummary,
    setEventsSummary
}: ClientDataFetcherProps) => {
    const token = getCookie("token");

    useEffect(() => {
        if (!selectedClient) return;

        const fetchClientData = async () => {
            try {
                const goalsResponse = await axios.get(
                    `http://localhost:4000/api/v1/clients/${selectedClient.id}/goals`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setClientGoals(Array.isArray(goalsResponse.data?.data) ? goalsResponse.data.data : []);

                const walletResponse = await axios.get(
                    `http://localhost:4000/api/v1/clients/${selectedClient.id}/wallet`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setClientWallet(walletResponse.data?.data?.wallets || []);
                setWalletSummary(walletResponse.data?.data?.summary || null);

                const eventsResponse = await axios.get(
                    `http://localhost:4000/api/v1/clients/${selectedClient.id}/events`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setClientEvents(eventsResponse.data?.data?.events || []);
                setEventsSummary(eventsResponse.data?.data?.summary || null);
            } catch (error) {
                console.error("Error fetching client data:", error);
                setClientGoals([]);
                setClientWallet([]);
                setClientEvents([]);
                setWalletSummary(null);
                setEventsSummary(null);
            }
        };

        fetchClientData();
    }, [selectedClient, token, setClientGoals, setClientWallet, setClientEvents, setWalletSummary, setEventsSummary]);

    return null;
};