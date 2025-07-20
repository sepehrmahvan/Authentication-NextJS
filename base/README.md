# BaseInput Component

A reusable, customizable input component that supports various input types, validation, and styling options.

## Features

- **Multiple Input Types**: text, password, tel, email, number
- **Built-in Validation**: required, min/max length, pattern matching, custom validation
- **Phone Number Formatting**: Automatic formatting for Iranian phone numbers
- **Password Toggle**: Show/hide password functionality
- **Prefix/Suffix Support**: Add text before or after the input
- **RTL Support**: Right-to-left text direction support
- **Error Handling**: Built-in error display with customizable messages
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Responsive Design**: Mobile-friendly with touch-optimized interactions

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'password' \| 'tel' \| 'email' \| 'number'` | `'text'` | Input type |
| `value` | `string` | - | Input value (required) |
| `onChange` | `(value: string) => void` | - | Change handler (required) |
| `placeholder` | `string` | - | Placeholder text |
| `error` | `string` | - | External error message |
| `className` | `string` | `''` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Disable the input |
| `required` | `boolean` | `false` | Mark as required |
| `maxLength` | `number` | - | Maximum character length |
| `minLength` | `number` | - | Minimum character length |
| `pattern` | `string` | - | HTML pattern attribute |
| `autoComplete` | `string` | - | Autocomplete attribute |
| `dir` | `'ltr' \| 'rtl'` | `'rtl'` | Text direction |
| `prefix` | `string` | - | Text to show before input |
| `suffix` | `string` | - | Text to show after input |
| `showPasswordToggle` | `boolean` | `false` | Show password visibility toggle |
| `onBlur` | `() => void` | - | Blur event handler |
| `onFocus` | `() => void` | - | Focus event handler |
| `validationRules` | `ValidationRules` | - | Validation configuration |

### ValidationRules

```typescript
interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}
```

## Usage Examples

### Basic Text Input

```tsx
<BaseInput
  type="text"
  value={name}
  onChange={setName}
  placeholder="نام و نام خانوادگی"
  validationRules={{
    required: true,
    minLength: 3
  }}
/>
```

### Phone Number Input

```tsx
<BaseInput
  type="tel"
  value={phone}
  onChange={setPhone}
  placeholder="شماره تلفن"
  prefix="98+"
  maxLength={14}
  autoComplete="tel"
  validationRules={{
    required: true,
    custom: validatePhoneNumber
  }}
/>
```

### Password Input with Toggle

```tsx
<BaseInput
  type="password"
  value={password}
  onChange={setPassword}
  placeholder="رمز عبور"
  showPasswordToggle={true}
  autoComplete="current-password"
  validationRules={{
    required: true,
    minLength: 6,
    maxLength: 50
  }}
/>
```

### Email Input with Custom Validation

```tsx
const validateEmail = (email: string): string | null => {
  if (!email) return 'ایمیل الزامی است'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'فرمت ایمیل صحیح نیست'
  return null
}

<BaseInput
  type="email"
  value={email}
  onChange={setEmail}
  placeholder="ایمیل"
  autoComplete="email"
  validationRules={{
    required: true,
    custom: validateEmail
  }}
/>
```

### Number Input with Suffix

```tsx
<BaseInput
  type="number"
  value={age}
  onChange={setAge}
  placeholder="سن"
  suffix="سال"
  validationRules={{
    required: true,
    custom: (value) => {
      const numAge = parseInt(value)
      if (numAge < 18) return 'سن باید حداقل ۱۸ سال باشد'
      return null
    }
  }}
/>
```

### Disabled Input

```tsx
<BaseInput
  type="text"
  value="غیرقابل تغییر"
  onChange={() => {}}
  placeholder="فیلد غیرفعال"
  disabled={true}
/>
```

## Custom Validation

You can create custom validation functions that return either an error message (string) or null for valid input:

```tsx
const validateIranianPhone = (phone: string): string | null => {
  const cleanNumber = phone.replace(/\D/g, '')
  
  if (!cleanNumber) return 'شماره تلفن الزامی است'
  if (cleanNumber.length !== 10) return 'شماره تلفن باید ۱۰ رقم باشد'
  if (cleanNumber.startsWith('0')) return 'شماره موبایل نباید با صفر شروع شود'
  
  // Check Iranian mobile codes
  const validCodes = ['910', '911', '912', '913', '914', '915', '916', '917', '918', '919']
  const code = cleanNumber.slice(0, 3)
  if (!validCodes.includes(code)) return 'کد موبایل نامعتبر است'
  
  return null
}
```

## Styling

The component uses CSS modules and supports custom styling through the `className` prop. The main CSS classes are:

- `.inputGroup` - Container wrapper
- `.input` - The actual input element
- `.prefix` - Prefix text styling
- `.suffix` - Suffix text styling
- `.passwordToggle` - Password visibility toggle button
- `.error` - Error message styling

## Accessibility

The component includes proper accessibility features:

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Error announcements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- RTL language support
- Touch device optimization 