'use client'

import SearchClient from "@/components/SearchClient";
import { getCookie } from "@/lib/getCookie";
import { ClientProps, EventProps, GoalProps, WalletProps } from "@/types/interface";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {

    const token = getCookie("token");
    const [clients, setClients] = useState<ClientProps[]>([]);
    const [clientGoals, setClientGoals] = useState<GoalProps[]>([]);
    const [clientWallet, setClientWallet] = useState<WalletProps[]>([]);
    const [clientEvents, setClientEvents] = useState<EventProps[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientProps | null>(null);

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

    useEffect(() => {
        const fetchClientGoals = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/clients/${selectedClient?.id}/goals`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setClientGoals(response.data?.data || []);
            } catch (error) {
                console.error("Error fetching client goals:", error);
                setClientGoals([]);
            }

        };
        fetchClientGoals();
    }, [selectedClient, token]);

    useEffect(() => {
        const fetchClientWallet = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/clients/${selectedClient?.id}/wallet`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setClientWallet(response.data?.data || []);
            } catch (error) {
                console.error("Error fetching client wallet:", error);
                setClientWallet([]);
            }

        };
        fetchClientWallet();
    }, [selectedClient, token]);

    useEffect(() => {
        const fetchClientEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/clients/${selectedClient?.id}/events`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setClientEvents(response.data?.data || []);
            } catch (error) {
                console.error("Error fetching client events:", error);
                setClientEvents([]);
            }

        };
        fetchClientEvents();
    }, [selectedClient, token]);

    const handleSelectClient = (clientId: string) => {
        const client = clients.find(c => c.id === clientId) || null;
        setSelectedClient(client);
    };

    return (
        <div className="min-h-screen w-full">
            <SearchClient
                onSelect={handleSelectClient}
                clients={clients}
                selectedClient={selectedClient ? selectedClient.id : ""}
                setSelectedClient={handleSelectClient}
            />
        </div>
    );
}

export default Dashboard;