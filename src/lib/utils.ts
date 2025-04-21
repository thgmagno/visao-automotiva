import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalize(values: { codigo: string | number; nome: string }[]) {
  return values.map((value) => ({
    codigo: String(value.codigo),
    nome: String(value.nome)
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '),
  }))
}
