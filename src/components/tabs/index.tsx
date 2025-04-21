'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

type TabItem = {
  label: string
  value: string
  content: React.ReactNode
}

type AppTabsProps = {
  id: string
  items: TabItem[]
}

export function AppTabs({ id, items }: AppTabsProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const selected = useMemo(() => {
    const current = searchParams.get(id)
    return items.find((item) => item.value === current)?.value ?? items[0].value
  }, [searchParams, id, items])

  useEffect(() => {
    if (!searchParams.get(id)) {
      const params = new URLSearchParams()
      params.set(id, selected)
      replace(`${pathname}?${params.toString()}`)
    }
  }, [])

  const handleChange = (value: string) => {
    const params = new URLSearchParams()
    params.set(id, value)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Tabs value={selected} onValueChange={handleChange}>
      <div className="no-scrollbar flex justify-between overflow-x-scroll">
        <TabsList>
          {items.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}
