
'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Target, 
  Calendar,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart
} from 'lucide-react'
import { MetricsChart } from '@/components/dashboard/metrics-chart'
import { RecommendationsList } from '@/components/dashboard/recommendations-list'
import { RecentFiles } from '@/components/dashboard/recent-files'

interface DashboardStats {
  revenue: { value: number; change: number; period: string }
  customers: { value: number; change: number; period: string }
  conversion: { value: number; change: number; period: string }
  tasks: { completed: number; total: number; urgent: number }
  files: { total: number; analyzed: number; recent: number }
}

export function DashboardContent() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DashboardStats>({
    revenue: { value: 45280, change: 12.5, period: 'за месяц' },
    customers: { value: 1247, change: 8.2, period: 'за месяц' },
    conversion: { value: 3.8, change: -2.1, period: 'за неделю' },
    tasks: { completed: 24, total: 31, urgent: 3 },
    files: { total: 0, analyzed: 0, recent: 0 }
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [session])

  const loadDashboardData = async () => {
    try {
      if (session?.user?.email) {
        // Load file statistics
        const filesResponse = await fetch('/api/files/stats')
        if (filesResponse.ok) {
          const fileStats = await filesResponse.json()
          setStats(prev => ({
            ...prev,
            files: fileStats
          }))
        }
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      // Симуляция загрузки данных
      const timer = setTimeout(() => setIsLoading(false), 1000)
      return () => clearTimeout(timer)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    period, 
    icon: Icon, 
    formatter = (val: number) => val.toString() 
  }: {
    title: string
    value: number
    change: number
    period: string
    icon: any
    formatter?: (val: number) => string
  }) => (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Icon className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold count-up">{formatter(value)}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-1 ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {Math.abs(change)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{period}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Добро пожаловать, {session?.user?.name?.split(' ')[0] || 'Пользователь'}! 👋
        </h1>
        <p className="text-muted-foreground">
          Вот обзор вашего бизнеса на {new Date().toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Выручка"
          value={stats.revenue.value}
          change={stats.revenue.change}
          period={stats.revenue.period}
          icon={DollarSign}
          formatter={formatCurrency}
        />
        <StatCard
          title="Клиенты"
          value={stats.customers.value}
          change={stats.customers.change}
          period={stats.customers.period}
          icon={Users}
        />
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <FileText className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Файлы</p>
                  <p className="text-2xl font-bold count-up">
                    {stats.files.total}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {stats.files.analyzed} проанализированы
                </Badge>
                <p className="text-xs text-muted-foreground">всего загружено</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Задачи</p>
                  <p className="text-2xl font-bold count-up">
                    {stats.tasks.completed}/{stats.tasks.total}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {stats.tasks.urgent > 0 && (
                  <Badge variant="destructive" className="mb-1">
                    {stats.tasks.urgent} срочных
                  </Badge>
                )}
                <p className="text-xs text-muted-foreground">на сегодня</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              Динамика продаж
            </CardTitle>
            <CardDescription>
              Выручка и количество заказов за последние 30 дней
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetricsChart type="revenue" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-secondary" />
              Источники трафика
            </CardTitle>
            <CardDescription>
              Распределение посетителей по каналам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MetricsChart type="traffic" />
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-secondary" />
            Рекомендации от ApexMind AI
          </CardTitle>
          <CardDescription>
            Персонализированные советы для роста вашего бизнеса
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecommendationsList />
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-secondary" />
              Недавние файлы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentFiles />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              Ближайшие задачи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: 'Звонок клиенту по проекту', priority: 'HIGH', time: 'через 30 мин' },
                { task: 'Подготовить презентацию', priority: 'MEDIUM', time: 'сегодня 16:00' },
                { task: 'Встреча с командой', priority: 'LOW', time: 'завтра 10:00' }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      task.priority === 'HIGH' ? 'bg-red-500' :
                      task.priority === 'MEDIUM' ? 'bg-blue-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium">{task.task}</p>
                      <p className="text-xs text-muted-foreground">{task.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Посмотреть календарь
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
