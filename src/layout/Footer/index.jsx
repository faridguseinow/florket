import React from 'react'

import './style.scss'

import LogoWhite from '@/assets/icons/text-white.svg'

import { Link } from 'react-router-dom';

const Index = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer>
            <div className="footer_container glass">

                <div className="f_cont_logo logo_1">
                    <img src={LogoWhite} width={150} alt="logo mini" />
                </div>

                <div className="footer_bottom">
                    <span className='rights_text'>© {year} Все права защищены.</span>
                    <span>
                        <Link to="https://faridguseinow.framer.website/" target='_blank'>Создание сайта</Link>
                    </span>
                </div>

            </div>

        </footer>
    )
}

export default Index
