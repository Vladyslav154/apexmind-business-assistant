
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Send, Lightbulb, BarChart3, FileText, DollarSign } from 'lucide-react'

export function ChatBotInterface() {
  const [quickQuestion, setQuickQuestion] = useState('')

  const quickPrompts = [
    {
      icon: BarChart3,
      title: "Анализ продаж",
      prompt: "Проанализируй динамику продаж за последний месяц и дай рекомендации",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
    },
    {
      icon: FileText,
      title: "Составить отчет",
      prompt: "Составь еженедельный отчет по ключевым метрикам бизнеса",
      color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
    },
    {
      icon: DollarSign,
      title: "Финансовый анализ",
      prompt: "Покажи финансовое состояние и предложи план оптимизации расходов",
      color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
    },
    {
      icon: Lightbulb,
      title: "Маркетинг идеи",
      prompt: "Предложи стратегию контент-маркетинга для увеличения клиентской базы",
      color: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"
    }
  ]

  const handleQuickPrompt = (prompt: string) => {
    setQuickQuestion(prompt)
    // Focus iframe and send message to ApexMind
    const iframe = document.getElementById('nexus-chatbot') as HTMLIFrameElement
    if (iframe?.contentWindow) {
      // Send message to iframe (if supported by the chatbot)
      iframe.contentWindow.postMessage({ type: 'newMessage', message: prompt }, '*')
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Question Input */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-secondary" />
            Быстрый вопрос к ApexMind
          </CardTitle>
          <CardDescription>
            Задайте вопрос или выберите один из готовых запросов ниже
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Например: Как увеличить конверсию на сайте?"
              value={quickQuestion}
              onChange={(e) => setQuickQuestion(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleQuickPrompt(quickQuestion)}
              disabled={!quickQuestion.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Prompts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickPrompts.map((prompt, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start gap-2 text-left hover:shadow-md transition-all"
            onClick={() => handleQuickPrompt(prompt.prompt)}
          >
            <div className={`p-2 rounded-lg ${prompt.color}`}>
              <prompt.icon className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">{prompt.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {prompt.prompt}
              </div>
            </div>
          </Button>
        ))}
      </div>

      {/* Main ChatBot Interface */}
      <Card className="chatbot-container">
        <CardContent className="p-0">
          <div style={{ minHeight: '800px', width: '100%' }}>
            <iframe
              id="nexus-chatbot"
              src="https://apps.abacus.ai/chatllm/?appId=c6d9a021c&hideTopBar=2"
              style={{
                width: '100%',
                height: '800px',
                border: 'none',
                borderRadius: '12px'
              }}
              title="ApexMind Chat"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
