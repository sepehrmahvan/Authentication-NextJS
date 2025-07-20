'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../styles/Login.module.scss'
import BaseInput from '../../../base/BaseInput/BaseInput'
import BaseButton from '../../../base/BaseButton/BaseButton'
import MobileCodes from '../utils/MobileCodes'
import { toastConfig, errorToastConfig } from '../../../utils/toastConfig'
import { localStorageUtils } from '../../../utils/localStorage'

const Login = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const validatePhoneNumber = (phoneNumber: string): string | null => {
    // Remove formatting for validation
    const cleanNumber = phoneNumber.replace(/\D/g, '')
    
    if (!cleanNumber) {
      return 'شماره تلفن الزامی است'
    }
    
    if (cleanNumber.length < 10) {
      return 'شماره تلفن باید حداقل ۱۰ رقم باشد'
    }
    
    if (cleanNumber.length > 10) {
      return 'شماره تلفن نباید بیشتر از ۱۰ رقم باشد'
    }
    
    if (cleanNumber.startsWith('0')) {
      return 'شماره موبایل نباید با صفر شروع شود'
    }
    
    // Check mobile code
    if (cleanNumber.length >= 3) {
      const firstThreeDigits = cleanNumber.slice(0, 3)
      if (!MobileCodes.includes(firstThreeDigits)) {
        return 'کد موبایل نامعتبر است'
      }
    }
    
    // Check if all digits are the same
    if (cleanNumber.length >= 2) {
      const allSame = cleanNumber.split('').every(digit => digit === cleanNumber[0])
      if (allSame) {
        return 'شماره تلفن نمی‌تواند همه ارقام یکسان باشد'
      }
    }
    
    return null
  }

  const validatePassword = (password: string): string | null => {
    if (!password) {
      return 'رمز عبور الزامی است'
    }
    
    if (password.length < 6) {
      return 'رمز عبور باید حداقل ۶ کاراکتر باشد'
    }
    
    if (password.length > 50) {
      return 'رمز عبور نباید بیشتر از ۵۰ کاراکتر باشد'
    }
    
    // Optional: Add more password validation rules
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    
    if (!hasLetter || !hasNumber) {
      return 'رمز عبور باید شامل حروف و اعداد باشد'
    }
    
    return null
  }

  const validateForm = (): boolean => {
    const phoneError = validatePhoneNumber(formData.phone)
    const passwordError = validatePassword(formData.password)
    
    const newErrors: { phone?: string; password?: string } = {}
    
    if (phoneError) {
      newErrors.phone = phoneError
    }
    
    if (passwordError) {
      newErrors.password = passwordError
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Save phone number to local storage
      localStorageUtils.setUserPhone(formData.phone)
      
      // Handle successful login here
      toast.success('ورود موفقیت‌آمیز بود!', toastConfig)
      
      // Redirect to dashboard after successful login
      router.push('/')
      
    } catch (error) {
      setErrors({ 
        phone: 'شماره تلفن یا رمز عبور اشتباه است',
        password: 'شماره تلفن یا رمز عبور اشتباه است'
      })
      toast.error('خطا در ورود. لطفاً دوباره تلاش کنید.', errorToastConfig)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer} dir="rtl">
      <div className={styles.loginCard}>
        <h1 className={styles.title}>خوش آمدید</h1>
        <p className={styles.subtitle}>به حساب کاربری خود وارد شوید</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.inputTitle}>شماره تلفن</p>
          <BaseInput
            type="tel"
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            placeholder="(XXX) XXX XXXX"
            error={errors.phone}
            prefix="98+"
            maxLength={14}
            autoComplete="tel"
            isPhoneInput={true}
            validationRules={{
              required: true,
              custom: validatePhoneNumber
            }}
          />

          <p className={styles.inputTitle}>رمز عبور</p>
          <BaseInput
            type="password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            placeholder="**********"
            error={errors.password}
            showPasswordToggle={true}
            autoComplete="current-password"
            validationRules={{
              required: true,
              minLength: 6,
              maxLength: 50,
              custom: validatePassword
            }}
          />

          <div className={styles.forgotPassword}>
            <a href="#" onClick={(e) => e.preventDefault()}>
              رمز عبور را فراموش کرده‌اید؟
            </a>
          </div>

          <BaseButton
            type="submit"
            isLoading={isLoading}
            loadingText="در حال ورود..."
            variant="primary"
            size="medium"
            fullWidth={true}
          >
            ورود
          </BaseButton>
        </form>

        <div className={styles.signupLink}>
          حساب کاربری ندارید؟
          <a href="#" onClick={(e) => e.preventDefault()}>
            ثبت نام کنید
          </a>
        </div>
      </div>
    </div>
  )
}

export default Login