'use client'

import React from 'react'
import styles from './BaseButton.module.scss'

interface BaseButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  isLoading?: boolean
  loadingText?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  className?: string
  fullWidth?: boolean
}

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  loadingText,
  variant = 'primary',
  size = 'medium',
  className = '',
  fullWidth = false
}) => {
  const buttonClasses = [
    styles.baseButton,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <>
          <span className={styles.loading}></span>
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default BaseButton
