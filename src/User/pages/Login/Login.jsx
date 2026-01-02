import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
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
  FaBox,
} from "react-icons/fa";

import { RiCheckboxCircleFill } from "react-icons/ri";
const Login = () => {
  const [counter, setCounter] = useState(0)
  const [job, setJob] = useState(0)
  const [login, setLogin] = useState(true)
  const [language, setLanguage] = useState(localStorage.getItem("language") || 'uz')

  const translations = {
    uz: {
      slogan: "O'zbekiston №1 Yuk Tashish Platformasi",
      welcome: "Xush kelibsiz!",
      welcomeText: "Yuk tashish va topishning en qulay va ishonchli yechimi. Davom etish uchun rolingizni tanlang:",
      sender: "Yuk Jo'natish",
      senderDesc: "Yuk topshirish yoki transport izlayapsizmi?",
      driver: "Yuk Tashish",
      driverDesc: "Mashinangiz bilan daromad topmoqchimisiz?",
      continue: "Davom etish",
      haveAccount: "Akkauntingiz bormi?",
      login: "Kirish",
      loginText: "Akkauntingizga kirish uchun telefon raqamingizni kiriting",
      chooseLang: "Tilni tanlang",
      chooseLangText:
        "Qaysi tilda foydalanmoqchisiz?\nKeyinchalik sozlamalardan o'zgartirishingiz mumkin.",

      register: "Ro'yxatdan o'tish",
      registerText: `Yangi ${job} sifatida ro'yxatdan o'tish`,
      phone: "Telefon raqami",
      password: "Parol",
      confirmPassword: "Parolni tasdiqlash",
      forgotPassword: "Parolni unitdingizmi?",
      or: "Yoki",
      agreeText_1:
        "Davom etish orqali siz quyidagilarga rozilik bildirasiz: ",
      agreeText_2: "Foydalanish Shartlari",
      and: 'va',
      agreeText_3: "Maxfiylik Siyosati",
      addable: "Keyinchalik to'ldirishingiz mumkin",
      placeholder_1: 'Parolingizni kiriting',
      place_holder_2: 'Parolingizni tasdiqlang',
      document: 'Haydovchilik guvohnomasi raqami',
      role_1: "Yuk Beruvchi",
      role_2: "Haydovchi"
    },

    ru: {
      slogan: "Платформа грузоперевозок №1 в Узбекистане",
      welcome: "Добро пожаловать!",
      welcomeText:
        "Самое удобное и надёжное решение для поиска и перевозки грузов. Выберите вашу роль:",
      sender: "Отправка груза",
      senderDesc: "Хотите отправить груз или найти транспорт?",
      driver: "Перевозка груза",
      driverDesc: "Хотите зарабатывать на своём транспорте?",
      continue: "Продолжить",
      haveAccount: "У вас есть аккаунт?",
      login: "Войти",
      loginText: "Введите номер телефона, чтобы войти в аккаунт",
      chooseLang: "Выберите язык",
      chooseLangText:
        "На каком языке вы хотите пользоваться?\nПозже можно изменить в настройках.",

      register: "Регистрация",
      registerText: `Войти в качестве нового ${job}`,
      phone: "Номер телефона",
      password: "Пароль",
      confirmPassword: "Подтвердите пароль",
      forgotPassword: "Забыли пароль?",
      or: "Или",
      agreeText_1: "Продолжая, вы соглашаетесь с",
      agreeText_2: "Условиями Использования",
      and: 'и',
      agreeText_3: "Политикой Конфиденциальности",
      addable: "Можно заполнить позже",
      placeholder_1: 'Введите пароль',
      place_holder_2: 'Подтвердите пароль',
      document: 'Номер водительских прав',
      role_1: "Отправитель Груза",
      role_2: "Водитель"
    },

    en: {
      slogan: "uzekistan’s #1 Freight Platform",
      welcome: "Welcome!",
      welcomeText:
        "The most convenient and reliable solution for finding and transporting cargo. Choose your role:",
      sender: "Send Cargo",
      senderDesc: "Looking to send cargo or find transport?",
      driver: "Transport Cargo",
      driverDesc: "Want to earn money with your vehicle?",
      continue: "Continue",
      haveAccount: "Already have an account?",
      login: "Login",
      loginText: "Enter phone number to login",
      chooseLang: "Choose language",
      chooseLangText:
        "Which language would you like to use?\nYou can change it later in settings.",

      register: "Sign up",
      registerText: `Register as a new ${job}`,
      phone: "Phone number",
      password: "Password",
      confirmPassword: "Confirm password",
      forgotPassword: "Forgot password?",
      or: "Or",
      agreeText_1:
        "By continuing, you agree to the",
      agreeText_2: 'Terms of Service',
      and: 'and',
      agreeText_3: 'Privacy Policy',
      addable: "Can be filled later",
      placeholder_1: 'Enter your password',
      place_holder_2: 'Confirm your password',
      document: 'Driving license number',
      role_1: "Shipper",
      role_2: "Carrier"
    },
  };

  useEffect(() => {
    if (language) {
      localStorage.setItem("language", language);
    }
  }, [language]);

 

  const t = (key) => translations[language]?.[key] || key;



  return (
    <div className='main-bg p-5 min-h-screen'>

      {/* Role Selection */}

      <div className={counter == 0 ? "lg:w-2/5 md:w-3/5 sm:w-4/5  m-auto" : "hidden"}>
        <div className="rounded-t-2xl main-bg text-center py-8 px-7 text-white">
          <h1 className='text-3xl items-center flex justify-center font-medium'><span className='p-2 mx-2 bg-white/20 rounded-2xl'><FaTruckLoading className='inline mx-2' /></span> Yuk.uz</h1>
          <p className='py-4'>{t("slogan")}</p>
        </div>
        <div className="bg-white py-3 flex flex-col gap-y-2 px-4 rounded-b-2xl">
          <div className="py-5 px-5 flex-col text-center">
            <h1 className='text-3xl font-medium text-zinc-800'>{t("welcome")}</h1>
            <p className='py-5 text-zinc-600'>{t("welcomeText")}</p>
          </div>
          <div onClick={() => setJob(1)} className={job == 1 ? "flex px-4 justify-center border-blue-700 cursor-pointer items-center gap-x-3 md:gap-x-6 border-2 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex justify-center cursor-pointer items-center gap-x-3 md:gap-x-6 border-2 border-zinc-200 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 px-4 py-5"}>
            <p className='p-3 bg-blue-600 rounded-xl'><FaBox className='text-white text-xl' /></p>
            <div className=''>
              <h1 className='text-lg'>{t("sender")}</h1>
              <p className='text-zinc-600 text-sm'>{t("senderDesc")}</p>
            </div>
            <p><FaAngleRight className='text-2xl text-zinc-800' /></p>
          </div>
          <div onClick={() => setJob(2)} className={job == 2 ? "flex justify-center px-4 cursor-pointer items-center gap-x-3 md:gap-x-6 border-2 border-blue-700 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5 my-3" : "flex justify-center px-4 cursor-pointer items-center gap-x-3 md:gap-x-6 border-2 border-zinc-200 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5 my-3"}>
            <p className='p-3 bg-purple-700 rounded-xl'><FaTruck className='text-white text-xl' /></p>
            <div className=''>
              <h1 className='text-lg'>{t("driver")}</h1>
              <p className='text-zinc-600 text-sm'>{t("driverDesc")}</p>
            </div>
            <p><FaAngleRight className='text-2xl text-zinc-1/5800' /></p>
          </div>
          <button onClick={() => setCounter(counter + 1)} disabled={job == ''} className='flex cursor-pointer justify-center mx-5 rounded-xl bg-blue-700 transition-all duration-200 hover:-translate-y-1 items-center gap-x-2 py-3 text-white disabled:bg-blue-700/50 disabled:cursor-not-allowed'><FaArrowRight className='inline' />{t("continue")}</button>
          <p className='text-center py-4 text-zinc-600'>{t("haveAccount")} <a href="#" className='text-blue-700'>{t("login")}</a></p>
        </div>
      </div>

      {/* Language Selection */}

      <div className={counter == 1 ? "lg:w-2/5 md:w-3/5 sm:w-4/5 m-auto" : "hidden"}>
        <div className="rounded-t-2xl main-bg text-center p-5 text-white">
          <div className="flex justify-evenly items-center py-5">
            <button onClick={() => setCounter(counter - 1)} className='p-3 cursor-pointer rounded-xl bg-white/20 hover:bg-white/40 hover:-translate-x-1 transition-all duration-200'><FaArrowLeft /></button>
            <h1 className='text-3xl items-center flex justify-center'><span className='p-2 mx-2 bg-white/20 rounded-2xl'><FaTruckLoading className='inline mx-2' /></span> Yuk.uz</h1>
            <div className='px-5'></div>
          </div>
        </div>
        <div className="bg-white flex flex-col gap-y-3 px-4 rounded-b-2xl">
          <div className="py-5 flex-col text-center">
            <h1 className='text-3xl font-medium text-zinc-800'>{t("chooseLang")}</h1>
            <p className='pt-5 text-zinc-600'>{t("chooseLangText")} <br /></p>
          </div>
          <div onClick={() => setLanguage('uz')} className={language == 'uz' ? "flex justify-between px-4 cursor-pointer items-center gap-x-5 border-2 border-blue-700 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5"}>
            <div className='flex gap-x-5 items-center'>
              <div>
                <p className='p-3 rounded-lg uzb-bg font-medium'>UZ</p>
              </div>
              <div>
                <p className='text-xl text-zinc-900'>O'zbekcha</p>
                <p className='text-zinc-600'>O'zbek tili</p>
              </div>
            </div>
            <div className={language == 'uz' ? '' : 'hidden'}><RiCheckboxCircleFill className='inline text-2xl text-blue-700' /></div>
          </div>
          <div onClick={() => setLanguage('ru')} className={language == 'ru' ? "flex justify-between px-4 cursor-pointer items-center gap-x-5 border-2 border-blue-700 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5"}>
            <div className='flex gap-x-5 items-center'>
              <div>
                <p className='p-3 rounded-lg rus-bg font-medium text-white'>RU</p>
              </div>
              <div>
                <p className='text-xl text-zinc-900'>Русский</p>
                <p className='text-zinc-600'>Русский язык</p>
              </div>
            </div>
            <div className={language == 'ru' ? '' : 'hidden'}><RiCheckboxCircleFill className='inline text-2xl text-blue-700' /></div>
          </div>
          <div onClick={() => setLanguage('en')} className={language == 'en' ? "flex justify-between px-4 cursor-pointer items-center gap-x-5 border-2 border-blue-700 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5"}>
            <div className="flex gap-x-5 items-center">
              <div>
                <p className='p-3 rounded-lg eng-bg font-medium'>EN</p>
              </div>
              <div>
                <p className='text-xl text-zinc-900'>English</p>
                <p className='text-zinc-600'>English laguage</p>
              </div>
            </div>
            <div className={language == 'en' ? '' : 'hidden'}><RiCheckboxCircleFill className='inline text-2xl text-blue-700' /></div>
          </div>
          <div className='flex justify-center mx-5 rounded-xl bg-blue-700 cursor-pointer transition-all duration-200 hover:-translate-y-1'>
            <button onClick={() => setCounter(counter + 1)} className='flex items-center cursor-pointer gap-x-2 py-3 text-white'><FaArrowRight className='inline' />{t("continue")}</button>
          </div>
          <p className='text-center py-4 text-zinc-600 pb-9'>{t("haveAccount")} <a href="#" className='text-blue-700'>{t("login")}</a></p>
        </div>
      </div>

      {/* Royxatdan otish */}

      <form className={counter == 2 ? "lg:w-2/5 md:w-3/5 sm:w-4/5 m-auto" : "hidden"}>
        <div className='rounded-t-2xl main-bg text-center px-5 py-6 text-white'>
          <span className='text-center bg-white/30 py-2 px-4 rounded-full'><FaUser className='inline my-4 mx-1' />{job == 1 ? `${t("role_1")}` : `${t("role_2")}`}</span>
          <div className="flex justify-evenly items-center py-5">
            <button onClick={() => setCounter(counter - 1)} className='p-3 cursor-pointer rounded-xl bg-white/20 hover:bg-white/40 hover:-translate-x-1 transition-all duration-200'><FaArrowLeft /></button>
            <h1 className='text-3xl items-center flex justify-center'><span className='p-2 mx-2 bg-white/20 rounded-2xl'><FaTruckLoading className='inline mx-2' /></span> Yuk.uz</h1>
            <div className='px-5'></div>
          </div>
        </div>
        <div className='bg-white flex flex-col gap-y-3 rounded-b-2xl py-6'>
          <div className="px-7 flex flex-col gap-y-1">
            <div>
              <h1 className={login ? 'font-medium text-zinc-800 text-3xl py-3' : 'hidden'}>{t('login')}</h1>
              <h1 className={login ? 'hidden' : 'font-medium text-zinc-800 text-3xl py-3'}>{t('register')}</h1>
              <p className={login ? '' : 'hidden'}>{t('loginText')}</p>
              <p className={login ? 'hidden' : ''}>{t('registerText')}</p>
            </div>
            <div className='grid grid-cols-2 text-center text-zinc-600 py-4'>
              <button onClick={() => setLogin(true)} className={login ? 'md:text-xl cursor-pointer py-2 border-b-3  border-b-blue-700 text-blue-700' : 'md:text-xl cursor-pointer py-2 border-b-2 border-b-zinc-300'}>{t("login")}</button>
              <button onClick={() => setLogin(false)} className={login ? 'md:text-xl cursor-pointer py-2 border-b-2 border-b-zinc-300' : 'md:text-xl cursor-pointer py-2 border-b-3 border-b-blue-700 text-blue-700'}>{t('register')}</button>
            </div>
            <p className='py-2 text-sm font-medium text-zinc-800'>{t('phone')}</p>
            <div className='grid grid-cols-5'>
              <div>
                <p className='sm:p-3 p-2 col-span-1 bg-zinc-200 border border-zinc-300 rounded-xl'><FaFlag className='inline' /> +998</p>
              </div>
              <input required type="text" className='border col-span-4 mx-2 px-3 rounded-xl outline-0 border-zinc-300' placeholder='00 000 00 00' />
            </div>
            <div className={job === 'Yuk Beruvchi' || login ? 'hidden' : ''}>
              <p className='pt-4 pb-2 text-sm font-medium text-zinc-800'>{t('document')}</p>
              <input type="text" placeholder='AA 1234567' className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%]' />
              <p className='text-xs text-zinc-500 py-2'>{t('addable')}</p>
            </div>
            <p className='py-2 text-sm font-medium text-zinc-800'>{t('password')}</p>
            <input required type="password" placeholder={t('placeholder_1')} className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%]' />
            <div className={login ? 'hidden' : ''}>
              <p className='py-2 text-sm font-medium text-zinc-800'>{t('confirmPassword')}</p>
              <input required type="password" placeholder={t('place_holder_2')} className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%]' />
            </div>
            <a href='#' className={login ? 'underline text-xs font-medium text-blue-700' : 'hidden'}>{t('forgotPassword')}</a>
            <div className='flex my-2 justify-center rounded-xl bg-blue-700 transition-all duration-200 hover:-translate-y-1'>
              <Link to={'/freight'}>
                <button type='submit' className='flex cursor-pointer items-center gap-x-2 py-4 text-white'><FaArrowRight className='inline' />{login ? `${t('login')}` : `${t('register')}`}</button>
              </Link>
            </div>
            <div className="flex justify-center items-center gap-x-3">
              <div className="bg-zinc-300 h-0.5 w-2/3"></div>
              <p className='text-zinc-700'>{t('or')}</p>
              <div className="bg-zinc-300 h-0.5 w-2/3"></div>
            </div>
            <div className="grid grid-cols-2 gap-x-3">
              <button className='border cursor-pointer p-4 rounded-xl border-zinc-400 flex justify-center text-xl hover:shadow-lg hover:shadow:900/30 transition-all duration-200 hover:-translate-y-1'><FaGoogle className='text-red-600' /></button>
              <button className='border cursor-pointer p-4 rounded-xl border-zinc-400 flex justify-center text-xl hover:shadow-lg hover:shadow:900/30 transition-all duration-200 hover:-translate-y-1'><FaFacebook /></button>
            </div>
            <p className='text-xs py-2'>{t('agreeText_1')} <span className='text-blue-700 cursor-pointer'>{t('agreeText_2')}</span> {t('and')} <span className='text-blue-700 cursor-pointer'>{t('agreeText_3')}</span></p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login