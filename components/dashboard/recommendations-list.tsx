
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Target, 
  Megaphone, 
  DollarSign, 
  CheckCircle, 
  X,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react'

interface Recommendation {
  id: string
  title: string
  description: string
  category: 'MARKETING' | 'SALES' | 'FINANCE' | 'OPERATIONS'
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  impact: string
  effort: string
  actions: string[]
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DISMISSED'
}

const mockRecommendations: Recommendation[] = [
  {
    id: '1',
    title: 'Оптимизация конверсии мобильного трафика',
    description: 'Конверсия на мобильных устройствах на 23% ниже десктопной версии. Рекомендуется улучшить UX для мобильных пользователей.',
    category: 'MARKETING',
    priority: 'HIGH',
    impact: 'Увеличение продаж на 15-20%',
    effort: '2-3 недели разработки',
    actions: [
      'Провести аудит мобильной версии сайта',
      'Оптимизировать скорость загрузки',
      'Упростить процесс оформления заказа',
      'Запустить A/B тест новой версии'
    ],
    status: 'PENDING'
  },
  {
    id: '2',
    title: 'Автоматизация email-маркетинга',
    description: 'Внедрение автоматических воронок поможет увеличить LTV клиентов и снизить отток.',
    category: 'MARKETING',
    priority: 'MEDIUM',
    impact: 'Рост LTV на 30%',
    effort: '1 неделя настройки',
    actions: [
      'Настроить welcome-серию писем',
      'Создать сегменты клиентов',
      'Запустить реактивационную кампанию',
      'Настроить аналитику эффективности'
    ],
    status: 'PENDING'
  },
  {
    id: '3',
    title: 'Оптимизация операционных расходов',
    description: 'Анализ показал возможность сократить издержки на 12% без потери качества сервиса.',
    category: 'FINANCE',
    priority: 'MEDIUM',
    impact: 'Экономия ₽85,000/мес',
    effort: '1 месяц внедрения',
    actions: [
      'Пересмотреть контракты с поставщиками',
      'Автоматизировать рутинные процессы',
      'Оптимизировать складские запасы',
      'Внедрить систему контроля расходов'
    ],
    status: 'PENDING'
  }
]

export function RecommendationsList() {
  const [recommendations, setRecommendations] = useState(mockRecommendations)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'MARKETING': return Megaphone
      case 'SALES': return TrendingUp
      case 'FINANCE': return DollarSign
      default: return Target
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'MARKETING': return 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
      case 'SALES': return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
      case 'FINANCE': return 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'destructive'
      case 'MEDIUM': return 'default'
      case 'LOW': return 'secondary'
      default: return 'outline'
    }
  }

  const updateRecommendationStatus = (id: string, status: 'IN_PROGRESS' | 'COMPLETED' | 'DISMISSED') => {
    setRecommendations(prev => 
      prev.map(rec => rec.id === id ? { ...rec, status } : rec)
    )
  }

  return (
    <div className="space-y-4">
      {recommendations.filter(rec => rec.status !== 'DISMISSED').map((recommendation) => {
        const Icon = getCategoryIcon(recommendation.category)
        const isExpanded = expandedId === recommendation.id

        return (
          <div key={recommendation.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className={`p-2 rounded-lg ${getCategoryColor(recommendation.category)}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm">{recommendation.title}</h4>
                    <Badge variant={getPriorityColor(recommendation.priority) as any} className="text-xs">
                      {recommendation.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {recommendation.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ArrowUpRight className="h-3 w-3 text-green-500" />
                      {recommendation.impact}
                    </span>
                    <span>• {recommendation.effort}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedId(isExpanded ? null : recommendation.id)}
                >
                  <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </Button>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-4 pl-11 space-y-4">
                <div>
                  <h5 className="text-sm font-medium mb-2">План действий:</h5>
                  <ul className="space-y-2">
                    {recommendation.actions.map((action, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></div>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => updateRecommendationStatus(recommendation.id, 'IN_PROGRESS')}
                    className="text-xs"
                  >
                    Начать выполнение
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => updateRecommendationStatus(recommendation.id, 'COMPLETED')}
                    className="text-xs"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Выполнено
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => updateRecommendationStatus(recommendation.id, 'DISMISSED')}
                    className="text-xs text-muted-foreground"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Скрыть
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {recommendations.filter(rec => rec.status !== 'DISMISSED').length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Все рекомендации выполнены!
          </h3>
          <p className="text-sm text-muted-foreground">
            ApexMind AI проанализирует новые данные и предложит дополнительные возможности для роста.
          </p>
        </div>
      )}
    </div>
  )
}
