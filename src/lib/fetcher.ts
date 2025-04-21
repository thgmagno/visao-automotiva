import { redirect } from 'next/navigation'

export const fetcher = async (url: string, path: string) => {
  const res = await fetch(`${url}/${path}?token=${process.env.API_TOKEN}`, {
    next: { revalidate: 7200, tags: ['car-brands'] },
  })
  console.log('INFO:  Fetching API data from: ', url, path)
  if (res.status === 429) redirect('/429')
  return res.json()
}
