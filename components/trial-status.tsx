
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Crown, Calendar, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface TrialInfo {
  isTrialActive: boolean
  trialStartDate?: string
  trialEndDate?: string
  daysRemaining: number
  totalTrialDays: number
}

export function TrialStatus() {
  const { data: session } = useSession()
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) {
      fetchTrialInfo()
    }
  }, [session])

  const fetchTrialInfo = async () => {
    try {
      const response = await fetch('/api/user/trial-status')
      if (response.ok) {
        const data = await response.json()
        setTrialInfo(data)
      }
    } catch (error) {
      console.error('Failed to fetch trial info:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="bg-primary-foreground/10 border-primary-foreground/20">
        <CardContent className="p-3">
          <div className="animate-pulse">
            <div className="h-4 bg-primary-foreground/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-primary-foreground/20 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!trialInfo?.isTrialActive) {
    return null // Don't show anything if trial is not active
  }

  const progressPercentage = ((trialInfo.totalTrialDays - trialInfo.daysRemaining) / trialInfo.totalTrialDays) * 100
  const isExpiringSoon = trialInfo.daysRemaining <= 3

  return (
    <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30">
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-primary-foreground">Пробный период</span>
          {isExpiringSoon && (
            <Badge variant="destructive" className="text-xs py-0 px-1">
              Скоро истекает
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary-foreground/80">Осталось:</span>
            <span className="font-semibold text-primary-foreground">
              {trialInfo.daysRemaining} {trialInfo.daysRemaining === 1 ? 'день' : 'дней'}
            </span>
          </div>
          
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-primary-foreground/20"
          />
          
          <div className="text-xs text-primary-foreground/70">
            {trialInfo.totalTrialDays - trialInfo.daysRemaining} из {trialInfo.totalTrialDays} дней использовано
          </div>
        </div>

        <Link href="/subscription">
          <Button 
            size="sm" 
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            <ArrowUpRight className="h-3 w-3 mr-1" />
            Перейти на Pro
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
