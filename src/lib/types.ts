export type SearchParams = Promise<{ [key: string]: string | undefined }>

export type ApiResponse = Promise<{ code: string; name: string }[]>

export type VehicleType = 'cars' | 'motorcycles' | 'trucks'

export type VehicleDetailsType = {
  vehicleType: number
  price: string
  brand: string
  model: string
  modelYear: number
  fuel: string
  codeFipe: string
  referenceMonth: string
  fuelAcronym: string
}

export type PriceHistoryType = {
  priceHistory: {
    price: string
    priceNumeric: number
    month: string
    reference: string
  }[]
}
