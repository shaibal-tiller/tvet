import React from 'react'
import tiller_logo from '../Assets/images/tiller_logo.png'
import User from './User'

const Header = () => {
    return (
        <div className='fixed bg-opacity-95 w-full h-16 md:h-24 px-8 bg-[#e7ecef] z-10'>

            <a href='https://tiller.com.bd'><img src={tiller_logo} className='absolute top-2 left-4  h-12 md:h-16 md:top-4 md:left-14 ' alt='logo' />
            </a>
            <div className='pt-[14px] md:pt-[20px] text-center text-[20px] md:text-[32px] '>Tiller Socio Economic Survey</div>

            <div className='relative bg-red-500' >
                <User />
            </div>
        </div>
    )
}

export default Header