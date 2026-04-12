import { useEffect, useMemo, useRef, useState } from 'react'
import './style.scss'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import { useSearchParams } from 'react-router-dom'

// components
import Slider from '@/components/Slider'
import FlowerCatalogGrid from '@/components/FlowerCatalogGrid'
import { useStore } from '@/useStore'
import { SUBCATEGORY_SHOWCASE } from '@/constants/subcategoryShowcase'

// constants
import { pageVariants, pageTransition } from '@/constants/framerSettings.js'

const Index = () => {
    const catalogRef = useRef(null)
    const { products } = useStore()
    const [searchParams, setSearchParams] = useSearchParams()
    const [activeSubcategory, setActiveSubcategory] = useState(
        searchParams.get("subcategory") || "all"
    )

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
        const productsList = Array.isArray(products) ? products : []

        return SUBCATEGORY_SHOWCASE
            .filter((item) => item.enabled)
            .filter((item) => {
                if (item.key === "all") return true
                return productsList.some((product) => product.subcategory === item.key)
            })
            .map((item) => {
                const coverFromProducts = productsList.find(
                    (product) => product.subcategory === item.key && product.image
                )?.image

                return {
                    ...item,
                    // Приоритет у изображения из конфига, чтобы им можно было управлять вручную.
                    image: String(item.image || coverFromProducts || "").trim(),
                }
            })
    }, [products, SUBCATEGORY_SHOWCASE])

    const handleSubcategoryClick = (subcategory) => {
        setActiveSubcategory(subcategory)
        if (subcategory === "all") {
            setSearchParams({})
        } else {
            setSearchParams({ subcategory })
        }

        catalogRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    useEffect(() => {
        const fromUrl = searchParams.get("subcategory") || "all"
        if (fromUrl !== activeSubcategory) {
            setActiveSubcategory(fromUrl)
        }
    }, [searchParams, activeSubcategory])

    useEffect(() => {
        if (!subcategoryChips.length) return

        const isAllowed = subcategoryChips.some((item) => item.key === activeSubcategory)
        if (isAllowed) return

        const fallbackKey = subcategoryChips[0].key
        setActiveSubcategory(fallbackKey)

        if (fallbackKey === "all") {
            setSearchParams({})
        } else {
            setSearchParams({ subcategory: fallbackKey })
        }
    }, [subcategoryChips, activeSubcategory, setSearchParams])

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

            {/* HERO */}
            <div className="slide_wrapper">
                <Slider
                    loop={true}
                    options={sliderMainOptions}
                />
            </div>

            {/* SUBCATEGORIES */}
            <div className="categories_bar">
                <div className="categories_inner">

                    {subcategoryChips.map((subcategory) => (
                        <button
                            key={subcategory.key}
                            type="button"
                            className={`category_chip ${activeSubcategory === subcategory.key ? "active" : ""}`}
                            onClick={() => handleSubcategoryClick(subcategory.key)}
                        >
                            <div className="category_chip_media">
                                <img src={String(subcategory.image || "").trim()} alt={subcategory.label} />
                            </div>
                            <span>{subcategory.label}</span>
                        </button>
                    ))}

                </div>
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
