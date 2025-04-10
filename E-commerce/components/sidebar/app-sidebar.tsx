"use client"

import * as React from "react"
import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  ShoppingBag,
  ShoppingBasket,
  User 
} from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { NavProjects } from "./nav-projects"


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "JojoShop",
      logo: GalleryVerticalEnd,
      plan: "Administrateur",
    },
  ],
  navMain: [
    {
      title: "Gestion des utilisateurs",
      url: "/dashboard/utilisateurs",
      icon: User ,
      isActive: true,
      items: [
        {
          title: "Utilisateurs",
          url: "/dashboard/utilisateurs",
        },
      ],
      
    },
    {
      title: "Gestion des produits",
      url: "/dashboard/produits",
      icon: ShoppingBasket ,
      items: [
        {
          title: "Produits",
          url: "/dashboard/produits",
        },
      ],
    },
    {
      title: "Gestion des commandes",
      url: "/dashboard/commandes",
      icon: ShoppingBag ,
      items: [
        {
          title: "Commandes",
          url: "/dashboard/commandes",
        },
      ],
    },
    
   
  ],
  projects : [
     
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: Map,
      },
    ],
  
 
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
      <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
