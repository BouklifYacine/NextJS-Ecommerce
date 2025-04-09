
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="container mx-auto ">
        <AppSidebar />
        <main >
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}