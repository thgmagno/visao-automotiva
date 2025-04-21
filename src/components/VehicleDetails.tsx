'use client'

import { actions } from '@/actions'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PriceHistoryType, VehicleDetailsType, VehicleType } from '@/lib/types'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface Props {
  details: VehicleDetailsType
  yearCode: string
}

const vehicleTypes: Record<string, string> = {
  '1': 'Carro',
  '2': 'Moto',
  '3': 'Caminhão',
}

const vehicleToString: Record<string, VehicleType> = {
  '1': 'cars',
  '2': 'motorcycles',
  '3': 'trucks',
}

export function VehicleDetails({ details, yearCode }: Props) {
  const [dataPrice, setDataPrice] = useState<PriceHistoryType | null>(null)

  useEffect(() => {
    const fetchPriceHistory = async () => {
      const res = await actions.vehicles.getPriceHistory(
        vehicleToString[details.vehicleType.toString()],
        details.codeFipe,
        yearCode,
      )
      setDataPrice({
        ...res,
        priceHistory: [...res.priceHistory].reverse(), // inverte os dados
      })
    }

    fetchPriceHistory()
  }, [details])

  return (
    <AnimatePresence mode="wait">
      <div className="mx-auto mt-6 flex max-w-7xl flex-col items-center gap-6 px-4 xl:flex-row xl:items-start">
        <motion.div
          key={`${details.brand}-${details.model}-${details.modelYear}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bg-card w-full max-w-xl flex-1 space-y-3 rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-muted-foreground mb-4 text-center text-2xl font-bold">
            Detalhes do veículo
          </h2>
          <Detail
            label="Tipo"
            value={vehicleTypes[details.vehicleType.toString()]}
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

        {dataPrice && (
          <motion.div
            key={`${details.model}-${details.modelYear}-history-price`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="bg-card w-full max-w-xl space-y-3 rounded-2xl p-6 shadow-xl xl:max-w-sm"
          >
            <h3 className="text-muted-foreground text-center text-2xl font-bold xl:text-xl">
              Histórico de Preços
            </h3>
            <ChartContainer config={{}}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dataPrice.priceHistory}>
                  <XAxis dataKey="month" />
                  <YAxis domain={['dataMin - 100', 'dataMax + 100']} />
                  <Tooltip
                    content={<ChartTooltipContent label="Preço" />}
                    formatter={(value: number) =>
                      value.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="priceNumeric"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  const firstUppercase = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

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
