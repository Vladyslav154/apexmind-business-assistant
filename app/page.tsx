
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { AppLayout } from '@/components/layout/app-layout'
import { ChatBotInterface } from '@/components/chatbot-interface'

export default async function HomePage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="max-w-full mx-auto">
          {/* Welcome Section */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Добро пожаловать в ApexMind
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Ваш интеллектуальный помощник для автоматизации бизнеса. 
              Проанализируйте данные, получите стратегические рекомендации и автоматизируйте рутинные задачи.
            </p>
          </div>

          {/* AI Chat Interface - Main Feature */}
          <ChatBotInterface />

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-hover bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Аналитика KPI</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Автоматический мониторинг ключевых показателей и выявление аномалий
              </p>
            </div>

            <div className="card-hover bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1a2 2 0 104 0V4z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Автоматизация</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Настройка автоматических рабочих процессов и интеграций
              </p>
            </div>

            <div className="card-hover bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-secondary/20 rounded-lg">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold">Стратегические Рекомендации</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Получайте персонализированные советы для роста бизнеса
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
