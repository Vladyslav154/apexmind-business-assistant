
'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  X, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Bot,
  Loader2
} from 'lucide-react'

interface DocumentUploadProps {
  onClose: () => void
  onUpload: (document: any) => void
}

export function DocumentUpload({ onClose, onUpload }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<any>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFile = async (file: File) => {
    setUploadedFile(file)
    setIsProcessing(true)

    // Симуляция AI анализа документа
    setTimeout(() => {
      const mockAnalysis = {
        category: detectCategory(file.name),
        tags: generateTags(file.name),
        summary: generateSummary(file.name),
        confidence: Math.floor(Math.random() * 30) + 70 // 70-100%
      }
      setAiAnalysis(mockAnalysis)
      setIsProcessing(false)
    }, 2000)
  }

  const detectCategory = (filename: string): string => {
    const name = filename.toLowerCase()
    if (name.includes('договор') || name.includes('contract')) return 'CONTRACT'
    if (name.includes('счет') || name.includes('invoice')) return 'INVOICE'
    if (name.includes('отчет') || name.includes('report')) return 'REPORT'
    if (name.includes('презентация') || name.includes('presentation')) return 'PRESENTATION'
    return 'OTHER'
  }

  const generateTags = (filename: string): string[] => {
    const name = filename.toLowerCase()
    const tags: string[] = []
    
    if (name.includes('финанс')) tags.push('финансы')
    if (name.includes('договор')) tags.push('договор')
    if (name.includes('отчет')) tags.push('отчет')
    if (name.includes('2024')) tags.push('2024')
    if (name.includes('q4')) tags.push('квартал')
    
    return tags.length > 0 ? tags : ['документ', 'новый']
  }

  const generateSummary = (filename: string): string => {
    const summaries = [
      'Документ содержит важную деловую информацию, требующую внимания.',
      'Финансовый документ с данными о доходах и расходах компании.',
      'Договорная документация с условиями сотрудничества.',
      'Отчетный документ с аналитическими данными за период.'
    ]
    return summaries[Math.floor(Math.random() * summaries.length)]
  }

  const handleConfirmUpload = () => {
    if (!uploadedFile || !aiAnalysis) return

    const newDocument = {
      id: Date.now().toString(),
      title: uploadedFile.name.split('.')[0],
      filename: uploadedFile.name,
      fileSize: uploadedFile.size,
      mimeType: uploadedFile.type,
      category: aiAnalysis.category,
      tags: aiAnalysis.tags,
      summary: aiAnalysis.summary,
      uploadedAt: new Date().toISOString(),
      lastAccessed: null
    }

    onUpload(newDocument)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Загрузка документа</CardTitle>
              <CardDescription>
                Загрузите документ для автоматической классификации с помощью IA
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!uploadedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-secondary bg-secondary/10' 
                  : 'border-muted-foreground/25 hover:border-secondary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Перетащите файл сюда или нажмите для выбора
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Поддерживаются: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Выбрать файл
                </label>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Info */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-secondary" />
                    <div className="flex-1">
                      <h4 className="font-medium">{uploadedFile.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(uploadedFile.size)} • {uploadedFile.type}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setUploadedFile(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Bot className="h-5 w-5 text-secondary" />
                    IA Анализ документа
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isProcessing ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-secondary mr-2" />
                      <span>Анализирую документ...</span>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Анализ завершен</span>
                        <Badge variant="secondary">{aiAnalysis.confidence}% точности</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium block mb-1">Категория</label>
                          <Badge className="text-sm">{aiAnalysis.category}</Badge>
                        </div>
                        <div>
                          <label className="text-sm font-medium block mb-1">Теги</label>
                          <div className="flex flex-wrap gap-1">
                            {aiAnalysis.tags.map((tag: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium block mb-1">Краткое описание</label>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                          {aiAnalysis.summary}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlertCircle className="h-5 w-5" />
                      <span>Ошибка анализа документа</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>
                  Отмена
                </Button>
                <Button 
                  onClick={handleConfirmUpload}
                  disabled={!aiAnalysis}
                >
                  Сохранить документ
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
