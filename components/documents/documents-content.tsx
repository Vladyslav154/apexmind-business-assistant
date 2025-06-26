
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  Trash2,
  MoreVertical,
  FolderOpen,
  Clock,
  Tag,
  Bot
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DocumentUpload } from '@/components/documents/document-upload'
import { DocumentViewer } from '@/components/documents/document-viewer'

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

const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Договор поставки с ООО Альфа',
    filename: 'contract-alpha-2024.pdf',
    fileSize: 2048000,
    mimeType: 'application/pdf',
    category: 'CONTRACT',
    tags: ['договор', 'поставка', 'альфа'],
    summary: 'Договор на поставку оборудования сроком на 12 месяцев с ежемесячными платежами.',
    uploadedAt: '2024-12-25T10:30:00Z',
    lastAccessed: '2024-12-25T14:20:00Z'
  },
  {
    id: '2',
    title: 'Финансовый отчет Q4 2024',
    filename: 'financial-report-q4-2024.xlsx',
    fileSize: 1536000,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    category: 'REPORT',
    tags: ['отчет', 'финансы', 'квартал'],
    summary: 'Квартальный финансовый отчет с анализом доходов, расходов и прибыли.',
    uploadedAt: '2024-12-24T16:45:00Z',
    lastAccessed: '2024-12-25T09:15:00Z'
  },
  {
    id: '3',
    title: 'Счет-фактура №1245 от ИП Петров',
    filename: 'invoice-1245-petrov.pdf',
    fileSize: 512000,
    mimeType: 'application/pdf',
    category: 'INVOICE',
    tags: ['счет', 'петров', 'оплата'],
    summary: 'Счет на консультационные услуги по маркетингу на сумму 45,000 рублей.',
    uploadedAt: '2024-12-23T12:20:00Z',
    lastAccessed: null
  },
  {
    id: '4',
    title: 'Презентация для инвесторов',
    filename: 'investor-presentation-2024.pptx',
    fileSize: 8192000,
    mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    category: 'PRESENTATION',
    tags: ['презентация', 'инвесторы', 'питч'],
    summary: 'Питч-дек для раунда инвестиций Series A с финансовыми прогнозами.',
    uploadedAt: '2024-12-22T14:10:00Z',
    lastAccessed: '2024-12-24T11:30:00Z'
  }
]

export function DocumentsContent() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

  const categories = [
    { value: 'all', label: 'Все документы' },
    { value: 'CONTRACT', label: 'Договоры' },
    { value: 'INVOICE', label: 'Счета' },
    { value: 'REPORT', label: 'Отчеты' },
    { value: 'PRESENTATION', label: 'Презентации' },
    { value: 'OTHER', label: 'Прочее' }
  ]

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

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
      month: '2-digit',
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

  const handleDocumentUpload = (newDocument: Document) => {
    setDocuments(prev => [newDocument, ...prev])
    setShowUploadModal(false)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Управление документами</h1>
          <p className="text-muted-foreground mt-2">
            Загружайте, классифицируйте и анализируйте документы с помощью IA
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)} className="gap-2">
          <Upload className="h-4 w-4" />
          Загрузить документ
        </Button>
      </div>

      {/* AI Summary Card */}
      <Card className="card-hover bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-secondary/20 rounded-lg">
              <Bot className="h-6 w-6 text-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">ИИ-аналитика документов</h3>
              <p className="text-muted-foreground mb-4">
                За последний месяц обработано <strong>47 документов</strong>. 
                Обнаружено 3 просроченных счета и 2 договора, требующих продления.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Просмотреть отчет
                </Button>
                <Button variant="ghost" size="sm">
                  Настроить уведомления
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск документов по названию или тегам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
              className="text-xs"
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="card-hover group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  {document.category && (
                    <Badge className={getCategoryColor(document.category)}>
                      {document.category}
                    </Badge>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedDocument(document)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Просмотр
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Скачать
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-base line-clamp-2">{document.title}</CardTitle>
              <CardDescription className="text-sm">
                {document.filename} • {formatFileSize(document.fileSize)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {document.summary && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {document.summary}
                </p>
              )}
              
              {document.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {document.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {document.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{document.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDate(document.uploadedAt)}
                </div>
                {document.lastAccessed && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {formatDate(document.lastAccessed)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            Документы не найдены
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Попробуйте изменить параметры поиска или загрузите новые документы
          </p>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Загрузить первый документ
          </Button>
        </div>
      )}

      {/* Modals */}
      {showUploadModal && (
        <DocumentUpload 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleDocumentUpload}
        />
      )}

      {selectedDocument && (
        <DocumentViewer 
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  )
}
