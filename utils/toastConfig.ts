import { ToastOptions } from 'react-toastify'

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  rtl: true,
  theme: "light"
}

export const errorToastConfig: ToastOptions = {
  ...toastConfig,
  autoClose: 4000
} 