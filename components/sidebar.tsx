
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  FileText, 
  DollarSign, 
  Calendar, 
  Megaphone, 
  Settings,
  Menu,
  X,
  Bot,
  BarChart3,
  Zap,
  FolderOpen
} from 'lucide-react'
import { TrialStatus } from './trial-status'

const navigation = [
  { name: 'Главная', href: '/', icon: Home },
  { name: 'Дашборд', href: '/dashboard', icon: BarChart3 },
  { name: 'File Manager', href: '/file-manager', icon: FolderOpen },
  { name: 'Документы', href: '/documents', icon: FileText },
  { name: 'Финансы', href: '/finance', icon: DollarSign },
  { name: 'Календарь', href: '/calendar', icon: Calendar },
  { name: 'Маркетинг', href: '/marketing', icon: Megaphone },
  { name: 'Интеграции', href: '/integrations', icon: Zap },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full bg-primary text-primary-foreground transition-all duration-300 lg:relative lg:z-auto",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-primary-foreground/20">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Bot className="h-8 w-8 text-secondary" />
              <span className="text-lg font-bold">ApexMind</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-primary-foreground hover:bg-primary-foreground/20 lg:hidden"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground",
                    isActive && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                    isCollapsed && "px-2"
                  )}
                >
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                  {!isCollapsed && item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Trial Status */}
        {!isCollapsed && (
          <div className="p-2">
            <TrialStatus />
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-primary-foreground/20 p-2">
          <Link href="/settings">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground",
                isCollapsed && "px-2"
              )}
            >
              <Settings className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && 'Настройки'}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
