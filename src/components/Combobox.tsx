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
import clsx from 'clsx'

type Option = {
  value: string
  label: string
}

interface Props {
  idParam: string
  options: Option[]
  dropdownSize?: 'sm' | 'md' | 'lg'
}

export function Combobox({ idParam, options, dropdownSize = 'sm' }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const selected = options.find(
      (option) => option.value === searchParams.get(idParam),
    )
    setValue(selected?.value || '')
  }, [searchParams, idParam, options])

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(idParam, value)
    } else {
      params.delete(idParam)
    }
    replace(`${pathname}?${params.toString()}`)
  }, [value])

  if (!mounted) {
    return (
      <div className="bg-secondary h-9 w-full animate-pulse rounded-md md:w-44" />
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between md:w-fit"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : 'Selecionar opção...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={clsx('w-[90vw] p-0', {
          'md:max-w-[200px]': dropdownSize === 'sm',
          'md:max-w-[240px]': dropdownSize === 'md',
          'md:max-w-sm': dropdownSize === 'lg',
        })}
      >
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
