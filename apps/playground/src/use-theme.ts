import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'denseui-theme'
const listeners = new Set<() => void>()

function apply(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
}

const stored = localStorage.getItem(STORAGE_KEY)
apply(stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches)

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = () => document.documentElement.classList.contains('dark')

function setDark(dark: boolean) {
  apply(dark)
  localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
  listeners.forEach((listener) => listener())
}

export function useDarkMode() {
  return [useSyncExternalStore(subscribe, getSnapshot), setDark] as const
}
