export interface User {
    name: string;
    email: string;
    role: string;
    userId: string;
}

export interface ClientProps {
    id: string;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
    familyProfile: string;
    updatedAt: Date;
    createdAt: Date;
    goals: GoalProps[];
    wallets: WalletProps[];
    events: EventProps[];
    simulations: SimulationProps[];
    insurances: InsuranceProps[];
};

export interface GoalProps {
    id: string;
    clientId: string;
    type: string;
    description: string;
    targetValue: number;
    targetDate: Date;
    createdAt: Date;
    client: ClientProps;
};

export interface WalletProps {
    id: string;
    clientId: string;
    assetClass: string;
    percentage: number;
    currentValue: number;
    totalPatrimony: number;
    alignmentPercent: string;
    createdAt: Date;
    updatedAt: Date;
    client: ClientProps;
};

export interface EventProps {
    id: string;
    clientId: string;
    type: string;
    description: string;
    value: number;
    frequency: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
    client: ClientProps;
};

export interface SimulationProps {
    id: string;
    clientId: string;
    name: string;
    initialValue: number;
    interestRate: number;
    projectionYears: number;
    projectionDate: Date;
    createdAt: Date;
    updatedAt: Date;
    client: ClientProps;
};

export interface InsuranceProps {
    id: string;
    clientId: string;
    type: string;
    coverage: number;
    premium: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    client: ClientProps;
}