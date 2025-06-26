
'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRightLeft,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Transaction {
  id: string
  amount: number
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER'
  category: string
  description: string
  vendor?: string
  date: string
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  reference?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 85000,
    type: 'INCOME',
    category: 'Продажи',
    description: 'Оплата за консультационные услуги',
    vendor: 'ООО Альфа Консалтинг',
    date: '2024-12-25T10:30:00Z',
    status: 'COMPLETED',
    reference: 'INV-2024-001'
  },
  {
    id: '2',
    amount: 25000,
    type: 'EXPENSE',
    category: 'Маркетинг',
    description: 'Реклама в Google Ads',
    vendor: 'Google LLC',
    date: '2024-12-24T16:45:00Z',
    status: 'COMPLETED',
    reference: 'ADV-001245'
  },
  {
    id: '3',
    amount: 45000,
    type: 'EXPENSE',
    category: 'Зарплата',
    description: 'Заработная плата сотрудников',
    vendor: 'Штатные сотрудники',
    date: '2024-12-23T12:20:00Z',
    status: 'COMPLETED'
  },
  {
    id: '4',
    amount: 15000,
    type: 'EXPENSE',
    category: 'Офис',
    description: 'Аренда офисного помещения',
    vendor: 'ИП Петров А.В.',
    date: '2024-12-22T09:15:00Z',
    status: 'PENDING'
  },
  {
    id: '5',
    amount: 120000,
    type: 'INCOME',
    category: 'Продажи',
    description: 'Оплата по договору поставки',
    vendor: 'ООО Бета Системы',
    date: '2024-12-21T14:30:00Z',
    status: 'COMPLETED',
    reference: 'INV-2024-002'
  }
]

export function TransactionsList() {
  const [transactions] = useState<Transaction[]>(mockTransactions)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'INCOME':
        return <ArrowDownRight className="h-4 w-4 text-green-600" />
      case 'EXPENSE':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case 'TRANSFER':
        return <ArrowRightLeft className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'INCOME':
        return 'text-green-600'
      case 'EXPENSE':
        return 'text-red-600'
      case 'TRANSFER':
        return 'text-blue-600'
      default:
        return 'text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'secondary'
      case 'PENDING':
        return 'outline'
      case 'CANCELLED':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'Выполнено'
      case 'PENDING':
        return 'Ожидание'
      case 'CANCELLED':
        return 'Отменено'
      default:
        return status
    }
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 flex-1">
            <div className="p-2 bg-muted rounded-lg">
              {getTypeIcon(transaction.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm truncate">{transaction.description}</h4>
                <Badge variant={getStatusColor(transaction.status) as any} className="text-xs">
                  {getStatusText(transaction.status)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{transaction.category}</span>
                {transaction.vendor && (
                  <>
                    <span>•</span>
                    <span className="truncate">{transaction.vendor}</span>
                  </>
                )}
                {transaction.reference && (
                  <>
                    <span>•</span>
                    <span>{transaction.reference}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className={`font-semibold ${getTypeColor(transaction.type)}`}>
                {transaction.type === 'EXPENSE' ? '-' : '+'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(transaction.date)}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Eye className="h-4 w-4 mr-2" />
                  Просмотр
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}

      <div className="text-center pt-4">
        <Button variant="outline" className="w-full sm:w-auto">
          Загрузить еще транзакции
        </Button>
      </div>
    </div>
  )
}
