import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    /* eslint-disable-line */
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(19.607843%,20%,20%);fill-opacity:1;" d="M 17.609375 18 L 6.390625 18 C 2.878906 18 0.03125 15.152344 0.03125 11.640625 C 0.03125 8.128906 2.878906 5.28125 6.390625 5.28125 L 17.609375 5.28125 C 21.121094 5.28125 23.96875 8.128906 23.96875 11.640625 C 23.96875 15.152344 21.121094 18 17.609375 18 Z M 6.390625 6.734375 C 3.707031 6.734375 1.53125 8.910156 1.53125 11.59375 C 1.53125 14.277344 3.707031 16.453125 6.390625 16.453125 L 17.609375 16.453125 C 20.292969 16.453125 22.46875 14.277344 22.46875 11.59375 C 22.46875 8.910156 20.292969 6.734375 17.609375 6.734375 Z M 6.390625 6.734375 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(19.607843%,20%,20%);fill-opacity:1;" d="M 13.53125 11.59375 C 13.53125 13.640625 15.1875 15.300781 17.234375 15.300781 C 19.28125 15.300781 20.941406 13.640625 20.941406 11.59375 C 20.941406 9.546875 19.28125 7.890625 17.234375 7.890625 C 15.1875 7.890625 13.53125 9.546875 13.53125 11.59375 Z M 13.53125 11.59375 "/>
              </svg>
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
