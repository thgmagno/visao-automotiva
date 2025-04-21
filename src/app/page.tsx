import { actions } from '@/actions'
import { Logotipo } from '@/components/Logotipo'
import { AppTabs } from '@/components/tabs'
import { TabCars } from '@/components/tabs/TabCars'
import { TabMotos } from '@/components/tabs/TabMotos'
import { TabTrucks } from '@/components/tabs/TabTrucks'
import { VehicleDetails } from '@/components/VehicleDetails'
import { SearchParams } from '@/lib/types'

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
      content: <TabCars {...getParams('cars')} />,
    },
    { label: 'Motos', value: 'motos', content: <TabMotos /> },
    { label: 'Caminhões', value: 'trucks', content: <TabTrucks /> },
  ]

  const { brand, model, year } = searchParams

  return (
    <main className="mx-auto mt-12 mb-36 w-[92%] max-w-xl space-y-8">
      <Logotipo />
      <AppTabs id="tab" items={tabs} />
      {brand && model && year && (
        <VehicleDetails
          details={await actions.details.getDetails(brand, model, year)}
        />
      )}
    </main>
  )
}
