import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'

// icons
import { FaSyncAlt, FaLayerGroup, FaBox, FaTruck, FaWarehouse, FaEye, FaFilter, FaSearch, FaShareAlt, FaCircle, FaUsers, FaRoad, FaClock, FaPlus, FaMinus, FaExpand } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Footer from './Footer/Footer';

function Map() {
    const layers = [
        { id: 1, icon: FaBox, title: "Yuklar", num: 12, bg: "bg-blue-500" },
        { id: 2, icon: FaTruck, title: "Haydovchilar", num: 24, bg: "bg-blue-500" },
        { id: 2, icon: FaWarehouse, title: "Omborlar", num: 8, bg: "bg-[#e9ecef]" },
    ]

    const [settings, setSettings] = useState([
        { id: 1, title: "Traffic", active: false },
        { id: 2, title: "Marshrutlar", active: true },
        { id: 3, title: "Real-vaqt kuzatish", active: true }
    ]);

    const toggleSwitch = (id) => {
        setSettings(prevSettings =>
            prevSettings.map(item =>
                item.id === id ? { ...item, active: !item.active } : item
            )
        );
    };

    const filters = [
        { id: 1, title: "Barchasi", active: true },
        { id: 2, title: "Faol", active: false },
        { id: 3, title: "Kutilmoqda", active: false },
        { id: 4, title: "Yetkazildi", active: false },
    ]

    const statistics = [
        { id: 1, icon: FaTruck, num: 15, title: "Faol yuklar" },
        { id: 2, icon: FaUsers, num: 24, title: "Onlayn Haydovchilar" },
        { id: 3, icon: FaRoad, num: "1,248 km", title: "Jami masofa" },
        { id: 4, icon: FaClock, num: "4.2 soat", title: "O'rtacha vaqt" },
    ]

    return (<>
        <Navbar/>
        <div className='bg-[#f8f8fd] py-3 sm:py-6 md:py-9 lg:py-12 px-2 sm:px-4 md:px-6 xl:px-8'>
            <h1 className='text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-semibold text-center md:text-start'>Real-vaqt Xaritasi</h1>
            <p className='text-sm sm:text-base md:text-lg lg:text-xl text-[#495057] text-center md:text-start mt-4'>Barcha yuklarni va haydovchilarni real vaqtda kuzating</p>

            <div className="flex gap-3 sm:gap-5 md:gap-7 lg:gap-9 flex-col md:flex-row py-5 sm:py-7 md:py-9">
                <div className="w-full md:w-140 flex gap-3 sm:gap-5 lg:gap-7 flex-col">
                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
                        <div className="flex items-center justify-between">
                            <h3 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold'>Xarita Sozlamalari</h3>
                            <button className='border border-blue-500 rounded-lg flex gap-2.5 items-center text-xs md:text-sm text-blue-500 font-medium hover:bg-blue-500 hover:text-white py-1.5 px-4 duration-300 cursor-pointer'>
                                <FaSyncAlt />
                                Reset
                            </button>
                        </div>

                        <div className="mt-3 md:mt-5">
                            <p className='flex gap-2.5 items-center text-xs sm:text-sm md:text-base font-medium'>
                                <FaLayerGroup className='text-blue-500' />
                                Qatlamlar
                            </p>

                            <ul className='list-none flex gap-1 flex-wrap py-3'>
                                {layers.map(item => {
                                    return (
                                        <li key={item.id} className={`flex gap-1 items-center py-1 px-3 ${item.bg} ${item.bg === "bg-blue-500" ? "text-white" : "text-black"} rounded-full hover:bg-blue-500 hover:text-white duration-300 cursor-pointer`}>
                                            <item.icon />
                                            <span className='text-sm'>{item.title}</span>
                                            <p className={`${item.num < 10 ? "px-3" : "px-2"} text-sm bg-white rounded-full text-blue-500`}>{item.num}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="mt-1 md:mt-2.5">
                            <p className='flex gap-2.5 items-center text-xs sm:text-sm md:text-base font-medium mb-1'>
                                <FaEye className='text-blue-500' />
                                Ko'rinish
                            </p>

                            <div>
                                {settings.map(item => {
                                    return (
                                        <div key={item.id} className="flex items-center justify-between mb-4">
                                            <p className='text-xs sm:text-sm md:text-base'>{item.title}</p>
                                            <div
                                                className={`w-12 p-1 rounded-full flex transition-all duration-300 cursor-pointer ${!item.active ? "justify-start bg-[#ced4da]" : "justify-end bg-blue-500"
                                                    }`}
                                                onClick={() => toggleSwitch(item.id)}
                                            >
                                                <div className="w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300"></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="mt-2 md:mt-6">
                            <p className='flex gap-2.5 items-center text-xs sm:text-sm md:text-base font-medium mb-1'>
                                <FaFilter className='text-blue-500' />
                                Filtrlar
                            </p>

                            <ul className='list-none flex gap-2 flex-wrap'>
                                {filters.map(item => {
                                    return (
                                        <li key={item.id} className={`py-1 px-3 ${item.active === true ? "bg-blue-500 text-white" : "bg-[#e9ecef]"} rounded-full hover:bg-blue-500 hover:text-white duration-300 cursor-pointer`}>{item.title}</li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="flex gap-3 pt-10">
                            <button className='w-3/5 flex gap-2 items-center bg-blue-500 border border-blue-500 text-sm text-white font-medium py-1.5 px-4 rounded-full transform hover:-translate-y-1 hover:shadow-lg duration-300 cursor-pointer'>
                                <FaSearch />
                                Yukni izlash
                            </button>
                            <button className='w-3/5 flex gap-2 items-center bg-white border border-blue-500 text-sm text-blue-500 font-medium py-1.5 px-4 rounded-full hover:bg-blue-500 hover:text-white duration-300 cursor-pointer'>
                                <FaShareAlt />
                                Ulashish
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
                        <div className="flex items-center justify-between">
                            <h3 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold'>Real-vaqt Statistikasi</h3>

                            <p className='flex gap-1 items-center text-xs sm:text-sm text-[#4cc9f0]'>
                                <FaCircle className='text-[10px]' />
                                Jonli
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-9 py-5">
                            {statistics.map(item => {
                                return (
                                    <div key={item.id} className="">
                                        <div className="flex gap-2 items-center text-blue-500">
                                            <item.icon className='text-lg md:text-xl' />
                                            <h2 className='text-lg sm:text-xl md:text-2xl font-bold leading-6'>{item.num}</h2>
                                        </div>
                                        <span className='text-xs md:text-sm text-[#6c757d] uppercase'>{item.title}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold'>Yuk kuzatish</h3>
                            <button className='border border-blue-500 rounded-lg flex gap-2.5 items-center text-xs md:text-sm text-blue-500 font-medium hover:bg-blue-500 hover:text-white py-1.5 px-4 duration-300 cursor-pointer'>
                                <FaSyncAlt />
                                Yangilash
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative w-full h-screen md:h-auto bg-[#f8f8fd] rounded-2xl shadow-2xl p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
                    <div className="w-full md:w-1/2 flex gap-4 items-center bg-white border border-gray-300 rounded-xl shadow-lg py-2.5 px-4 m-auto transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 focus-within:shadow-md">
                        <FaSearch className='text-gray-400' />
                        <input
                            placeholder="Manzil yoki yuk ID bo'yicha qidirish..."
                            type="text"
                            className='w-full outline-none bg-transparent'
                        />
                    </div>

                    <div className="absolute top-8 right-8 flex gap-4 mt-15 md:mt-0 md:flex-col">
                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-lg text-gray-500 hover:text-white hover:bg-blue-500 duration-300 cursor-pointer">
                            <FaPlus />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-lg text-gray-500 hover:text-white hover:bg-blue-500 duration-300 cursor-pointer">
                            <FaMinus />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-lg text-gray-500 hover:text-white hover:bg-blue-500 duration-300 cursor-pointer">
                            <FaLocationCrosshairs />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-lg text-gray-500 hover:text-white hover:bg-blue-500 duration-300 cursor-pointer">
                            <FaExpand />
                        </div>
                    </div>

                    <div className="absolute bottom-8 right-8 bg-white rounded-lg shadow-md p-4">
                        <h3 className='text-xs font-medium md:text-sm uppercase text-gray-500'>belgilar</h3>
                        <ul className='list-none'>
                            <li className='flex gap-2 items-center text-xs mt-2'>
                                <span className='w-3 h-3 rounded-full bg-[#4361ee]'></span>
                                Yuklar
                            </li>
                            <li className='flex gap-2 items-center text-xs my-2'>
                                <span className='w-3 h-3 rounded-full bg-[#4cc9f0]'></span>
                                Haydovchilar
                            </li>
                            <li className='flex gap-2 items-center text-xs'>
                                <span className='w-3 h-3 rounded-full bg-[#f8961e]'></span>
                                Omborlar
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>)
}

export default Map
