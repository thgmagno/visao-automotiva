'use server'

import { baseUrls } from '@/lib/baseUrl'
import { fetcher } from '@/lib/fetcher'
import { VehicleDetailsType } from '@/lib/types'

export async function getDetails(
  brandCode: string,
  modelCode: string,
  yearCode: string,
): Promise<VehicleDetailsType> {
  return fetcher(
    [baseUrls.car, 'brands', brandCode, 'models', modelCode, 'years', yearCode],
    ['details', brandCode, modelCode, yearCode],
  )
}
