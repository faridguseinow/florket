import { useMemo, useRef, useState } from 'react'
import './style.scss'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'

// components
import Slider from '@/components/Slider'
import FlowerCatalogGrid from '@/components/FlowerCatalogGrid'
import { useStore } from '@/useStore'

// constants
import { pageVariants, pageTransition } from '@/constants/framerSettings.js'

const Index = () => {
    const catalogRef = useRef(null)
    const { products } = useStore()
    const [activeSubcategory, setActiveSubcategory] = useState("all")

    const sliderMainOptions = [
        {
            img: 'https://sun9-78.userapi.com/s/v1/ig2/b4NxnmWDr3iD7qXoJay36Sji8yMQ4xgLU4BtFZz3qZzeOnqZH9BZlGP7Mhy7LFeA6Zjm1WVn2eHnxxX1sMGCbCFg.jpg?quality=95&as=32x8,48x12,72x18,108x27,160x40,240x60,360x90,480x120,540x135,640x160,720x180,1080x270,1280x320,1440x360,1920x480&from=bu&cs=1920x0'
        },
        {
            img: 'https://sun9-14.userapi.com/s/v1/ig2/ExlNe8OJPrDqSst0w8Paz0PVe5MerZZDyuLx10kIeHIu-GPAM09lEMIiM-rqRFNWzvz6tyYsmqBksyFBDubIZ8zM.jpg?quality=95&as=32x8,48x12,72x18,108x27,160x40,240x60,360x90,480x120,540x135,640x160,720x180,1080x270,1280x320,1440x360,1920x480&from=bu&cs=1920x0'
        },
        {
            img: 'https://sun9-77.userapi.com/s/v1/ig2/DuMlok2pjX60GIu-_d8m8FDsdmcm0V-S9BCoii4E01XJDp72vWOPIjut1vzDs2LXvJPoUhJFk40NfcwOF8lBmlxc.jpg?quality=95&as=32x8,48x12,72x18,108x27,160x40,240x60,360x90,480x120,540x135,640x160,720x180,1080x270,1280x320,1440x360,1920x480&from=bu&cs=1920x0'
        }
    ]

    const subcategoryChips = useMemo(() => {
        const fromProducts = [...new Set(
            (Array.isArray(products) ? products : [])
                .map((item) => String(item?.subcategory ?? "").trim())
                .filter(Boolean)
        )]

        if (fromProducts.length) {
            return ["all", ...fromProducts]
        }

        return [
            "all",
            "Розы",
            "Тюльпаны",
            "Пионы",
            "Хризантема",
            "Гортензия",
            "Альстромерия",
            "Гербера",
            "Гипсофила",
            "Смешанное",
        ]
    }, [products])

    const handleSubcategoryClick = (subcategory) => {
        setActiveSubcategory(subcategory)

        catalogRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="home_page_container"
        >

            <Helmet>
                <title>Флоркет — Главная</title>
            </Helmet>

            {/* SUBCATEGORIES */}
            <div className="categories_bar">
                <div className="categories_inner">

                    {subcategoryChips.map((subcategory) => (
                        <button
                            key={subcategory}
                            type="button"
                            className={`category_chip ${activeSubcategory === subcategory ? "active" : ""}`}
                            onClick={() => handleSubcategoryClick(subcategory)}
                        >
                            {subcategory === "all" ? "Все букеты" : subcategory}
                        </button>
                    ))}

                </div>
            </div>

            {/* HERO */}
            <div className="slide_wrapper">
                <Slider
                    loop={true}
                    options={sliderMainOptions}
                />
            </div>

            {/* DELIVERY BANNER */}
            <section className="delivery_banner">
                <h2>Быстрая доставка цветов в Москве и области!</h2>
            </section>

            {/* FILTER */}
            <section className="bouquets_section" ref={catalogRef}>

                <h2>Подобрать букет</h2>

                <FlowerCatalogGrid selectedSubcategory={activeSubcategory} />

            </section>

        </motion.div>
    )

}

export default Index
