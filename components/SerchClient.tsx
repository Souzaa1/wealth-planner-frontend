'use client'

import { ClientProps } from "@/types/interface";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface SearchClientProps {
    onSelect: (clientId: string) => void;
    clients: ClientProps[];
    selectedClient: string;
    setSelectedClient: (clientId: string) => void;
}

const SearchClient = ({ onSelect, clients, selectedClient, setSelectedClient }: SearchClientProps) => {

    return (
        <div className="w-full max-w-xs">
            {clients.length === 0 ? (
                <div className="text-sm text-muted-foreground p-2">Nenhum cliente encontrado</div>
            ) : (
                <Select
                    value={selectedClient}
                    onValueChange={(value) => {
                        setSelectedClient(value);
                        onSelect(value);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione um cliente" />
                    </SelectTrigger>
                    <SelectContent>
                        {clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                                {client.name} ({client.email})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        </div>
    );
}

export default SearchClient;