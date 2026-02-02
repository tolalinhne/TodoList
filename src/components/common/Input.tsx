import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react'
import styles from './Input.module.css'

interface BaseInputProps {
    label?: string
    error?: string
    helperText?: string
}

// Text Input
interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps { }

export function Input({ label, error, helperText, className = '', ...props }: InputProps) {
    return (
        <div className={styles.formGroup}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={`${styles.input} ${error ? styles.error : ''} ${className}`}
                {...props}
            />
            {error && <p className={styles.errorText}>{error}</p>}
            {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
        </div>
    )
}

// Textarea
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps { }

export function Textarea({ label, error, helperText, className = '', ...props }: TextareaProps) {
    return (
        <div className={styles.formGroup}>
            {label && <label className={styles.label}>{label}</label>}
            <textarea
                className={`${styles.input} ${styles.textarea} ${error ? styles.error : ''} ${className}`}
                {...props}
            />
            {error && <p className={styles.errorText}>{error}</p>}
            {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
        </div>
    )
}

// Select
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseInputProps {
    children: ReactNode
}

export function Select({ label, error, helperText, children, className = '', ...props }: SelectProps) {
    return (
        <div className={styles.formGroup}>
            {label && <label className={styles.label}>{label}</label>}
            <select
                className={`${styles.input} ${styles.select} ${error ? styles.error : ''} ${className}`}
                {...props}
            >
                {children}
            </select>
            {error && <p className={styles.errorText}>{error}</p>}
            {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
        </div>
    )
}
