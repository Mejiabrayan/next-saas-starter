'use client';

import { useRouter } from "next/navigation";
import { useUser } from "../lib/auth";
import { useState } from "react";
import { signOut } from "../app/(login)/actions";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Home, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Logo from '@/public/logo.svg';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useUser();
    const router = useRouter();
  
    async function handleSignOut() {
      setUser(null);
      await signOut();
      router.push('/');
    }
  
    return (
      <header className='border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
          <Link href='/' className='flex items-center'>
            <Image src={Logo} alt='Logo' width={70} height={40} />
          </Link>
          <div className='flex items-center space-x-4'>
            <Link
              href='/pricing'
              className='text-sm font-medium text-gray-700 hover:text-gray-900'
            >
              Pricing
            </Link>
            {user ? (
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Avatar className='cursor-pointer size-9'>
                    <AvatarImage alt={user.name || ''} />
                    <AvatarFallback>
                      {user.email
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='p-0'>
                  <DropdownMenuItem className='w-full cursor-pointer m-1'>
                    <Link href='/dashboard' className='flex w-full items-center'>
                      <Home className='mr-2 h-4 w-4' />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <form action={handleSignOut} className='p-1'>
                    <button type='submit' className='flex w-full'>
                      <DropdownMenuItem className='w-full cursor-pointer'>
                        <LogOut className='mr-2 h-4 w-4' />
                        <span>Sign out</span>
                      </DropdownMenuItem>
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className='bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full'
              >
                <Link href='/sign-up'>Sign Up</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  }
  