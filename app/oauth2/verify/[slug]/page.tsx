"use client"

import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Login() {

    const params = useParams()
    const router = useRouter()
    useEffect(() => {
        if (params.slug) {
            axios.post('/api/oauth2/verify', {
                token: params.slug
            }).then(res => {
                const user = res.data
                signIn('credentials', {
                    email: user.email,
                    password: user.password,
                    redirect: false,
                }).then(res => { console.log(res); router.push('/') }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }
    }, [params])

    return (
        <>
            <main className='flex w-full h-full'>
                <div className='max-w-50% w-full h-screen py-12 flex flex-col gap-3 items-center justify-center bg-[#f5f5f6]'>
                    Logging you in...
                </div>
            </main>
        </>
    )
}