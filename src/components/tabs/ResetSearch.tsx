import Link from 'next/link'
import { buttonVariants } from '../ui/button'

export function Reset({ tab }: { tab: string }) {
  return (
    <Link
      href={{
        href: '/',
        query: { tab },
      }}
      passHref={true}
      className={buttonVariants({ variant: 'ghost' })}
    >
      Resetar filtros
    </Link>
  )
}
