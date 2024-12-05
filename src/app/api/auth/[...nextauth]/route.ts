import NextAuth from 'next-auth'
import {options} from './options'

const handler = NextAuth(options)

console.log(handler)

export {handler as GET , handler as POST}
