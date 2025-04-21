import { AppTabs } from '@/components/tabs'
import { TabCars } from '@/components/tabs/TabCars'
import { TabMotos } from '@/components/tabs/TabMotos'
import { TabTrucks } from '@/components/tabs/TabTrucks'
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
      value: 'carros',
      content: <TabCars {...getParams('carros')} />,
    },
    { label: 'Motos', value: 'motos', content: <TabMotos /> },
    { label: 'Caminhões', value: 'caminhoes', content: <TabTrucks /> },
  ]

  return (
    <main className="mx-auto mt-12 mb-36 w-[92%] max-w-7xl space-y-8">
      <h1>Visão Automotiva</h1>
      <AppTabs id="tab" items={tabs} />
    </main>
  )
}
