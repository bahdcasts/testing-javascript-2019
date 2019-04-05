import Router from 'vue-router'

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/auth/register',
            component: () => import('@pages/Register.vue')
        },
        {
            path: '/auth/login',
            component: () => import('@pages/Login.vue')
        },
        {
            path: '/',
            component: () => import('@pages/Home.vue')
        },
        {
            path: '/auth/passwords/email',
            component: () => import('@pages/ForgotPassword.vue')
        },
        {
            path: '/auth/passwords/reset/:token',
            component: () => import('@pages/ResetPassword.vue')
        },
        {
            path: '/auth/emails/confirm/:token',
            component: () => import('@pages/EmailConfirm.vue')
        }
    ]
})
