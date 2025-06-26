
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  X, 
  Download, 
  FileText, 
  Calendar,
  Tag,
  Eye,
  Share
} from 'lucide-react'

interface Document {
  id: string
  title: string
  filename: string
  fileSize: number
  mimeType: string
  category: string | null
  tags: string[]
  summary: string | null
  uploadedAt: string
  lastAccessed: string | null
}

interface DocumentViewerProps {
  document: Document
  onClose: () => void
}

export function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CONTRACT': return 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
      case 'INVOICE': return 'bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400'
      case 'REPORT': return 'bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
      case 'PRESENTATION': return 'bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400'
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400'
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-secondary" />
              <div>
                <CardTitle className="text-xl">{document.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">{document.filename}</span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{formatFileSize(document.fileSize)}</span>
                  {document.category && (
                    <>
                      <span className="text-sm text-muted-foreground">•</span>
                      <Badge className={getCategoryColor(document.category)}>
                        {document.category}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Скачать
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Document Preview */}
          <Card className="bg-muted/20">
            <CardContent className="p-8">
              <div className="text-center">
                <FileText className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Предварительный просмотр</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Для просмотра содержимого документа требуется загрузка
                </p>
                <Button>
                  Открыть документ
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Document Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Информация о файле</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Дата загрузки</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(document.uploadedAt)}
                    </p>
                  </div>
                </div>

                {document.lastAccessed && (
                  <div className="flex items-center gap-3">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Последний просмотр</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(document.lastAccessed)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Тип файла</p>
                    <p className="text-sm text-muted-foreground">
                      {document.mimeType}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">IA Анализ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {document.summary && (
                  <div>
                    <p className="text-sm font-medium mb-2">Краткое описание</p>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      {document.summary}
                    </p>
                  </div>
                )}

                {document.tags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Теги</p>
                    <div className="flex flex-wrap gap-1">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-2">Ключевые данные</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Документ содержит структурированную информацию</p>
                    <p>• Обнаружены даты и числовые значения</p>
                    <p>• Присутствуют подписи и печати</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline">
              Редактировать метаданные
            </Button>
            <Button variant="outline">
              Архивировать
            </Button>
            <Button variant="destructive">
              Удалить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
