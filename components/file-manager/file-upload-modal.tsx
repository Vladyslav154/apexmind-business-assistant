
'use client'

import { useState, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Upload, 
  X, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  File as FileIcon,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface FileUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpload: (files: File[]) => Promise<void>
}

interface UploadFile {
  id: string
  file: File
  status: 'pending' | 'uploading' | 'completed' | 'error'
  progress: number
  error?: string
}

export function FileUploadModal({ open, onOpenChange, onUpload }: FileUploadModalProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file: file,
      status: 'pending' as const,
      progress: 0
    }))
    setFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt'],
      'text/csv': ['.csv'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv'],
      'audio/*': ['.mp3', '.wav', '.ogg']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true
  })

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    
    try {
      // Update files to uploading status
      setFiles(prev => prev.map(f => ({ ...f, status: 'uploading' as const })))
      
      // Simulate upload progress (in real implementation, you'd track actual progress)
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map(f => 
          f.status === 'uploading' 
            ? { ...f, progress: Math.min(f.progress + 10, 90) }
            : f
        ))
      }, 200)

      // Convert to actual File objects for upload
      const filesToUpload = files.map(f => f.file)

      await onUpload(filesToUpload)
      
      clearInterval(progressInterval)
      
      // Mark all as completed
      setFiles(prev => prev.map(f => ({ 
        ...f, 
        status: 'completed' as const, 
        progress: 100 
      })))

      // Close modal after a short delay
      setTimeout(() => {
        onOpenChange(false)
        setFiles([])
      }, 1000)

    } catch (error) {
      console.error('Upload error:', error)
      setFiles(prev => prev.map(f => ({ 
        ...f, 
        status: 'error' as const,
        error: 'Ошибка загрузки'
      })))
    } finally {
      setIsUploading(false)
    }
  }

  const getFileIcon = (uploadFile: UploadFile) => {
    const type = uploadFile.file.type
    if (type.startsWith('image/')) return <ImageIcon className="h-6 w-6 text-blue-500" />
    if (type.startsWith('video/')) return <Video className="h-6 w-6 text-red-500" />
    if (type.startsWith('audio/')) return <Music className="h-6 w-6 text-purple-500" />
    if (type === 'application/pdf') return <FileText className="h-6 w-6 text-red-600" />
    if (type.includes('word') || type.includes('document')) return <FileText className="h-6 w-6 text-blue-600" />
    if (type.includes('excel') || type.includes('spreadsheet')) return <FileText className="h-6 w-6 text-green-600" />
    return <FileIcon className="h-6 w-6 text-gray-500" />
  }

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getSupportedFormats = () => [
    'PDF документы',
    'Word документы (DOC, DOCX)',
    'Excel таблицы (XLS, XLSX)',
    'Текстовые файлы (TXT, CSV)',
    'Изображения (PNG, JPG, GIF)',
    'Видео (MP4, MOV, AVI)',
    'Аудио (MP3, WAV, OGG)'
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Загрузить файлы</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-secondary bg-secondary/10' 
                : 'border-border hover:border-secondary/50 hover:bg-secondary/5'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium text-secondary">Отпустите файлы для загрузки</p>
            ) : (
              <>
                <p className="text-lg font-medium mb-2">
                  Перетащите файлы сюда или кликните для выбора
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Максимальный размер файла: 50MB
                </p>
              </>
            )}
          </div>

          {/* Supported Formats */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-2">Поддерживаемые форматы:</h4>
            <div className="grid grid-cols-2 gap-2">
              {getSupportedFormats().map((format, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {format}
                </div>
              ))}
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              <h4 className="font-medium">Файлы для загрузки ({files.length}):</h4>
              {files.map((uploadFile) => (
                <div key={uploadFile.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="flex items-center gap-3 flex-1">
                    {getFileIcon(uploadFile)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{uploadFile.file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(uploadFile.file.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {uploadFile.status === 'pending' && (
                      <Badge variant="outline">Ожидает</Badge>
                    )}
                    {uploadFile.status === 'uploading' && (
                      <div className="flex items-center gap-2">
                        <Progress value={uploadFile.progress} className="w-16" />
                        <span className="text-xs text-muted-foreground">{uploadFile.progress}%</span>
                      </div>
                    )}
                    {uploadFile.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {uploadFile.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}

                    {!isUploading && uploadFile.status !== 'completed' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadFile.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
              Отмена
            </Button>
            <div className="flex gap-2">
              {files.length > 0 && !isUploading && (
                <Button variant="outline" onClick={() => setFiles([])}>
                  Очистить
                </Button>
              )}
              <Button 
                onClick={handleUpload} 
                disabled={files.length === 0 || isUploading}
              >
                {isUploading ? 'Загружается...' : `Загрузить (${files.length})`}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
