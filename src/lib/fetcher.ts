import { redirect } from 'next/navigation'

export const fetcher = async (paths: string[], tag: string[]) => {
  console.log(paths.join('/'))
  const res = await fetch(paths.join('/'), {
    next: { revalidate: 7200, tags: [tag.join(',')] },
  })
  if (res.status === 429) redirect('/429')
  return res.json()
}
