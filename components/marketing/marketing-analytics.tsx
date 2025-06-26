
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  TrendingDown,
  Eye,
  Target,
  Users,
  DollarSign,
  BarChart3,
  PieChart
} from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts'

const performanceData = [
  { month: 'Авг', impressions: 12000, clicks: 480, conversions: 24 },
  { month: 'Сен', impressions: 15000, clicks: 675, conversions: 32 },
  { month: 'Окт', impressions: 18000, clicks: 810, conversions: 41 },
  { month: 'Ноя', impressions: 22000, clicks: 1100, conversions: 55 },
  { month: 'Дек', impressions: 28000, clicks: 1400, conversions: 78 },
]

const channelData = [
  { name: 'Email Marketing', value: 35, color: '#60B5FF', conversions: 45 },
  { name: 'Social Media', value: 28, color: '#FF9149', conversions: 32 },
  { name: 'Content Marketing', value: 20, color: '#FF9898', conversions: 28 },
  { name: 'PPC Advertising', value: 12, color: '#80D8C3', conversions: 15 },
  { name: 'SEO', value: 5, color: '#A19AD3', conversions: 8 },
]

const campaignPerformance = [
  { name: 'Автоматизация бизнеса', budget: 50000, spent: 23500, conversions: 34, roi: 240 },
  { name: 'Email воронка', budget: 25000, spent: 12300, conversions: 67, roi: 420 },
  { name: 'PPC реклама', budget: 75000, spent: 68200, conversions: 28, roi: 180 },
  { name: 'Контент план', budget: 30000, spent: 18400, conversions: 41, roi: 320 },
]

export function MarketingAnalytics() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const totalBudget = campaignPerformance.reduce((sum, campaign) => sum + campaign.budget, 0)
  const totalSpent = campaignPerformance.reduce((sum, campaign) => sum + campaign.spent, 0)
  const totalConversions = campaignPerformance.reduce((sum, campaign) => sum + campaign.conversions, 0)
  const avgROI = campaignPerformance.reduce((sum, campaign) => sum + campaign.roi, 0) / campaignPerformance.length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Общий бюджет</p>
                <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Потрачено {formatCurrency(totalSpent)}
                </p>
              </div>
              <div className="p-2 bg-secondary/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Конверсии</p>
                <p className="text-2xl font-bold">{totalConversions}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+18.5%</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded-lg dark:bg-green-950">
                <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Средний ROI</p>
                <p className="text-2xl font-bold">{avgROI.toFixed(0)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+12.3%</span>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-950">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Охват</p>
                <p className="text-2xl font-bold">85.2K</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+24.1%</span>
                </div>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg dark:bg-purple-950">
                <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-secondary" />
              Динамика эффективности
            </CardTitle>
            <CardDescription>
              Показы, клики и конверсии за последние 5 месяцев
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    stroke="#64748b"
                  />
                  <YAxis 
                    tickLine={false}
                    tick={{ fontSize: 10 }}
                    stroke="#64748b"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '11px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="#60B5FF" 
                    strokeWidth={2}
                    name="Показы"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#FF9149" 
                    strokeWidth={2}
                    name="Клики"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#1ABC9C" 
                    strokeWidth={3}
                    name="Конверсии"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-secondary" />
              Эффективность каналов
            </CardTitle>
            <CardDescription>
              Распределение конверсий по маркетинговым каналам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="conversions"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '11px'
                    }}
                    formatter={(value, name) => [`${value} конверсий`, name]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Эффективность кампаний</CardTitle>
          <CardDescription>
            Детальная аналитика по активным маркетинговым кампаниям
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignPerformance.map((campaign, index) => (
              <div key={index} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{campaign.name}</h4>
                  <Badge variant="secondary">
                    ROI: {campaign.roi}%
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Бюджет</p>
                    <p className="text-sm font-medium">{formatCurrency(campaign.budget)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Потрачено</p>
                    <p className="text-sm font-medium">{formatCurrency(campaign.spent)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Конверсии</p>
                    <p className="text-sm font-medium">{campaign.conversions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">CPC</p>
                    <p className="text-sm font-medium">
                      {formatCurrency(campaign.spent / campaign.conversions)}
                    </p>
                  </div>
                </div>

                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{ 
                      width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
