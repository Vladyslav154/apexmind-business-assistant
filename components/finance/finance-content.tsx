
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  Calculator,
  Bot,
  Download,
  Filter
} from 'lucide-react'
import { FinanceChart } from '@/components/finance/finance-chart'
import { TransactionsList } from '@/components/finance/transactions-list'
import { AddTransactionModal } from '@/components/finance/add-transaction-modal'

interface FinanceStats {
  totalIncome: number
  totalExpenses: number
  netProfit: number
  monthlyChange: number
}

export function FinanceContent() {
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [stats] = useState<FinanceStats>({
    totalIncome: 285000,
    totalExpenses: 186000,
    netProfit: 99000,
    monthlyChange: 8.5
  })

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
    icon: Icon, 
    isPositive,
    description 
  }: {
    title: string
    value: number
    change?: number
    icon: any
    isPositive?: boolean
    description: string
  }) => (
    <Card className="card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              isPositive ? 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400' : 
              isPositive === false ? 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400' : 
              'bg-secondary/20 text-secondary'
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold count-up">{formatCurrency(value)}</p>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          {change !== undefined && (
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
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Финансовая аналитика</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте доходами и расходами с помощью IA-аналитики
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button onClick={() => setShowAddTransaction(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить операцию
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="card-hover bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <Bot className="h-6 w-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">IA Рекомендации</h3>
              <p className="text-muted-foreground mb-4">
                Расходы на маркетинг выросли на 23% за месяц, но конверсия увеличилась на 18%. 
                Рекомендуется оптимизировать бюджет и перераспределить средства на более эффективные каналы.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Подробный анализ
                </Button>
                <Button variant="ghost" size="sm">
                  Настроить уведомления
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Общий доход"
          value={stats.totalIncome}
          change={stats.monthlyChange}
          icon={TrendingUp}
          isPositive={true}
          description="за текущий месяц"
        />
        <StatCard
          title="Общие расходы"
          value={stats.totalExpenses}
          change={-3.2}
          icon={TrendingDown}
          isPositive={false}
          description="за текущий месяц"
        />
        <StatCard
          title="Чистая прибыль"
          value={stats.netProfit}
          change={15.8}
          icon={DollarSign}
          isPositive={true}
          description="маржа 34.7%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              Динамика доходов и расходов
            </CardTitle>
            <CardDescription>
              Сравнение доходов и расходов за последние 12 месяцев
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FinanceChart type="cashflow" />
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-secondary" />
              Структура расходов
            </CardTitle>
            <CardDescription>
              Распределение расходов по категориям
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FinanceChart type="expenses" />
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Score */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-secondary" />
            Финансовое здоровье бизнеса
          </CardTitle>
          <CardDescription>
            IA оценка финансового состояния компании
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                    fill="none"
                    stroke="#1ABC9C"
                    strokeWidth="2"
                    strokeDasharray="85, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-secondary">85</span>
                </div>
              </div>
              <p className="text-sm font-medium">Общий рейтинг</p>
              <Badge variant="secondary" className="mt-1">Отличный</Badge>
            </div>

            <div>
              <h4 className="font-medium mb-3">Ключевые показатели</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Рентабельность</span>
                  <span className="text-green-600 font-medium">34.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ликвидность</span>
                  <span className="text-green-600 font-medium">Высокая</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Рост выручки</span>
                  <span className="text-green-600 font-medium">+8.5%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Прогноз</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Следующий месяц</span>
                  <span className="text-green-600 font-medium">+12%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Квартал</span>
                  <span className="text-green-600 font-medium">+28%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Год</span>
                  <span className="text-blue-600 font-medium">+45%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Рекомендации</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Увеличить резервы</li>
                <li>• Оптимизировать налоги</li>
                <li>• Инвестировать в рост</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Последние операции</CardTitle>
              <CardDescription>
                История финансовых операций с автоматической категоризацией
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Фильтры
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <TransactionsList />
        </CardContent>
      </Card>

      {/* Add Transaction Modal */}
      {showAddTransaction && (
        <AddTransactionModal 
          onClose={() => setShowAddTransaction(false)}
        />
      )}
    </div>
  )
}
