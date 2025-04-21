'use server'

import { baseUrls } from '@/lib/baseUrl'
import { fetcher } from '@/lib/fetcher'
import { mockCarBrands, mockCarModels, mockCarYears } from '@/lib/mock'
import { ApiResponse } from '@/lib/types'
import { normalize } from '@/lib/utils'

export async function getBrands(): ApiResponse {
  if (process.env.NODE_ENV !== 'production') {
    return normalize(mockCarBrands)
  }

  return normalize(await fetcher(baseUrls.car, 'marcas'))
}

export async function getModels(brandCode?: string): ApiResponse {
  if (process.env.NODE_ENV !== 'production') {
    return normalize(mockCarModels.modelos)
  }

  if (!brandCode) return []

  return normalize(
    await fetcher(baseUrls.car, `marcas/${brandCode}/modelos`).then(
      (res) => res.modelos,
    ),
  )
}

export async function getYears(
  brandCode?: string,
  modelCode?: string,
): ApiResponse {
  if (process.env.NODE_ENV !== 'production') {
    return normalize(mockCarYears)
  }

  if (!brandCode || !modelCode) return []

  return normalize(
    await fetcher(
      baseUrls.car,
      `marcas/${brandCode}/modelos/${modelCode}/anos`,
    ),
  )
}
