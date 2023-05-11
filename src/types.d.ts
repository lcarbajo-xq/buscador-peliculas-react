export type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type APIResponse = {
  Search?: Movie[]
  totalResults?: string
  Response: string
  Error?: string
}
