import { redirect } from 'next/navigation'

export const fetcher = async (url: string, path: string) => {
  const res = await fetch(`${url}/${path}?token=${process.env.API_TOKEN}`, {
    next: { revalidate: 3600, tags: ['car-brands'] },
  })
  if (res.status === 429) redirect('/429')
  return res.json()
}
