'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import * as React from 'react'

export function TabHistorySearch() {
  const { replace } = useRouter()
  const [history, setHistory] = React.useState<
    { key: number; label: string; url: string }[]
  >([])

  React.useEffect(() => {
    const key = 'search-history'
    const stored = JSON.parse(localStorage.getItem(key) || '[]')
    setHistory(stored)
  }, [])

  function onReset() {
    localStorage.removeItem('search-history')
    setHistory([]) // forçar re-render
  }

  return (
    <div className="mt-8 space-y-1">
      <h2 className="mb-6">Histórico de busca</h2>

      {history.map((item) => (
        <p
          key={item.key}
          className="hover:bg-secondary mb-2 flex flex-col rounded-md text-sm md:flex-row md:gap-2 md:p-2"
          onClick={() => replace(item.url)}
        >
          <em className="text-muted-foreground">
            {formatDistanceToNow(new Date(item.key), {
              addSuffix: true,
              locale: ptBR,
            })}
            {'. '}
          </em>
          <Link href={item.url}>{item.label}</Link>
        </p>
      ))}

      {history.length > 0 ? (
        <Button
          onClick={onReset}
          className="mx-auto mt-6 cursor-pointer"
          variant="secondary"
        >
          Limpar histórico de busca
        </Button>
      ) : (
        <p className="text-muted-foreground">
          Você não tem histórico de busca.
        </p>
      )}
    </div>
  )
}
