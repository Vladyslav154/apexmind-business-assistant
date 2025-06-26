
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SubscriptionStatusCard } from './subscription-status-card'
import { 
  CreditCard, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Download,
  Gift,
  Crown,
  Zap,
  Users,
  Shield,
  Headphones,
  ArrowUpRight
} from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: number
  currency: string
  period: string
  features: string[]
  isPopular?: boolean
  isPremium?: boolean
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 0,
    currency: 'RUB',
    period: 'месяц',
    features: [
      '5 документов в месяц',
      'Базовая аналитика',
      '1 интеграция',
      'Email поддержка'
    ]
  },
  {
    id: 'pro',
    name: 'Business Pro',
    price: 139,
    currency: 'USD',
    period: 'месяц',
    features: [
      'Неограниченно документов',
      'Полная аналитика и отчеты',
      'Все интеграции',
      'AI генерация контента',
      'Приоритетная поддержка',
      'Автоматизация задач',
      'Командная работа (до 5 пользователей)'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    currency: 'USD',
    period: 'месяц',
    features: [
      'Все из Business Pro',
      'Неограниченное количество пользователей',
      'Персональный менеджер',
      'Индивидуальные интеграции',
      'SLA 99.9%',
      'Расширенная безопасность',
      'Обучение команды'
    ],
    isPremium: true
  }
]

export function SubscriptionContent() {
  const [currentPlan] = useState('pro')
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const formatPrice = (price: number, currency: string, period: string) => {
    if (price === 0) return 'Бесплатно'
    
    const formatter = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency === 'USD' ? 'USD' : 'RUB',
      minimumFractionDigits: 0,
    })
    
    return `${formatter.format(price)}/${period}`
  }

  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.floor(monthlyPrice * 12 * 0.8) // 20% скидка за годовую оплату
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Управление подпиской</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Выберите план, который подходит для ваших бизнес-задач. 
          Новые пользователи получают 14 дней бесплатного пробного периода.
        </p>
      </div>

      {/* Current Subscription Status */}
      <SubscriptionStatusCard />

      {/* Billing Period Toggle */}
      <div className="flex justify-center">
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={billingPeriod === 'monthly' ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingPeriod('monthly')}
          >
            Месячная оплата
          </Button>
          <Button
            variant={billingPeriod === 'yearly' ? "default" : "ghost"}
            size="sm"
            onClick={() => setBillingPeriod('yearly')}
            className="relative"
          >
            Годовая оплата
            <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
              -20%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = plan.id === currentPlan
          const price = billingPeriod === 'yearly' && plan.price > 0 ? getYearlyPrice(plan.price) : plan.price
          const period = billingPeriod === 'yearly' ? 'год' : 'месяц'

          return (
            <Card 
              key={plan.id} 
              className={`card-hover relative ${
                plan.isPopular ? 'ring-2 ring-secondary' : ''
              } ${isCurrentPlan ? 'bg-secondary/5 border-secondary' : ''}`}
            >
              {plan.isPopular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-secondary">
                  Популярный
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {plan.isPremium && <Crown className="h-5 w-5 text-orange-500" />}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                </div>
                <div className="mb-4">
                  <div className="text-3xl font-bold">
                    {formatPrice(price, plan.currency, period)}
                  </div>
                  {billingPeriod === 'yearly' && plan.price > 0 && (
                    <div className="text-sm text-muted-foreground line-through">
                      {formatPrice(plan.price * 12, plan.currency, 'год')}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full"
                  variant={isCurrentPlan ? "outline" : "default"}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Текущий план' : plan.price === 0 ? 'Перейти на Starter' : 'Выбрать план'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Usage Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-950">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI запросов</p>
                <p className="text-2xl font-bold">1,239</p>
                <p className="text-xs text-muted-foreground">из ∞ доступных</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg dark:bg-green-950">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Пользователи</p>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">из 5 доступных</p>
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
                <p className="text-sm font-medium text-muted-foreground">Интеграции</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">все активны</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg dark:bg-orange-950">
                <Headphones className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Поддержка</p>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-xs text-muted-foreground">приоритетная</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card className="card-hover">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>История платежей</CardTitle>
              <CardDescription>
                Все транзакции по вашей подписке
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Скачать все
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: '25 декабря 2024', amount: '$139.00', status: 'Оплачено', invoice: 'INV-2024-12-001' },
              { date: '25 ноября 2024', amount: '$139.00', status: 'Оплачено', invoice: 'INV-2024-11-001' },
              { date: '25 октября 2024', amount: '$139.00', status: 'Оплачено', invoice: 'INV-2024-10-001' },
              { date: '25 сентября 2024', amount: '$0.00', status: 'Пробный период', invoice: null }
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <CreditCard className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.amount}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={payment.status === 'Оплачено' ? 'secondary' : 'outline'}
                    className="flex items-center gap-1"
                  >
                    {payment.status === 'Оплачено' ? (
                      <CheckCircle className="h-3 w-3" />
                    ) : (
                      <Gift className="h-3 w-3" />
                    )}
                    {payment.status}
                  </Badge>
                  {payment.invoice && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Способ оплаты</CardTitle>
            <CardDescription>
              Управление картами и способами оплаты
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg dark:bg-blue-950">
                  <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Visa • Истекает 12/2027</p>
                </div>
              </div>
              <Badge variant="secondary">Основная</Badge>
            </div>
            <Button variant="outline" className="w-full">
              Добавить новую карту
            </Button>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Управление подпиской</CardTitle>
            <CardDescription>
              Изменение и отмена подписки
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Автопродление</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Email уведомления</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
            
            <div className="pt-4 border-t space-y-2">
              <Button variant="outline" className="w-full">
                Изменить план
              </Button>
              <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                Отменить подписку
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="card-hover bg-muted/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <Headphones className="h-6 w-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Нужна помощь?</h3>
              <p className="text-muted-foreground mb-4">
                Наша команда поддержки готова помочь с любыми вопросами о подписке, 
                оплате или функциях платформы.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Связаться с поддержкой
                </Button>
                <Button variant="ghost" size="sm">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  База знаний
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
