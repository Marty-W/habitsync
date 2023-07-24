"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

const ThemeSelect = () => {
  const { setTheme, theme } = useTheme()
  return (
    <Select onValueChange={(value) => setTheme(value)}>
      <SelectTrigger className="h-full w-[80px]">
        <SelectValue placeholder={theme} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">light</SelectItem>
        <SelectItem value="dark">dark</SelectItem>
        <SelectItem value="system">system</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ThemeSelect
