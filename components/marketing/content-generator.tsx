
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Wand2, 
  Copy, 
  Download, 
  RefreshCw,
  Sparkles,
  FileText,
  Image,
  Mail,
  Globe,
  Video,
  MessageSquare,
  Settings,
  Loader2
} from 'lucide-react'

interface GeneratedContent {
  id: string
  type: string
  title: string
  content: string
  keywords: string[]
  tone: string
  platform: string
  createdAt: string
}

export function ContentGenerator() {
  const [prompt, setPrompt] = useState('')
  const [selectedType, setSelectedType] = useState('blog-post')
  const [selectedTone, setSelectedTone] = useState('professional')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)

  const contentTypes = [
    { id: 'blog-post', label: 'Статья для блога', icon: FileText },
    { id: 'social-post', label: 'Пост в соцсети', icon: MessageSquare },
    { id: 'email', label: 'Email рассылка', icon: Mail },
    { id: 'landing-page', label: 'Лендинг', icon: Globe },
    { id: 'ad-copy', label: 'Рекламный текст', icon: Sparkles },
    { id: 'video-script', label: 'Сценарий видео', icon: Video }
  ]

  const tones = [
    { id: 'professional', label: 'Профессиональный' },
    { id: 'friendly', label: 'Дружелюбный' },
    { id: 'confident', label: 'Уверенный' },
    { id: 'casual', label: 'Неформальный' },
    { id: 'urgent', label: 'Срочный' },
    { id: 'inspiring', label: 'Вдохновляющий' }
  ]

  const platforms = [
    'LinkedIn', 'Facebook', 'Instagram', 'Twitter', 'Telegram', 'ВКонтакте', 'YouTube', 'Email'
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    
    // Симуляция IA генерации
    setTimeout(() => {
      const mockContent: GeneratedContent = {
        id: Date.now().toString(),
        type: selectedType,
        title: getTypeLabel(selectedType),
        content: generateMockContent(selectedType, prompt),
        keywords: extractKeywords(prompt),
        tone: selectedTone,
        platform: 'Универсальный',
        createdAt: new Date().toISOString()
      }
      
      setGeneratedContent(mockContent)
      setIsGenerating(false)
    }, 2000)
  }

  const getTypeLabel = (type: string) => {
    return contentTypes.find(t => t.id === type)?.label || type
  }

  const generateMockContent = (type: string, prompt: string) => {
    const contents = {
      'blog-post': `# ${prompt}

В современном мире бизнеса автоматизация процессов становится ключевым фактором успеха. Компании, которые внедряют AI-решения, показывают рост эффективности на 30-40%.

## Основные преимущества:

• **Экономия времени** - автоматизация рутинных задач
• **Повышение точности** - снижение человеческих ошибок  
• **Масштабируемость** - возможность роста без пропорционального увеличения затрат

## Практические решения

Начните с простых инструментов автоматизации и постепенно расширяйте их функционал. Инвестиции в AI окупаются в среднем за 6-12 месяцев.

**Заключение:** Будущее за компаниями, которые уже сегодня внедряют интеллектуальные решения.`,

      'social-post': `🚀 ${prompt}

Знаете ли вы, что компании с автоматизированными процессами:
✅ Экономят до 40% рабочего времени
✅ Снижают ошибки на 60%
✅ Увеличивают прибыль на 25%

💡 Начните с малого - автоматизируйте одну задачу в неделю!

#бизнес #автоматизация #AI #эффективность`,

      'email': `Тема: ${prompt} - увеличьте эффективность на 40%

Здравствуйте!

Представьте, что ваша команда работает на 40% эффективнее, а вы тратите минимум времени на рутинные задачи.

Это реальность с правильными инструментами автоматизации.

**Что вы получите:**
- Автоматическую обработку документов
- Умные отчеты и аналитику
- Интеграцию всех бизнес-процессов

Готовы увидеть результат уже через неделю?

[Получить демо-доступ]

С уважением,
Команда ApexMind`
    }

    return contents[type as keyof typeof contents] || 'Сгенерированный контент появится здесь...'
  }

  const extractKeywords = (text: string) => {
    const words = text.toLowerCase().split(' ')
    return words.filter(word => word.length > 3).slice(0, 5)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Content Generation Form */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-secondary" />
            IA Генератор контента
          </CardTitle>
          <CardDescription>
            Создавайте качественный контент для любых маркетинговых целей
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Тип контента</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {contentTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedType === type.id ? "default" : "outline"}
                  className="justify-start gap-2 h-auto p-3"
                  onClick={() => setSelectedType(type.id)}
                >
                  <type.icon className="h-4 w-4" />
                  <span className="text-xs">{type.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Тон общения</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((tone) => (
                <Button
                  key={tone.id}
                  variant={selectedTone === tone.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTone(tone.id)}
                  className="text-xs"
                >
                  {tone.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Prompt Input */}
          <div className="space-y-3">
            <label htmlFor="prompt" className="text-sm font-medium">
              Описание контента
            </label>
            <div className="space-y-2">
              <Input
                id="prompt"
                placeholder="Например: статья о преимуществах автоматизации бизнеса для малых компаний"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="text-sm"
              />
              <div className="flex flex-wrap gap-1">
                {['преимущества AI', 'автоматизация процессов', 'цифровая трансформация', 'эффективность бизнеса'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="ghost"
                    size="sm"
                    onClick={() => setPrompt(suggestion)}
                    className="text-xs h-6"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Генерирую контент...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Сгенерировать контент
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedContent && (
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  {generatedContent.title}
                </CardTitle>
                <CardDescription>
                  Сгенерировано {new Date(generatedContent.createdAt).toLocaleString('ru-RU')}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedContent.content)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleGenerate}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Content Preview */}
            <div className="bg-muted/50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm font-mono">
                {generatedContent.content}
              </pre>
            </div>

            {/* Content Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <label className="text-xs font-medium text-muted-foreground">КЛЮЧЕВЫЕ СЛОВА</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {generatedContent.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground">ТОН</label>
                <p className="text-sm mt-1">{tones.find(t => t.id === generatedContent.tone)?.label}</p>
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground">ПЛАТФОРМА</label>
                <p className="text-sm mt-1">{generatedContent.platform}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between pt-4 border-t">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Редактировать
                </Button>
                <Button variant="outline" size="sm">
                  Сохранить в кампанию
                </Button>
              </div>
              <Button>
                Опубликовать
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
