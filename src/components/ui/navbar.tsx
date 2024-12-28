'use client'

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Skeleton } from "@/components/ui/skeleton"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
    const pathname = usePathname();
    const { data: session, status } = useSession()
    const [isOpen, setIsOpen] = React.useState(false)

    // Close mobile menu on screen resize
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setIsOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const NavLink = ({ href, children, className = "" }: { href: string, children: React.ReactNode, className?: string }) => (
        <Link href={href} className={`text-sm hover:text-gray-300 ${className}`}>
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

    const DesktopLoadingSkeleton = () => (
        <div className="flex items-center justify-center gap-12">
            <Skeleton className="w-8 h-8" /> {/* Logo */}
            <Skeleton className="w-12 h-6" />
            <Skeleton className="w-16 h-6" />
            <Skeleton className="w-14 h-6" />
            <Skeleton className="w-20 h-10 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
        </div>
    )

    const MobileLoadingSkeleton = () => (
        <div className="flex justify-between items-center">
            <Skeleton className="w-8 h-8" /> {/* Logo */}
            <Skeleton className="w-10 h-10 rounded" /> {/* Menu button */}
        </div>
    )

    const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => {
        const baseClassName = isMobile ? "flex flex-col space-y-4" : "flex items-center justify-center gap-12"
        const linkClassName = isMobile ? "text-lg" : ""

        if (status === 'loading') {
            return null
        }

        return status === 'authenticated' ? (
            <div className={baseClassName}>
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold">W</span>
                </Link>
                <NavLink href="/" className={linkClassName}>Home</NavLink>
                <NavLink href="/partners" className={linkClassName}>Partners</NavLink>
                <NavLink href="/profile" className={linkClassName}>Profile</NavLink>
                <NavButton onClick={() => signOut({ callbackUrl: '/' })}>
                    Log out
                </NavButton>
                {!isMobile && <Logo />}
            </div>
        ) : (
            <div className={baseClassName}>
                <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold">W</span>
                </Link>
                <NavLink href="/partners" className={linkClassName}>Partners</NavLink>
                <NavLink href="/login" className={linkClassName}>Login</NavLink>
                <NavButton href="/signup">Sign up</NavButton>
                {!isMobile && <Logo />}
            </div>
        )
    }

    return (
        <nav className="container mx-auto px-4 py-4">
            {/* Desktop Navigation */}
            <div className="hidden md:block">
                {status === 'loading' ? (
                    <DesktopLoadingSkeleton />
                ) : (
                    <NavContent />
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
                {status === 'loading' ? (
                    <MobileLoadingSkeleton />
                ) : (
                    <div className="flex justify-between items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold">W</span>
                        </Link>
                        
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetTitle>Wish</SheetTitle>
                                <div className="mt-8">
                                    <NavContent isMobile />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar