import React, { useState } from 'react'
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi'
import styles from './BaseInput.module.scss'

export interface BaseInputProps {
  type?: 'text' | 'password' | 'tel' | 'email' | 'number'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  className?: string
  disabled?: boolean
  required?: boolean
  maxLength?: number
  minLength?: number
  pattern?: string
  autoComplete?: string
  dir?: 'ltr' | 'rtl'
  prefix?: string
  suffix?: string
  showPasswordToggle?: boolean
  isPhoneInput?: boolean
  onBlur?: () => void
  onFocus?: () => void
  validationRules?: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: string) => string | null
  }
}

const BaseInput: React.FC<BaseInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  className = '',
  disabled = false,
  required = false,
  maxLength,
  minLength,
  pattern,
  autoComplete,
  dir = 'rtl',
  prefix,
  suffix,
  showPasswordToggle = false,
  isPhoneInput = false,
  onBlur,
  onFocus,
  validationRules
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [validationError, setValidationError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    // Apply type-specific formatting
    if (type === 'tel') {
      inputValue = formatPhoneNumber(inputValue)
    }

    onChange(inputValue)

    // Real-time validation
    if (validationRules) {
      const error = validateInput(inputValue)
      setValidationError(error || '')
    }
  }

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '')
    
    // For phone input, format as XXX XXX XXXX
    if (isPhoneInput) {
      if (phoneNumber.length <= 3) {
        return phoneNumber
      } else if (phoneNumber.length <= 6) {
        return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`
      } else {
        return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`
      }
    }
    
    // Default format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  const validateInput = (value: string): string | null => {
    if (!validationRules) return null

    const { required: isRequired, minLength, maxLength, pattern, custom } = validationRules

    // Required validation
    if (isRequired && !value.trim()) {
      return 'این فیلد الزامی است'
    }

    // Min length validation
    if (minLength && value.length < minLength) {
      return `حداقل ${minLength} کاراکتر باید وارد کنید`
    }

    // Max length validation
    if (maxLength && value.length > maxLength) {
      return `حداکثر ${maxLength} کاراکتر مجاز است`
    }

    // Pattern validation
    if (pattern && !pattern.test(value)) {
      return 'فرمت وارد شده صحیح نیست'
    }

    // Custom validation
    if (custom) {
      return custom(value)
    }

    return null
  }

  const handleBlur = () => {
    onBlur?.()
  }

  const handleFocus = () => {
    onFocus?.()
  }

  const getInputType = () => {
    if (type === 'password' && showPasswordToggle) {
      return showPassword ? 'text' : 'password'
    }
    return type
  }

  const displayError = error || validationError

  // For phone inputs, we need to handle placeholder direction properly
  const getPhonePlaceholder = () => {
    if (isPhoneInput && placeholder) {
      return placeholder
    }
    return placeholder
  }

  return (
    <div className={`${styles.inputGroup} ${isPhoneInput ? styles.phoneInputGroup : ''} ${className}`}>
      <div className={styles.inputWrapper}>
        {prefix && <span className={`${styles.prefix} ${isPhoneInput ? styles.phonePrefix : ''}`}>{prefix}</span>}
        
        <input
          type={getInputType()}
          className={`${styles.input} ${isPhoneInput ? styles.phoneInput : ''} ${isPhoneInput ? styles.phonePlaceholder : ''} ${type === 'password' ? styles.passwordInput : ''} ${displayError ? styles.error : ''}`}
          placeholder={getPhonePlaceholder()}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          dir={isPhoneInput ? 'ltr' : type === 'password' ? 'ltr' : dir}
        />
        
        {suffix && <span className={styles.suffix}>{suffix}</span>}
        
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className={`${styles.passwordToggle} ${styles.passwordInputToggle}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      
      <div className={styles.error}>
        {displayError && (
          <>
            <FiAlertCircle size={16} />
            {displayError}
          </>
        )}
      </div>
    </div>
  )
}

export default BaseInput
