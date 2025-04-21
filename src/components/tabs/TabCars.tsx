import { actions } from '@/actions'
import { Combobox } from '@/components/Combobox'

interface Props {
  brand?: string
  model?: string
  year?: string
}

export async function TabCars({ brand, model }: Props) {
  const brandData = await actions.cars.getBrands()
  const modelData = await actions.cars.getModels(brand)
  const yearData = await actions.cars.getYears(brand, model)

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
      <Combobox options={brands} idParam="brand" dropdownSize="md" />
      {brand && <Combobox options={models} idParam="model" dropdownSize="lg" />}
      {brand && model && <Combobox options={years} idParam="year" />}

      <div className="mb-10">
        <h2>marca</h2>
        {models && JSON.stringify(models, null, 2)}
      </div>
      <div className="mb-10">
        <h2>ano</h2>
        {years && JSON.stringify(years, null, 2)}
      </div>
    </div>
  )
}
