'use client'

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Skeleton } from "@/components/ui/skeleton"

const Navbar = () => {
    const pathname = usePathname();
    const { data: session, status } = useSession()

    const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
        <Link href={href} className="text-sm hover:text-gray-300">
            {children}
        </Link>
    )

    const NavButton = ({ href, onClick, children }: { href?: string, onClick?: () => void, children: React.ReactNode }) => (
        <Link href={href || '#'}>
            <Button
                className="bg-[#c25e44] hover:bg-[#b35540] text-white rounded-full px-6"
                onClick={onClick}
            >
                {children}
            </Button>
        </Link>
    )

    const Logo = () => (
        <Link href="/" className="flex items-center">
            <Image
                src="/globe.svg"
                alt="Logo"
                width={32}
                height={32}
                className="text-[#c97862]"
            />
        </Link>
    )

    const LoadingSkeleton = () => (
        <>
            <Skeleton className="w-12 h-6" />
            <Skeleton className="w-16 h-6" />
            <Skeleton className="w-14 h-6" />
            <Skeleton className="w-20 h-10 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
        </>
    )

    return (
        <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center gap-12">
                
                
                {status === 'loading' ? (
                    <LoadingSkeleton />
                ) : status === 'authenticated' ? (
                    <>
                      <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold">W</span>
                </Link>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/partners">Partners</NavLink>
                        <NavLink href="/profile">Profile</NavLink>
                        <NavButton onClick={() => signOut({ callbackUrl: '/' })}>
                            Log out
                        </NavButton>
                        <Logo />
                    </>
                ) : (
                    <>
                    <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold">W</span>
                        </Link>
                        <NavLink href="/partners">Partners</NavLink>

                        <NavLink href="/login">Login</NavLink>
                        <NavButton href="/signup">Sign up</NavButton>
                        <Logo />
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar

