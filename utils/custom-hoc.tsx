import React from 'react'
import { useAuth } from '../components/contexts/authContext'
import { useRouter } from 'next/router'

export const withAuth = () => (Component: any) => (props: any) => {
    const auth = useAuth()
    const router = useRouter()
    if (auth.isAuthenticated) {
        return <Component {...props} />
    }
    router.push('/')
    return null
}
