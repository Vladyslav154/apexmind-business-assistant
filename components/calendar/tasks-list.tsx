
'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Clock, 
  User,
  MapPin,
  MoreVertical,
  Edit,
  Trash2,
  Play,
  Pause
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Task {
  id: string
  title: string
  description?: string
  startDate: string
  endDate?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  category?: string
  assignedTo?: string
  location?: string
}

interface TasksListProps {
  tasks: Task[]
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void
}

export function TasksList({ tasks, onTaskUpdate }: TasksListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
      case 'HIGH': return 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
      case 'MEDIUM': return 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
      case 'LOW': return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'secondary'
      case 'IN_PROGRESS': return 'default'
      case 'TODO': return 'outline'
      case 'CANCELLED': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'TODO': return 'К выполнению'
      case 'IN_PROGRESS': return 'В работе'
      case 'COMPLETED': return 'Выполнено'
      case 'CANCELLED': return 'Отменено'
      default: return status
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    }
  }

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    onTaskUpdate?.(taskId, { status: newStatus })
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const startDateTime = formatDateTime(task.startDate)
        const endDateTime = task.endDate ? formatDateTime(task.endDate) : null

        return (
          <div key={task.id} className="p-4 rounded-lg border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 mt-1"
                  onClick={() => handleStatusChange(
                    task.id, 
                    task.status === 'COMPLETED' ? 'TODO' : 'COMPLETED'
                  )}
                >
                  <CheckCircle 
                    className={`h-4 w-4 ${
                      task.status === 'COMPLETED' 
                        ? 'text-green-600 fill-green-100' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                </Button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className={`font-medium text-sm ${
                      task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : ''
                    }`}>
                      {task.title}
                    </h4>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge variant={getStatusColor(task.status) as any} className="text-xs">
                      {getStatusText(task.status)}
                    </Badge>
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {startDateTime.date} {startDateTime.time}
                      {endDateTime && ` - ${endDateTime.time}`}
                    </span>
                    
                    {task.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {task.location}
                      </span>
                    )}
                    
                    {task.assignedTo && (
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {task.assignedTo}
                      </span>
                    )}
                    
                    {task.category && (
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {task.status === 'TODO' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusChange(task.id, 'IN_PROGRESS')}
                    className="text-xs"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Начать
                  </Button>
                )}
                
                {task.status === 'IN_PROGRESS' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusChange(task.id, 'TODO')}
                    className="text-xs"
                  >
                    <Pause className="h-3 w-3 mr-1" />
                    Пауза
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
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
          </div>
        )
      })}
      
      {tasks.length === 0 && (
        <div className="text-center py-8">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Задач нет
          </h3>
          <p className="text-sm text-muted-foreground">
            Создайте первую задачу для начала планирования
          </p>
        </div>
      )}
    </div>
  )
}
