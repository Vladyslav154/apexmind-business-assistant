
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, User, Mail, Lock, Building, Briefcase } from 'lucide-react'
import { toast } from 'sonner'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    industry: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Аккаунт создан успешно! Теперь войдите в систему.')
        router.push('/auth/signin')
      } else {
        toast.error(data.error || 'Произошла ошибка при регистрации')
      }
    } catch (error) {
      toast.error('Произошла ошибка при регистрации')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="h-10 w-10 text-secondary" />
            <span className="text-2xl font-bold gradient-text">ApexMind</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Начните сегодня</h1>
          <p className="text-muted-foreground">
            Создайте аккаунт и получите 30 дней бесплатного доступа
          </p>
        </div>

        {/* Sign Up Form */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Регистрация</CardTitle>
            <CardDescription>
              Заполните данные для создания аккаунта ApexMind
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Полное имя *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Иван Петров"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Пароль *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    minLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Минимум 6 символов
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Название компании
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="ООО Ваша Компания"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium">
                  Отрасль
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="industry"
                    name="industry"
                    type="text"
                    placeholder="IT, Консалтинг, Розничная торговля..."
                    value={formData.industry}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Уже есть аккаунт?{' '}
                <Link href="/auth/signin" className="text-secondary hover:underline">
                  Войти
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="bg-secondary/5 border-secondary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-secondary mb-2">
                🚀 После регистрации получите доступ к:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• AI-помощник для бизнес-консультирования</li>
                <li>• Автоматическая классификация документов</li>
                <li>• Финансовая аналитика и отчеты</li>
                <li>• Маркетинговые инструменты с IA</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
