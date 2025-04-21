'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Option = {
  value: string
  label: string
}

interface Props {
  idParam: string
  options: Option[]
}

export function Combobox({ idParam, options }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [value, setValue] = React.useState('')

  const paramsAvailable = ['tab', 'brand', 'model', 'year']

  // controla a renderização do componente e evita layout shift
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // controla os valores dos inputs
  React.useEffect(() => {
    const selected = options.find(
      (option) => option.value === searchParams.get(idParam),
    )
    setValue(selected?.value || '')
  }, [searchParams, idParam, options])

  // controla os parametros da url
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (value) {
      params.set(idParam, value)
      // Se for brand, remove model e year
      if (idParam === 'brand') {
        params.delete('model')
        params.delete('year')
      }

      // Se for model, remove year
      if (idParam === 'model') {
        params.delete('year')
      }

      params.set(idParam, value)
    } else {
      params.delete(idParam)
    }

    // Reordena os params
    const orderedParams = new URLSearchParams()
    for (const key of paramsAvailable) {
      const param = params.get(key)
      if (param) {
        orderedParams.set(key, param)
      }
    }

    replace(`${pathname}?${orderedParams.toString()}`)
  }, [value])

  if (!mounted) {
    return <div className="bg-secondary h-9 w-full animate-pulse rounded-md" />
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : 'Selecionar opção...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[90vw] p-0 md:min-w-xl">
        <Command shouldFilter={true}>
          <CommandInput placeholder="Pesquisar..." />
          <CommandList>
            <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={() => {
                    setValue(option.value === value ? '' : option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
