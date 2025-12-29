import React, { useState } from 'react'
import Sidebar from './Sidebar';

// icons
import { FaPlus, FaCircleCheck, FaClock, FaCreditCard, FaFilter, FaCheck, FaGavel } from "react-icons/fa6";
import { FaBox, FaWallet, FaMobileAlt, FaArrowUp, FaArrowDown, FaMapMarkerAlt, FaFlagCheckered, FaWeightHanging, FaRulerCombined, FaSnowflake, FaBiohazard, FaChevronLeft, FaChevronRight, FaSyncAlt, FaExclamationTriangle } from "react-icons/fa";
import Navbar from './Navbar/Navbar';
import Footer from '../../User/components/User/Footer/Footer';

const Home = () => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const results = [
    { id: 1, icon: FaBox, icon_color: '#4361ee', icon_bg: '#eceffd', benefit: true, percent: 12, total: 127, title: "Umumiy yuklar" },
    { id: 2, icon: FaCircleCheck, icon_color: '#4cc9f0', icon_bg: '#edf9fd', benefit: true, percent: 8, total: 89, title: "Yetkazilgan" },
    { id: 3, icon: FaClock, icon_color: '#ffcc02', icon_bg: '#fff9e6', benefit: false, percent: 3, total: 15, title: "Jarayonda" },
    { id: 4, icon: FaWallet, icon_color: '#f72585', icon_bg: '#fee9f3', benefit: true, percent: 24, total: '12.4M', title: "So'm daromad" }
  ]

  const actins = [
    { id: 1, icon: FaPlus, icon_color: '#4361ee', title: 'Yuk qo\'shish' },
    { id: 2, icon: FaBox, icon_color: '#4cc9f0', title: 'Yuklarim' },
    { id: 3, icon: FaMapMarkerAlt, icon_color: '#f72585', title: 'Kuzatish' },
    { id: 4, icon: FaCreditCard, icon_color: '#7209b7', title: 'To\'lov' },
  ]

  const loads = [
    { id: 1, l_num: "#YUK-2451", situation: "Featured", situation_bg: 'bg-gradient-to-br from-[#4361ee] to-[#7209b7]', situation_color: 'text-white', from_province: "Toshkent", from_loc: "Chorsu bozori", to_province: "Samarqand", to_loc: "Registon maydoni", ton: 2.5, m: 12, product: "Umumiy yuk", type: 'Tent', date: "Bugun 18:00", price: "850,000 so'm" },
    { id: 2, l_num: "#YUK-2450", situation: "KUTILMOQDA", situation_bg: 'bg-[#fee9f3]', situation_color: 'text-[#f72585]', from_province: "Farg'ona", from_loc: "Markaziy bozor", to_province: "Toshkent", to_loc: "Yangiobod", ton: 5, m: 25, product: "Sovutilgan", type: 'Refrijerator', date: "Ertaga 09:00", price: "1,200,000 so'm" },
    { id: 3, l_num: "#YUK-2449", situation: "YAKUNLANGAN", situation_bg: 'bg-[#eceffd]', situation_color: 'text-[#4361ee]', from_province: "Andijon", from_loc: "Avtovokzal", to_province: "Namangan", to_loc: "Chust tumani", ton: 1.2, m: 8, product: "Maishiy yuk", type: 'Yopiq', date: "Kecha", price: "650,000 so'm" },
    { id: 4, l_num: "#YUK-2448", situation: "Featured", situation_bg: 'bg-gradient-to-br from-[#4361ee] to-[#7209b7]', situation_color: 'text-white', from_province: "Buxoro", from_loc: "Ko'kaldosh", to_province: "Navoiy", to_loc: "Zarafshon", ton: 8, m: 40, product: "Xavfli yuk", type: 'Yopiq', date: "Hozir", price: "2,500,000 so'm" },
    { id: 5, l_num: "#YUK-2447", situation: "FAOL", situation_bg: 'bg-[#edf9fd]', situation_color: 'text-[#5acdf1]', from_province: "Qarshi", from_loc: "Qurilish bozori", to_province: "Termiz", to_loc: "Markaz", ton: 15, m: 16, product: "Umumiy yuk", type: 'Platforma', date: "Ertalab 08:00", price: "1,800,000 so'm" },
    { id: 6, l_num: "#YUK-2446", situation: "Featured", situation_bg: 'bg-gradient-to-br from-[#4361ee] to-[#7209b7]', situation_color: 'text-white', from_province: "Toshkent", from_loc: "Mirzo Ulug'bek", to_province: "Buxoro", to_loc: "Eski shahar", ton: 0.8, m: 6, product: "Maishiy yuk", type: 'Yopiq', date: "Bugun 15:00", price: "950,000 so'm" },
    { id: 7, l_num: "#YUK-2445", situation: "YAKUNLANGAN", situation_bg: 'bg-[#eceffd]', situation_color: 'text-[#4361ee]', from_province: "Marg'ilon", from_loc: "Ipak fabrikasi", to_province: "Toshkent", to_loc: "Chorsu", ton: 3, m: 18, product: "Umumiy yuk", type: 'Tent', date: "2 kun oldin", price: "750,000 so'm" },
    { id: 8, l_num: "#YUK-2444", situation: "Featured", situation_bg: 'bg-gradient-to-br from-[#4361ee] to-[#7209b7]', situation_color: 'text-white', from_province: "Toshkent", from_loc: "Farmatsevtika zavodi", to_province: "Nukus", to_loc: "Shifoxona", ton: 2, m: 15, product: "Sovutilgan", type: 'Refrijerator', date: "Ertaga 10:00", price: "1,500,000 so'm" },
  ];

  // Filter va Pagination States
  const [filter, setFilter] = useState("Barchasi");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtrlash mantiqi
  const filteredLoads = loads.filter(item => {
    if (filter === "Barchasi") return true;
    if (filter === "Faol") return item.situation === "FAOL" || item.situation === "Featured";
    return item.situation.toLowerCase() === filter.toLowerCase();
  });

  // Pagination mantiqi
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLoads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLoads.length / itemsPerPage);

  // Ikonka tanlash funksiyasi
  const getProductIcon = (product) => {
    if (product === "Sovutilgan") return <FaSnowflake className="text-[#4361ee]" />;
    if (product === "Xavfli yuk") return <FaBiohazard className="text-[#4361ee]" />;
    return <FaBox className="text-[#4361ee]" />;
  };

  const recentActivity = [
    { id: 1, icon: FaCheck, icon_color: "text-[#4cc9f0]", title: "Yuk yetkazildi", desc: "#YUK-2451 - Toshkent → Samarqand", time: "10 min oldin" },
    { id: 2, icon: FaGavel, icon_color: "text-[#4361ee]", title: "Yangi taklif", desc: "John Doe #YUK-2450 yukiga taklif berdi", time: "30 min oldin" },
    { id: 3, icon: FaExclamationTriangle, icon_color: "text-[#f72585]", title: "Yuk kechikdi", desc: "#YUK-2449 - Andijon → Namangan", time: "2 soat oldin" },
  ]

  return (
    <div className='bg-[#f8f9fe] min-h-screen'>
      <Navbar />
      <div className="flex-1">

        <div className="mx-auto px-3 sm:px-4 md:px-5 lg:px-6 py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-8">

          <div className="lg:w-72 shrink-0">
            <Sidebar />
          </div>


          <div className="w-full flex gap-3 sm:gap-4 md:gap-5 flex-col">

            {/* Welcome Section */}
            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-center justify-between hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300">
              <div className='w-full sm:w-3/6 text-center sm:text-left'>
                <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2'>Xush kelibsiz, Ali!</h2>
                <p className='text-sm sm:text-base md:text-lg text-gray-600'>Bugun nima qilmoqchisiz? Yuk qo'shing yoki mavjud yuklarni ko'rib chiqing.</p>
              </div>
              <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto'>
                <button className='relative text-sm sm:text-base text-white font-semibold bg-[#415fe9] border-2 border-blue-500 rounded-lg sm:rounded-xl flex gap-1 sm:gap-2 items-center justify-center py-2 px-3 sm:py-2 sm:px-6 hover:shadow-xl transform hover:-translate-y-1 duration-300 cursor-pointer overflow-hidden group'>
                  <FaPlus className='text-sm sm:text-base' />
                  Yuk qo'shish
                  <div className="absolute w-0 h-0 rounded-full bg-white/40 group-hover:w-40 group-hover:h-40 duration-500"></div>
                </button>
                <button className='relative text-sm sm:text-base text-[#415fe9] font-semibold bg-white border-2 border-blue-500 rounded-lg sm:rounded-xl flex gap-1 sm:gap-2 items-center justify-center py-2 px-3 sm:py-2 sm:px-6 hover:bg-[#415fe9] hover:text-white duration-300 cursor-pointer overflow-hidden group'>
                  <FaMobileAlt className='text-sm sm:text-base' />
                  Ilovani ko'rish
                  <div className="absolute w-0 h-0 rounded-full bg-white/40 group-hover:w-40 group-hover:h-40 duration-500"></div>
                </button>
              </div>
            </div>

            {/* Results Cards */}
            <div className="grid gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-3 sm:py-4 md:py-5 lg:py-6">
              {results.map((item, index) => {
                return (
                  <div key={index} className="bg-linear-to-br from-[#4361ee] to-[#7209b7] shadow-lg rounded-xl sm:rounded-2xl pt-1 transform hover:-translate-y-0.5 duration-300 overflow-hidden">
                    <div className="w-full h-full bg-white p-4 sm:p-5 md:p-6 lg:p-8">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center" style={{ background: item.icon_bg }}>
                          <item.icon className="text-lg sm:text-xl md:text-2xl" style={{ color: item.icon_color }} />
                        </div>
                        <p className='flex gap-1 items-center rounded-lg py-1 px-2 text-xs sm:text-sm md:text-base' style={{ background: item.benefit === true ? '#edf9fd' : '#fee9f3', color: item.benefit === true ? '#67d1f3' : '#f72585' }}>
                          {item.benefit === true ? <FaArrowUp className='text-xs sm:text-sm' /> : <FaArrowDown className='text-xs sm:text-sm' />}
                          <span>{item.percent}%</span>
                        </p>
                      </div>
                      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mt-3 sm:mt-4 md:mt-5'>{item.total}</h1>
                      <h3 className='text-xs sm:text-sm md:text-base text-[#6c757d] uppercase mt-1 sm:mt-2'>{item.title}</h3>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold border-b border-gray-300 p-4 sm:p-5 md:p-6 lg:p-8">
                Tezkor Amallar
              </h1>
              <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2 sm:py-3 md:py-4 lg:py-5 px-2 sm:px-3 md:px-4 lg:px-6">
                {actins.map((item, index) => {
                  return (
                    <div key={index} className="bg-white shadow-md border border-white rounded-lg flex gap-1 sm:gap-2 items-center flex-col p-2 sm:p-3 md:p-4 hover:border-blue-500 hover:shadow-lg transform hover:-translate-y-0.5 duration-300 cursor-pointer py-3 sm:py-4 md:py-5 lg:py-6">
                      <item.icon style={{ color: item.icon_color }} className='text-base sm:text-lg md:text-xl' />
                      <span className='text-xs sm:text-sm md:text-base text-center px-1'>{item.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Active Loads */}
            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300 my-5 sm:my-6 md:my-8 lg:my-10 py-5 sm:py-6 md:py-8 lg:py-10 px-3 sm:px-4 md:px-5 lg:px-8">
              <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-3 sm:mb-4 md:mb-5'>Faol yuklar</h1>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-5 sm:mb-6 md:mb-8 lg:mb-10 justify-center">
                {["Barchasi", "Faol", "Kutilmoqda", "Yakunlangan"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setFilter(tab); setCurrentPage(1); }}
                    className={`px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 md:py-2 rounded-full font-medium sm:font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 cursor-pointer ${filter === tab ? 'bg-[#4361ee] text-white shadow-lg scale-105' : 'bg-white text-gray-500 hover:bg-gray-100'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
                {currentItems.map((item) => (
                  <div key={item.id} className="flex flex-col bg-white border border-gray-100 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg duration-300 hover:border-[#4361ee] transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-2xl overflow-hidden">

                    <div className="flex items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 pt-4 sm:pt-5 md:pt-6 lg:pt-8">
                      <span className='text-xs sm:text-sm text-gray-400 font-bold tracking-wider'>{item.l_num}</span>
                      <span className={`text-[8px] sm:text-[9px] md:text-[10px] uppercase font-bold py-0.5 sm:py-1 px-2 sm:px-3 rounded-lg ${item.situation_bg} ${item.situation_color}`}>
                        {item.situation}
                      </span>
                    </div>

                    <div className="border-t border-b border-gray-100 px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 lg:py-6 space-y-3 sm:space-y-4 md:space-y-5">
                      <div className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <FaMapMarkerAlt className='text-sm sm:text-base md:text-lg text-[#4361ee]' />
                        </div>
                        <div>
                          <h4 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 leading-tight'>{item.from_province}</h4>
                          <p className='text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1'>{item.from_loc}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                          <FaFlagCheckered className='text-sm sm:text-base md:text-lg text-[#4361ee]' />
                        </div>
                        <div>
                          <h4 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-800 leading-tight'>{item.to_province}</h4>
                          <p className='text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1'>{item.to_loc}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-1 sm:gap-x-2 px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 lg:py-6 bg-slate-50/50">
                      <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium'>
                        <FaWeightHanging className='text-[#4361ee] text-xs sm:text-sm' />
                        <span>{item.ton} t</span>
                      </div>
                      <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium'>
                        <FaRulerCombined className='text-[#4361ee] text-xs sm:text-sm' />
                        <span>{item.m} m³</span>
                      </div>
                      <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium'>
                        {getProductIcon(item.product)}
                        <span className="truncate">{item.product}</span>
                      </div>
                      <div className='flex gap-1 sm:gap-2 items-center text-xs sm:text-sm text-slate-600 font-medium'>
                        <FaClock className='text-[#4361ee] text-xs sm:text-sm' />
                        <span className='truncate'>{item.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 py-3 sm:py-4 md:py-5 lg:py-6 mt-auto gap-2 sm:gap-3">
                      <h2 className='text-base sm:text-lg md:text-xl lg:text-2xl font-black text-[#4361ee] text-center sm:text-left'>{item.price}</h2>
                      <button className='bg-[#4361ee] text-white text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg sm:rounded-xl py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 md:px-5 hover:bg-[#324fdb] transition-all cursor-pointer active:scale-95 w-full sm:w-auto'>
                        Taklif berish
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-10 md:mt-12 lg:mt-16">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:text-[#4361ee] hover:border-[#4361ee] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <FaChevronLeft className='text-sm sm:text-base' />
                  </button>

                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full font-bold transition-all text-xs sm:text-sm md:text-base ${currentPage === i + 1 ? 'bg-[#4361ee] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100 hover:border-[#4361ee]'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:text-[#4361ee] hover:border-[#4361ee] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <FaChevronRight className='text-sm sm:text-base' />
                  </button>
                </div>
              )}
            </div>

            {/* Real-time Map */}
            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300">
              <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-300 p-4 sm:p-5 md:p-6 lg:p-8 gap-3 sm:gap-0">
                <h3 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center sm:text-left'>Real vaqtda xarita</h3>
                <div className='flex gap-2 sm:gap-3'>
                  <button className='relative text-xs sm:text-sm md:text-base text-white font-semibold bg-[#415fe9] border-2 border-blue-500 rounded-lg sm:rounded-xl flex gap-1 sm:gap-2 items-center justify-center py-1.5 sm:py-2 px-2 sm:px-4 md:px-6 hover:shadow-xl transform hover:-translate-y-0.5 sm:hover:-translate-y-1 duration-300 cursor-pointer overflow-hidden group'>
                    <FaSyncAlt className='text-sm sm:text-base' />
                    <span className='hidden sm:inline'>Yangilash</span>
                    <span className='sm:hidden'>Yangi</span>
                    <div className="absolute w-0 h-0 rounded-full bg-white/40 group-hover:w-40 group-hover:h-40 duration-500"></div>
                  </button>
                  <button className='relative text-xs sm:text-sm md:text-base text-[#415fe9] font-semibold bg-white border-2 border-blue-500 rounded-lg sm:rounded-xl flex gap-1 sm:gap-2 items-center justify-center py-1.5 sm:py-2 px-2 sm:px-4 md:px-6 hover:bg-[#415fe9] hover:text-white duration-300 cursor-pointer overflow-hidden group'>
                    <FaFilter className='text-sm sm:text-base' />
                    <span className='hidden sm:inline'>Filtr</span>
                    <div className="absolute w-0 h-0 rounded-full bg-white/40 group-hover:w-40 group-hover:h-40 duration-500"></div>
                  </button>
                </div>
              </div>

              <div className="p-3 sm:p-4 md:p-5 lg:p-8 w-full h-64 sm:h-80 md:h-96 lg:h-122.5 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.5026388484!2d69.139281!3d41.2825125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a997129525f41!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yuk.uz xaritasi"
                ></iframe>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="w-full bg-white shadow-lg border border-white rounded-2xl sm:rounded-3xl hover:border-blue-500 hover:shadow-xl transform hover:-translate-y-1 sm:hover:-translate-y-2 duration-300">
              <div className="border-b border-gray-300 p-4 sm:p-5 md:p-6 lg:p-8">
                <h3 className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold'>So'nggi Faoliyat</h3>
              </div>

              <div className="p-3 sm:p-4 md:p-5 lg:p-8 space-y-4 sm:space-y-5">
                {recentActivity.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-5 items-start sm:items-center">
                      <item.icon className={`${item.icon_color} text-lg sm:text-xl mt-1 sm:mt-0`} />
                      <div className="flex-1">
                        <p className='text-sm sm:text-base md:text-lg font-medium'>{item.title}</p>
                        <span className='text-xs sm:text-sm md:text-base text-[#6c757d]'>{item.desc}</span>
                      </div>
                      <p className='text-xs sm:text-sm md:text-base text-[#6c757d] text-right sm:text-left'>{item.time}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Home
