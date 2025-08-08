"use client"

import {
    Ellipsis,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
} from '@/components/ui/avatar'
import {
    SidebarMenu,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useEffect, useState } from "react"
import { getCookie } from "@/lib/getCookie"
import { User } from "@/types/interface"
import axios from "axios"

export function NavUser() {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getCookie("token");
            if (!token) return;
            try {
                const response = await axios.get("http://localhost:4000/api/v1/auth/profile", {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="relative p-[1px] rounded-xl bg-gradient-to-r from-zinc-600 via-zinc-800 to-orange-800 hover:from-orange-400 transition-all duration-300">
                    <div className="flex items-center gap-2 bg-gradient-to-br from-zinc-900 to-zinc-800 p-3 rounded-xl hover:from-zinc-800 hover:to-zinc-700 transition-all duration-300">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg uppercase bg-gradient-to-br from-orange-500 to-red-600 text-white">
                                {user?.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium text-white">{user?.name}</span>
                            <span className="truncate text-xs  text-zinc-300">{user?.email}</span>
                        </div>
                        <Ellipsis className="ml-auto size-4 text-zinc-500" />
                    </div>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
