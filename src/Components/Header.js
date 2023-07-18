import React from 'react'
import tiller_logo from '../Assets/images/tiller_logo.png'
import User from './User'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    return (
        <div className='fixed bg-opacity-95 w-full h-16 md:h-24 px-8 bg-[#e7ecef] z-20'>

            <a><img src={tiller_logo} className='absolute top-2 left-4  h-12 md:h-16 md:top-4 md:left-14 ' alt='logo' />
            </a>
            <div  className=' w-full  pt-[14px] md:pt-[20px] text-center text-[20px] md:text-[32px] '>
                <p onClick={()=>navigate('/')} className='cursor-pointer w-fit mx-auto'>Tiller Socio Economic Survey</p></div>

            
        </div>
    )
}

export default Header