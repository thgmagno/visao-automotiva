'use client'

import { VehicleDetailsType } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'

export function VehicleDetails({ details }: { details: VehicleDetailsType }) {
  const vehicleTypes = {
    '1': 'Carro',
    '2': 'Moto',
    '3': 'Caminhão',
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${details.brand}-${details.model}-${details.modelYear}`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-card mx-auto mt-6 max-w-xl space-y-3 rounded-2xl p-6 shadow-xl"
      >
        <h2 className="text-muted-foreground mb-4 text-center text-2xl font-bold">
          Detalhes do veículo
        </h2>
        <Detail
          label="Tipo"
          value={
            vehicleTypes[details.vehicleType.toString() as '1' | '2' | '3']
          }
        />
        <Detail label="Preço" value={details.price} />
        <Detail label="Marca" value={details.brand} />
        <Detail label="Modelo" value={details.model} />
        <Detail label="Ano" value={details.modelYear.toString()} />
        <Detail label="Combustível" value={details.fuel} />
        <Detail label="Código FIPE" value={details.codeFipe} />
        <Detail label="Mês de referência" value={details.referenceMonth} />
        <Detail label="Sigla do combustível" value={details.fuelAcronym} />
      </motion.div>
    </AnimatePresence>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  const firstUppercase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-between gap-2 pb-1 last:border-none md:flex-row md:items-center md:border-b md:pb-3"
    >
      <b>{label}</b>
      <span>{firstUppercase(value)}</span>
    </motion.div>
  )
}
