'use client'

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    )
  }

  if (resolvedTheme === 'dark') {
    return <Moon onClick={() => setTheme('light')} className="cursor-pointer" />
  }

  if (resolvedTheme === 'light') {
    return <Sun onClick={() => setTheme('dark')} className="cursor-pointer" />
  }

  return null
}