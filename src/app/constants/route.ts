interface iRoute {
  path: string
  name: string
}

export const DASH: iRoute = {
  path: '/',
  name: 'DASH'
}

export const LOGIN: iRoute = {
  path: '',
  name: 'LOGIN'
}

export const HOME_PAGE: iRoute = {
  path: '/home',
  name: 'PAGE'
}

export const RENTAL_PAGE: iRoute = {
  path: '',
  name: 'RENTAL_PAGE'
}

export const MOVIE_PAGE: iRoute = {
  path: 'movie',
  name: 'MOVIE_PAGE'
}

export const CLIENT_PAGE: iRoute = {
  path: 'client',
  name: 'CLIENT_PAGE'
}

export const USER_PAGE: iRoute = {
  path: 'user',
  name: 'USER_PAGE'
}
