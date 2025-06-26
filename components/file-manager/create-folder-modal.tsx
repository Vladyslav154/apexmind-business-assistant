
'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FolderPlus } from 'lucide-react'

interface CreateFolderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateFolder: (name: string, color: string, description?: string) => void
}

const predefinedColors = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280'  // Gray
]

export function CreateFolderModal({ open, onOpenChange, onCreateFolder }: CreateFolderModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0])
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) return

    setIsCreating(true)
    
    try {
      await onCreateFolder(name.trim(), selectedColor, description.trim() || undefined)
      
      // Reset form
      setName('')
      setDescription('')
      setSelectedColor(predefinedColors[0])
    } catch (error) {
      console.error('Create folder error:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handleClose = () => {
    if (!isCreating) {
      onOpenChange(false)
      // Reset form when closing
      setName('')
      setDescription('')
      setSelectedColor(predefinedColors[0])
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-secondary" />
            Создать новую папку
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Folder Name */}
          <div className="space-y-2">
            <Label htmlFor="folder-name">Название папки</Label>
            <Input
              id="folder-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название папки"
              required
              disabled={isCreating}
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label>Цвет папки</Label>
            <div className="flex flex-wrap gap-2">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  disabled={isCreating}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? 'border-foreground scale-110 shadow-lg'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: selectedColor }}
              />
              Выбранный цвет: {selectedColor}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="folder-description">Описание (необязательно)</Label>
            <Textarea
              id="folder-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткое описание назначения папки"
              rows={3}
              disabled={isCreating}
            />
          </div>

          {/* Preview */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-2">Предварительный просмотр:</h4>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background border">
              <div 
                className="w-6 h-6 rounded"
                style={{ backgroundColor: selectedColor }}
              />
              <div className="flex-1">
                <p className="font-medium">{name || 'Название папки'}</p>
                {description && (
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isCreating}
            >
              Отмена
            </Button>
            <Button 
              type="submit" 
              disabled={!name.trim() || isCreating}
            >
              {isCreating ? 'Создается...' : 'Создать папку'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
