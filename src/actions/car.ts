'use server'

import { baseUrls } from '@/lib/baseUrl'
import { fetcher } from '@/lib/fetcher'
import { ApiResponse } from '@/lib/types'
import { normalize } from '@/lib/utils'

export async function getBrands(): ApiResponse {
  return normalize(await fetcher([baseUrls.car, 'brands'], ['brands']))
}

export async function getModels(brandCode?: string): ApiResponse {
  if (!brandCode) return []

  return normalize(
    await fetcher(
      [baseUrls.car, 'brands', brandCode, 'models'],
      ['models', brandCode],
    ),
  )
}

export async function getYears(
  brandCode?: string,
  modelCode?: string,
): ApiResponse {
  if (!brandCode || !modelCode) return []

  const years = normalize(
    await fetcher(
      [baseUrls.car, 'brands', brandCode, 'models', modelCode, 'years'],
      ['years', brandCode, modelCode],
    ),
  )

  const anoAtual = new Date().getFullYear()

  return years.filter(({ code }) => {
    const ano = parseInt(code.split('-')[0], 10)
    return ano >= 1980 && ano <= anoAtual + 1
  })
}
