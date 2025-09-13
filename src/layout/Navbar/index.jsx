import React from 'react'
import './style.scss'

//import images
import Logo from '@/assets/icons/text.svg'

///Import react router dom
import { Link } from 'react-router-dom';
import Button from '/src/components/Button';

const Index = ({ menuIsActive, setMenuIsActive }) => {

    const menuShowHide = () => {
        menuIsActive ? setMenuIsActive(false) : setMenuIsActive(true)
    }


    return (
        <div className='Navbar glass'>
            <div className='inner_nav'>
                <div className="nav_logo">
                    <div className="logo" >
                        <Link to={'/'}>
                            <img src={Logo} alt="text" />
                        </Link>
                    </div>
                </div>

                <Button
                    btnText={'Заказать'}
                    className={'btn btn_green white'}
                    href={'https://wa.me/79309920873'}
                    target='_blank'
                />
            </div>
        </div>
    )
}

export default Index