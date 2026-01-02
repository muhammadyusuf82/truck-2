import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    document: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const navigate = useNavigate();

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
      chooseLangText: "Qaysi tilda foydalanmoqchisiz?\nKeyinchalik sozlamalardan o'zgartirishingiz mumkin.",
      register: "Ro'yxatdan o'tish",
      registerText: `Yangi {role} sifatida ro'yxatdan o'tish`,
      phone: "Telefon raqami",
      password: "Parol",
      confirmPassword: "Parolni tasdiqlash",
      forgotPassword: "Parolni unitdingizmi?",
      or: "Yoki",
      agreeText_1: "Davom etish orqali siz quyidagilarga rozilik bildirasiz: ",
      agreeText_2: "Foydalanish Shartlari",
      and: 'va',
      agreeText_3: "Maxfiylik Siyosati",
      addable: "Keyinchalik to'ldirishingiz mumkin",
      placeholder_1: 'Parolingizni kiriting',
      place_holder_2: 'Parolingizni tasdiqlang',
      document: 'Haydovchilik guvohnomasi raqami',
      role_1: "Yuk Beruvchi",
      role_2: "Haydovchi",
      loading: "Yuklanmoqda...",
      successRegister: "Muvaffaqiyatli ro'yxatdan o'tdingiz!",
      successLogin: "Muvaffaqiyatli kirdingiz!",
      errorMessage: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
      requiredField: "Bu maydon to'ldirilishi shart",
      passwordMismatch: "Parollar mos kelmaydi",
      invalidPhone: "Telefon raqami noto'g'ri formatda (9 ta raqam bo'lishi kerak)",
      networkError: "Internet aloqasi yo'q. Iltimos, internetingizni tekshiring.",
      invalidCredentials: "Telefon raqami yoki parol noto'g'ri"
    },

    ru: {
      slogan: "Платформа грузоперевозок №1 в Узбекистане",
      welcome: "Добро пожаловать!",
      welcomeText: "Самое удобное и надёжное решение для поиска и перевозки грузов. Выберите вашу роль:",
      sender: "Отправка груза",
      senderDesc: "Хотите отправить груз или найти транспорт?",
      driver: "Перевозка груза",
      driverDesc: "Хотите зарабатывать на своём транспорте?",
      continue: "Продолжить",
      haveAccount: "У вас есть аккаунт?",
      login: "Войти",
      loginText: "Введите номер телефона, чтобы войти в аккаунт",
      chooseLang: "Выберите язык",
      chooseLangText: "На каком языке вы хотите пользоваться?\nПозже можно изменить в настройках.",
      register: "Регистрация",
      registerText: `Войти в качестве нового {role}`,
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
      role_2: "Водитель",
      loading: "Загрузка...",
      successRegister: "Успешная регистрация!",
      successLogin: "Успешный вход!",
      errorMessage: "Произошла ошибка. Пожалуйста, попробуйте еще раз.",
      requiredField: "Это поле обязательно для заполнения",
      passwordMismatch: "Пароли не совпадают",
      invalidPhone: "Номер телефона в неправильном формате (должно быть 9 цифр)",
      networkError: "Нет подключения к интернету. Пожалуйста, проверьте ваше интернет-соединение.",
      invalidCredentials: "Неверный номер телефона или пароль"
    },

    en: {
      slogan: "uzekistan's #1 Freight Platform",
      welcome: "Welcome!",
      welcomeText: "The most convenient and reliable solution for finding and transporting cargo. Choose your role:",
      sender: "Send Cargo",
      senderDesc: "Looking to send cargo or find transport?",
      driver: "Transport Cargo",
      driverDesc: "Want to earn money with your vehicle?",
      continue: "Continue",
      haveAccount: "Already have an account?",
      login: "Login",
      loginText: "Enter phone number to login",
      chooseLang: "Choose language",
      chooseLangText: "Which language would you like to use?\nYou can change it later in settings.",
      register: "Sign up",
      registerText: `Register as a new {role}`,
      phone: "Phone number",
      password: "Password",
      confirmPassword: "Confirm password",
      forgotPassword: "Forgot password?",
      or: "Or",
      agreeText_1: "By continuing, you agree to the",
      agreeText_2: 'Terms of Service',
      and: 'and',
      agreeText_3: 'Privacy Policy',
      addable: "Can be filled later",
      placeholder_1: 'Enter your password',
      place_holder_2: 'Confirm your password',
      document: 'Driving license number',
      role_1: "Shipper",
      role_2: "Carrier",
      loading: "Loading...",
      successRegister: "Successfully registered!",
      successLogin: "Successfully logged in!",
      errorMessage: "An error occurred. Please try again.",
      requiredField: "This field is required",
      passwordMismatch: "Passwords do not match",
      invalidPhone: "Invalid phone number format (must be 9 digits)",
      networkError: "No internet connection. Please check your internet connection.",
      invalidCredentials: "Invalid phone number or password"
    },
  };

  useEffect(() => {
    if (language) {
      localStorage.setItem("language", language);
    }
  }, [language]);

  const t = (key) => {
    const translation = translations[language]?.[key] || key;
    
    if (key === 'registerText' && !login) {
      const roleKey = job === 1 ? 'role_1' : 'role_2';
      const role = translations[language]?.[roleKey] || '';
      return translation.replace('{role}', role);
    }
    
    return translation;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Clean phone input - remove any non-digit characters
    if (name === 'phone') {
      const cleanedValue = value.replace(/\D/g, ''); // Remove all non-digit characters
      setFormData(prev => ({
        ...prev,
        [name]: cleanedValue.slice(0, 9) // Keep only first 9 digits
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (error) setError('');
    if (success) setSuccess('');
  };

  const validateForm = () => {
    if (login) {
      // For login, only need phone (9 digits) and password
      return formData.phone.length === 9 && formData.password.trim() !== '';
    } else {
      // For registration, need all fields
      const baseValidation = formData.phone.length === 9 && 
                           formData.password.trim() !== '' && 
                           formData.confirmPassword.trim() !== '';
      const passwordMatch = formData.password === formData.confirmPassword;
      return baseValidation && passwordMatch;
    }
  };

  // Clean phone number - remove all non-digits and ensure 9 digits
  const cleanPhoneNumber = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 9 ? digitsOnly : phone;
  };

  // Login function - POST to /api/token/
  const performLogin = async (phone, password) => {
    try {
      const loginData = {
        phone_number: `+998${phone}`, // Always use +998 format
        password: password
      };

      const response = await fetch('https://tokennoty.pythonanywhere.com/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error(t('invalidCredentials'));
        }
        
        const errorMsg = responseData.detail || responseData.error || responseData.message || `Login failed (${response.status})`;
        throw new Error(errorMsg);
      }

      // Store tokens based on response format
      if (responseData.access) {
        localStorage.setItem('access_token', responseData.access);
      }
      if (responseData.refresh) {
        localStorage.setItem('refresh_token', responseData.refresh);
      }
      if (responseData.token) {
        localStorage.setItem('access_token', responseData.token);
      }
      if (responseData.key) {
        localStorage.setItem('access_token', responseData.key);
      }

      return responseData;

    } catch (error) {
      console.error('Login API Error:', error);
      throw error;
    }
  };

  // Registration function - POST to /api/users/
  const performRegistration = async (data) => {
    const apiData = {
      username: data.phone,
      phone_number: `+998${data.phone}`, // Always use +998 format
      telegram: "",
      facebook: "",
      whatsapp: "",
      is_verified: false,
      password: data.password
    };

    const response = await fetch('https://tokennoty.pythonanywhere.com/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(apiData)
    });

    const responseData = await response.json();
    
    if (!response.ok) {
      if (response.status === 400) {
        if (responseData.phone_number) {
          throw new Error(`Phone number error: ${responseData.phone_number[0]}`);
        } else {
          throw new Error(`Registration error: ${JSON.stringify(responseData)}`);
        }
      } else if (response.status === 409) {
        throw new Error('This phone number is already registered. Please login instead.');
      }
      throw new Error(`Registration failed with status: ${response.status}`);
    }

    return responseData;
  };

  // Main submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setError('');
    setSuccess('');
    
    // Clean phone number
    const cleanedPhone = cleanPhoneNumber(formData.phone);
    
    // Validate phone number
    if (cleanedPhone.length !== 9) {
      setError(t('invalidPhone'));
      return;
    }
    
    // Validate password for registration
    if (!login && formData.password !== formData.confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }
    
    setLoading(true);
    
    try {
      if (login) {
        // LOGIN FLOW
        await performLogin(cleanedPhone, formData.password);
        setSuccess(t('successLogin'));
        
        // Store user info
        localStorage.setItem('user', JSON.stringify({
          phone: `+998${cleanedPhone}`,
          role: job,
          language: language
        }));
        
      } else {
        // REGISTRATION FLOW
        const submitData = {
          phone: cleanedPhone, // Just the 9 digits
          password: formData.password,
          role: job,
          language: language
        };
        
        await performRegistration(submitData);
        setSuccess(t('successRegister'));
        
        // Auto-login after successful registration
        try {
          await performLogin(cleanedPhone, formData.password);
          localStorage.setItem('user', JSON.stringify({
            phone: `+998${cleanedPhone}`,
            role: job,
            language: language
          }));
        } catch (loginError) {
          console.log('Auto-login failed, user can login manually:', loginError.message);
          // Don't throw error here - registration was successful
        }
      }
      
      // Navigate after success
      setTimeout(() => {
        navigate('/freight/asosiy');
      }, 1500);
      
    } catch (error) {
      console.error('Submit error:', error);
      
      // Handle specific error types
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setError(t('networkError'));
      } else {
        setError(error.message || t('errorMessage'));
      }
    } finally {
      setLoading(false);
    }
  };

  // Social login handlers
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login clicked');
  };

  return (
    <div className='main-bg p-5 min-h-screen'>
      {/* Role Selection */}
      <div className={counter === 0 ? "lg:w-2/5 md:w-3/5 sm:w-4/5  m-auto" : "hidden"}>
        <div className="rounded-t-2xl main-bg text-center py-8 px-7 text-white">
          <h1 className='text-3xl items-center flex justify-center font-medium'><span className='p-2 mx-2 bg-white/20 rounded-2xl'><FaTruckLoading className='inline mx-2' /></span> Yuk.uz</h1>
          <p className='py-4'>{t("slogan")}</p>
        </div>
        <div className="bg-white py-3 flex flex-col gap-y-2 px-4 rounded-b-2xl">
          <div className="py-5 px-5 flex-col text-center">
            <h1 className='text-3xl font-medium text-zinc-800'>{t("welcome")}</h1>
            <p className='py-5 text-zinc-600'>{t("welcomeText")}</p>
          </div>
          <div onClick={() => setJob(1)} className={job === 1 ? "flex px-4 justify-center border-blue-700 cursor-pointer items-center gap-x-3 md:gap-x-6 border-2 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex justify-center cursor-pointer items-center gap-x-3 md:gap-x-6 border-2 border-zinc-200 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 px-4 py-5"}>
            <p className='p-3 bg-blue-600 rounded-xl'><FaBox className='text-white text-xl' /></p>
            <div className=''>
              <h1 className='text-lg'>{t("sender")}</h1>
              <p className='text-zinc-600 text-sm'>{t("senderDesc")}</p>
            </div>
            <p><FaAngleRight className='text-2xl text-zinc-800' /></p>
          </div>
          <div onClick={() => setJob(2)} className={job === 2 ? "flex justify-center px-4 cursor-pointer items-center gap-x-3 md:gap-x-6 border-2 border-blue-700 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5 my-3" : "flex justify-center px-4 cursor-pointer items-center gap-x-3 md:gap-x-6 border-2 border-zinc-200 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5 my-3"}>
            <p className='p-3 bg-purple-700 rounded-xl'><FaTruck className='text-white text-xl' /></p>
            <div className=''>
              <h1 className='text-lg'>{t("driver")}</h1>
              <p className='text-zinc-600 text-sm'>{t("driverDesc")}</p>
            </div>
            <p><FaAngleRight className='text-2xl text-zinc-800' /></p>
          </div>
          <button 
            onClick={() => setCounter(counter + 1)} 
            disabled={job === 0} 
            className='flex cursor-pointer justify-center mx-5 rounded-xl bg-blue-700 transition-all duration-200 hover:-translate-y-1 items-center gap-x-2 py-3 text-white disabled:bg-blue-700/50 disabled:cursor-not-allowed'
          >
            <FaArrowRight className='inline' />{t("continue")}
          </button>
          <p className='text-center py-4 text-zinc-600'>{t("haveAccount")} <button type="button" onClick={() => {setCounter(2); setLogin(true);}} className='text-blue-700 cursor-pointer'>{t("login")}</button></p>
        </div>
      </div>

      {/* Language Selection */}
      <div className={counter === 1 ? "lg:w-2/5 md:w-3/5 sm:w-4/5 m-auto" : "hidden"}>
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
          <div onClick={() => setLanguage('uz')} className={language === 'uz' ? "flex justify-between px-4 cursor-pointer items-center gap-x-5 border-2 border-blue-700 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5"}>
            <div className='flex gap-x-5 items-center'>
              <div>
                <p className='p-3 rounded-lg uzb-bg font-medium'>UZ</p>
              </div>
              <div>
                <p className='text-xl text-zinc-900'>O'zbekcha</p>
                <p className='text-zinc-600'>O'zbek tili</p>
              </div>
            </div>
            <div className={language === 'uz' ? '' : 'hidden'}><RiCheckboxCircleFill className='inline text-2xl text-blue-700' /></div>
          </div>
          <div onClick={() => setLanguage('ru')} className={language === 'ru' ? "flex justify-between px-4 cursor-pointer items-center gap-x-5 border-2 border-blue-700 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5"}>
            <div className='flex gap-x-5 items-center'>
              <div>
                <p className='p-3 rounded-lg rus-bg font-medium text-white'>RU</p>
              </div>
              <div>
                <p className='text-xl text-zinc-900'>Русский</p>
                <p className='text-zinc-600'>Русский язык</p>
              </div>
            </div>
            <div className={language === 'ru' ? '' : 'hidden'}><RiCheckboxCircleFill className='inline text-2xl text-blue-700' /></div>
          </div>
          <div onClick={() => setLanguage('en')} className={language === 'en' ? "flex justify-between px-4 cursor-pointer items-center gap-x-5 border-2 border-blue-700 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5" : "flex px-4 cursor-pointer items-center gap-x-5 border-2 border-zinc-300 hover:shadow-lg hover:shadow-zinc-900/10 transition-all duration-300 hover:-translate-y-1 rounded-2xl mx-5 py-5"}>
            <div className="flex gap-x-5 items-center">
              <div>
                <p className='p-3 rounded-lg eng-bg font-medium'>EN</p>
              </div>
              <div>
                <p className='text-xl text-zinc-900'>English</p>
                <p className='text-zinc-600'>English language</p>
              </div>
            </div>
            <div className={language === 'en' ? '' : 'hidden'}><RiCheckboxCircleFill className='inline text-2xl text-blue-700' /></div>
          </div>
          <div className='flex justify-center mx-5 rounded-xl bg-blue-700 cursor-pointer transition-all duration-200 hover:-translate-y-1'>
            <button onClick={() => setCounter(counter + 1)} className='flex items-center cursor-pointer gap-x-2 py-3 text-white'><FaArrowRight className='inline' />{t("continue")}</button>
          </div>
          <p className='text-center py-4 text-zinc-600 pb-9'>{t("haveAccount")} <button type="button" onClick={() => {setCounter(2); setLogin(true);}} className='text-blue-700 cursor-pointer'>{t("login")}</button></p>
        </div>
      </div>

      {/* Registration/Login Form */}
      <form onSubmit={handleSubmit} className={counter === 2 ? "lg:w-2/5 md:w-3/5 sm:w-4/5 m-auto" : "hidden"}>
        <div className='rounded-t-2xl main-bg text-center px-5 py-6 text-white'>
          <span className='text-center bg-white/30 py-2 px-4 rounded-full'><FaUser className='inline my-4 mx-1' />{job === 1 ? `${t("role_1")}` : `${t("role_2")}`}</span>
          <div className="flex justify-evenly items-center py-5">
            <button type="button" onClick={() => setCounter(counter - 1)} className='p-3 cursor-pointer rounded-xl bg-white/20 hover:bg-white/40 hover:-translate-x-1 transition-all duration-200'><FaArrowLeft /></button>
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
            
            {/* Success/Error Messages */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-3">
                <span className="block sm:inline">{success}</span>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <div className='grid grid-cols-2 text-center text-zinc-600 py-4'>
              <button 
                type="button" 
                onClick={() => {
                  setLogin(true); 
                  setError(''); 
                  setSuccess('');
                  setFormData(prev => ({...prev, confirmPassword: ''}));
                }} 
                className={login ? 'md:text-xl cursor-pointer py-2 border-b-3 border-b-blue-700 text-blue-700' : 'md:text-xl cursor-pointer py-2 border-b-2 border-b-zinc-300'}
              >
                {t("login")}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setLogin(false); 
                  setError(''); 
                  setSuccess('');
                }} 
                className={login ? 'md:text-xl cursor-pointer py-2 border-b-2 border-b-zinc-300' : 'md:text-xl cursor-pointer py-2 border-b-3 border-b-blue-700 text-blue-700'}
              >
                {t('register')}
              </button>
            </div>
            
            <p className='py-2 text-sm font-medium text-zinc-800'>{t('phone')}</p>
            <div className='grid grid-cols-5'>
              <div>
                <p className='sm:p-3 p-2 col-span-1 bg-zinc-200 border border-zinc-300 rounded-xl'><FaFlag className='inline' /> +998</p>
              </div>
              <input 
                required 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className='border col-span-4 mx-2 px-3 rounded-xl outline-0 border-zinc-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                placeholder='90 123 45 67'
                pattern="[0-9]{9}"
                title={t('invalidPhone')}
                inputMode="numeric"
                maxLength="9"
              />
            </div>
            
            <div className={job === 1 || login ? 'hidden' : ''}>
              <p className='pt-4 pb-2 text-sm font-medium text-zinc-800'>{t('document')}</p>
              <input 
                type="text" 
                name="document"
                value={formData.document}
                onChange={handleChange}
                placeholder='AA 1234567' 
                className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%] focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
              />
              <p className='text-xs text-zinc-500 py-2'>{t('addable')}</p>
            </div>
            
            <p className='py-2 text-sm font-medium text-zinc-800'>{t('password')}</p>
            <input 
              required 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('placeholder_1')} 
              className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%] focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
              minLength="3"
              autoComplete="current-password"
            />
            
            <div className={login ? 'hidden' : ''}>
              <p className='py-2 text-sm font-medium text-zinc-800'>{t('confirmPassword')}</p>
              <input 
                required={!login}
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('place_holder_2')} 
                className='outline-0 border border-zinc-300 rounded-xl p-3 w-[99%] focus:border-blue-500 focus:ring-1 focus:ring-blue-500' 
                minLength="6"
                autoComplete="new-password"
              />
            </div>
            
            <button type="button" onClick={() => {/* Add forgot password logic */}} className={login ? 'underline text-xs font-medium text-blue-700 cursor-pointer text-left' : 'hidden'}>{t('forgotPassword')}</button>
            
            {/* SUBMIT BUTTON */}
            <div className='flex my-2 justify-center rounded-xl bg-blue-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg'>
              <button 
                type="submit" 
                disabled={!validateForm() || loading}
                className={`flex items-center justify-center gap-x-2 py-4 text-white w-full rounded-xl ${!validateForm() || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-800'}`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>{t('loading')}</span>
                  </>
                ) : (
                  <>
                    <FaArrowRight className='inline' />
                    <span>{login ? t('login') : t('register')}</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex justify-center items-center gap-x-3 my-4">
              <div className="bg-zinc-300 h-0.5 w-2/3"></div>
              <p className='text-zinc-700'>{t('or')}</p>
              <div className="bg-zinc-300 h-0.5 w-2/3"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-3 mb-4">
              <button type="button" onClick={handleGoogleLogin} className='border cursor-pointer p-4 rounded-xl border-zinc-400 flex justify-center text-xl hover:shadow-lg hover:shadow-zinc-900/30 transition-all duration-200 hover:-translate-y-1'><FaGoogle className='text-red-600' /></button>
              <button type="button" onClick={handleFacebookLogin} className='border cursor-pointer p-4 rounded-xl border-zinc-400 flex justify-center text-xl hover:shadow-lg hover:shadow-zinc-900/30 transition-all duration-200 hover:-translate-y-1'><FaFacebook className='text-blue-600' /></button>
            </div>
            
            <p className='text-xs py-2 text-center text-zinc-600'>
              {t('agreeText_1')} 
              <span className='text-blue-700 cursor-pointer mx-1'>{t('agreeText_2')}</span> 
              {t('and')} 
              <span className='text-blue-700 cursor-pointer mx-1'>{t('agreeText_3')}</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login