
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Crown, 
  Calendar, 
  Download, 
  CheckCircle, 
  Clock,
  Gift,
  AlertTriangle
} from 'lucide-react'

interface SubscriptionStatus {
  isTrialActive: boolean
  daysRemaining?: number
  totalTrialDays?: number
  isPaidSubscription: boolean
  plan?: string
  nextPaymentDate?: string
  amount?: number
}

export function SubscriptionStatusCard() {
  const { data: session } = useSession()
  const [status, setStatus] = useState<SubscriptionStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) {
      fetchSubscriptionStatus()
    }
  }, [session])

  const fetchSubscriptionStatus = async () => {
    try {
      const [trialResponse, subscriptionResponse] = await Promise.all([
        fetch('/api/user/trial-status'),
        fetch('/api/user/subscription-status')
      ])

      const trialData = trialResponse.ok ? await trialResponse.json() : { isTrialActive: false }
      const subscriptionData = subscriptionResponse.ok ? await subscriptionResponse.json() : { isPaidSubscription: false }

      setStatus({
        isTrialActive: trialData.isTrialActive,
        daysRemaining: trialData.daysRemaining,
        totalTrialDays: trialData.totalTrialDays,
        isPaidSubscription: subscriptionData.isPaidSubscription,
        plan: subscriptionData.plan,
        nextPaymentDate: subscriptionData.nextPaymentDate,
        amount: subscriptionData.amount
      })
    } catch (error) {
      console.error('Failed to fetch subscription status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="card-hover bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status?.isTrialActive) {
    const progressPercentage = status.totalTrialDays && status.daysRemaining 
      ? ((status.totalTrialDays - status.daysRemaining) / status.totalTrialDays) * 100 
      : 0
    const isExpiringSoon = (status.daysRemaining || 0) <= 3

    return (
      <Card className="card-hover bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-200/50 dark:bg-blue-800/50 rounded-lg">
                <Gift className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">Пробный период активен</h3>
                  {isExpiringSoon && (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Скоро истекает
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">
                  У вас есть полный доступ ко всем функциям ApexMind
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Осталось дней:</span>
                    <span className="font-semibold text-lg">
                      {status.daysRemaining || 0}
                    </span>
                  </div>
                  
                  <Progress value={progressPercentage} className="h-2" />
                  
                  <div className="text-xs text-muted-foreground">
                    {status.totalTrialDays && status.daysRemaining 
                      ? `${status.totalTrialDays - status.daysRemaining} из ${status.totalTrialDays} дней использовано`
                      : 'Пробный период'
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Перейти на Pro
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status?.isPaidSubscription) {
    return (
      <Card className="card-hover bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-secondary/20 rounded-lg">
                <Crown className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{status.plan || 'Business Pro Plan'}</h3>
                <p className="text-muted-foreground mb-3">
                  Ваша подписка активна и автоматически продлевается {status.nextPaymentDate || '25 января 2025'}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Активна
                  </Badge>
                  <span className="text-muted-foreground">${status.amount || 139}/месяц</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">Следующий платеж: {status.nextPaymentDate || '25 января'}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Счет
              </Button>
              <Button variant="outline" size="sm">
                Изменить план
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // No active subscription or trial
  return (
    <Card className="card-hover bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-200/50 dark:bg-yellow-800/50 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Нет активной подписки</h3>
              <p className="text-muted-foreground mb-3">
                Оформите подписку для получения полного доступа ко всем функциям
              </p>
              <Badge variant="outline" className="flex items-center gap-1 w-fit">
                <Clock className="h-3 w-3" />
                Ограниченный доступ
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button>
              Активировать пробный период
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
