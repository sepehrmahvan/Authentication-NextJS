# سیستم احراز هویت با localStorage

## توضیحات
این سیستم احراز هویت از localStorage برای ذخیره شماره تلفن کاربر استفاده می‌کند و شامل کامپوننت‌های زیر است:

## کامپوننت‌ها

### 1. ClientWrapper
- **مسیر**: `components/ClientWrapper/ClientWrapper.tsx`
- **نوع**: Client Component
- **وظیفه**: wrapper برای کامپوننت‌هایی که نیاز به دسترسی به localStorage دارند

### 2. Auth
- **مسیر**: `components/Auth/Auth.tsx`
- **نوع**: Client Component
- **وظیفه**: بررسی احراز هویت کاربر و redirect به صفحه لاگین در صورت عدم احراز هویت

### 3. localStorage Utils
- **مسیر**: `utils/localStorage.ts`
- **وظیفه**: توابع کمکی برای مدیریت localStorage

## نحوه کارکرد

### صفحه لاگین (`/login`)
- کاربر شماره تلفن و رمز عبور را وارد می‌کند
- پس از احراز هویت موفق، شماره تلفن در localStorage ذخیره می‌شود
- کاربر به صفحه داشبورد (`/home`) redirect می‌شود

### صفحه داشبورد (`/home`)
- فقط برای کاربران احراز هویت شده قابل دسترسی است
- شماره تلفن کاربر نمایش داده می‌شود
- امکان خروج از حساب کاربری

### صفحه اصلی (`/`)
- به صفحه داشبورد redirect می‌شود

## محافظت از مسیرها
تمام صفحات توسط کامپوننت `Auth` محافظت می‌شوند:
- اگر شماره تلفن در localStorage موجود باشد → اجازه دسترسی
- اگر شماره تلفن موجود نباشد → redirect به `/login`

## توابع localStorage

```typescript
// ذخیره شماره تلفن
localStorageUtils.setUserPhone(phone: string)

// دریافت شماره تلفن
localStorageUtils.getUserPhone(): string | null

// حذف شماره تلفن (خروج)
localStorageUtils.removeUserPhone()

// بررسی احراز هویت
localStorageUtils.isAuthenticated(): boolean
```

## نکات مهم
- تمام کامپوننت‌های client-side با `'use client'` مشخص شده‌اند
- سیستم از Next.js App Router استفاده می‌کند
- از react-toastify برای نمایش پیام‌ها استفاده می‌شود 