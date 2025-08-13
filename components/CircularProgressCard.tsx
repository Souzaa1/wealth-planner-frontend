interface CircularProgressCardProps {
    title: string;
    value: string;
    subtitle: string;
    progress: number;
    color: 'emerald' | 'blue';
}

export const CircularProgressCard = ({
    title,
    value,
    subtitle,
    progress,
    color
}: CircularProgressCardProps) => {
    const colors = {
        emerald: '#10B981',
        blue: '#3B82F6'
    };

    return (
        <div className="bg-card border shadow rounded-xl p-6 h-full">
            <h1 className="text-lg font-medium mb-4">{title}</h1>
            <div className="flex items-center h-auto w-full gap-6 justify-center" >
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                    <defs>
                        <filter id="circle-shadow" x="-60%" y="-60%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color={colors[color]} flood-opacity="10" />
                        </filter>
                    </defs>
                    <circle cx="50" cy="50" r="45" stroke="#374151" strokeWidth="8" fill="none" />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke={colors[color]}
                        strokeWidth="8"
                        strokeDasharray={`${progress * 2.827} ${100 * 2.827}`}
                        strokeLinecap="round"
                        fill="none"
                        filter="url(#circle-shadow)"
                    />
                </svg>
                <div className="flex flex-col">
                    <span className={`text-2xl font-bold ${color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'
                        }`}>
                        {progress.toFixed(0)}%
                    </span>
                    <div className={`text-3xl font-bold mb-2 ${color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'
                        }`}>
                        {value}
                    </div>
                    <div className="text-sm text-gray-400 mb-4">{subtitle}</div>
                </div>
            </div>
        </div>
    );
};