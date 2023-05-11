export const searchtMoviesByQuery = async ({
  searchTerm
}: {
  searchTerm: string
}) => {
  if (!searchTerm) return null
  // setResponseAPI(withResults)
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=812a1905&s=${searchTerm}`
    )
    const data = await response.json()
    if (data.Search) {
      return data.Search
    } else {
      return []
    }
  } catch (error) {
    throw new Error('Error searching movies!')
  }
}
