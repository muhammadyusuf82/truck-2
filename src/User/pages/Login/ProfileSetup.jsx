import React, { useState, useMemo, useCallback } from 'react';
import {
  FaTruckLoading,
  FaCamera,
  FaArrowLeft,
  FaArrowRight,
  FaTruck,
  FaRegSnowflake,
  FaTruckPickup,
  FaBox,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { GiCheckMark } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
const baseUrl = 'https://region-raymond-consisting-agents.trycloudflare.com/'
const ProfileSetup = () => {
  // States
  const [counter, setCounter] = useState(0);
  const [volume, setVolume] = useState('');
  const [document, setDocument] = useState('');
  const [state, setState] = useState('Tanlang');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [transportType, setTransportType] = useState('');
  const [address, setAddress] = useState('');
  const [eAddress, setEAddress] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Memoized values
  const progressWidth = useMemo(() => {
    const widths = ['w-1/4', 'w-2/4', 'w-3/4', 'w-full'];
    return widths[counter] || 'w-0';
  }, [counter]);

  const transportOptions = useMemo(() => [
    { type: 'Tent', icon: <FaTruck className='text-3xl sm:text-4xl text-blue-700' /> },
    { type: 'Refrijerator', icon: <FaRegSnowflake className='text-3xl sm:text-4xl text-blue-700' /> },
    { type: 'Platforma', icon: <FaTruckPickup className='text-3xl sm:text-4xl text-blue-700' /> },
    { type: 'Konteyner', icon: <FaBox className='text-3xl sm:text-4xl text-blue-700' /> },
    { type: 'Sisterna', icon: <BsFillFuelPumpFill className='text-3xl sm:text-4xl text-blue-700' /> },
  ], []);

  const cities = useMemo(() => [
    'Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona',
    'Namangan', 'Qarshi', 'Navoiy', 'Jizzax', 'Xorazm', 'Nukus'
  ], []);

  // Event handlers
  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    } else {
      alert('Iltimos, faqat rasm faylini yuklang');
    }
  }, []);

  const submitHandle = useCallback(async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    try {


      const token = localStorage.getItem('token');
      const response = await fetch(baseUrl+'api/users/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          address: `${state}, ${address}`,
          email: eAddress,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        window.location.href = '/freight/asosiy';
      }, 1500);

    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
      alert(`Saqlashda xatolik: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [firstName, lastName, state, address, eAddress, transportType, document, volume]);

  const handleNext = useCallback(() => {
    const validations = [
      () => !firstName || !lastName ? 'Ism va familiya talab qilinadi' : null,
      () => !address || !eAddress || state === 'Tanlang' ? 'Barcha kontakt maydonlarni to\'ldiring' : null,
      () => !document || !volume || !transportType ? 'Transport ma\'lumotlarini to\'ldiring' : null,
      () => null
    ];

    const error = validations[counter]?.();
    if (error) {
      alert(error);
      return;
    }

    if (counter < 3) {
      setCounter(counter + 1);
    } else {
      // const termsCheckbox = document.getElementById('terms');
      // if (!termsCheckbox?.checked) {
      //   alert('Iltimos, foydalanish shartlari va maxfiylik siyosatiga rozilik bering');
      //   return;
      // }
      submitHandle();
    }
  }, [counter, firstName, lastName, address, eAddress, state, document, volume, transportType, submitHandle]);

  const handlePrev = useCallback(() => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
    else history.back()
  }, [counter]);

  const handleSkip = useCallback(() => {
    if (window.confirm("Profilni to'ldirmasdan davom ettirmoqchimisiz?")) {
      window.location.href = '/freight/asosiy';
    }
  }, []);

  // Step content renderer
  const renderStep = () => {
    switch (counter) {
      case 0:
        return (
          <div>
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full flex justify-center border border-neutral-700 overflow-hidden mx-auto">
              {image ? (
                <img src={image} alt="Profile" className='w-full h-full object-cover' />
              ) : (
                <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                  <FaCamera className='text-2xl sm:text-3xl text-gray-400' />
                </div>
              )}
            </div>
            <input type="file" onChange={handleImageChange} accept="image/*" id="file" className='hidden' />
            <label htmlFor="file" className='flex max-w-[200px] justify-center items-center mx-auto my-6 bg-gray-200 hover:bg-gray-300 gap-x-2 p-3 rounded-xl text-gray-700 cursor-pointer transition-colors text-sm sm:text-base'>
              <FaCamera />
              <span>Rasm yuklash</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className='text-sm sm:text-base block mb-1'>Ism*</label>
                <input 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='Ismingiz' 
                  className='border-2 outline-none focus:border-blue-700 px-3 border-gray-300 py-2 rounded-lg w-full transition-colors text-sm sm:text-base'
                  required
                />
              </div>
              <div>
                <label className='text-sm sm:text-base block mb-1'>Familiya*</label>
                <input 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Familiyangiz' 
                  className='border-2 outline-none focus:border-blue-700 px-3 border-gray-300 py-2 rounded-lg w-full transition-colors text-sm sm:text-base'
                  required
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className='block mb-1 text-sm sm:text-base'>Elektron pochta</label>
              <input 
                value={eAddress}
                onChange={(e) => setEAddress(e.target.value)}
                type="email" 
                className='w-full p-3 outline-none border-gray-300 border-2 rounded-xl transition-colors focus:border-blue-700 text-sm sm:text-base'
                placeholder='email@example.com'
              />
            </div>
            <div>
              <label className='block mb-1 text-sm sm:text-base'>Asosiy manzil *</label>
              <input 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text" 
                className='w-full p-3 outline-none border-gray-300 border-2 rounded-xl transition-colors focus:border-blue-700 text-sm sm:text-base'
                placeholder='Manzilingiz'
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className='block mb-1 text-sm sm:text-base'>Shahar *</label>
                <select 
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className='w-full p-3 outline-none border-gray-300 border-2 rounded-xl transition-colors focus:border-blue-700 text-sm sm:text-base'
                >
                  <option value="Tanlang">Tanlang</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className='block mb-1 text-sm sm:text-base'>Hudud / Tuman</label>
                <select className='w-full p-3 outline-none border-gray-300 border-2 rounded-xl transition-colors text-sm sm:text-base'>
                  <option value="">Yunusobod</option>
                  <option value="">Mirzo Ulug'bek</option>
                  <option value="">Sergeli</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className='block mb-1 text-sm sm:text-base'>Haydovchilik guvohnomasi raqami *</label>
              <input 
                value={document}
                onChange={(e) => setDocument(e.target.value)}
                placeholder='AA 1234567' 
                className='w-full p-3 border-2 border-gray-300 outline-none rounded-xl transition-colors focus:border-blue-700 text-sm sm:text-base'
              />
            </div>
            
            <div>
              <label className='block mb-1 text-sm sm:text-base'>Transport turi *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {transportOptions.map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setTransportType(item.type)}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 border-2 rounded-xl sm:rounded-2xl transition-all min-h-[100px] sm:min-h-[120px] ${
                      transportType === item.type 
                        ? 'border-blue-700 bg-blue-700/10 shadow-md' 
                        : 'border-gray-300 hover:border-blue-500 hover:shadow-sm'
                    }`}
                  >
                    {item.icon}
                    <span className="mt-2 text-xs sm:text-sm text-center">{item.type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className='block mb-1 text-sm sm:text-base'>Yuk sig'imi (kg) *</label>
                <input 
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  type="number" 
                  min="0"
                  className='w-full p-3 border-2 border-gray-300 outline-none rounded-xl transition-colors focus:border-blue-700 text-sm sm:text-base'
                />
              </div>
              <div>
                <label className='block mb-1 text-sm sm:text-base'>Mashina raqami</label>
                <input 
                  placeholder='01 A 123 AA' 
                  className='w-full p-3 border-2 border-gray-300 outline-none rounded-xl transition-colors focus:border-blue-700 text-sm sm:text-base'
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <div className="bg-gray-100 p-4 sm:p-6 rounded-xl mb-6">
              <h2 className='text-blue-700 text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>Profil ma'lumotlari</h2>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold sm:w-40 mb-1 sm:mb-0">Ism:</span>
                  <span>{firstName} {lastName}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold sm:w-40 mb-1 sm:mb-0">Elektron pochta:</span>
                  <span className="break-all">{eAddress}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold sm:w-40 mb-1 sm:mb-0">Manzil:</span>
                  <span>{state}, {address}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold sm:w-40 mb-1 sm:mb-0">Guvohnoma raqami:</span>
                  <span>{document}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold sm:w-40 mb-1 sm:mb-0">Transport turi:</span>
                  <span>{transportType}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <span className="font-semibold sm:w-40 mb-1 sm:mb-0">Sig'im:</span>
                  <span>{volume} kg</span>
                </div>
              </div>
            </div>
            
            {success && (
              <div className="mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center text-green-700">
                  <FaCheck className="mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Ma'lumotlar muvaffaqiyatli saqlandi! Qayta yo'naltirilmoqda...</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center text-red-700">
                  <FaTimes className="mr-2 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{error}</span>
                </div>
              </div>
            )}

            <div className='flex items-start gap-x-2 text-xs sm:text-sm mb-6'>
              <input type="checkbox" id="terms" className='mt-1 flex-shrink-0' required />
              <label htmlFor="terms" className="cursor-pointer leading-tight">
                Men <a href="#" className='underline text-blue-700'>Foydalanish shartlari</a> va 
                <a href="#" className='underline text-blue-700 ml-1'>Maxfiylik siyosati</a> ga roziman
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = ['Asosiy ma\'lumotlar', 'Kontakt ma\'lumotlari', 'Transport ma\'lumotlari', 'Ma\'lumotlarni tasdiqlash'];
  const stepDescriptions = [
    'Profilingizni to\'ldirish uchun quyidagi maydonlarni to\'ldiring.',
    'Bog\'lanish uchun kontakt ma\'lumotlaringizni kiriting.',
    'Yuk tashish uchun transport ma\'lumotlaringizni kiriting.',
    'Kiritgan ma\'lumotlaringizni tekshiring va tasdiqlang.'
  ];

  return (
    <div className='main-bg min-h-screen min-w-full py-4 sm:py-8 px-4'>
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="rounded-t-2xl main-bg text-center py-6 sm:py-8 px-4 sm:px-7 text-white w-full sm:w-5/6 lg:w-2/3 xl:w-1/2 mx-auto shadow-md">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className='p-2 mx-2 bg-white/20 rounded-2xl'>
              <FaTruckLoading className='text-xl sm:text-2xl' />
            </div>
            <h1 className='text-2xl sm:text-3xl font-medium'>Yuk.uz</h1>
          </div>
          
          <div className="w-full bg-white/10 h-2 my-4 sm:my-6 rounded-2xl overflow-hidden">
            <div className={`h-full bg-white rounded-2xl transition-all duration-300 ${progressWidth}`}></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="rounded-b-2xl bg-white w-full sm:w-5/6 lg:w-2/3 xl:w-1/2 mx-auto py-4 sm:py-6 px-4 sm:px-6 md:px-8 shadow-md">
          {/* Step Indicators */}
          <div className="flex justify-around relative items-center mb-2">
            <div className="absolute h-1 rounded-2xl w-9/10 bg-gray-200 top-1/2 transform -translate-y-1/2"></div>
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-lg z-10 transition-all duration-300 ${
                  counter > step ? 'bg-green-500 text-white' :
                  counter === step ? 'bg-blue-700 text-white' :
                  'border-2 border-gray-300 bg-white text-gray-500'
                }`}
              >
                {counter > step ? <GiCheckMark /> : step + 1}
              </div>
            ))}
          </div>
          
          {/* Step Labels */}
          <div className="flex justify-around py-2 mb-4">
            {['Asosiy', 'Kontakt', 'Transport', 'Tasdiqlash'].map((label, index) => (
              <p
                key={label}
                className={`text-xs sm:text-sm ${counter === index ? 'text-blue-700 font-medium' : 'text-gray-500'}`}
              >
                {label}
              </p>
            ))}
          </div>

          {/* Step Title & Description */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">
              {stepTitles[counter]}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {stepDescriptions[counter]}
            </p>
          </div>

          {/* Step Content */}
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            {renderStep()}

            <div className="h-0.5 bg-gray-200 my-6 sm:my-8"></div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePrev}
                // disabled={counter === 0}
                className={`flex items-center gap-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm sm:text-base font-medium transition-all ${
                  counter === 0 
                    ? 'border-2 border-gray-400 text-gray-400 cursor-not-allowed' 
                    : 'border-2 border-gray-700 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaArrowLeft /> Orqaga
              </button>

              {counter < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  Keyingi <FaArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || success}
                  className="bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base hover:-translate-y-1 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saqlanmoqda...</span>
                    </>
                  ) : (
                    'Saqlash'
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Skip Button */}
          {counter < 3 && (
            <button
              onClick={handleSkip}
              className="block mx-auto mt-5 sm:mt-6 text-gray-600 hover:text-blue-700 text-xs sm:text-sm transition-colors duration-200 cursor-pointer"
            >
              Hozircha o'tkazib yuborish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;