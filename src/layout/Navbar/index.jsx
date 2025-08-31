import React from 'react'
import './style.scss'

//import images
import Logo from '@/assets/icons/logo_text_florket.png'
import Logo_S from '@/assets/icons/logo_florket.png'

///Import react router dom
import { Link } from 'react-router-dom';

///Import Utils
import { useTranslation } from 'react-i18next';

const Index = ({ menuIsActive, setMenuIsActive }) => {
    const { t, i18n } = useTranslation();

    const menuShowHide = () => {
        menuIsActive ? setMenuIsActive(false) : setMenuIsActive(true)
    }

    // const changeLanguage = async lang => {
    //     await i18n.changeLanguage(lang);
    // }

    const changeLanguage = (lang) => {
        // Store the selected language in localStorage
        localStorage.setItem('i18nextLng', lang);
        // Reload the page to apply the new language
        window.location.reload();
    };

    return (
        <div className='Navbar'>
            <div className='inner_nav'>

                <div className="nav_logo">
                    <div className="logo">
                        <Link to={'/'}>
                            <img src={Logo} alt="Golden Flowers Logo" />
                        </Link>
                    </div>
                    <div className="logo_s" onClick={() => menuIsActive && setMenuIsActive(false)}>
                        <Link to={'/'}>
                            <img src={Logo_S} alt="Golden Flowers Logo Mini" />
                        </Link>
                    </div>
                </div>


                <div className='nav_menu'>

                    <div className='nav_menu_container'>

                        <div className="menu_text_main">
                            <Link to={'/products/flowers'}>
                                <div className='menu_text_main_inner'>
                                    <p>{t('navbar.collection')}</p>
                                </div>
                            </Link>
                        </div>
                        <div className="menu_text_main">
                            <Link to={'/about'}>
                                <div className='menu_text_main_inner'>
                                    <p>{t('navbar.aboutUs')}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="nav_right">

                    <div className="localization__wrapper">
                        <span
                            onClick={() => changeLanguage('ru')}
                            style={{ color: i18n.language === 'ru' && 'var(--gold)' }}
                        >RU</span>
                        <span>|</span>
                        <span
                            onClick={() => changeLanguage('en')}
                            style={{ color: i18n.language === 'en' && 'var(--gold)' }}
                        >EN</span>
                    </div>

                    <div className="nav_hamburger" data-isactive={menuIsActive ? 'true' : 'false'}>

                        <input type="checkbox" id="burger-checkbox" className="burger-checkbox" />
                        <label className="burger" htmlFor="burger-checkbox" onClick={menuShowHide}></label>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Index