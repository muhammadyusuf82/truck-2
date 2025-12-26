import React, { useState } from 'react'
import {
  FaTruckLoading,
  FaFacebook,
  FaGoogle,
  FaFlag,
  FaUser,
  FaArrowLeft,
  FaArrowRight,
  FaTruck,
  FaAngleRight,
  FaBox
} from "react-icons/fa";

const Login = () => {
  const [counter, setCounter] = useState(0)
  const [job, setJob] = useState('Haydovchi')
  const [login, setLogin] = useState(true)
  return (
    <div className='main-bg p-5 min-h-screen'>

      {/* Role Selection */}

      <div className={counter == 0 ? "w-2/5 m-auto" : "hidden"}>
        <div className="rounded-t-2xl main-bg text-center py-8 px-7 text-white">
          <h1 className='text-3xl items-center flex justify-center font-medium'><span className='p-2 mx-2 bg-white/20 rounded-2xl'><FaTruckLoading className='inline mx-2' /></span> Yuk.uz</h1>
          <p className='py-4'>O'zbekiston №1 Yuk Tashish Platformasi</p>
        </div>
        <div className="bg-white py-3 flex flex-col gap-y-2 px-4 rounded-b-2xl">
          <div className="py-5 px-5 flex-col text-center">
            <h1 className='text-3xl font-medium text-zinc-800'>Xush kelibsiz!</h1>
            <p className='py-5 text-zinc-600'>Yuk tashish va topishning eng qulay va ishonchli yechimi. Davom etish uchun rolingizni tanlang:</p>
          </div>
          <div onClick={() => setJob('Yuk Beruvchi')} className={job == "Yuk Beruvchi" ? "flex justify-center border-blue-700 cursor-pointer items-center gap-x-4 border-2 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex justify-center cursor-pointer items-center gap-x-4 border-2 border-zinc-300 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5"}>
            <p className='p-3 bg-blue-600 rounded-xl'><FaBox className='text-white text-xl' /></p>
            <div className=''>
              <h1 className='text-lg'>Yuk Jo'natish</h1>
              <p className='text-zinc-600 text-sm'>Yuk topshirish yoki transport izlayapsizmi?</p>
            </div>
            <p><FaAngleRight className='text-2xl text-zinc-800' /></p>
          </div>
          <div onClick={() => setJob('Haydovchi')} className={job == 'Haydovchi' ? "flex justify-center px-4 cursor-pointer items-center gap-x-4 border-2 border-blue-700 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5 my-3" : "flex justify-center px-4 cursor-pointer items-center gap-x-4 border-2 border-zinc-300 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5 my-3"}>
            <p className='p-3 bg-purple-700 rounded-xl'><FaTruck className='text-white text-xl' /></p>
            <div className=''>
              <h1 className='text-lg'>Yuk Tashish</h1>
              <p className='text-zinc-600 text-sm'>Mashinangiz bilan daromad topmoqchimisiz?</p>
            </div>
            <p><FaAngleRight className='text-2xl text-zinc-1/5800' /></p>
          </div>
          <div className='flex justify-center mx-5 rounded-xl bg-blue-700 transition-all duration-200 hover:-translate-y-1'>
            <button onClick={() => setCounter(counter + 1)} className='flex items-center gap-x-2 py-3 text-white'><FaArrowRight className='inline' />Davom etish</button>
          </div>
          <p className='text-center py-4 text-zinc-600'>Akkauntingiz bormi? <a href="#" className='text-blue-700'>Kirish</a></p>
        </div>
      </div>

      {/* Language Selection */}

      <div className={counter == 1 ? "w-2/5 m-auto" : "hidden"}>
        <div className="rounded-t-2xl main-bg text-center p-5 text-white">
          <div className="flex justify-evenly items-center py-5">
            <button onClick={() => setCounter(counter - 1)} className='p-3 rounded-xl bg-white/20 hover:bg-white/40 hover:-translate-x-1 transition-all duration-200'><FaArrowLeft /></button>
            <h1 className='text-3xl items-center flex justify-center'><span className='p-2 mx-2 bg-white/20 rounded-2xl'><FaTruckLoading className='inline mx-2' /></span> Yuk.uz</h1>
            <div className='px-5'></div>
          </div>
        </div>
        <div className="bg-white flex flex-col gap-y-3 px-4 rounded-b-2xl">
          <div className="py-5 flex-col text-center">
            <h1 className='text-3xl font-medium text-zinc-800'>Tilni tanlang</h1>
            <p className='pt-5 text-zinc-600'>Qaysi tilda foydalanmoqchisiz? <br /> Keyinchalik sozlamalardan o'zgartirishingiz mumkin.</p>
          </div>
          <div className="flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5">
            <div>
              <p className='p-3 rounded-lg uzb-bg font-medium'>UZ</p>
            </div>
            <div>
              <p className='text-xl text-zinc-900'>O'zbekcha</p>
              <p className='text-zinc-600'>O'zbek tili</p>
            </div>
          </div>
          <div className="flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5">
            <div>
              <p className='p-3 rounded-lg rus-bg font-medium text-white'>RU</p>
            </div>
            <div>
              <p className='text-xl text-zinc-900'>Русский</p>
              <p className='text-zinc-600'>Русский язык</p>
            </div>
          </div>
          <div className="flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5">
            <div>
              <p className='p-3 rounded-lg eng-bg font-medium'>EN</p>
            </div>
            <div>
              <p className='text-xl text-zinc-900'>English</p>
              <p className='text-zinc-600'>English laguage</p>
            </div>
          </div>
          <div className='flex justify-center mx-5 rounded-xl bg-blue-700 transition-all duration-200 hover:-translate-y-1'>
            <button onClick={() => setCounter(counter + 1)} className='flex items-center gap-x-2 py-3 text-white'><FaArrowRight className='inline' />Davom etish</button>
          </div>
          <p className='text-center py-4 text-zinc-600 pb-9'>Akkauntingiz bormi? <a href="#" className='text-blue-700'>Kirish</a></p>
        </div>
      </div>

      {/* Royxatdan otish */}

      <div className={counter == 2 ? "lg:w-2/5 sm:w-1/2 m-auto" : "hidden"}>
        <div className='rounded-t-2xl main-bg text-center px-5 py-6 text-white'>
          <span className='text-center bg-white/30 py-2 px-4 rounded-full'><FaUser className='inline my-4 mx-1' />{job}</span>
          <div className="flex justify-evenly items-center py-5">
            <button onClick={() => setCounter(counter - 1)} className='p-3 rounded-xl bg-white/20 hover:bg-white/40 hover:-translate-x-1 transition-all duration-200'><FaArrowLeft /></button>
            <h1 className='text-3xl items-center flex justify-center'><span className='p-2 mx-2 bg-white/20 rounded-2xl'><FaTruckLoading className='inline mx-2' /></span> Yuk.uz</h1>
            <div className='px-5'></div>
          </div>
        </div>
        <div className='bg-white flex flex-col gap-y-3 rounded-b-2xl py-6'>
          <div className="px-7 flex flex-col gap-y-2">
            <div>
              <h1 className={login ? 'font-medium text-zinc-800 text-3xl py-3' : 'hidden'}>Kirish</h1>
              <h1 className={login ? 'hidden' : 'font-medium text-zinc-800 text-3xl py-3'}>Ro'yxatdan o'tish</h1>
              <p className={login ? '' : 'hidden'}>Akkauntingizga kirish uchun telefon raqamingizni kiriting</p>
              <p className={login ? 'hidden' : ''}>Yangi yuk beruvchi sifatida ro'yxatdan o'tish</p>
            </div>
            <div className='grid grid-cols-2 text-center text-zinc-600 py-4'>
              <button onClick={() => setLogin(true)} className={login ? 'md:text-xl cursor-pointer py-2 border-b-3 border-b-blue-700 text-blue-700' : 'md:text-xl cursor-pointer py-2 border-b-3'}>Kirish</button>
              <button onClick={() => setLogin(false)} className={login ? 'md:text-xl cursor-pointer py-2 border-b-3' : 'md:text-xl cursor-pointer py-2 border-b-3 border-b-blue-700 text-blue-700'}>Royxatdan O'tish</button>
            </div>
            <p className='py-2 text-sm font-medium text-zinc-800'>Telefon raqami</p>
            <div className='grid grid-cols-5'>
              <div>
                <p className='p-3 col-span-1 bg-zinc-200 border border-zinc-300 rounded-xl'><FaFlag className='inline' /> +998</p>
              </div>
              <input required type="text" className='border col-span-4 mx-2 px-3 rounded-xl outline-0 border-zinc-300' placeholder='00 000 00 00' />
            </div>
            <div className={job==='Yuk Beruvchi' || login ? 'hidden':''}>
              <p className='py-2 text-sm font-medium text-zinc-800'>Haydovchilik guvohnomasi raqami</p>
              <input type="text" placeholder='AA 1234567' className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%]' />
              <p className='text-xs text-zinc-500 py-2'>Keyinchalik to'ldirishingiz mumkin</p>
            </div>
            <p className='py-2 text-sm font-medium text-zinc-800'>Parol</p>
            <input type="text" placeholder='Parolingizni kiriting' className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%]' />
            <div className={login ? 'hidden':''}>
              <p className='py-2 text-sm font-medium text-zinc-800'>Parolni tasdiqlash</p>
              <input type="text" placeholder='Parolingizni qayta kiriting' className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%]' />
            </div>
            <a href='#' className={login ? 'underline text-sm font-medium text-blue-700' : 'hidden'}>Parolni unitdingizmi?</a>
            <div className='flex my-2 justify-center rounded-xl bg-blue-700 transition-all duration-200 hover:-translate-y-1'>
              <button className='flex items-center gap-x-2 py-4 text-white'><FaArrowRight className='inline' />Kirish</button>
            </div>
            <div className="flex justify-center items-center gap-x-3">
              <div className="bg-zinc-300 h-0.5 w-2/3"></div>
              <p className='text-zinc-700'>Yoki</p>
              <div className="bg-zinc-300 h-0.5 w-2/3"></div>
            </div>
            <div className="grid grid-cols-2 gap-x-3">
              <button className='border p-4 rounded-xl border-zinc-400 flex justify-center text-xl hover:shadow-lg hover:shadow:900/30 transition-all duration-200 hover:-translate-y-1'><FaGoogle className='text-red-600' /></button>
              <button className='border p-4 rounded-xl border-zinc-400 flex justify-center text-xl hover:shadow-lg hover:shadow:900/30 transition-all duration-200 hover:-translate-y-1'><FaFacebook /></button>
            </div>
            <p className='text-xs py-2'>Davom etish orqali siz <span className='text-blue-700 cursor-pointer'>Foydalanish shartlari</span> va <span className='text-blue-700 cursor-pointer'>Maxfiylik siyosatiga</span> rozilik bildirasiz</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login