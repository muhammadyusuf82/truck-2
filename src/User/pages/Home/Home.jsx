import React, { useState, useEffect, useRef } from 'react';
import { FaBox, FaTruck, FaUpload, FaUserCheck, FaTruckLoading, FaShieldAlt, FaMapMarkerAlt, FaWeightHanging, FaRegSnowflake, FaMoneyBillWave, FaStar } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import { FaPercent, FaHeadset, FaMapLocationDot, FaFileContract, FaFlagCheckered, FaRulerCombined, FaClock, FaList, FaPlus } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";

import Navbar from '../../components/User/Navbar/Navbar';
import Footer from '../../components/User/Footer/Footer';

const Home = () => {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  const [counts, setCounts] = useState({
    successful: 0,
    drivers: 0,
    satisfaction: 0
  });

  const targetCounts = {
    successful: 10,
    drivers: 5,
    satisfaction: 98
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const counterInterval = setInterval(() => {
      currentStep++;

      const progress = currentStep / steps;
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);

      setCounts({
        successful: Math.min(Math.floor(easeOutQuad * targetCounts.successful), targetCounts.successful),
        drivers: Math.min(Math.floor(easeOutQuad * targetCounts.drivers), targetCounts.drivers),
        satisfaction: Math.min(Math.floor(easeOutQuad * targetCounts.satisfaction), targetCounts.satisfaction)
      });

      if (currentStep >= steps) {
        clearInterval(counterInterval);
        setCounts(targetCounts);
      }
    }, stepDuration);

    return () => clearInterval(counterInterval);
  }, [isVisible]);

  const steps = [
    {
      number: "1",
      icon: <FaUpload className="text-3xl sm:text-4xl" />,
      title: "Yukni Joylashtiring",
      description: "Yuk ma'lumotlarini kiriting: qayerdan, qayerga, og'irlik, hajm va narx. Yuklaringiz platformada darhol ko'rinadi.",
      color: "from-blue-500 to-purple-600"
    },
    {
      number: "2",
      icon: <FaUserCheck className="text-3xl sm:text-4xl" />,
      title: "Haydovchi Tanlang",
      description: "Haydovchilarning takliflarini ko'rib chiqing. Reyting, sharhlar va narxlarni solishtiring. Eng maqbulini tanlang.",
      color: "from-purple-500 to-pink-600"
    },
    {
      number: "3",
      icon: <FaTruckLoading className="text-3xl sm:text-4xl" />,
      title: "Yukni Yetkazib Bering",
      description: "Yuk jo'nab ketadi. Har qadamda kuzatib boring. Yuk yetkazilgandan so'ng to'lovni xavfsiz tarzda amalga oshiring.",
      color: "from-pink-500 to-red-600"
    }
  ];

  const adventages = [
    {
      id: 1,
      icon: FaShieldAlt,
      title: "100% Xavfsizlik",
      desc: "Barcha to'lovlar xavfsiz tizim orqali amalga oshiriladi. Yuklar sug'urtalangan. Haydovchilar tekshirilgan."
    },
    {
      id: 2,
      icon: HiLightningBolt,
      title: "Tezkor Yetkazish",
      desc: "O'rtacha 30 daqiqa ichida haydovchi topiladi. Yuklar o'rtacha 24 soat ichida manzilga etkaziladi."
    },
    {
      id: 3,
      icon: FaPercent,
      title: "Eng Yaxshi Narxlar",
      desc: "Bir necha haydovchilardan narxlarni solishtiring. Eng arzon va sifatli taklifni tanlang."
    },
    {
      id: 4,
      icon: FaHeadset,
      title: "24/7 Qo'llab-quvvatlash",
      desc: "Kuning istalgan vaqtida bizning operatorlarimiz sizga yordam berishga tayyor."
    },
    {
      id: 5,
      icon: FaMapLocationDot,
      title: "Real Vaqtda Kuzatish",
      desc: "Yukning har bir harakatini real vaqtda kuzatib boring. Xaritada yo'lni ko'ring."
    },
    {
      id: 6,
      icon: FaFileContract,
      title: "Rasmiy Shartnoma",
      desc: "Har bir yuk uchun rasmiy shartnoma tuziladi. Barcha huquqlaringiz qonun bilan himoyalangan."
    },
  ]

  const loads = [
    {
      id: 1,
      l_num: "#YUK-2451",
      situation: "Faol",
      from_province: "Toshkent",
      from_loc: "Chorsu bozori",
      to_province: "Samarqand",
      to_loc: "Registon maydoni",
      ton: 2.5,
      m: 12,
      product: "Meva",
      product_icon: FaBox,
      date: "Bugun 18:00",
      price: "850,000 so'm"
    },
    {
      id: 2,
      l_num: "#YUK-2450",
      situation: "Faol",
      from_province: "Farg'ona",
      from_loc: "Markaziy bozor",
      to_province: "Toshkent",
      to_loc: "Yangiobod",
      ton: 5,
      m: 25,
      product: "Sovutilgan",
      product_icon: FaRegSnowflake,
      date: "Ertaga 09:00",
      price: "1,200,000 so'm"
    },
    {
      id: 3,
      l_num: "#YUK-2449",
      situation: "Faol",
      from_province: "Buxoro",
      from_loc: "Ko'kaldosh",
      to_province: "Navoiy",
      to_loc: "Zarafshon",
      ton: 8,
      m: 40,
      product: "Xavfli yuk",
      product_icon: IoWarning,
      date: "Hozir",
      price: "2,500,000 so'm"
    },
  ]

  const drivers = [
    {
      id: 1,
      icon: FaMoneyBillWave,
      title: "Yuqori Daromad",
      desc: "O'rtacha oylik daromad 15-20 million so'm. Doimiy yuklar oqimi."
    },
    {
      id: 2,
      icon: FaClock,
      title: "Ixtiyoriy Jadval",
      desc: "O'zingiz qulay vaqtda ishlang. Kunlik, haftalik yoki oylik reja tuzing."
    },
    {
      id: 3,
      icon: FaWeightHanging,
      title: "Xavfsiz To'lov",
      desc: "Barcha to'lovlar platforma orqali xavfsiz tarzda amalga oshiriladi. Hech qanday risk yo'q."
    },
    {
      id: 4,
      icon: FaStar,
      title: "Reyting Tizimi",
      desc: "Yaxshi ishlaganingiz uchun yuqori reyting oling va ko'proq yuklar oling."
    },
  ]

  const questions = [
    {
      id: 1,
      question: "Yuk qanday joylashtiriladi?",
      answer: `Yuk joylashtirish uchun saytga ro'yxatdan o'ting yoki kirib o'ting. "Yuk qo'shish" tugmasini bosing va barcha kerakli ma'lumotlarni to'ldiring. Yuk darhol platformada ko'rinadi.`
    },
    {
      id: 2,
      question: "To'lov qanday amalga oshiriladi?",
      answer: `To'lovlar platforma orqali xavfsiz tarzda amalga oshiriladi. Yuk manzilga etkazilgandan so'ng, haydovchi "Yuk yetkazildi" tugmasini bosadi va sizga to'lov haqida bildirishnoma keladi. To'lovni Click, Payme yoki naqd pul orqali amalga oshirishingiz mumkin.`
    },
    {
      id: 3,
      question: "Haydovchi qanday tanlanadi?",
      answer: `Yuk joylashtirilgandan so'ng, haydovchilar taklif berishni boshlaydilar. Siz ularning reytingi, sharhlari va narxlarini ko'rib, eng maqbul taklifni tanlashingiz mumkin.`
    },
    {
      id: 4,
      question: "Komissiya qancha?",
      answer: `Platforma komissiyasi yuk narxining 5% ni tashkil qiladi. Bu komissiya xavfsiz to'lov, mijozlar bilan ishlash va texnik qo'llab-quvvatlash xizmatlari uchun.`
    },
    {
      id: 5,
      question: "Yukni qanday kuzatish mumkin?",
      answer: `Har bir yuk uchun maxsus kuzatish bo'limi mavjud. Yukning real vaqtda qayerda ekanligini xaritada ko'rishingiz, haydovchi bilan chat orqali bog'lanishingiz mumkin.`
    },
  ]

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div ref={sectionRef}>
      <Navbar />
      <section id="home" className="bg-[#f6f5fc] py-8 sm:py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">

            <div className="w-full lg:w-1/2 flex flex-col gap-6 md:gap-8 lg:gap-10 order-2 lg:order-1">
              <div className="text-center lg:text-left">
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-linear-to-br from-[#4361ee] to-[#7209b7] bg-clip-text text-transparent leading-tight md:leading-tight lg:leading-tight'>
                  Yuk Tashish <br className="hidden sm:block" />
                  Endi Oddiy va Tezkor
                </h1>
              </div>

              <p className='text-sm sm:text-base md:text-lg lg:text-xl text-[#495057] leading-relaxed md:leading-relaxed text-center lg:text-left'>
                Yuk.uz - O'zbekistonning birinchi raqamli yuk tashish platformasi.
                Haydovchi va yuk beruvchilarni birlashtiramiz. Tez, ishonchli va xavfsiz.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className='bg-[#4361ee] text-white text-sm sm:text-base font-semibold border-2 border-[#4361ee] rounded-lg py-3 sm:py-4 px-6 sm:px-9 hover:bg-white hover:text-[#4361ee] duration-300 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95'>
                  <FaBox className="text-lg" />
                  Yuk Jo'natish
                </button>
                <button className='text-[#4361ee] text-sm sm:text-base font-semibold border-2 border-[#4361ee] rounded-lg py-3 sm:py-4 px-6 sm:px-9 hover:bg-[#4361ee] hover:text-white duration-300 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95'>
                  <FaTruck className="text-lg" />
                  Yuk Tashish
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-4 sm:mt-6">
                <div className="text-center rounded-xl">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#4361ee] font-bold mb-2">
                    {counts.successful}+
                  </div>
                  <span className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 uppercase tracking-wide md:text-start block px-2'>
                    Muvaffaqiyatli yuk
                  </span>
                </div>
                <div className="text-center rounded-xl">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#4361ee] font-bold mb-2">
                    {counts.drivers}+
                  </div>
                  <span className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 uppercase tracking-wide md:text-start block px-2'>
                    Ishonchli haydovchi
                  </span>
                </div>
                <div className="text-center rounded-xl">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#4361ee] font-bold mb-2">
                    {counts.satisfaction}+
                  </div>
                  <span className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 uppercase tracking-wide md:text-start  block px-2'>
                    Mijozlar mamnuniyati
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-br from-[#4361ee] to-[#7209b7] rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-20 sm:h-20 bg-linear-to-br from-[#4361ee] to-[#7209b7] rounded-full opacity-20 animate-pulse delay-1000"></div>

                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Yuk tashish xizmati"
                  className='rounded-2xl sm:rounded-3xl shadow-xl w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500'
                  loading="lazy"
                />

                <div className="absolute -bottom-3 -right-3 bg-linear-to-br from-[#4361ee] to-[#7209b7] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-lg">
                  <span className="text-xs sm:text-sm font-bold">24/7 Xizmat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ish Tartibi
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Yuk.uz platformasida ishlash juda oson. Faqat 3 ta oddiy qadam
            </p>
          </div>

          <div className="relative">

            <div className="hidden lg:flex absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-0">
              <div className="w-full flex justify-between items-center px-16">
                <div className="w-full h-0.5 bg-linear-to-r from-blue-400 to-purple-400"></div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                {steps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">

                      <div className="w-12 h-12 m-auto sm:w-14 sm:h-14 md:w-14 md:h-14 bg-linear-to-br from-blue-600 to-purple-500 rounded-full flex items-center justify-center mb-5">
                        <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold">{step.number}</span>
                      </div>

                      <div className="text-center">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      <section id="features" className='py-12 sm:py-16 md:py-20 lg:py-24 bg-[#f8f9fa]'>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Bizning Afzalliklarimiz
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Nega aynan Yuk.uz platformasini tanlashingiz kerak
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {adventages.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-5 flex-col p-8 py-10 bg-white border border-white rounded-3xl shadow-lg duration-300 hover:border-blue-600 transform hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-linear-to-br from-[#4361ee] to-blue-400">
                    <item.icon className='text-3xl text-white' />
                  </div>
                  <h2 className='text-xl md:text-2xl font-bold'>{item.title}</h2>
                  <p className='text-sm sm:text-base md:text-lg text-center'>{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="cargo" className='py-12 sm:py-16 md:py-20 lg:py-24 bg-white'>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Faol Yuklar
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Hozir tashilishi kerak bo'lgan yuklar
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {loads.map((item, index) => {
              return (
                <div key={index} className="flex gap-5 flex-col bg-white border border-white rounded-3xl shadow-lg duration-300 hover:border-blue-600 transform hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="flex items-center justify-between px-6 py-4 pt-8">
                    <span className='text-sm text-gray-700 font-semibold'>{item.l_num}</span>
                    <span className='text-xs text-[#4cc9f0] bg-[#4cc9f0]/15 rounded-xl py-0.5 px-2 font-semibold'>{item.situation}</span>
                  </div>
                  <div className="border-t border-b border-gray-300 px-6 py-5">
                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-full bg-[#e9ecef] flex items-center justify-center">
                        <FaMapMarkerAlt className='text-base text-[#4361ee]' />
                      </div>
                      <div>
                        <h4 className='text-lg font-bold'>{item.from_province}</h4>
                        <p className='text-base text-gray-500 mt-0.5'>{item.from_loc}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-center mt-4">
                      <div className="w-9 h-9 rounded-full bg-[#e9ecef] flex items-center justify-center">
                        <FaFlagCheckered className='text-base text-[#4361ee]' />
                      </div>
                      <div>
                        <h4 className='text-lg font-bold'>{item.to_province}</h4>
                        <p className='text-base text-gray-500 mt-0.5'>{item.to_loc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 border-b border-gray-300 px-6 py-5 pb-8">
                    <p className='flex gap-2 items-center'>
                      <FaWeightHanging className='text-[#4361ee]' />
                      <span>{`${item.ton} tonna`}</span>
                    </p>
                    <p className='flex gap-2 items-center'>
                      <FaRulerCombined className='text-[#4361ee]' />
                      <span>{`${item.m} m`}<sup>3</sup></span>
                    </p>
                    <p className='flex gap-2 items-center'>
                      <item.product_icon className='text-[#4361ee]' />
                      <span>{item.product}</span>
                    </p>
                    <p className='flex gap-2 items-center'>
                      <FaClock className='text-[#4361ee]' />
                      <span>{item.date}</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-between px-6 pb-5">
                    <h2 className='text-xl md:text-2xl text-[#4361ee] font-bold'>{item.price}</h2>
                    <button className='bg-[#4361ee] text-white text-base font-semibold border-2 border-[#4361ee] rounded-xl py-3 px-6 transform hover:-translate-y-1.5 hover:shadow-lg duration-300 cursor-pointer'>Taklif berish</button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center pt-10">
            <button className='flex gap-3 items-center bg-[#4361ee] text-white text-base font-semibold border-2 border-[#4361ee] rounded-xl py-4 px-8 transform hover:-translate-y-1.5 hover:shadow-lg duration-300 cursor-pointer'>
              <FaList />
              Barcha Yuklarni Ko'rish
            </button>

          </div>
        </div>
      </section>

      <section id="drivers" className='py-12 sm:py-16 md:py-20 lg:py-24 bg-[#f8f7fd]'>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Haydovchilar uchun
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Nega aynan Yuk.uz platformasida ishlashingiz kerak
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {drivers.map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-5 flex-col p-8 bg-white border border-white rounded-3xl shadow-lg duration-300 hover:border-blue-600 transform hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-linear-to-br from-[#4361ee] to-blue-400">
                    <item.icon className='text-3xl text-white' />
                  </div>
                  <h2 className='text-xl md:text-2xl font-bold'>{item.title}</h2>
                  <p className='text-sm sm:text-base md:text-lg text-center'>{item.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center pt-10">
            <button className='flex gap-3 items-center bg-[#4361ee] text-white text-base font-semibold border-2 border-[#4361ee] rounded-xl py-4 px-8 transform hover:-translate-y-1.5 hover:shadow-lg duration-300 cursor-pointer'>
              <FaTruck />
              Haydovchi Bo'lish
            </button>

          </div>
        </div>
      </section>

      <section className='py-12 sm:py-16 md:py-20 lg:py-24 bg-white'>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Mijozlarimiz Fikrlari
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Bizning mijozlarimiz nima deyishadi
            </p>
          </div>

          <div className="flex justify-center">
            <div className="max-w-3xl p-8 sm:p-10 md:p-12 lg:p-14 bg-white border border-gray-200 rounded-3xl shadow-xl">
              <h3 className='text-sm sm:text-base md:text-lg lg:text-xl text-[#343a40] text-center italic'>"Yuk.uz platformasi orqali bir necha oydan beri yuklarimni tashiymon. Juda qulay va ishonchli. Haydovchilar sifatli, narxlar ham maqbul."</h3>
              <div className="flex items-center gap-5 justify-center mt-10">
                <div className="w-13 h-13 rounded-full flex items-center justify-center bg-linear-to-r from-blue-600 to-purple-600">
                  <h2 className='text-base sm:text-lg md:text-xl lg:text-2xl text-white font-bold'>AK</h2>
                </div>
                <div>
                  <h4 className='text-lg font-bold'>Akmal Karimov</h4>
                  <p className='text-base text-gray-500 mt-0.5'>Savdogar, Toshkent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className='py-12 sm:py-16 md:py-20 lg:py-24 bg-[#f8f9fa]'>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Tez-tez So'raladigan Savollar
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Ko'p so'raladigan savollarga javoblar
            </p>
          </div>

          <div className="flex gap-5 items-center flex-col">
            {questions.map((item, index) => {
              const isOpen = openId === item.id;
              return (
                <div key={index} className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl duration-300 overflow-hidden cursor-pointer" onClick={() => { toggleAccordion(item.id) }}>
                  <div className="flex items-center justify-between bg-white duration-300 hover:bg-gray-50 p-8">
                    <h2 className='text-base md:text-lg lg:text-xl font-semibold'>{item.question}</h2>
                    <FaPlus className={`text-[#4361ee] transform transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
                  </div>
                  <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className='px-8 pb-8'>
                        <p className='text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 border-t border-gray-100 pt-4'>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div >
  );
};

export default Home;
