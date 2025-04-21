'use server'

import { baseUrl } from '@/lib/baseUrl'
import { fetcher } from '@/lib/fetcher'
import { ApiResponse, VehicleDetailsType, VehicleType } from '@/lib/types'
import { normalize } from '@/lib/utils'

export async function getBrands(vehicleType: VehicleType): ApiResponse {
  return normalize(await fetcher([baseUrl, vehicleType, 'brands'], ['brands']))
}

export async function getModels(
  vehicleType: VehicleType,
  brandCode?: string,
): ApiResponse {
  if (!brandCode) return []

  return normalize(
    await fetcher(
      [baseUrl, vehicleType, 'brands', brandCode, 'models'],
      ['models', brandCode],
    ),
  )
}

export async function getYears(
  vehicleType: VehicleType,
  brandCode?: string,
  modelCode?: string,
): ApiResponse {
  if (!brandCode || !modelCode) return []

  const years = normalize(
    await fetcher(
      [baseUrl, vehicleType, 'brands', brandCode, 'models', modelCode, 'years'],
      ['years', brandCode, modelCode],
    ),
  )

  const anoAtual = new Date().getFullYear()

  return years.filter(({ code }) => {
    const ano = parseInt(code.split('-')[0], 10)
    return ano >= 1980 && ano <= anoAtual + 1
  })
}

export async function getDetails(
  vehicleType: VehicleType,
  brandCode: string,
  modelCode: string,
  yearCode: string,
): Promise<VehicleDetailsType> {
  return fetcher(
    [
      baseUrl,
      vehicleType,
      'brands',
      brandCode,
      'models',
      modelCode,
      'years',
      yearCode,
    ],
    ['details', brandCode, modelCode, yearCode],
  )
}
