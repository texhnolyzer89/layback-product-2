"use client"

import type { NextPage } from 'next'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import UserService from 'services/UserService'

const Home: NextPage = () => {

  const router = useRouter()
  const { data: session } = useSession()
  const [user,setUser] = useState<any>(undefined)  

  useEffect(() => {
    UserService.findOne(session?.id ?? "").then(res => setUser(res.data)).catch(err => console.log(err))
    axios.post('/api/auth/verify-cookie').then(res => { if (res.status != 200) router.push('/auth/login') }).catch(err => { router.push('/auth/login') })
  }, [session])


  try {
  } catch (err) {
  }

  return (
    <>
      <title>Product 2</title>
      <div className="flex flex-col items-start justify-center my-6 mx-4 border-gray border rounded">
        <h5 className="border-t-gray border-solid py-[6px] px-4 bg-gray-light text-nav w-full border-b border-gray mr-6 text-[20px] font-[500]">Your Layback Account Information</h5>
        {user && <div className="px-4 py-2">
          <p>Email: {user?.email}</p>
          <p>Your phone number {user?.phoneNumber}</p>
          <p>Verified on {new Date(user?.emailVerified as string).toDateString()}</p>
          </div>}
      </div>
    </>
  )
}

export default Home