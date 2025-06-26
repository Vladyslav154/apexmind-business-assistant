
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  FileText, 
  Tag, 
  FolderTree, 
  Languages,
  Heart,
  Download,
  Star,
  Move,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Lightbulb,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react'
import { toast } from 'sonner'

interface FileAnalysisModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  file: {
    id: string
    originalName: string
    fileSize: number
    mimeType: string
    extension: string
    analysisStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'SKIPPED'
    summary?: string
    keyTopics: string[]
    suggestedTags: string[]
    tags: string[]
    isStarred: boolean
    createdAt: string
    extractedText?: string
    aiCategories?: any
    sentiment?: string
    language?: string
    confidenceScore?: number
  } | null
}

export function FileAnalysisModal({ open, onOpenChange, file }: FileAnalysisModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  useEffect(() => {
    if (file && file.analysisStatus === 'PENDING' && open) {
      handleAnalyze()
    }
  }, [file, open])

  const handleAnalyze = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    try {
      // Simulate analysis progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          const next = prev + Math.random() * 15
          return next > 90 ? 90 : next
        })
      }, 500)

      const response = await fetch(`/api/files/${file.id}/analyze`, {
        method: 'POST'
      })

      clearInterval(progressInterval)
      setAnalysisProgress(100)

      if (response.ok) {
        const analysisData = await response.json()
        toast.success('Анализ завершен')
        // You would typically refetch the file data here
      } else {
        throw new Error('Analysis failed')
      }
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error('Ошибка при анализе файла')
    } finally {
      setIsAnalyzing(false)
      setTimeout(() => setAnalysisProgress(0), 1000)
    }
  }

  const handleApplyRecommendations = async () => {
    if (!file) return

    try {
      const response = await fetch(`/api/files/${file.id}/apply-recommendations`, {
        method: 'POST'
      })

      if (response.ok) {
        toast.success('Рекомендации применены')
        onOpenChange(false)
      } else {
        throw new Error('Failed to apply recommendations')
      }
    } catch (error) {
      console.error('Apply recommendations error:', error)
      toast.error('Ошибка при применении рекомендаций')
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'negative':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      case 'neutral':
        return <Users className="h-4 w-4 text-blue-500" />
      default:
        return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-green-600 bg-green-50 dark:bg-green-950'
      case 'negative': return 'text-red-600 bg-red-50 dark:bg-red-950'
      case 'neutral': return 'text-blue-600 bg-blue-50 dark:bg-blue-950'
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-950'
    }
  }

  if (!file) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-secondary" />
            Анализ файла: {file.originalName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Информация о файле</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Размер</p>
                  <p className="text-lg font-semibold">{formatFileSize(file.fileSize)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Тип</p>
                  <p className="text-lg font-semibold">{file.extension.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Загружен</p>
                  <p className="text-lg font-semibold">
                    {new Date(file.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Статус</p>
                  <div className="flex items-center gap-1">
                    {file.analysisStatus === 'COMPLETED' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {file.analysisStatus === 'PROCESSING' && <Clock className="h-4 w-4 text-blue-500" />}
                    {file.analysisStatus === 'FAILED' && <AlertCircle className="h-4 w-4 text-red-500" />}
                    {file.analysisStatus === 'PENDING' && <Brain className="h-4 w-4 text-gray-500" />}
                    <span className="text-sm font-medium">
                      {file.analysisStatus === 'COMPLETED' && 'Проанализирован'}
                      {file.analysisStatus === 'PROCESSING' && 'Анализируется'}
                      {file.analysisStatus === 'FAILED' && 'Ошибка анализа'}
                      {file.analysisStatus === 'PENDING' && 'Ожидает анализа'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Progress */}
          {isAnalyzing && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Анализ документа...</span>
                    <span className="text-sm text-muted-foreground">{Math.round(analysisProgress)}%</span>
                  </div>
                  <Progress value={analysisProgress} className="w-full" />
                  <p className="text-xs text-muted-foreground">
                    AI извлекает текст, анализирует содержимое и создает рекомендации
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Results */}
          {file.analysisStatus === 'COMPLETED' && (
            <>
              {/* Summary */}
              {file.summary && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Краткое содержание
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{file.summary}</p>
                  </CardContent>
                </Card>
              )}

              {/* Key Topics and Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Ключевые темы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {file.keyTopics.map((topic, index) => (
                        <Badge key={index} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5" />
                      Предложенные теги
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {file.suggestedTags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {file.language && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Languages className="h-5 w-5" />
                        Язык
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold capitalize">{file.language}</p>
                    </CardContent>
                  </Card>
                )}

                {file.sentiment && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Тональность
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getSentimentColor(file.sentiment)}`}>
                        {getSentimentIcon(file.sentiment)}
                        <span className="font-semibold capitalize">{file.sentiment}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {file.confidenceScore && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5" />
                        Точность
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <Progress value={file.confidenceScore * 100} className="flex-1" />
                        <span className="text-sm font-medium">
                          {Math.round(file.confidenceScore * 100)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* AI Recommendations */}
              {file.suggestedTags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FolderTree className="h-5 w-5" />
                      Рекомендации по организации
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Предлагаем переместить файл в папку:</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-sm">
                          📁 {file.suggestedTags[0] || 'Документы'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          на основе анализа содержимого
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Добавить теги:</h4>
                      <div className="flex flex-wrap gap-2">
                        {file.suggestedTags.slice(0, 5).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-blue-600 border-blue-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button onClick={handleApplyRecommendations} className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Применить рекомендации
                    </Button>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Скачать
              </Button>
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                В избранное
              </Button>
              <Button variant="outline" size="sm">
                <Move className="h-4 w-4 mr-2" />
                Переместить
              </Button>
            </div>
            
            <div className="flex gap-2">
              {file.analysisStatus !== 'COMPLETED' && !isAnalyzing && (
                <Button onClick={handleAnalyze}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Анализировать
                </Button>
              )}
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
