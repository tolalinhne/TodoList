import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    loading?: boolean
    children: ReactNode
}

export default function Button({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled,
    children,
    className = '',
    ...props
}: ButtonProps) {
    const classes = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className,
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className={styles.spinner} />}
            {children}
        </button>
    )
}
