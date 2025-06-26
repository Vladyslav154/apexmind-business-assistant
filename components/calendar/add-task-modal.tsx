
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Calendar,
  Clock,
  MapPin,
  User,
  Flag,
  Tag,
  Bot,
  Lightbulb
} from 'lucide-react'

interface AddTaskModalProps {
  onClose: () => void
}

export function AddTaskModal({ onClose }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
    startDate: '',
    endDate: '',
    isAllDay: false,
    location: '',
    assignedTo: '',
    reminders: [] as string[]
  })

  const priorities = [
    { value: 'LOW', label: 'Низкий', color: 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400' },
    { value: 'MEDIUM', label: 'Средний', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
    { value: 'HIGH', label: 'Высокий', color: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300' },
    { value: 'URGENT', label: 'Срочно', color: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300' }
  ]

  const categories = [
    'Встречи', 'Продажи', 'Маркетинг', 'Разработка', 'Финансы', 'HR', 'Админ', 'Личное'
  ]

  const quickTemplates = [
    {
      title: 'Встреча с клиентом',
      description: 'Обсуждение требований и условий сотрудничества',
      category: 'Продажи',
      priority: 'HIGH' as const,
      duration: 60
    },
    {
      title: 'Планерка команды',
      description: 'Еженедельная синхронизация задач и планов',
      category: 'Встречи',
      priority: 'MEDIUM' as const,
      duration: 30
    },
    {
      title: 'Подготовка отчета',
      description: 'Анализ метрик и подготовка ежемесячного отчета',
      category: 'Админ',
      priority: 'MEDIUM' as const,
      duration: 120
    }
  ]

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleTemplateSelect = (template: typeof quickTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      title: template.title,
      description: template.description,
      category: template.category,
      priority: template.priority,
      endDate: prev.startDate ? 
        new Date(new Date(prev.startDate).getTime() + template.duration * 60000).toISOString().slice(0, 16) : 
        ''
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Adding task:', formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Создать задачу</CardTitle>
              <CardDescription>
                Добавьте новую задачу или событие в календарь
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Templates */}
          <Card className="bg-secondary/5 border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Lightbulb className="h-4 w-4 text-secondary" />
                Быстрые шаблоны
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {quickTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 text-left justify-start"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div>
                      <div className="font-medium text-xs">{template.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {template.category} • {template.duration} мин
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Название задачи *
              </label>
              <Input
                id="title"
                placeholder="Введите название задачи"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Описание
              </label>
              <textarea
                id="description"
                placeholder="Дополнительные детали и заметки"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full min-h-[80px] px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Приоритет</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {priorities.map((priority) => (
                  <Button
                    key={priority.value}
                    type="button"
                    variant={formData.priority === priority.value ? "default" : "outline"}
                    className="text-xs"
                    onClick={() => handleChange('priority', priority.value)}
                  >
                    <Flag className="h-3 w-3 mr-1" />
                    {priority.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Категория</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={formData.category === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleChange('category', category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              {!categories.includes(formData.category) && (
                <Input
                  placeholder="Введите свою категорию"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                />
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startDate" className="text-sm font-medium">
                  Начало *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="endDate" className="text-sm font-medium">
                  Окончание
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* All Day Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="allDay"
                checked={formData.isAllDay}
                onChange={(e) => handleChange('isAllDay', e.target.checked)}
                className="rounded border-input"
              />
              <label htmlFor="allDay" className="text-sm font-medium">
                Весь день
              </label>
            </div>

            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Место проведения
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Переговорная, Zoom, адрес"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="assignedTo" className="text-sm font-medium">
                  Участники
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="assignedTo"
                    placeholder="Имена участников"
                    value={formData.assignedTo}
                    onChange={(e) => handleChange('assignedTo', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <Card className="bg-secondary/5 border-secondary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Bot className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-2">IA Предложения</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Оптимальное время для встреч с клиентами: 14:00-16:00</p>
                      <p>• Рекомендуется добавить 15 минут подготовки перед важными встречами</p>
                      <p>• Лучше планировать креативные задачи на утро (9:00-11:00)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit">
                Создать задачу
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
