import React from 'react'
const jwt = require('jsonwebtoken')

export default function Login() {

    function generateJWT() {
        const payload = `${process.env.NEXTAUTH_URL ?? ""}/oauth2/verify`
        const secret = process.env.SECRET
        if (!secret) {
            console.error('SECRET environment variable is not set.')
            return
        }

        return jwt.sign(payload, secret)
    }

    return (
        <main className='flex w-full h-full'>
            <div className='max-w-50% w-full h-screen py-12 flex flex-col gap-3 items-center justify-center bg-[#f5f5f6]'>
                <a href={`${process.env.PUBLIC_CONTALAYBACK_URL}/oauth2/authorize/${generateJWT()}`} className="flex items-center px-4 py-2 space-x-2 bg-black text-white hover:bg-blue-600 rounded-md">
                    <img src="/assets/layback-logo.png" className="w-5 h-5" />
                    <span>Login with Layback</span>
                </a>
            </div>
        </main>
    )
}