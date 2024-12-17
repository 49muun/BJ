// layout.js or page.js (Server Component)
import './globals.css'
import LayoutClientWrapper from './LayoutClientWrapper'  // or correct relative path
import Image from 'next/image'
import Link from 'next/link'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'

import HygraphLogo from '../../public/logo.png'
import NavList from '../components/NavList'

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gray-50 px-24'>
      <header className="py-12 relative">
              <nav className="flex items-center justify-between sm:h-10">
                {/* Logo Section */}
                <Link href="/" aria-label="Hygraph Next.js Blog Starter" className="flex items-center gap-2">
                  <Image
                    width={100}
                    height={100}
                    src={HygraphLogo}
                    alt="Logo Escola"
                    className="hidden sm:block"
                  />
                </Link>
                {/* Navigation Menu */}
                <ul className="flex items-center space-x-6">
                  <NavList navId="main" />
                </ul>
              </nav>
            </header>
        {/* Wrap only the portion that needs the animation */}
        <LayoutClientWrapper>
          <main>{children}</main>
        </LayoutClientWrapper>
        <footer className="mt-8">
              <div className="py-6 lg:py-8">
                <div className="md:flex md:justify-between items-center">
                  {/* Footer Logo */}
                  <div className="mb-6 md:mb-0">
                    <Link href="/" aria-label="Hygraph Next.js Blog Starter" className="flex items-center gap-2">
                      <Image
                        width={100}
                        height={100}
                        src={HygraphLogo}
                        alt="Logo Escola"
                        className="hidden sm:block"
                      />
                    </Link>
                  </div>

                  {/* Social & Extra Links */}
                  <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                      <h2 className="mb-3 text-sm font-semibold uppercase">Redes Sociais</h2>
                      <ul className="flex space-x-4 text-xl">
                        <li>
                          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">
                            <FaTwitter className="hover:text-blue-500 transition-colors" />
                          </a>
                        </li>
                        <li>
                          <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer">
                            <FaGithub className="hover:text-gray-600 transition-colors" />
                          </a>
                        </li>
                        <li>
                          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                            <FaLinkedin className="hover:text-blue-700 transition-colors" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />

                <div className="sm:flex sm:items-center sm:justify-between">
                  <span className="text-sm sm:text-center">
                    © {new Date().getFullYear()}{' '}
                    <a href="https://hygraph.com/" className="hover:underline">
                      Escola Boa Nova
                    </a>
                    . All Rights Reserved.
                  </span>
                </div>
              </div>
            </footer>
      </body>
    </html>
  )
}
