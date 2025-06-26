
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  DollarSign, 
  Calendar,
  Tag,
  User,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowRightLeft
} from 'lucide-react'

interface AddTransactionModalProps {
  onClose: () => void
}

export function AddTransactionModal({ onClose }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    type: 'EXPENSE' as 'INCOME' | 'EXPENSE' | 'TRANSFER',
    amount: '',
    category: '',
    description: '',
    vendor: '',
    date: new Date().toISOString().slice(0, 16),
    reference: ''
  })

  const categories = {
    INCOME: [
      'Продажи', 'Консультации', 'Подписки', 'Инвестиции', 'Партнерские', 'Прочие доходы'
    ],
    EXPENSE: [
      'Зарплата', 'Аренда', 'Маркетинг', 'Оборудование', 'Коммунальные', 'Транспорт', 'Питание', 'Прочие расходы'
    ],
    TRANSFER: [
      'Между счетами', 'Инвестиции', 'Резервы', 'Налоги'
    ]
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Adding transaction:', formData)
    onClose()
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'INCOME':
        return <TrendingUp className="h-4 w-4" />
      case 'EXPENSE':
        return <TrendingDown className="h-4 w-4" />
      case 'TRANSFER':
        return <ArrowRightLeft className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'INCOME':
        return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
      case 'EXPENSE':
        return 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
      case 'TRANSFER':
        return 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
      default:
        return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Добавить операцию</CardTitle>
              <CardDescription>
                Создайте новую финансовую операцию с автоматической категоризацией
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Тип операции</label>
              <div className="grid grid-cols-3 gap-2">
                {(['INCOME', 'EXPENSE', 'TRANSFER'] as const).map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={formData.type === type ? "default" : "outline"}
                    className={`p-4 h-auto flex flex-col gap-2 ${
                      formData.type === type ? '' : 'hover:bg-muted'
                    }`}
                    onClick={() => handleChange('type', type)}
                  >
                    <div className={`p-2 rounded-lg ${getTypeColor(type)}`}>
                      {getTypeIcon(type)}
                    </div>
                    <span className="text-xs">
                      {type === 'INCOME' ? 'Доход' : type === 'EXPENSE' ? 'Расход' : 'Перевод'}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Amount */}
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Сумма *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="50000"
                    value={formData.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Дата и время *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Категория *</label>
              <div className="flex flex-wrap gap-2">
                {categories[formData.type].map((category) => (
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
              {!categories[formData.type].includes(formData.category) && (
                <Input
                  placeholder="Введите свою категорию"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                />
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Описание *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <textarea
                  id="description"
                  placeholder="Краткое описание операции"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full min-h-[80px] pl-10 pt-2 pr-3 pb-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vendor */}
              <div className="space-y-2">
                <label htmlFor="vendor" className="text-sm font-medium">
                  Контрагент
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="vendor"
                    placeholder="Название компании или ИП"
                    value={formData.vendor}
                    onChange={(e) => handleChange('vendor', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Reference */}
              <div className="space-y-2">
                <label htmlFor="reference" className="text-sm font-medium">
                  Номер документа
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="reference"
                    placeholder="Счет №, договор №"
                    value={formData.reference}
                    onChange={(e) => handleChange('reference', e.target.value)}
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
                    <Tag className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-2">IA Предложения</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary/20">
                        + Реклама Google Ads
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary/20">
                        + Маркетинг
                      </Badge>
                      <Badge variant="outline" className="text-xs cursor-pointer hover:bg-secondary/20">
                        + Автоплатеж
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Нажмите на предложение для быстрого заполнения
                    </p>
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
                Добавить операцию
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
