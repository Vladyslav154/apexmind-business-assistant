
'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  File as FileIcon,
  Brain,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface RecentFile {
  id: string
  originalName: string
  extension: string
  mimeType: string
  analysisStatus: string
  createdAt: string
  summary?: string
}

export function RecentFiles() {
  const { data: session } = useSession()
  const [files, setFiles] = useState<RecentFile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.email) {
      fetchRecentFiles()
    }
  }, [session])

  const fetchRecentFiles = async () => {
    try {
      const response = await fetch('/api/files?limit=5')
      if (response.ok) {
        const data = await response.json()
        setFiles(data.slice(0, 4)) // Show only 4 files
      }
    } catch (error) {
      console.error('Failed to fetch recent files:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getFileIcon = (mimeType: string, extension: string) => {
    if (mimeType?.startsWith('image/')) return <ImageIcon className="h-4 w-4 text-blue-500" />
    if (mimeType?.startsWith('video/')) return <Video className="h-4 w-4 text-red-500" />
    if (mimeType?.startsWith('audio/')) return <Music className="h-4 w-4 text-purple-500" />
    if (extension === 'pdf') return <FileText className="h-4 w-4 text-red-600" />
    if (['doc', 'docx'].includes(extension)) return <FileText className="h-4 w-4 text-blue-600" />
    if (['xls', 'xlsx'].includes(extension)) return <FileText className="h-4 w-4 text-green-600" />
    return <FileIcon className="h-4 w-4 text-gray-500" />
  }

  const getAnalysisStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge variant="secondary" className="text-xs">
          <CheckCircle className="h-3 w-3 mr-1" />
          Готов
        </Badge>
      case 'PROCESSING':
        return <Badge variant="outline" className="text-xs">
          <Clock className="h-3 w-3 mr-1" />
          Анализ
        </Badge>
      case 'FAILED':
        return <Badge variant="destructive" className="text-xs">
          <AlertCircle className="h-3 w-3 mr-1" />
          Ошибка
        </Badge>
      default:
        return <Badge variant="outline" className="text-xs">
          <Brain className="h-3 w-3 mr-1" />
          Ожидает
        </Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-4 w-4 bg-muted rounded"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-6">
        <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground mb-4">
          Загрузите первые файлы для анализа
        </p>
        <Link href="/file-manager">
          <Button variant="outline" size="sm">
            Перейти к File Manager
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getFileIcon(file.mimeType, file.extension)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.originalName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(file.createdAt).toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getAnalysisStatusBadge(file.analysisStatus)}
          </div>
        </div>
      ))}
      
      <Link href="/file-manager">
        <Button variant="outline" className="w-full mt-4">
          Посмотреть все файлы
        </Button>
      </Link>
    </div>
  )
}
