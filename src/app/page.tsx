import { actions } from '@/actions'
import { Logotipo } from '@/components/Logotipo'
import { AppTabs } from '@/components/tabs'
import { TabAbout } from '@/components/tabs/TabAbout'
import { TabVehicles } from '@/components/tabs/TabVehicles'
import { VehicleDetails } from '@/components/VehicleDetails'
import { SearchParams, VehicleType } from '@/lib/types'

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  const getParams = (key: string) => ({
    brand: searchParams.tab === key ? searchParams.brand : undefined,
    model: searchParams.tab === key ? searchParams.model : undefined,
    year: searchParams.tab === key ? searchParams.year : undefined,
  })

  const tabs = [
    {
      label: 'Carros',
      value: 'cars',
      content: <TabVehicles type="cars" {...getParams('cars')} />,
    },
    {
      label: 'Motos',
      value: 'motorcycles',
      content: <TabVehicles type="motorcycles" {...getParams('motorcycles')} />,
    },
    {
      label: 'Caminhões',
      value: 'trucks',
      content: <TabVehicles type="trucks" {...getParams('trucks')} />,
    },
    { label: 'Sobre o projeto', value: 'about', content: <TabAbout /> },
  ]

  const vehicleType = searchParams.tab as VehicleType
  const { brand, model, year } = searchParams

  return (
    <main className="flex-1 space-y-8 pb-12">
      <Logotipo />
      <AppTabs id="tab" items={tabs} />
      {vehicleType && brand && model && year && (
        <VehicleDetails
          yearCode={year}
          details={await actions.vehicles.getDetails(
            vehicleType,
            brand,
            model,
            year,
          )}
        />
      )}
    </main>
  )
}
