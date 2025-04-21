export type SearchParams = Promise<{ [key: string]: string | undefined }>

export type ApiResponse = Promise<{ code: string; name: string }[]>
