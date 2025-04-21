'use client'

import { Button } from '@/components/ui/button'
import { VehicleType } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  type: VehicleType
  disabled?: boolean
}

export function ResetFiltersButton({ type, disabled }: Props) {
  const pathname = usePathname()
  const { replace } = useRouter()

  const onReset = () => {
    const params = new URLSearchParams()
    params.set('tab', type)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Button onClick={onReset} disabled={disabled}>
      Limpar filtros
    </Button>
  )
}
