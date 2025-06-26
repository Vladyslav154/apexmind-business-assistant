
'use client'

import { Badge } from '@/components/ui/badge'

interface CalendarTask {
  id: string
  title: string
  startDate: string
  endDate?: string
  isAllDay: boolean
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
}

interface CalendarViewProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
  tasks: CalendarTask[]
  viewMode: 'month' | 'week' | 'day'
}

export function CalendarView({ selectedDate, onDateSelect, tasks, viewMode }: CalendarViewProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      days.push(currentDate)
    }
    
    return days
  }

  const getTasksForDate = (date: Date) => {
    const dateString = date.toDateString()
    return tasks.filter(task => 
      new Date(task.startDate).toDateString() === dateString
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-500'
      case 'HIGH': return 'bg-orange-500'
      case 'MEDIUM': return 'bg-blue-500'
      case 'LOW': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === selectedDate.getMonth()
  }

  const days = getDaysInMonth(selectedDate)
  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

  if (viewMode === 'month') {
    return (
      <div className="space-y-4">
        {/* Week headers */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayTasks = getTasksForDate(day)
            const isSelected = day.toDateString() === selectedDate.toDateString()
            
            return (
              <div
                key={index}
                className={`
                  p-2 min-h-[100px] border rounded-lg cursor-pointer transition-colors hover:bg-muted/50
                  ${isCurrentMonth(day) ? 'bg-background' : 'bg-muted/20 text-muted-foreground'}
                  ${isToday(day) ? 'ring-2 ring-secondary' : ''}
                  ${isSelected ? 'bg-secondary/10 border-secondary' : 'border-border'}
                `}
                onClick={() => onDateSelect(day)}
              >
                <div className={`text-sm font-medium mb-1 ${isToday(day) ? 'text-secondary' : ''}`}>
                  {day.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="p-1 rounded text-xs bg-background border truncate"
                    >
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getPriorityColor(task.priority)}`}></div>
                        <span className="truncate">{task.title}</span>
                      </div>
                    </div>
                  ))}
                  
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{dayTasks.length - 3} еще
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Week and Day views can be implemented similarly
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">
        Режим "{viewMode}" будет реализован в следующей версии
      </p>
    </div>
  )
}
