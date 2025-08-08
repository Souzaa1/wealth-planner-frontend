"use client"

import * as React from "react"
import {
    BrickWall,
    ChartLine,
    ClockFading,
    HandCoins,
    Landmark,
    LayoutDashboard,
    Table2,
    User,
    UserPlus,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from '@/components/ui/sidebar'
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Image from "next/image"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            url: "#",
            title: "Clientes",
            isActive: true,
            icon: User,
            items: [
                {
                    title: "Dashboard",
                    icon: LayoutDashboard,
                    isActive: true,
                    url: "#",
                },
                {
                    title: "Projeção",
                    url: "#",
                    icon: ChartLine,
                },
                {
                    title: "Histórico",
                    url: "#",
                    icon: ClockFading,
                }
            ]
        },
        {
            url: "#",
            title: "Prospects",
            icon: UserPlus,
            items: [

            ]
        },
        {
            title: "Consolidação",
            url: "#",
            icon: BrickWall,
            items: [

            ]
        },
        {
            title: "CRM",
            url: "#",
            icon: Table2,
            items: [

            ]
        },
        {
            title: "Capacitação",
            url: "#",
            icon: Landmark,
            items: [

            ]
        },
        {
            title: "Financeiro",
            url: "#",
            icon: HandCoins,
            items: [
            ]
        }
    ]
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div className='w-full flex items-center justify-center'>
                    <div className='flex items-center justify-center border border-orange-700 w-32 h-10 rounded-3xl bg-gradient-to-br from-[#F9151569] to-[#D3A23721] mb-4 shadow-lg'>
                        <Image
                            src='/logo.png'
                            alt='Logo'
                            width={80}
                            height={80}
                            quality={100}
                        />
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="overflow-y-auto p-4">
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
