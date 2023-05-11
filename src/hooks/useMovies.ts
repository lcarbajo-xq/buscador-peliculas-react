import { useRef, useState, useMemo, useCallback } from 'react'
import { Movie } from '../types'
import { searchtMoviesByQuery } from '../services/movies'

export function useMovies({ sort }: { sort: boolean }) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastSearch = useRef('')

  const getMoviesByQuery = useCallback(
    async ({ searchTerm }: { searchTerm: string }) => {
      if (searchTerm === lastSearch.current) return
      try {
        setLoading(true)
        setError(null)
        lastSearch.current = searchTerm
        const data = await searchtMoviesByQuery({ searchTerm })
        setMovies(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.Title.localeCompare(b.Title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMoviesByQuery, loading, error }
}
