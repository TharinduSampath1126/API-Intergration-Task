import { Home, Inbox, X } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Users",
    url: "#",
    icon: Home,
  },
  {
    title: "Newly added users",
    url: "#",
    icon: Inbox,
  },
]

export function AppSidebar() {
  const { isMobile, setOpen, setOpenMobile } = useSidebar()

  const handleClose = () => {
    if (isMobile) setOpenMobile(false)
    else setOpen(false)
  }

  return (
    <Sidebar>
      <SidebarContent>
        <div className="flex items-center justify-between p-2">
          <SidebarGroupLabel>API Integration Task</SidebarGroupLabel>
          <button
            aria-label="Close sidebar"
            onClick={handleClose}
            className="rounded-md p-1 hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}