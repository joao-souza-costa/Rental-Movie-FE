import { httpClient } from './Client'
import { MOVIE_API_URL, MOVIE_KEY } from '../constants/envConstants'

const client = httpClient(MOVIE_API_URL, { apiKey: MOVIE_KEY })

export interface iMovieGetallParams {
  title: string
  year?: string
  page?: string | undefined
}

export interface iMovie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default {
  getAll: async ({ title, page, year }: iMovieGetallParams) => {
    const {
      data: { Search = [] }
    } = await client.get<{ Search: iMovie[] }>('', {
      params: {
        s: title,
        page: page,
        type: 'movie',
        y: year
      }
    })

    return Search
  }
}
