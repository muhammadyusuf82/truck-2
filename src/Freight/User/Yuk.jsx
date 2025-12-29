import React, { useState } from 'react'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import { FaBox } from "react-icons/fa";
import { IoArrowUpOutline } from "react-icons/io5";
import { FaTruck } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaFlagCheckered } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import chart_img from '../User/images/chart.png'
const Yuk = () => {
  const tabs = [
    "Barcha Yuklar",
    "Faol",
    "Kutilmoqda",
    "Yetkazilgan",
    "Bekor Qilingan",
    "Mening Yuklarim",
  ];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (<div className='min-h-screen bg-zinc-100'>
    <Navbar />
    <div className='container m-auto'>
      <h1 className='py-8 text-5xl font-semibold max-sm:mx-3'>Yuklar</h1>
      <p className='text-xl text-gray-600 pb-3 max-sm:mx-3'>Barcha yuklaringizni boshqaring, kuzating va tahrirlang</p>
      <div className="grid lg:grid-cols-2">
        <div className="chart">
          <div className="circle mr-2 my-2 rounded-2xl overflow-hidden flex w-full">
            <img src={chart_img} className='h-80 w-[97%]' alt="" />
          </div>
        </div>
        
        <div className="cards max-sm:mx-3">

          <div className="flex max-sm:flex-col justify-center gap-4 py-3">
            <div className="rounded-xl relative p-2 bg-white duration-200 transition-all hover:-translate-y-2 hover:shadow-lg overflow-hidden shadow-sm sm:w-1/2">
              <div className='h-1 absolute left-0 top-0 w-full bg-linear-30 from-[#4361ee] to-[#7209b7]'></div>
              <div className="flex flex-col py-3 px-4 gap-3">
                <div className="flex justify-between py-2">
                  <span className='p-3 bg-blue-400/50 rounded-xl text-blue-700'><FaBox className='inline text-xl' /></span>
                  <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'><IoArrowUpOutline className='inline' />12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className='text-xl text-gray-700'>Jami Yuklar</p>
                  <p className='px-3 text-xl font-bold text-gray-900'>127</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl relative p-2 bg-white duration-200 transition-all hover:-translate-y-2 hover:shadow-lg overflow-hidden shadow-sm sm:w-1/2">
              <div className='h-1 absolute left-0 top-0 w-full bg-sky-500'></div>
              <div className="flex flex-col py-3 px-4 gap-3">
                <div className="flex justify-between py-2">
                  <span className='p-3 bg-sky-400/30 rounded-xl text-sky-500'><FaTruck className='inline text-xl' /></span>
                  <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'><IoArrowUpOutline className='inline' />8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className='text-xl text-gray-700'>Faol Yuklar</p>
                  <p className='px-3 text-xl font-bold text-gray-900'>15</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex max-sm:flex-col justify-center gap-4 py-3">
            <div className="rounded-xl relative p-2 bg-white duration-200 transition-all hover:-translate-y-2 hover:shadow-lg overflow-hidden shadow-sm sm:w-1/2">
              <div className='h-1 absolute left-0 top-0 w-full bg-amber-500'></div>
              <div className="flex flex-col py-3 px-4 gap-3">
                <div className="flex justify-between py-2">
                  <span className='p-3 bg-amber-300/30 rounded-xl text-amber-500'><FaClock className='inline text-2xl' /></span>
                  <span className='text-center flex items-center px-2 text-red-500 rounded-2xl bg-red-600/20 text-sm'><FaArrowDown className='inline' /> 3%</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className='text-xl text-gray-700'>Kutilmoqda</p>
                  <p className='px-3 text-xl font-bold text-gray-900'>8</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl relative p-2 bg-white duration-200 transition-all hover:-translate-y-2 hover:shadow-lg overflow-hidden shadow-sm sm:w-1/2">
              <div className='h-1 absolute left-0 top-0 w-full bg-linear-30 to-[#4361ee] from-[#7209b7]'></div>
              <div className="flex flex-col py-3 px-4 gap-3">
                <div className="flex justify-between py-2">
                  <span className='p-3 bg-violet-400/50 rounded-xl text-violet-900'><IoIosCheckmarkCircle className='inline text-2xl' /></span>
                  <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'><IoArrowUpOutline className='inline' />24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className='text-xl text-gray-700'>Yetkazilgan</p>
                  <p className='px-3 text-xl font-bold text-gray-900'>89</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <form action="" className="w-full flex flex-wrap justify-center items-center gap-x-5 gap-y-3 p-6 my-4 bg-white rounded-xl">
        <div className="relative flex-1">
          <input type="text" className='border duration-200 transition-all border-gray-400 outline-0 w-full py-2 px-10 rounded-xl shadow-md focus:border-blue-700 focus:shadow-blue-300/50' />
          <IoIosSearch className='absolute top-3 text-xl left-3 text-gray-600' />
        </div>
        <div name='holatlar' className='border cursor-pointer border-gray-300 px-3 py-2 rounded-xl shadow-xs active:border-blue-700 active:shadow-blue-300/50'>
          <p className='items-center flex'>Barcha holatlar <FaCaretDown className='inline mx-1 text-gray-600' /></p>
        </div>
        <div name='turlar' className='border cursor-pointer border-gray-300 px-3 py-2 rounded-xl shadow-xs active:border-blue-700 active:shadow-blue-300/50'>
          <p className='items-center flex'>Barcha turlar <FaCaretDown className='inline mx-1 text-gray-600' /></p>
        </div>
        <div name='vaqtlar' className='border cursor-pointer border-gray-300 px-3 py-2 rounded-xl shadow-x active:border-blue-700 active:shadow-blue-300/50'>
          <p className='items-center flex'>Barcha vaqtlar <FaCaretDown className='inline mx-1 text-gray-600' /></p>
        </div>
        <div>
          <button className='bg-blue-700 text-white p-2 rounded-lg hover:-translate-y-1 duration-200 transition-all'>+ Yangi yuk</button>
        </div>
      </form>
      {/* <div className="flex  items-center flex-wrap gap-y-4 px-1 my-10">
        <p className='transition-all duration-200 border-b border-b-gray-300 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700'>Barcha Yuklar</p>
        <p className='transition-all duration-200 border-b border-b-gray-300 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700'>Faol</p>
        <p className='transition-all duration-200 border-b border-b-gray-300 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700'>Kutilmoqda</p>
        <p className='transition-all duration-200 border-b border-b-gray-300 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700'>Yetkazilgan</p>
        <p className='transition-all duration-200 border-b border-b-gray-300 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700'>Bekor Qilingan</p>
        <p className='transition-all duration-200 border-b border-b-gray-300 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700'>Mening Yuklarim</p>
      </div> */}
      <div className="flex items-center flex-wrap gap-y-4 px-1 my-10">
      {tabs.map((tab) => (
        <p key={tab} onClick={() => setActiveTab(tab)} className={`transition-all duration-200 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700 ${activeTab===tab ? "border-b-2 border-b-blue-700":"border-b-2 border-b-gray-300"}`}>
          {tab}
        </p>
      ))}
    </div>
      <div className="rounded-2xl overflow-hidden my-10 shadow-lg">
      <table className='w-full shadow-md border-collapse max-sm:flex'>
        <thead>
          <tr className='max-sm:hidden'>
            <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>Yuk ID</th>
            <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>MARSHRUT</th>
            <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>HOLAT</th>
            <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>VAQT</th>
            <th className='border-b-gray-300 text-gray-800 border-b px-4 py-5 text-start'>NARX</th>
          </tr>
        </thead>
        <tbody className='bg-white flex-1 rounded-2xl mx-2 max-sm:mx-10 max-sm:flex max-sm:flex-col mb-10 '>
          <tr className='max-sm:flex max-sm:border-t-8 max-sm:border-t-zinc-100 max-sm:flex-col'>
            <td className='py-4 pl-10 sm:px-4'>
              <p className='font-semibold'>YUK-2024-001</p>
              <p className='text-sm text-gray-600'>Meva partiyasi</p>
            </td>
            <td className='py-4 pl-10 sm:px-4 '>
              <div className='flex items-center gap-x-2'>
                <span className='px-2 bg-blue-500/20 rounded-full text-blue-700 pb-1'><FaLocationDot className='inline text-xs'/></span>
                <div>
                  <p className='font-semibold'>Toshkent</p>
                  <p className='text-sm text-gray-600'>Chorsu Bozori, 45-uy</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <span className='pb-1 px-2 text-violet-900 bg-violet-600/20 rounded-full'><FaFlagCheckered className='inline text-xs'/></span>
                <div>
                  <p className='font-semibold'>Samarqand</p>
                  <p className='text-sm text-gray-600'>Registon maydoni</p>
                </div>
              </div>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <span className='rounded-full flex max-w-19 items-center text-sky-500 bg-blue-300/30 px-2 py-1'><GoDotFill className='inline'/> FAOL</span>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <p className='font-semibold'>2024 M12 15</p>
              <p className='text-sm text-gray-600'>Yetkazish: 2024-12-15</p>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <p>850,000 so'm</p>
            </td>
          </tr>
          <tr className='max-sm:flex max-sm:border-t-8 max-sm:border-t-zinc-100 max-sm:flex-col border-t border-t-gray-300'>
            <td className='py-4 pl-10 sm:px-4'>
              <p className='font-semibold'>YUK-2024-001</p>
              <p className='text-sm text-gray-600'>Meva partiyasi</p>
            </td>
            <td className='py-4 pl-10 sm:px-4 '>
              <div className='flex items-center gap-x-2'>
                <span className='px-2 bg-blue-500/20 rounded-full text-blue-700 pb-1'><FaLocationDot className='inline text-xs'/></span>
                <div>
                  <p className='font-semibold'>Toshkent</p>
                  <p className='text-sm text-gray-600'>Chorsu Bozori, 45-uy</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <span className='pb-1 px-2 text-violet-900 bg-violet-600/20 rounded-full'><FaFlagCheckered className='inline text-xs'/></span>
                <div>
                  <p className='font-semibold'>Samarqand</p>
                  <p className='text-sm text-gray-600'>Registon maydoni</p>
                </div>
              </div>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <span className='rounded-full flex max-w-19 items-center text-sky-500 bg-blue-300/30 px-2 py-1'><GoDotFill className='inline'/> FAOL</span>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <p className='font-semibold'>2024 M12 15</p>
              <p className='text-sm text-gray-600'>Yetkazish: 2024-12-15</p>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <p>850,000 so'm</p>
            </td>
          </tr>
          <tr className='max-sm:flex max-sm:border-t-8 max-sm:border-t-zinc-100 max-sm:flex-col border-t border-t-gray-300'>
            <td className='py-4 pl-10 sm:px-4'>
              <p className='font-semibold'>YUK-2024-001</p>
              <p className='text-sm text-gray-600'>Meva partiyasi</p>
            </td>
            <td className='py-4 pl-10 sm:px-4 '>
              <div className='flex items-center gap-x-2'>
                <span className='px-2 bg-blue-500/20 rounded-full text-blue-700 pb-1'><FaLocationDot className='inline text-xs'/></span>
                <div>
                  <p className='font-semibold'>Toshkent</p>
                  <p className='text-sm text-gray-600'>Chorsu Bozori, 45-uy</p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <span className='pb-1 px-2 text-violet-900 bg-violet-600/20 rounded-full'><FaFlagCheckered className='inline text-xs'/></span>
                <div>
                  <p className='font-semibold'>Samarqand</p>
                  <p className='text-sm text-gray-600'>Registon maydoni</p>
                </div>
              </div>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <span className='rounded-full flex max-w-19 items-center text-sky-500 bg-blue-300/30 px-2 py-1'><GoDotFill className='inline'/> FAOL</span>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <p className='font-semibold'>2024 M12 15</p>
              <p className='text-sm text-gray-600'>Yetkazish: 2024-12-15</p>
            </td>
            <td className='py-4 pl-10 sm:px-4'>
              <p>850,000 so'm</p>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div className="py-10"></div>
    </div>
    <Footer/>
  </div>)
}

export default Yuk