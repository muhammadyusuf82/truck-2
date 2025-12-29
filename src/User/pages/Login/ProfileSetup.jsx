import React, { useState } from 'react'
import { FaTruckLoading } from 'react-icons/fa'
import { FaCamera } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import { FaTruck } from "react-icons/fa";
import { FaRegSnowflake } from "react-icons/fa";
import { FaTruckPickup } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
const ProfileSetup = () => {
  const [counter, setCounter] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [transportType, setTransportType] = useState('')
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  return (
    <div className='main-bg min-h-screen'>
      <div className="container mx-auto py-10">
        <div className="rounded-t-2xl main-bg text-center py-8 px-7 text-white w-3/4 md:w-5/9 lg:w-4/9 m-auto shadow-md">
          <h1 className='text-3xl items-center flex justify-center font-medium'><span className='p-2 mx-2 bg-white/20 rounded-2xl'><FaTruckLoading className='inline mx-2' /></span> Yuk.uz</h1>
          <div className="overflow-hidden w-full bg-white/10 h-2 my-6 rounded-2xl">
            <p className={`h-2 bg-white w-${counter + 1}/4 rounded-2xl transition-all duration-300`}></p>
          </div>
        </div>
        <div className="rounded-b-2xl bg-white w-3/4 md:w-5/9 lg:w-4/9 m-auto py-5 px-5 md:px-8">
          <div className="flex justify-around relative items-center">
            <p className='absolute h-1 rounded-2xl w-9/10 bg-gray-200'></p>
            <p className={`rounded-full text-lg text-white border-gray-300 ${counter > 0 ? 'bg-sky-500 p-1' : 'bg-blue-700 px-3 py-1'} z-10`}>1{counter > 0 ? <GiCheckMark className='inline' /> : ''}</p>
            <p className={`rounded-full border-2 text-lg border-gray-300 z-10 ${counter > 2 ? 'bg-sky-500 p-1' : counter === 2 ? 'bg-blue-700 px-4 py-1' : 'border-gray-300 px-3 py-1 bg-white text-gray-500'}`}>
              3{counter > 2 ? <GiCheckMark className="inline" /> : ''}
            </p>
            <p className={`rounded-full text-lg text-white border-gray-300 ${counter > 2 ? 'bg-sky-500 p-1' : 'bg-blue-700 px-3 py-1'} z-10`}>3{counter > 2 ? <GiCheckMark className='inline' /> : ''}</p>
            <p className={`rounded-full text-lg text-white border-gray-300 ${counter > 3 ? 'bg-sky-500 p-1' : 'bg-blue-700 px-3 py-1'} z-10`}>4{counter > 3 ? <GiCheckMark className='inline' /> : ''}</p>
          </div>
          <div className="flex justify-around py-2">
            <p className={`text-xs translate-x-1 ${counter == 0 ? 'text-blue-700' : ''}`}>Asosiy</p>
            <p className={`text-xs translate-x-3 ${counter == 1 ? 'text-blue-700' : ''}`}>Kontakt</p>
            <p className={`text-xs translate-x-3 ${counter == 2 ? 'text-blue-700' : ''}`}>Transport</p>
            <p className={`text-xs translate-x-1 ${counter == 3 ? 'text-blue-700' : ''}`}>Tasdiqlash</p>
          </div>
          <div className={counter == 0 ? '' : 'hidden'}>
            <div className='py-8'>
              <h1 className='text-2xl font-medium text-zinc-900'>Asosiy ma'lumotlar</h1>
              <p className='py-3'>Profilingizni to'ldirish uchun quyidagi maydonlarni to'ldiring. Bu ma'lumotlar siz bilan bog'lanish uchun ishlatiladi.</p>
            </div>
            <div className="size-33 rounded-full flex justify-center border border-neutral-700 overflow-hidden mx-auto">
              <img src={image} alt="" className='bg-center bg-cover bg-no-repeat' />
            </div>
            <input type="file" onChange={handleChange} name="" id="file" className='hidden' />
            <label className='flex max-w-[40%] max-md:min-w-1/3 justify-center transition-all duration-200 items-center mx-auto my-6 bg-gray-200 hover:bg-gray-300 gap-x-2 p-2 rounded-xl text-gray-700' htmlFor="file">
              <FaCamera />
              <p>Rasm yuklash</p>
            </label>
            <div className="grid grid-cols-2">
              <div>
                <p className='text-sm'>Ism*</p>
                <input onChange={(e) => setFirstName(e.target.value)} required placeholder='Ismingiz' className='border-2 outline-0 focus:border-blue-700 transition-all duration-200 focus:shadow-md shadow-blue-300/90 px-3 border-gray-300 my-1 py-2 rounded-lg w-[95%]' type="text" />
              </div>
              <div>
                <p className='text-sm'>Familiya*</p>
                <input onChange={(e) => setLastName(e.target.value)} required placeholder='Familiyangiz' className='border-2 outline-0 focus:border-blue-700 transition-all duration-200 focus:shadow-md shadow-blue-300/90 px-3 border-gray-300 my-1 py-2 rounded-lg w-[95%]' type="text" />
              </div>
              <div className='col-span-2'>
                <p className='my-3 text-sm'>Tug'ilgan sana</p>
                <input type="date" className='border-2 transition-all duration-200 focus:shadow-md shadow-blue-300/90 border-gray-300 w-[98%] rounded-xl py-2 px-3 outline-blue-700' />
              </div>
            </div>
            <div className="h-0.5 mt-8 mb-6 bg-gray-200"></div>
            <div className="flex justify-between">
              <button onClick={() => counter > 0 ? setCounter(counter - 1) : ''} className={`border-2 font-medium  ${counter == 0 ? 'cursor-not-allowed border-gray-400 text-gray-400' : 'cursor-pointer '} flex items-center gap-x-2 md:px-5 px-3 py-3 rounded-xl`}><FaArrowLeft /> Orqaga</button>
              <button onClick={() => {
                if ((firstName != '' && lastName != '') && counter < 5) {
                  return setCounter(counter + 1)
                } else { alert('Iltimos, Ism va Familiyangizni kiriting') }
              }} className='bg-blue-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 font-medium text-white flex items-center gap-x-2 md:px-5 px-3 py-3 rounded-xl cursor-pointer'>Keyingi <FaArrowRight /></button>
            </div>
          </div>
          <div className={counter == 1 ? '' : 'hidden'}>
            <div className='py-8'>
              <h1 className='text-2xl font-medium text-zinc-900'>Kontakt ma'lumotlari</h1>
              <p className='py-3'>Bog'lanish uchun kontakt ma'lumotlaringizni kiriting.</p>
            </div>
            <div className='flex flex-col gap-y-3 mb-4'>
              <p>Elektron pochta</p>
              <input type="email" className='p-3 outline-0 border-gray-300 border-2 rounded-xl' placeholder='email@example.com' />
            </div>
            <div className='flex flex-col gap-y-3 my-4'>
              <p>Asosiy manzil *</p>
              <input type="text" className='p-3 outline-0 border-gray-300 border-2 rounded-xl' placeholder='Manzilingiz' />
            </div>
            <div className='sm:grid gap-x-3 grid-cols-2 my-5'>
              <div className='max-sm:my-6'>
                <p>Shahar *</p>
                <select name="" id="" className='w-full outline-0 p-3 rounded-xl border-2 border-gray-300'>
                  <option value="">Tanlang</option>
                  <option value="">Toshkent</option>
                  <option value="">Samarqand</option>
                  <option value="">Buxoro</option>
                  <option value="">Andijon</option>
                  <option value="">Farg'ona</option>
                  <option value="">Namangan</option>
                  <option value="">Qarshi</option>
                  <option value="">Navoiy</option>
                  <option value="">Jizzax</option>
                  <option value="">Xorazm</option>
                  <option value="">Nukus</option>
                </select>
              </div>
              <div className='max-sm:my-6'>
                <p>Hudud / Tuman</p>
                <select name="" id="" className='w-full outline-0 p-3 rounded-xl border-2 border-gray-300'>
                  <option value="">Yunusobod</option>
                  <option value="">Mirzo Ulug'bek</option>
                  <option value="">Sergeli</option>
                </select>
              </div>
            </div>
            <div className="h-0.5 mt-10 mb-6 w-full bg-gray-200"></div>
            <div className="flex justify-between">
              <button onClick={() => counter > 0 ? setCounter(counter - 1) : ''} className={`border-2 font-medium  ${counter == 0 ? 'cursor-not-allowed border-gray-400 text-gray-400' : 'cursor-pointer '} flex items-center gap-x-2 md:px-5 px-3 py-3 rounded-xl`}><FaArrowLeft /> Orqaga</button>
              <button onClick={() => {
                if ((firstName != '' && lastName != '') && counter < 5) {
                  return setCounter(counter + 1)
                } else { alert('Iltimos, Ism va Familiyangizni kiriting') }
              }} className='bg-blue-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 font-medium text-white flex items-center gap-x-2 md:px-5 px-3 py-3 rounded-xl cursor-pointer'>Keyingi <FaArrowRight /></button>
            </div>
          </div>
          <div className={counter == 2 ? '' : 'hidden'}>
            <div className="py-8">
              <h1 className='text-2xl font-medium text-zinc-900'>Transport ma'lumotlari</h1>
              <p className='py-3 text-gray-600'>Yuk tashish uchun transport ma'lumotlaringizni kiriting.</p>
            </div>
            <div className="flex flex-col gap-y-3">
              <p className='text-sm font-medium'>Haydovchilik guvohnomasi raqami *</p>
              <input className='border-2 border-gray-300 outline-blue-700 p-3 rounded-xl' type="text" placeholder='AA 1234567' />
              <p>Guvohnoma amal qilish muddati *</p>
              <input className='border-2 border-gray-300 outline-blue-700 p-3 rounded-xl' type="date" name="" id="" />
              <p>Transport turi *</p>
              <div className="grid grid-cols-3 gap-y-2">
                <div onClick={() => setTransportType('Tent')} className={`flex flex-col cursor-pointer gap-y-2 justify-center items-center mx-auto border-2 transition-all duration-300 hover:shadow-xl py-6 hover:-translate-y-1 ${transportType == 'Tent' ? 'border-blue-700 bg-blue-700/10' : 'border-gray-300'} rounded-2xl w-[95%]`}><FaTruck className='inline text-4xl text-blue-700' />Tent</div>
                <div onClick={() => setTransportType('Refrijerator')} className={`flex flex-col cursor-pointer gap-y-2 justify-center items-center mx-auto border-2 transition-all duration-300 hover:shadow-xl py-6 hover:-translate-y-1 ${transportType == 'Refrijerator' ? 'border-blue-700 bg-blue-700/10' : 'border-gray-300'} rounded-2xl w-[95%]`}><FaRegSnowflake className='inline text-4xl text-blue-700' />Refrijerator</div>
                <div onClick={() => setTransportType('Platforma')} className={`flex flex-col cursor-pointer gap-y-2 justify-center items-center mx-auto border-2 transition-all duration-300 hover:shadow-xl py-6 hover:-translate-y-1 ${transportType == 'Platforma' ? 'border-blue-700 bg-blue-700/10' : 'border-gray-300'} rounded-2xl w-[95%]`}><FaTruckPickup className='inline text-4xl text-blue-700' />Platforma</div>
                <div onClick={() => setTransportType('Konteyner')} className={`flex flex-col cursor-pointer gap-y-2 justify-center items-center mx-auto border-2 transition-all duration-300 hover:shadow-xl py-6 hover:-translate-y-1 ${transportType == 'Konteyner' ? 'border-blue-700 bg-blue-700/10' : 'border-gray-300'} rounded-2xl w-[95%]`}><FaBox className='inline text-4xl text-blue-700' />Konteyner</div>
                <div onClick={() => setTransportType('Sisterna')} className={`flex flex-col cursor-pointer gap-y-2 justify-center items-center mx-auto border-2 transition-all duration-300 hover:shadow-xl py-6 hover:-translate-y-1 ${transportType == 'Sisterna' ? 'border-blue-700 bg-blue-700/10' : 'border-gray-300'} rounded-2xl w-[95%]`}><BsFillFuelPumpFill className='inline text-4xl text-blue-700' />Sisterna</div>
              </div>
            </div>
            <div className="grid grid-cols-2 my-8 gap-x-2">
              <div>
                <p>Yuk sig'imi (kg) *</p>
                <input type="number" className='border-2 border-gray-300 my-1 outline-0 p-3 rounded-xl w-full' />
              </div>
              <div>
                <p>Mashina raqami</p>
                <input type="text" placeholder='01 A 123 AA' className='border-2 border-gray-300 my-1 outline-0 p-3 rounded-xl w-full ' />
              </div>
            </div>
            <div className="h-0.5 mt-10 mb-6 w-full bg-gray-200"></div>
            <div className="flex justify-between">
              <button onClick={() => counter > 0 ? setCounter(counter - 1) : ''} className={`border-2 font-medium  ${counter == 0 ? 'cursor-not-allowed border-gray-400 text-gray-400' : 'cursor-pointer '} flex items-center gap-x-2 md:px-5 px-3 py-3 rounded-xl`}><FaArrowLeft /> Orqaga</button>
              <button onClick={() => {
                if ((firstName != '' && lastName != '') && counter < 5) {
                  return setCounter(counter + 1)
                } else { alert('Iltimos, Ism va Familiyangizni kiriting') }
              }} className='bg-blue-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 font-medium text-white flex items-center gap-x-2 md:px-5 px-3 py-3 rounded-xl cursor-pointer'>Keyingi <FaArrowRight /></button>
            </div>
          </div>
          <div className={counter == 3 ? '' : 'hidden'}>
            <div className="py-8">
              <h1>Ma'lumotlarni tasdiqlash</h1>
              <p>Kiritgan ma'lumotlaringizni tekshiring va tasdiqlang.</p>
            </div>
            <div className="bg-gray-100 p-5 rounded-xl">
              <h1 className='text-blue-700 text-xl'>Profil ma'lumotlari</h1>
              <p className='font-bold'>Ism: <span className='font-normal'>{firstName}</span></p>
              <p className='font-bold'>Elektron pochta: <span ></span></p>
              <p className='font-bold'>Manzil: <span ></span></p>
              <p className='font-bold'>Guvohnoma raqami</p>
              <p className='font-bold'>Transport turi: <span >{transportType}</span></p>
              <p className='font-bold'>Sig'im: <span ></span></p>
            </div>
            <div className='my-5 flex gap-x-2 text-sm font-medium'>
              <input type="checkbox" name="" id="" /> <span>Men</span> <a href="#" className='underline text-blue-700'>Foydalanish shartlari</a> <span>va</span> <a href="#" className='text-blue-700 underline'>Maxfiylik siyosati</a> <span>ga roziman</span>
            </div>
            <div className="flex justify-between">
              <button onClick={() => counter > 0 ? setCounter(counter - 1) : ''} className={`border-2 font-medium  ${counter == 0 ? 'cursor-not-allowed border-gray-400 text-gray-400' : 'cursor-pointer '} flex items-center gap-x-2 md:px-5 px-3 py-3 rounded-xl`}><FaArrowLeft /> Orqaga</button>
              <button onClick={() => {
                if ((firstName != '' && lastName != '') && counter < 5) {
                  return setCounter(counter + 1)
                } else { alert('Iltimos, Ism va Familiyangizni kiriting') }
              }} className='bg-blue-700 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 font-medium text-white flex items-center gap-x-2 md:px-5 px-3 py-3 rounded-xl cursor-pointer'>Saqlash</button>
            </div>
          </div>
          <Link to={'/freight'}><button className={`${counter == 3 ? 'hidden' : ''} mx-auto block my-5 text-gray-600 transition-all duration-200 hover:text-blue-700 cursor-pointer text-sm`}>Hozircha o'tkazib yuborish</button></Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetup