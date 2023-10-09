import { prisma } from 'prisma/db'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    const request_body = await req.json()
    const { token } = request_body
    try {
        const decoded: any = jwt.verify(token, process.env.CONTALAYBACK_SECRET ?? "")
        const fetched_user = decoded.user
        
        let user
        user = await prisma.user.findUnique({
            where: {
                email: fetched_user.email
            }
        })
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: fetched_user.email,
                    name: fetched_user.name,
                    password: fetched_user.password,
                    image: fetched_user.image,
                    phoneNumber: fetched_user.phoneNumber,
                    emailVerified: fetched_user.emailVerified,
                    role: fetched_user.role,
                }
            })
        }
        
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (e) {
        console.log(e)
        return new Response('Error creating user', { status: 500 })
    }
}