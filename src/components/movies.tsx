import { Movie } from '../types'

interface MovieProps {
  movies: Movie[] | []
}

export function Movies({ movies }: MovieProps) {
  const hasMovies = movies?.length > 0
  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesFound />
}

function ListOfMovies({ movies }: MovieProps) {
  return (
    <ul className='movies'>
      {movies?.map((movie) => (
        <li className='movie' key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </li>
      ))}
    </ul>
  )
}

function NoMoviesFound() {
  return <p>Mp hay resultados para tu búsqueda!</p>
}
