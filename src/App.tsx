import './App.css'

import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  const [query, updateQuery] = useState('')
  const [error, setError] = useState('')
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }
    if (query === '') {
      setError('La búsqueda debe contener algún carácter')
      return
    }

    if (query.length <= 3) {
      setError('La búsqueda debe contener al menos tres caracteres')
      return
    }

    setError('')
  }, [query])

  return { updateQuery, query, error }
}

function App() {
  const { query, updateQuery, error } = useSearch()
  const [sort, setSort] = useState(false)

  const {
    movies,
    getMoviesByQuery,
    loading,
    error: errorApi
  } = useMovies({ sort })

  const debouncedGetMovies = useCallback(
    debounce((searchTerm: string) => {
      getMoviesByQuery({ searchTerm })
    }, 500),
    []
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    getMoviesByQuery({ searchTerm: query })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value
    updateQuery(newQuery)
    // getMoviesByQuery({ searchTerm: query })
    debouncedGetMovies(newQuery)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Peliculas ⚛️</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            // ref={inputRef}
            name='searchQuery'
            onChange={handleChange}
            value={query}
            placeholder='Star Wars, The Matrix, The Lord of the Rings...'
          />
          <input type='checkbox' onChange={handleSort} />

          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {loading && <p>Cargando...</p>}
        {errorApi && <p>{error}</p>}
        {!loading && !errorApi && <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
