import { actions } from '@/actions'
import { Combobox } from '@/components/Combobox'
import { VehicleType } from '@/lib/types'
import { ResetFiltersButton } from './ResetFiltersButton'

interface Props {
  type: VehicleType
  brand?: string
  model?: string
}

export async function TabVehicles({ type, brand, model }: Props) {
  const brandData = await actions.vehicles.getBrands(type)
  const modelData = await actions.vehicles.getModels(type, brand)
  const yearData = await actions.vehicles.getYears(type, brand, model)

  const brands = brandData?.map((brand) => ({
    value: brand.code,
    label: brand.name,
  }))

  const models = modelData?.map((model) => ({
    value: model.code,
    label: model.name,
  }))

  const years = yearData?.map((year) => ({
    value: year.code,
    label: year.name,
  }))

  return (
    <div className="searchbar-container">
      <Combobox options={brands} idParam="brand" limited />
      <Combobox options={models} idParam="model" disabled={!brand} limited />
      <Combobox options={years} idParam="year" disabled={!model} />
      <ResetFiltersButton type={type} disabled={!brand && !model} />
    </div>
  )
}
