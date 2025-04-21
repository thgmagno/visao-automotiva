import Image from 'next/image'

export function Logotipo() {
  return (
    <div className="mb-8 flex items-center gap-2 border-b pb-2">
      <Image src="/car.svg" height={40} width={40} alt="Logo" />
      <h3 className="text-xl font-medium tracking-wider">Visão Automotiva</h3>
    </div>
  )
}
