import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Page429() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-3">
      <h3 className="text-lg font-medium">Algo deu errado</h3>
      <Link href="/" className={buttonVariants()}>
        Tentar novamente!
      </Link>
    </div>
  )
}
