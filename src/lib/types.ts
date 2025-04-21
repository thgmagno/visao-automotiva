export type SearchParams = Promise<{ [key: string]: string | undefined }>

export type ApiResponse = Promise<{ codigo: string; nome: string }[]>
