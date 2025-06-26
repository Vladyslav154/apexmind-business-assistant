
'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Play, 
  Pause, 
  Eye, 
  Edit,
  MoreVertical,
  Calendar,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Campaign {
  id: string
  name: string
  description: string
  type: 'EMAIL' | 'SOCIAL_MEDIA' | 'BLOG' | 'PPC' | 'SEO'
  status: 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED'
  budget?: number
  spent?: number
  startDate: string
  endDate?: string
  metrics: {
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    cost_per_conversion: number
  }
  platform: string[]
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Автоматизация для малого бизнеса',
    description: 'Контент-кампания о преимуществах автоматизации процессов',
    type: 'BLOG',
    status: 'ACTIVE',
    budget: 50000,
    spent: 23500,
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    metrics: {
      impressions: 15400,
      clicks: 892,
      conversions: 34,
      ctr: 5.8,
      cost_per_conversion: 691
    },
    platform: ['LinkedIn', 'Facebook', 'Telegram']
  },
  {
    id: '2',
    name: 'Email-воронка для новых клиентов',
    description: 'Серия писем для nurturing и конверсии лидов',
    type: 'EMAIL',
    status: 'ACTIVE',
    budget: 25000,
    spent: 12300,
    startDate: '2024-11-15',
    metrics: {
      impressions: 8900,
      clicks: 1420,
      conversions: 67,
      ctr: 15.9,
      cost_per_conversion: 184
    },
    platform: ['Email']
  },
  {
    id: '3',
    name: 'PPC реклама ApexMind',
    description: 'Контекстная реклама для привлечения B2B клиентов',
    type: 'PPC',
    status: 'PAUSED',
    budget: 75000,
    spent: 68200,
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    metrics: {
      impressions: 42300,
      clicks: 1680,
      conversions: 28,
      ctr: 4.0,
      cost_per_conversion: 2436
    },
    platform: ['Google Ads', 'Yandex Direct']
  }
]

export function CampaignsList() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
      case 'PAUSED': return 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
      case 'COMPLETED': return 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
      case 'DRAFT': return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Активна'
      case 'PAUSED': return 'Приостановлена'
      case 'COMPLETED': return 'Завершена'
      case 'DRAFT': return 'Черновик'
      default: return status
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'EMAIL': return 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
      case 'SOCIAL_MEDIA': return 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
      case 'BLOG': return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
      case 'PPC': return 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
      case 'SEO': return 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="card-hover">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <Badge className={getStatusColor(campaign.status)}>
                    {getStatusText(campaign.status)}
                  </Badge>
                  <Badge className={getTypeColor(campaign.type)}>
                    {campaign.type}
                  </Badge>
                </div>
                <CardDescription className="text-sm">
                  {campaign.description}
                </CardDescription>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(campaign.startDate)}
                    {campaign.endDate && ` - ${formatDate(campaign.endDate)}`}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    {campaign.platform.join(', ')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {campaign.status === 'ACTIVE' && (
                  <Button variant="outline" size="sm">
                    <Pause className="h-4 w-4 mr-1" />
                    Пауза
                  </Button>
                )}
                {campaign.status === 'PAUSED' && (
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Запустить
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Подробности
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Редактировать
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Аналитика
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Budget and Spend */}
            {campaign.budget && (
              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Бюджет</span>
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(campaign.spent || 0)} / {formatCurrency(campaign.budget)}
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full transition-all"
                    style={{ 
                      width: `${Math.min(((campaign.spent || 0) / campaign.budget) * 100, 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Показы</span>
                </div>
                <p className="text-lg font-semibold">
                  {campaign.metrics.impressions.toLocaleString()}
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Клики</span>
                </div>
                <p className="text-lg font-semibold">
                  {campaign.metrics.clicks.toLocaleString()}
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">CTR</span>
                </div>
                <p className="text-lg font-semibold text-green-600">
                  {campaign.metrics.ctr}%
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Конверсии</span>
                </div>
                <p className="text-lg font-semibold text-secondary">
                  {campaign.metrics.conversions}
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">CPC</span>
                </div>
                <p className="text-lg font-semibold">
                  {formatCurrency(campaign.metrics.cost_per_conversion)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {campaigns.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Кампаний пока нет
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Создайте первую маркетинговую кампанию для продвижения вашего бизнеса
          </p>
          <Button>
            Создать кампанию
          </Button>
        </div>
      )}
    </div>
  )
}
