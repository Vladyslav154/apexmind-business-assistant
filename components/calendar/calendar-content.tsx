
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar as CalendarIcon, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Bot,
  Bell,
  Filter
} from 'lucide-react'
import { CalendarView } from '@/components/calendar/calendar-view'
import { TasksList } from '@/components/calendar/tasks-list'
import { AddTaskModal } from '@/components/calendar/add-task-modal'

interface CalendarTask {
  id: string
  title: string
  description?: string
  startDate: string
  endDate?: string
  isAllDay: boolean
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  category?: string
  assignedTo?: string
  location?: string
  aiGenerated: boolean
}

const mockTasks: CalendarTask[] = [
  {
    id: '1',
    title: 'Презентация для инвесторов',
    description: 'Подготовить финальную версию питч-дека для раунда Series A',
    startDate: '2024-12-25T14:00:00Z',
    endDate: '2024-12-25T16:00:00Z',
    isAllDay: false,
    priority: 'HIGH',
    status: 'TODO',
    category: 'Встречи',
    location: 'Конференц-зал А',
    aiGenerated: false
  },
  {
    id: '2',
    title: 'Звонок с клиентом ООО Альфа',
    description: 'Обсуждение продления договора на следующий год',
    startDate: '2024-12-25T11:00:00Z',
    endDate: '2024-12-25T11:30:00Z',
    isAllDay: false,
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    category: 'Продажи',
    aiGenerated: true
  },
  {
    id: '3',
    title: 'Анализ конкурентов',
    description: 'Исследование рынка и анализ конкурентных преимуществ',
    startDate: '2024-12-26T09:00:00Z',
    isAllDay: true,
    priority: 'MEDIUM',
    status: 'TODO',
    category: 'Исследования',
    aiGenerated: true
  },
  {
    id: '4',
    title: 'Планерка с командой',
    description: 'Еженедельная встреча для синхронизации задач',
    startDate: '2024-12-26T10:00:00Z',
    endDate: '2024-12-26T11:00:00Z',
    isAllDay: false,
    priority: 'LOW',
    status: 'TODO',
    category: 'Встречи',
    location: 'Переговорная',
    assignedTo: 'Команда разработки',
    aiGenerated: false
  }
]

export function CalendarContent() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [tasks] = useState<CalendarTask[]>(mockTasks)
  const [showAddTask, setShowAddTask] = useState(false)

  const getTodayTasks = () => {
    const today = new Date().toDateString()
    return tasks.filter(task => 
      new Date(task.startDate).toDateString() === today
    )
  }

  const getUpcomingTasks = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return tasks.filter(task => {
      const taskDate = new Date(task.startDate)
      return taskDate > today && taskDate <= nextWeek && task.status !== 'COMPLETED'
    }).slice(0, 5)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300'
      case 'HIGH': return 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
      case 'MEDIUM': return 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
      case 'LOW': return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Календарь и задачи</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте расписанием и задачами с умными напоминаниями
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Напоминания
          </Button>
          <Button onClick={() => setShowAddTask(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Новая задача
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="card-hover bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <Bot className="h-6 w-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">IA Планировщик</h3>
              <p className="text-muted-foreground mb-4">
                На основе вашего расписания рекомендую перенести встречу с инвесторами на 15:00 - 
                это даст больше времени на подготовку. Также добавил задачу по анализу конкурентов.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Применить предложения
                </Button>
                <Button variant="ghost" size="sm">
                  Настроить автопланирование
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">
              {selectedDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
            Сегодня
          </Button>
        </div>
        
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {(['month', 'week', 'day'] as const).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode(mode)}
              className="text-xs"
            >
              {mode === 'month' ? 'Месяц' : mode === 'week' ? 'Неделя' : 'День'}
            </Button>
          ))}
        </div>
      </div>

      {/* Calendar and Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card className="card-hover">
            <CardContent className="p-6">
              <CalendarView 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                tasks={tasks}
                viewMode={viewMode}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Tasks */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-secondary" />
                Сегодня
              </CardTitle>
              <CardDescription>
                {getTodayTasks().length} задач на сегодня
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getTodayTasks().map((task) => (
                  <div key={task.id} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm line-clamp-1">{task.title}</h4>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {!task.isAllDay && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(task.startDate)}
                          {task.endDate && ` - ${formatTime(task.endDate)}`}
                        </span>
                      )}
                      
                      {task.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {task.location}
                        </span>
                      )}
                    </div>

                    {task.aiGenerated && (
                      <Badge variant="outline" className="text-xs mt-2">
                        IA предложение
                      </Badge>
                    )}
                  </div>
                ))}
                
                {getTodayTasks().length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      На сегодня задач нет
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalendarIcon className="h-5 w-5 text-secondary" />
                Предстоящие
              </CardTitle>
              <CardDescription>
                Задачи на следующую неделю
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getUpcomingTasks().map((task) => (
                  <div key={task.id} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm line-clamp-1">{task.title}</h4>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{formatDate(task.startDate)}</span>
                      {!task.isAllDay && (
                        <>
                          <span>•</span>
                          <span>{formatTime(task.startDate)}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                
                {getUpcomingTasks().length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">
                      Предстоящих задач нет
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-lg">Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Встреча с клиентом
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Планерка команды
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Дедлайн проекта
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Настроить фильтры
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <AddTaskModal 
          onClose={() => setShowAddTask(false)}
        />
      )}
    </div>
  )
}
