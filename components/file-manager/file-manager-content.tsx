
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  Search, 
  Filter, 
  FolderPlus, 
  Grid3X3, 
  List,
  Star,
  Archive,
  MoreVertical,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File as FileIcon,
  Folder,
  Brain,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Eye,
  Trash2,
  Move,
  Tag
} from 'lucide-react'
import { FileUploadModal } from './file-upload-modal'
import { FileAnalysisModal } from './file-analysis-modal'
import { CreateFolderModal } from './create-folder-modal'
import { toast } from 'sonner'

interface FileItem {
  id: string
  originalName: string
  fileName: string
  fileSize: number
  mimeType: string
  extension: string
  analysisStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'SKIPPED'
  summary?: string
  keyTopics: string[]
  suggestedTags: string[]
  tags: string[]
  isStarred: boolean
  isArchived: boolean
  lastAccessed?: string
  createdAt: string
  folder?: {
    id: string
    name: string
    color: string
  }
}

interface FolderItem {
  id: string
  name: string
  color: string
  description?: string
  path: string
  fileCount: number
  createdAt: string
}

export function FileManagerContent() {
  const { data: session } = useSession()
  const [files, setFiles] = useState<FileItem[]>([])
  const [folders, setFolders] = useState<FolderItem[]>([])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAnalysisModal, setShowAnalysisModal] = useState(false)
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [selectedFolder])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [filesResponse, foldersResponse] = await Promise.all([
        fetch(`/api/files${selectedFolder ? `?folderId=${selectedFolder}` : ''}`),
        fetch('/api/folders')
      ])
      
      if (filesResponse.ok && foldersResponse.ok) {
        const filesData = await filesResponse.json()
        const foldersData = await foldersResponse.json()
        setFiles(filesData)
        setFolders(foldersData)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      toast.error('Ошибка загрузки данных')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (uploadedFiles: File[]) => {
    try {
      const formData = new FormData()
      uploadedFiles.forEach((file) => {
        formData.append('files', file)
      })
      if (selectedFolder) {
        formData.append('folderId', selectedFolder)
      }

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        toast.success(`Загружено ${uploadedFiles.length} файлов`)
        loadData()
        setShowUploadModal(false)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Ошибка при загрузке файлов')
    }
  }

  const handleAnalyzeFile = (file: FileItem) => {
    setSelectedFile(file)
    setShowAnalysisModal(true)
  }

  const handleCreateFolder = async (name: string, color: string, description?: string) => {
    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          color,
          description,
          parentId: selectedFolder
        })
      })

      if (response.ok) {
        toast.success('Папка создана')
        loadData()
        setShowCreateFolderModal(false)
      } else {
        throw new Error('Failed to create folder')
      }
    } catch (error) {
      console.error('Create folder error:', error)
      toast.error('Ошибка при создании папки')
    }
  }

  const getFileIcon = (mimeType: string, extension: string) => {
    if (mimeType?.startsWith('image/')) return <ImageIcon className="h-8 w-8 text-blue-500" />
    if (mimeType?.startsWith('video/')) return <Video className="h-8 w-8 text-red-500" />
    if (mimeType?.startsWith('audio/')) return <Music className="h-8 w-8 text-purple-500" />
    if (extension === 'pdf') return <FileText className="h-8 w-8 text-red-600" />
    if (['doc', 'docx'].includes(extension)) return <FileText className="h-8 w-8 text-blue-600" />
    if (['xls', 'xlsx'].includes(extension)) return <FileText className="h-8 w-8 text-green-600" />
    return <FileIcon className="h-8 w-8 text-gray-500" />
  }

  const getAnalysisStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge variant="secondary" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Проанализирован
        </Badge>
      case 'PROCESSING':
        return <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Анализируется
        </Badge>
      case 'FAILED':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          Ошибка
        </Badge>
      default:
        return <Badge variant="outline" className="flex items-center gap-1">
          <Brain className="h-3 w-3" />
          Ожидает анализа
        </Badge>
    }
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         file.keyTopics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'analyzed' && file.analysisStatus === 'COMPLETED') ||
                         (filterStatus === 'pending' && file.analysisStatus === 'PENDING') ||
                         (filterStatus === 'starred' && file.isStarred) ||
                         (filterStatus === 'archived' && file.isArchived)
    
    return matchesSearch && matchesFilter && !file.isArchived
  })

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">File Manager</h1>
            <p className="text-muted-foreground">
              Управление документами с AI анализом и умной организацией
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCreateFolderModal(true)}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Создать папку
            </Button>
            <Button onClick={() => setShowUploadModal(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Загрузить файлы
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск файлов, тегов, содержимого..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-md border border-border bg-background"
            >
              <option value="all">Все файлы</option>
              <option value="analyzed">Проанализированные</option>
              <option value="pending">Ожидают анализа</option>
              <option value="starred">Избранные</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-lg">Папки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedFolder === null ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedFolder(null)}
              >
                <Folder className="h-4 w-4 mr-2" />
                Все файлы
                <Badge variant="outline" className="ml-auto">
                  {files.length}
                </Badge>
              </Button>
              
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant={selectedFolder === folder.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <div 
                    className="h-4 w-4 mr-2 rounded"
                    style={{ backgroundColor: folder.color }}
                  />
                  {folder.name}
                  <Badge variant="outline" className="ml-auto">
                    {folder.fileCount}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {filteredFiles.length === 0 ? (
            <Card className="card-hover">
              <CardContent className="p-12 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Нет файлов</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Файлы не найдены по вашему запросу' : 'Загрузите первые файлы для анализа'}
                </p>
                <Button onClick={() => setShowUploadModal(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Загрузить файлы
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                : 'space-y-2'
            }>
              {filteredFiles.map((file) => (
                <Card key={file.id} className="card-hover group">
                  <CardContent className={
                    viewMode === 'grid' ? 'p-4' : 'p-4 flex items-center gap-4'
                  }>
                    {viewMode === 'grid' ? (
                      <>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getFileIcon(file.mimeType, file.extension)}
                            {file.isStarred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm line-clamp-2">{file.originalName}</h3>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.fileSize)} • {new Date(file.createdAt).toLocaleDateString('ru-RU')}
                          </p>
                          
                          {getAnalysisStatusBadge(file.analysisStatus)}
                          
                          {file.summary && (
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {file.summary}
                            </p>
                          )}
                          
                          {file.keyTopics.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {file.keyTopics.slice(0, 2).map((topic, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                              {file.keyTopics.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{file.keyTopics.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAnalyzeFile(file)}
                            disabled={file.analysisStatus === 'PROCESSING'}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Детали
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 flex-1">
                          {getFileIcon(file.mimeType, file.extension)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{file.originalName}</h3>
                              {file.isStarred && (
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(file.fileSize)} • {new Date(file.createdAt).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getAnalysisStatusBadge(file.analysisStatus)}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAnalyzeFile(file)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Детали
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <FileUploadModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        onUpload={handleFileUpload}
      />
      
      <FileAnalysisModal
        open={showAnalysisModal}
        onOpenChange={setShowAnalysisModal}
        file={selectedFile}
      />
      
      <CreateFolderModal
        open={showCreateFolderModal}
        onOpenChange={setShowCreateFolderModal}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  )
}
