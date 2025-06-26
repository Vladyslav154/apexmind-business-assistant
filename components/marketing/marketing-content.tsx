
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Megaphone, 
  Plus, 
  Wand2,
  BarChart3,
  Eye,
  Bot,
  Sparkles,
  Target,
  TrendingUp,
  Share2,
  Mail,
  Globe
} from 'lucide-react'
import { ContentGenerator } from '@/components/marketing/content-generator'
import { CampaignsList } from '@/components/marketing/campaigns-list'
import { MarketingAnalytics } from '@/components/marketing/marketing-analytics'

interface MarketingStats {
  totalCampaigns: number
  activeContent: number
  avgEngagement: number
  totalReach: number
}

export function MarketingContent() {
  const [activeTab, setActiveTab] = useState<'generator' | 'campaigns' | 'analytics'>('generator')
  const [stats] = useState<MarketingStats>({
    totalCampaigns: 12,
    activeContent: 28,
    avgEngagement: 4.2,
    totalReach: 15400
  })

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    description,
    formatter = (val: number) => val.toString() 
  }: {
    title: string
    value: number
    change?: number
    icon: any
    description: string
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
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const tabs = [
    { id: 'generator', label: 'Генерация контента', icon: Wand2 },
    { id: 'campaigns', label: 'Кампании', icon: Megaphone },
    { id: 'analytics', label: 'Аналитика', icon: BarChart3 }
  ]

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Маркетинговый центр</h1>
          <p className="text-muted-foreground mt-2">
            Создавайте контент и управляйте кампаниями с помощью IA
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Новая кампания
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
              <h3 className="font-semibold text-lg mb-2">IA Маркетолог</h3>
              <p className="text-muted-foreground mb-4">
                Анализ показывает рост вовлеченности на 18% при публикации контента в 14:00-16:00. 
                Рекомендую создать серию постов про кейсы клиентов - такой контент получает на 35% больше откликов.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Сгенерировать контент-план
                </Button>
                <Button variant="ghost" size="sm">
                  Настроить автопостинг
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Активные кампании"
          value={stats.totalCampaigns}
          change={15.3}
          icon={Target}
          description="в этом месяце"
        />
        <StatCard
          title="Контент"
          value={stats.activeContent}
          change={8.7}
          icon={Globe}
          description="опубликованных материалов"
        />
        <StatCard
          title="Вовлеченность"
          value={stats.avgEngagement}
          change={12.4}
          icon={TrendingUp}
          description="средний %"
          formatter={(val) => `${val}%`}
        />
        <StatCard
          title="Охват"
          value={stats.totalReach}
          change={23.1}
          icon={Eye}
          description="уникальных пользователей"
          formatter={(val) => val.toLocaleString()}
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.id as any)}
            className="gap-2"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'generator' && <ContentGenerator />}
      {activeTab === 'campaigns' && <CampaignsList />}
      {activeTab === 'analytics' && <MarketingAnalytics />}
    </div>
  )
}
