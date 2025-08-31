import React from 'react';
import './style.scss';
import { motion } from 'framer-motion';

//Import Components
import Button from '@/components/Button/Index';
import Slider from '@/components/Slider/index';
import { Helmet } from 'react-helmet';

//Import Utils
import { useTranslation } from 'react-i18next';

///Import Constants
import { pageVariants, pageTransition } from '@/constants/framerSettings.js';
import ParallaxText from '@/components/Parallax';

const Index = () => {
    const { t, i18n } = useTranslation();

    let sliderMainOptions = [
        {
            img: 'https://i.pinimg.com/1200x/02/e3/4b/02e34bb46db213582c72b0db23c02850.jpg'
        },
        {
            img: 'https://i.pinimg.com/1200x/2d/31/77/2d3177fc5186bead58efbe829729333d.jpg'
        },
        {
            img: 'https://i.pinimg.com/1200x/cc/7d/b3/cc7db39d0defe665b43e8575e32b22b9.jpg'
        }
    ]

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="home_page_container">

            <Helmet>
                <title>Флоркет - Букет на любой вкус!</title>
                <link rel="canonical" href="http://gfcc.ru/" />
            </Helmet>

            <header>
                <div className="header_slogan">
                    <p className='p1'>{t('home.headerDesc1')}</p>
                    <p className='p2'>{t('home.headerDesc2')}</p>

                </div>
                <Slider
                    loop={true}
                    options={sliderMainOptions}
                />

            </header>

            <div className="about_wrapper">
                <div className="about_wrapper_inner">

                    <div className="left_content">
                        <img src="https://i.pinimg.com/1200x/b0/45/98/b0459866593afef9c69c97254130abdd.jpg" alt="" />
                    </div>
                    <div className="right_content">
                        <p className='content_title'>{t('home.aboutSection.title')}</p>

                        <span className='content_desc'>{t('home.aboutSection.desc')}</span>

                        <div className="content_button">
                            <Button
                                btnText={t('home.aboutSection.btnText')}
                                className={'btn btn_white hover_gold'}
                                icon={'arrow-right'}
                                href={'/about'}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className="main_title_wrapper">
                <div className="main_slogan">

                    <div className="main_slogan_text">
                        <h1>{t('home.collectionSection.title')}</h1>
                        <p>{t('home.collectionSection.desc')}</p>
                        <div className="content_button">
                            <Button
                                btnText={t('home.collectionSection.btnText')}
                                className={'btn btn_white hover_gold'}
                                icon={'arrow-right'}
                                href={'/about'}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className="scroller_container">
                <h1>{t('home.marqueeSection.title')}</h1>
                <div className="scroller_departments">

                    <div className="scroll_flowers scroll_parts">
                        <div className="scroller_text">
                            <h1>{t('home.marqueeSection.flowers')}</h1>
                        </div>

                        <ParallaxText baseVelocity={-1} size={2}>
                            <img src="https://sun9-48.userapi.com/impg/nMctEaxRZdeF4u3ad-nnx4aH06fvtGNBVzAWiw/4qNNq6-VWP4.jpg?size=1080x720&quality=95&sign=6961a86d4edb0d31f7e8b4d1295badf1&type=album" />
                            <img src="https://sun9-40.userapi.com/impg/1ENGAYDDpURdfP4tKwQJFr0Xe7iHKlM5R5ozwQ/XcJlM2tCL6U.jpg?size=1080x720&quality=95&sign=ede28e0ac82d593a3f7c4f32ec257897&type=album" />
                            <img src="https://sun9-22.userapi.com/impg/9sKkMp-lAaxDiQUqr0hXWvi2nPOjZXUtQO7QXA/cKfXbojIP6A.jpg?size=1080x720&quality=95&sign=c5c4e2fbbcc17fda22009b9412cddf72&type=album" />
                            <img src="https://sun9-15.userapi.com/impg/xvDeQLcCHmOfwY2Xnsw5eadfdj_Uyu_7HMbFcQ/zBYQhowM-fw.jpg?size=1080x720&quality=95&sign=6e131275efe20b7edda90aa959611ff3&type=album" />
                            <img src="https://sun9-21.userapi.com/impg/arYn0Oo2rzIy09CoQ58jlmEceElVpzsXeZQihg/IcWy4X15pi4.jpg?size=1080x720&quality=95&sign=c4ab4e5f38c73529eb38cb214f516fd0&type=album" />
                            <img src="https://sun9-7.userapi.com/impg/wf18sBd9iZtg_KVymP6C_dAtgXA9s2PwOE5zhQ/uF06sgrQF1Y.jpg?size=1080x721&quality=95&sign=9ddbd63ebceeed218b2eaa5e212788dd&type=album" />
                            <img src="https://sun9-42.userapi.com/impg/GcEbFo0ambtlcUOZ8FXccdpsDJM6L_2cDOj8ZQ/SEog1xdbFq0.jpg?size=1080x720&quality=95&sign=06b2b544d815bf3df841a4e14b4def72&type=album" />
                            <img src="https://sun9-44.userapi.com/impg/WIVU5U5_MLd-1h-EkDVbahNXn0Z00Aahsj_B9w/kxSW1BGXo98.jpg?size=1080x720&quality=95&sign=cb76ec7275dc3862029dab3fea764963&type=album" />
                        </ParallaxText>
                    </div>

                </div>
            </div>

        </motion.div>
    )
}

export default Index