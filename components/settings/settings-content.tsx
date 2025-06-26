
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Bell,
  Shield,
  Palette,
  Globe,
  Key,
  Download,
  Upload,
  Trash2,
  Save,
  Moon,
  Sun,
  Monitor
} from 'lucide-react'
import { toast } from 'sonner'

export function SettingsContent() {
  const [notifications, setNotifications] = useState({
    emailReports: true,
    pushNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    aiRecommendations: true
  })

  const [privacy, setPrivacy] = useState({
    analytics: true,
    dataSharing: false,
    profileVisibility: 'private'
  })

  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('ru')

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    toast.success('Настройки сохранены успешно')
  }

  const handleExportData = () => {
    toast.success('Экспорт данных начался. Файл будет отправлен на ваш email.')
  }

  const handleDeleteData = () => {
    if (confirm('Вы уверены, что хотите удалить все данные? Это действие необратимо.')) {
      toast.error('Удаление данных инициировано')
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
          <p className="text-muted-foreground mt-2">
            Персонализируйте ваш опыт работы с ApexMind
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Сохранить изменения
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-secondary" />
              Уведомления
            </CardTitle>
            <CardDescription>
              Управляйте типами уведомлений, которые вы хотите получать
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: 'emailReports', label: 'Email отчеты', description: 'Еженедельные и месячные отчеты' },
              { key: 'pushNotifications', label: 'Push уведомления', description: 'Уведомления в браузере' },
              { key: 'marketingEmails', label: 'Маркетинговые письма', description: 'Новости и акции' },
              { key: 'securityAlerts', label: 'Оповещения безопасности', description: 'Важные уведомления о безопасности' },
              { key: 'aiRecommendations', label: 'AI рекомендации', description: 'Персонализированные советы от IA' }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                  className="rounded"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-secondary" />
              Безопасность
            </CardTitle>
            <CardDescription>
              Управление безопасностью и приватностью аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Двухфакторная аутентификация</p>
                <p className="text-xs text-muted-foreground">Дополнительная защита аккаунта</p>
              </div>
              <Badge variant="outline">Не настроено</Badge>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Сессии</p>
                <p className="text-xs text-muted-foreground">3 активные сессии</p>
              </div>
              <Button variant="outline" size="sm">
                Управлять
              </Button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">API ключи</p>
                <p className="text-xs text-muted-foreground">Управление доступом к API</p>
              </div>
              <Button variant="outline" size="sm">
                <Key className="h-4 w-4 mr-2" />
                Создать
              </Button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Смена пароля</p>
                <p className="text-xs text-muted-foreground">Последнее изменение: 15 дней назад</p>
              </div>
              <Button variant="outline" size="sm">
                Изменить
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-secondary" />
              Внешний вид
            </CardTitle>
            <CardDescription>
              Настройка темы и языка интерфейса
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-3">Тема оформления</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'light', label: 'Светлая', icon: Sun },
                  { id: 'dark', label: 'Темная', icon: Moon },
                  { id: 'system', label: 'Системная', icon: Monitor }
                ].map((themeOption) => (
                  <Button
                    key={themeOption.id}
                    variant={theme === themeOption.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme(themeOption.id)}
                    className="flex flex-col gap-1 h-auto p-3"
                  >
                    <themeOption.icon className="h-4 w-4" />
                    <span className="text-xs">{themeOption.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Язык интерфейса</p>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="uk">Українська</option>
                <option value="kz">Қазақша</option>
              </select>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Часовой пояс</p>
              <select
                className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Europe/Moscow">Москва (UTC+3)</option>
                <option value="Europe/Kiev">Киев (UTC+2)</option>
                <option value="Asia/Almaty">Алматы (UTC+6)</option>
                <option value="America/New_York">Нью-Йорк (UTC-5)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Data */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-secondary" />
              Приватность и данные
            </CardTitle>
            <CardDescription>
              Управление данными и настройки приватности
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Аналитика использования</p>
                <p className="text-xs text-muted-foreground">Помогает улучшить продукт</p>
              </div>
              <input
                type="checkbox"
                checked={privacy.analytics}
                onChange={(e) => handlePrivacyChange('analytics', e.target.checked)}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Обмен данными</p>
                <p className="text-xs text-muted-foreground">С партнерами для улучшения сервиса</p>
              </div>
              <input
                type="checkbox"
                checked={privacy.dataSharing}
                onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
                className="rounded"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Видимость профиля</p>
              <select
                value={privacy.profileVisibility}
                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="private">Приватный</option>
                <option value="team">Только команда</option>
                <option value="public">Публичный</option>
              </select>
            </div>

            <div className="pt-4 border-t space-y-2">
              <Button variant="outline" className="w-full" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Экспорт данных
              </Button>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Импорт данных
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Settings */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Расширенные настройки</CardTitle>
          <CardDescription>
            Дополнительные параметры конфигурации системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">AI и автоматизация</h4>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Автоматическая обработка документов</p>
                  <p className="text-xs text-muted-foreground">AI анализ при загрузке</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Проактивные рекомендации</p>
                  <p className="text-xs text-muted-foreground">Предложения на основе данных</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Автоматические отчеты</p>
                  <p className="text-xs text-muted-foreground">Еженедельная отправка</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Интеграции</h4>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Автосинхронизация</p>
                  <p className="text-xs text-muted-foreground">Обновление каждые 15 минут</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">Webhook уведомления</p>
                  <p className="text-xs text-muted-foreground">Для внешних систем</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium">API логирование</p>
                  <p className="text-xs text-muted-foreground">Детальные логи запросов</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="card-hover border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Опасная зона</CardTitle>
          <CardDescription>
            Необратимые действия с данными и аккаунтом
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="destructive" onClick={handleDeleteData} className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить все данные
            </Button>
            <Button variant="destructive" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              Закрыть аккаунт
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
