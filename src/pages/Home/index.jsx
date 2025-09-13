import React from 'react';
import './style.scss';
import { motion } from 'framer-motion';
import bouquets from "../../db/bouquets.json";

//Import Components
import Button from '@/components/Button/Index';
import Slider from '@/components/Slider/Index';
import FlowerCatalogGrid from '@/components/FlowerCatalogGrid/Index';
import { Helmet } from 'react-helmet';

///Import Constants
import { pageVariants, pageTransition } from '@/constants/framerSettings.js';
import ParallaxText from '@/components/Parallax';

const Index = () => {

    let sliderMainOptions = [
        {
            img: 'https://sundragonflorals.com/cdn/shop/files/IMG_9203-scaled.jpg?v=1739806612'
        },
        {
            img: 'https://i.pinimg.com/1200x/2d/31/77/2d3177fc5186bead58efbe829729333d.jpg'
        },
        {
            img: 'https://images.squarespace-cdn.com/content/v1/58c9a1a5d1758e7bb29f1cf5/1587503218031-5MW47REL41PYF0BXPUSA/IMG_3503.jpg?format=1000w'
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
                <link rel="canonical" href="http://florket.ru/" />
            </Helmet>

            <header>

                <Slider
                    loop={true}
                    options={sliderMainOptions}
                />

                <div className="header_slogan">
                    <p className='p1'>Флоркет - сервис заказных букетов премиум-класса</p>
                    <p className='p2'>Доставка цветов в Москве от 60 минут.</p>
                    <p className='p2'>Фото перед отправкой + Бесплатная открытка.</p>
                    <p className='p2'>Эквадорские розы, сезонные цветы, экзоты, монобукеты и авторские.</p>

                </div>


            </header>

            <div className="catalogue" id="catalogue">
                <h1>Каталог букетов:</h1>
                <FlowerCatalogGrid items={bouquets} />
            </div>

            <div className="scroller_container">
                <h1>Плантации цветов:</h1>
                <div className="scroller_departments">

                    <div className="scroll_flowers scroll_parts">
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

            <div className="about_wrapper">
                <div className="about_text">
                    <h1>О нас:</h1>
                    <p>Мы — «Флоркет», сервис заказных премиум букетов.
                        <br />Работаем напрямую с ведущими цветочными складами, отбирая только самые свежие и редкие сорта. <br />В наших композициях — эквадорские розы, тропические экзоты и сезонные шедевры флористики.</p>
                </div>
                <div className="contacts">
                    <h1>Контакты:</h1>
                    <Button
                        btnText={'WhatsApp'}
                        className={'btn btn_green hover_green'}
                        href={'https://wa.me/79309920873'}
                    />
                    <Button
                        btnText={'Telegram'}
                        className={'btn btn_blue hover_blue'}
                        href={'https://t.me/faridguseinow'}
                    />
                </div>
            </div>



        </motion.div>
    )
}

export default Index