
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Plus, 
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Bot,
  RefreshCw,
  ExternalLink,
  Shield,
  Calendar,
  Cloud
} from 'lucide-react'

interface Integration {
  id: string
  service: string
  name: string
  description: string
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'EXPIRED'
  category: 'STORAGE' | 'ANALYTICS' | 'COMMUNICATION' | 'PRODUCTIVITY' | 'FINANCE'
  icon: string
  features: string[]
  lastSync?: string
  isPopular?: boolean
  isPremium?: boolean
}

const availableIntegrations: Integration[] = [
  {
    id: '1',
    service: 'GOOGLE_DRIVE',
    name: 'Google Drive',
    description: 'Синхронизация документов и автоматическое резервное копирование',
    status: 'ACTIVE',
    category: 'STORAGE',
    icon: '☁️',
    features: ['Автозагрузка документов', 'Синхронизация в реальном времени', 'Резервное копирование'],
    lastSync: '2024-12-25T14:30:00Z',
    isPopular: true
  },
  {
    id: '2',
    service: 'GOOGLE_ANALYTICS',
    name: 'Google Analytics',
    description: 'Импорт данных веб-аналитики для маркетинговых отчетов',
    status: 'ACTIVE',
    category: 'ANALYTICS',
    icon: '📊',
    features: ['Импорт метрик', 'Автоматические отчеты', 'Прогнозная аналитика'],
    lastSync: '2024-12-25T12:15:00Z',
    isPopular: true
  },
  {
    id: '3',
    service: 'SLACK',
    name: 'Slack',
    description: 'Уведомления и интеграция с рабочими каналами команды',
    status: 'INACTIVE',
    category: 'COMMUNICATION',
    icon: '💬',
    features: ['Push-уведомления', 'Автоотчеты в каналы', 'Командные дашборды'],
    isPopular: true
  },
  {
    id: '4',
    service: 'DROPBOX',
    name: 'Dropbox',
    description: 'Облачное хранилище для документов и медиафайлов',
    status: 'INACTIVE',
    category: 'STORAGE',
    icon: '📦',
    features: ['Облачное хранение', 'Автоматическая синхронизация', 'Версионирование файлов']
  },
  {
    id: '5',
    service: 'STRIPE',
    name: 'Stripe',
    description: 'Синхронизация платежных данных и финансовой отчетности',
    status: 'ERROR',
    category: 'FINANCE',
    icon: '💳',
    features: ['Импорт транзакций', 'Автоматическая сверка', 'Финансовые уведомления'],
    isPremium: true
  },
  {
    id: '6',
    service: 'CALENDLY',
    name: 'Calendly',
    description: 'Интеграция с системой онлайн-бронирования встреч',
    status: 'INACTIVE',
    category: 'PRODUCTIVITY',
    icon: '📅',
    features: ['Автосинхронизация встреч', 'Уведомления о бронированиях', 'Аналитика встреч']
  },
  {
    id: '7',
    service: 'HUBSPOT',
    name: 'HubSpot',
    description: 'CRM интеграция для управления клиентами и сделками',
    status: 'INACTIVE',
    category: 'PRODUCTIVITY',
    icon: '🏢',
    features: ['Синхронизация контактов', 'Импорт сделок', 'Автоматизация воронки продаж'],
    isPremium: true
  },
  {
    id: '8',
    service: 'ONEDRIVE',
    name: 'OneDrive',
    description: 'Интеграция с облачным хранилищем Microsoft',
    status: 'INACTIVE',
    category: 'STORAGE',
    icon: '☁️',
    features: ['Облачная синхронизация', 'Office 365 интеграция', 'Совместная работа']
  }
]

export function IntegrationsContent() {
  const [integrations, setIntegrations] = useState<Integration[]>(availableIntegrations)
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const categories = [
    { id: 'all', label: 'Все', count: integrations.length },
    { id: 'STORAGE', label: 'Хранилище', count: integrations.filter(i => i.category === 'STORAGE').length },
    { id: 'ANALYTICS', label: 'Аналитика', count: integrations.filter(i => i.category === 'ANALYTICS').length },
    { id: 'COMMUNICATION', label: 'Коммуникации', count: integrations.filter(i => i.category === 'COMMUNICATION').length },
    { id: 'PRODUCTIVITY', label: 'Продуктивность', count: integrations.filter(i => i.category === 'PRODUCTIVITY').length },
    { id: 'FINANCE', label: 'Финансы', count: integrations.filter(i => i.category === 'FINANCE').length }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'ERROR': return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'EXPIRED': return <Clock className="h-4 w-4 text-orange-600" />
      default: return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
      case 'ERROR': return 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
      case 'EXPIRED': return 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'Подключено'
      case 'ERROR': return 'Ошибка'
      case 'EXPIRED': return 'Истекло'
      case 'INACTIVE': return 'Не подключено'
      default: return status
    }
  }

  const handleToggleIntegration = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: integration.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
              lastSync: integration.status === 'INACTIVE' ? new Date().toISOString() : integration.lastSync
            }
          : integration
      )
    )
  }

  const formatLastSync = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredIntegrations = integrations.filter(integration => {
    if (filter === 'active') return integration.status === 'ACTIVE'
    if (filter === 'inactive') return integration.status !== 'ACTIVE'
    return true
  })

  const activeIntegrations = integrations.filter(i => i.status === 'ACTIVE').length

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Интеграции</h1>
          <p className="text-muted-foreground mt-2">
            Подключите внешние сервисы для автоматизации рабочих процессов
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            API документация
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Добавить интеграцию
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
              <h3 className="font-semibold text-lg mb-2">IA Рекомендации по интеграциям</h3>
              <p className="text-muted-foreground mb-4">
                Подключите Google Analytics для автоматического импорта метрик веб-сайта. 
                Также рекомендую интеграцию со Slack для получения уведомлений о важных событиях.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Применить рекомендации
                </Button>
                <Button variant="ghost" size="sm">
                  Настроить автоматизацию
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/20 rounded-lg">
                <Zap className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активные</p>
                <p className="text-2xl font-bold">{activeIntegrations}</p>
                <p className="text-xs text-muted-foreground">из {integrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg dark:bg-green-950">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Работают</p>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'ACTIVE').length}</p>
                <p className="text-xs text-muted-foreground">без ошибок</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-950">
                <Cloud className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Синхронизация</p>
                <p className="text-2xl font-bold">2.3GB</p>
                <p className="text-xs text-muted-foreground">за сегодня</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg dark:bg-purple-950">
                <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Безопасность</p>
                <p className="text-2xl font-bold">100%</p>
                <p className="text-xs text-muted-foreground">SSL защита</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {[
            { id: 'all', label: 'Все' },
            { id: 'active', label: 'Активные' },
            { id: 'inactive', label: 'Неактивные' }
          ].map((filterOption) => (
            <Button
              key={filterOption.id}
              variant={filter === filterOption.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(filterOption.id as any)}
              className="text-xs"
            >
              {filterOption.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category.id} variant="outline" className="text-xs">
              {category.label} ({category.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} className="card-hover group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{integration.name}</CardTitle>
                      {integration.isPopular && (
                        <Badge variant="secondary" className="text-xs">Популярно</Badge>
                      )}
                      {integration.isPremium && (
                        <Badge variant="outline" className="text-xs">Premium</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(integration.status)}
                      <Badge className={getStatusColor(integration.status)}>
                        {getStatusText(integration.status)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {integration.description}
              </CardDescription>

              {/* Features */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Возможности:</p>
                <ul className="space-y-1">
                  {integration.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Last Sync */}
              {integration.lastSync && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <RefreshCw className="h-3 w-3" />
                  Последняя синхронизация: {formatLastSync(integration.lastSync)}
                </div>
              )}

              {/* Action Button */}
              <Button 
                className="w-full"
                variant={integration.status === 'ACTIVE' ? 'outline' : 'default'}
                onClick={() => handleToggleIntegration(integration.id)}
              >
                {integration.status === 'ACTIVE' ? 'Отключить' : 'Подключить'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <Zap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Интеграций не найдено
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Попробуйте изменить фильтры или добавить новые интеграции
          </p>
          <Button>
            Обзор всех интеграций
          </Button>
        </div>
      )}
    </div>
  )
}
