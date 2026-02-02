import { useState, useEffect } from 'react'
import Modal from '@/components/common/Modal'
import Button from '@/components/common/Button'
import { Input, Textarea, Select } from '@/components/common/Input'
import { taskStorage, categoryStorage } from '@/services/storage'
import type { Category, TaskPriority, TaskStatus } from '@/types'

interface CreateTaskModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess?: () => void
}

export default function CreateTaskModal({ isOpen, onClose, onSuccess }: CreateTaskModalProps) {
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        categoryId: '',
        priority: '' as TaskPriority | '',
    })
    const [error, setError] = useState('')

    useEffect(() => {
        if (isOpen) {
            loadCategories()
        }
    }, [isOpen])

    const loadCategories = () => {
        const cats = categoryStorage.getAll()
        setCategories(cats)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!formData.title.trim()) {
            setError('Title is required')
            return
        }

        setLoading(true)
        try {
            const category = formData.categoryId
                ? categoryStorage.getById(Number(formData.categoryId)) || null
                : null

            taskStorage.create({
                title: formData.title,
                description: formData.description,
                status: 'TODO' as TaskStatus,
                priority: formData.priority || null,
                dueDate: formData.dueDate || null,
                category,
                user: null,
            })

            setFormData({ title: '', description: '', dueDate: '', categoryId: '', priority: '' })
            onSuccess?.()
            onClose()
        } catch (err) {
            setError('Failed to create task. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Issue"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button loading={loading} onClick={handleSubmit}>
                        Create Issue
                    </Button>
                </>
            }
        >
            <form onSubmit={handleSubmit}>
                <Input
                    label="Title"
                    placeholder="Issue title"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    error={error && !formData.title ? 'Title is required' : undefined}
                    autoFocus
                />

                <Textarea
                    label="Description"
                    placeholder="Add a description..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <Select
                        label="Priority"
                        value={formData.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                    >
                        <option value="">No priority</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                    </Select>

                    <Select
                        label="Category"
                        value={formData.categoryId}
                        onChange={(e) => handleChange('categoryId', e.target.value)}
                    >
                        <option value="">No category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <Input
                    label="Due Date"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange('dueDate', e.target.value)}
                />

                {error && (
                    <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
                        {error}
                    </p>
                )}
            </form>
        </Modal>
    )
}
