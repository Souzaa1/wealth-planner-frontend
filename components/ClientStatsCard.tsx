import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Ellipsis } from "lucide-react";

interface StatItem {
    name: string;
    value: number;
    color: string;
}

interface ClientStatsCardProps {
    title: string;
    stats: StatItem[];
}

export const ClientStatsCard = ({ title, stats }: ClientStatsCardProps) => {
    return (
        <Card className="p-2 col-span-1">
            <CardHeader className="p-1">
                <div className="flex items-center justify-between">
                    <CardTitle>{title}</CardTitle>
                    <Ellipsis className="size-6 text-zinc-500" />
                </div>
            </CardHeader>
            <Separator className="my-4" />
            <CardContent>
                {stats.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 mb-4">
                        <div className="w-40 text-sm font-medium">{item.name}</div>
                        <div className="relative flex-1 h-12 rounded-full overflow-hidden bg-zinc-800">
                            <div
                                className={`h-full`}
                                style={{
                                    width: `${item.value}%`,
                                    background: item.color,
                                    boxShadow: `0 0 50px ${item.color}`,
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                                {item.value}%
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};