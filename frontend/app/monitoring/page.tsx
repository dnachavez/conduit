"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ActiveCallsCard } from "@/components/dashboard/monitoring/active-calls-card"

export default function Page() {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background md:m-2 md:ml-0 md:rounded-xl md:shadow-sm">
        <header className="flex h-16 shrink-0 items-center gap-2 bg-[#111] md:rounded-t-xl">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Overview
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Monitoring</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 bg-[#111] px-4 pb-4 pt-0 text-zinc-50 md:rounded-b-xl">
          <ActiveCallsCard />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

