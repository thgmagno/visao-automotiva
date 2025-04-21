import { actions } from '@/actions'
import { Combobox } from '@/components/Combobox'

interface Props {
  brand?: string
  model?: string
}

export async function TabCars({ brand, model }: Props) {
  const brandData = await actions.car.getBrands()
  const modelData = await actions.car.getModels(brand)
  const yearData = await actions.car.getYears(brand, model)

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
      <Combobox options={brands} idParam="brand" />
      {brand && <Combobox options={models} idParam="model" />}
      {brand && model && <Combobox options={years} idParam="year" />}
    </div>
  )
}
