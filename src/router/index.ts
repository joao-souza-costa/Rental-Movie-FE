import { createRouter, createWebHashHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import LoginView from '@/views/auth/Login/LoginView.vue'
import RentalView from '@/views/home/RentalView/RentalView.vue'
import MovieView from '@/views/home/MovieView/MovieView.vue'
import ClientView from '@/views/home/ClientView/ClientView.vue'
import UserView from '@/views/home/UserView/UserView.vue'

import {
  DASH,
  HOME_PAGE,
  LOGIN,
  RENTAL_PAGE,
  MOVIE_PAGE,
  CLIENT_PAGE,
  USER_PAGE
} from '@/app/constants/route'

import { useAuthStore } from '@/app/store/useAuthStore'
import { toast } from '@/app/utils/toast'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: DASH.path,
      component: AuthLayout,
      children: [
        {
          path: LOGIN.path,
          name: LOGIN.name,
          component: LoginView
        }
      ]
    },
    {
      path: HOME_PAGE.path,
      component: HomeLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: RENTAL_PAGE.path,
          name: RENTAL_PAGE.name,
          component: RentalView
        },
        {
          path: MOVIE_PAGE.path,
          name: MOVIE_PAGE.name,
          component: MovieView
        },
        {
          path: CLIENT_PAGE.path,
          name: CLIENT_PAGE.name,
          component: ClientView
        },
        {
          path: USER_PAGE.path,
          name: USER_PAGE.name,
          component: UserView
        }
      ]
    }
  ]
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isLogged = authStore.accessToken
  const isPrivate = to.meta.requiresAuth

  if (authStore.user && authStore.user.expiresIn < Date.now()) {
    authStore.signout()
    toast.error('Acesso expirado')
    return {
      name: LOGIN.name,
      replace: true
    }
  }

  if (isPrivate && !isLogged) {
    return {
      name: LOGIN.name,
      replace: true
    }
  }

  if (!isPrivate && isLogged) {
    return {
      path: HOME_PAGE.path,
      replace: true
    }
  }
})
export default router
