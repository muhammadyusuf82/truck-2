import React, { useEffect, useState } from 'react'
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
import { FaTimes } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import chart_img from '../User/images/chart.png'

// Token olish funksiyasi
const getAuthToken = async () => {
  const token = "3e6927a8c5a99d414fe2ca5f2c2435edb6ada1ba";
  try {
    const response = await fetch('https://tokennoty.pythonanywhere.com/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token 3e6927a8c5a99d414fe2ca5f2c2435edb6ada1ba`
      },
      body: JSON.stringify({
        password: "123",
        phone_number: "+998993967336"
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token API javobi:', data); // Debug uchun
      // Token qaytarilgan formatga qarab, token ni olish
      const token = data.token || data.access_token || data.access || data.accessToken || data.access_token || (data.data && data.data.token) || (data.data && data.data.access_token);
      if (token) {
        localStorage.setItem('access_token', token);
        console.log('Token saqlandi:', token.substring(0, 20) + '...'); // Debug uchun
        return token;
      } else {
        console.error('Token topilmadi. API javobi:', data);
      }
    } else {
      const errorText = await response.text();
      console.error('Token olishda xatolik:', response.status, response.statusText, errorText);
    }
  } catch (error) {
    console.error('Token olishda tarmoq xatosi:', error);
  }
  return null;
};

const CargoModal = ({ isOpen, onClose, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // FormData yaratish funksiyasi
  const createFormData = (form) => {
    const formData = new FormData();
    formData.append('title', form.title.value);

    const description = `
      Qayerdan: ${form.from_loc.value}
      Qayerga: ${form.to_loc.value}
      Narx: ${form.price.value} so'm
      Og'irlik: ${form.weight.value} kg
      Hajm: ${form.volume.value} m3
      Qo'shimcha: ${form.content.value}
    `;
    // const description = {}
    
    // const content=
    formData.append('content', description);
    formData.append('route_starts_where_lat', 100)
    formData.append('route_starts_where_lon', 100)
    formData.append('freight_type', 'newfreight')
    // formData.append('route_starts_where_lat', 100)

    if (form.image.files[0]) {
      formData.append('image', form.image.files[0]);
    }
    return formData;
  };

  // API so'rov yuborish funksiyasi
  const sendRequest = async (token, formData) => {
    return await fetch('https://tokennoty.pythonanywhere.com/api/freight/', {
      method: 'POST',
      headers: {
        'Authorization': `Token 3e6927a8c5a99d414fe2ca5f2c2435edb6ada1ba`
      },
      body: formData,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Avval tokenni tekshirish va olish
    let token = localStorage.getItem('access_token');
    console.log('Mavjud token:', token ? token.substring(0, 20) + '...' : 'yo\'q'); // Debug uchun
    
    if (!token) {
      console.log('Token yo\'q, yangi token olinmoqda...');
      token = await getAuthToken();
    }
    
    if (!token) {
      alert("Token olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      setLoading(false);
      return;
    }
    
    console.log('Ishlatilayotgan token:', token.substring(0, 20) + '...'); // Debug uchun

    const form = e.target;
    const formData = createFormData(form);

    try {
      const response = await sendRequest(token, formData);

      if (response.ok) {
        alert("Yuk muvaffaqiyatli qo'shildi!");
        onRefresh(); // Ro'yxatni yangilash
        onClose();   // Modalni yopish
        form.reset(); // Formani tozalash
      } else if (response.status === 401) {
        // 401 xatosi bo'lsa, yangi token olish va qayta urinish
        console.log('401 xatosi, yangi token olinmoqda...');
        localStorage.removeItem('access_token'); // Eski tokenni o'chirish
        const newToken = await getAuthToken();
        if (newToken) {
          // FormData ni qayta yaratish (chunki bir marta o'qilgandan keyin bo'sh bo'lib qoladi)
          const retryFormData = createFormData(form);
          // Yangi token bilan qayta urinish
          const retryResponse = await sendRequest(newToken, retryFormData);
          
          if (retryResponse.ok) {
            alert("Yuk muvaffaqiyatli qo'shildi!");
            onRefresh();
            onClose();
            form.reset();
          } else {
            const errData = await retryResponse.json().catch(() => ({}));
            alert("Xatolik: " + (errData.detail || errData.message || `${retryResponse.status} ${retryResponse.statusText}`));
          }
        } else {
          alert("Token olishda xatolik. Iltimos, qayta urinib ko'ring.");
        }
      } else {
        // 404 yoki boshqa xatolik bo'lganda JSON parse qilishga urinmaslik
        let errorMessage = `Xatolik: ${response.status} ${response.statusText}`;
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errData = await response.json();
            errorMessage = "Xatolik: " + (errData.detail || errData.message || `${response.status} ${response.statusText}`);
          } else {
            const text = await response.text();
            console.error("Server javobi (JSON emas):", text);
          }
        } catch (parseErr) {
          console.error("Xatolikni parse qilishda muammo:", parseErr);
        }
        console.error("Server xatosi:", errorMessage);
        alert(errorMessage);
      }
    } catch (err) {
      console.error("Tarmoq xatosi:", err);
      alert("Server bilan aloqa yo'q yoki internet past.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">Yangi Yuk Qo'shish</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Yuk nomi *</label>
            <input name="title" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" placeholder="Masalan: Meva" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Qayerdan *</label><input name="from_loc" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Qayerga *</label><input name="to_loc" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Og'irlik (kg)</label><input name="weight" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
            <div><label className="block text-sm font-bold text-slate-700 mb-1">Hajm (m³)</label><input name="volume" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" /></div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Narx (so'm)</label>
            <input name="price" type="number" required className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee]" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Qo'shimcha</label>
            <textarea name="content" className="w-full border border-gray-200 rounded-xl p-3 outline-[#4361ee] h-20"></textarea>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
            <input type="file" name="image" className="hidden" id="fileup" accept="image/*" />
            <label htmlFor="fileup" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-blue-600">
              <FaCloudUploadAlt size={24} /> <span>Rasm yuklash</span>
            </label>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#4361ee] text-white rounded-xl font-bold hover:bg-blue-700 transition-all cursor-pointer">
            {loading ? 'Joylanmoqda...' : 'Yukni Joylash'}
          </button>
        </form>
      </div>
    </div>
  );
};

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url_freight = 'https://tokennoty.pythonanywhere.com/api/freight/'
  const [data, setData] = useState([])
  
  // Component mount bo'lganda token olish
  useEffect(() => {
    const initializeToken = async () => {
      const existingToken = localStorage.getItem('access_token');
      if (!existingToken) {
        await getAuthToken();
      }
    };
    initializeToken();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch(url_freight)
      const freight = await res.json()
      const freightWithDestination = await Promise.all(
        freight.map(async (item) => {
          const res = await fetch(`https://tokennoty.pythonanywhere.com/api/freight/${item.id}/destinations`);
          const destination = await res.json();
          return {...item, destination}
        }))
        setData(freightWithDestination)
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    loadData()
  }, [])
  console.log(data);


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
                  {/* <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'><IoArrowUpOutline className='inline' />12%</span> */}
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
                  {/* <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'><IoArrowUpOutline className='inline' />8%</span> */}
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
                  {/* <span className='text-center flex items-center px-2 text-red-500 rounded-2xl bg-red-600/20 text-sm'><FaArrowDown className='inline' /> 3%</span> */}
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
                  {/* <span className='text-center flex items-center px-2 text-blue-500 rounded-2xl bg-blue-300/50 text-sm'><IoArrowUpOutline className='inline' />24%</span> */}
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
        <select name='holatlar' className='border cursor-pointer border-gray-300 px-3 py-2 rounded-xl outline-1 shadow-xs outline-blue-700 active:shadow-blue-300/50'>
          <option className='items-center flex'>Barcha holatlar </option>
          <option className='items-center flex'>Faol </option>
          <option className='items-center flex'>Kutilmoqda </option>
          <option className='items-center flex'>Yetkazilgan </option>
          <option className='items-center flex'>Bekor qilingan </option>
        </select>
        {/* <select name="" id="">
          <option value=""></option>
        </select> */}
        <select name='turlar' className='border cursor-pointer border-gray-300 px-3 py-2 rounded-xl shadow-xs outline-1 outline-blue-700 active:shadow-blue-300/50'>
          <option className='items-center flex'>Barcha turlar</option>
          <option className='items-center flex'>Umumiy yuk</option>
          <option className='items-center flex'>Sovutilgan</option>
          <option className='items-center flex'>Xavfli yuk</option>
          <option className='items-center flex'>Mozor yuk</option>
        </select>
        <select name='vaqtlar' className='border cursor-pointer border-gray-300 px-3 py-2 rounded-xl shadow-x outline-1 outline-blue-700 active:shadow-blue-300/50'>
          <option className='items-center flex'>Barcha vaqtlar</option>
          <option className='items-center flex'>Bugun</option>
          <option className='items-center flex'>Oxirgi hafta</option>
          <option className='items-center flex'>Oxirgi oy</option>
          <option className='items-center flex'>Oxirgi yil</option>
        </select>
        <div>
          <button 
          type='button'
            onClick={() => setIsModalOpen(true)}
            className='bg-blue-700 text-white p-2 rounded-lg hover:-translate-y-1 duration-200 transition-all'
          >
            + Yangi yuk
          </button>
        </div>
      </form>
      <div className="flex items-center flex-wrap gap-y-4 px-1 my-10">
        {tabs.map((tab) => (
          <p key={tab} onClick={() => setActiveTab(tab)} className={`transition-all duration-200 px-6 py-2 text-gray-700 cursor-pointer hover:text-blue-700 ${activeTab === tab ? "border-b-2 border-b-blue-700" : "border-b-2 border-b-gray-300"}`}>
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
            {data.map((item, index) => (
              <tr key={index} className='max-sm:flex max-sm:border-t-8 max-sm:border-t-zinc-100 max-sm:flex-col'>
                <td className='py-4 pl-10 sm:px-4'>
                  <p className='font-semibold'>YUK-{item.created_at.split('-')[0]}-{item.id}</p>
                  <p className='text-sm text-gray-600'>{item.freight_type}</p>
                </td>
                <td className='py-4 pl-10 sm:px-4 '>
                  <div className='flex items-center gap-x-2'>
                    <span className='px-2 bg-blue-500/20 rounded-full text-blue-700 pb-1'><FaLocationDot className='inline text-xs' /></span>
                    <div>
                      <p className='font-semibold'>{item.route_starts_where_lat.split('.')[0]} {item.route_starts_where_lon.split('.')[0]}</p>
                      <p className='text-sm text-gray-600'>lat: {item.route_starts_where_lat.split('.')[0]}, lon: {item.route_starts_where_lon.split('.')[0]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span className='pb-1 px-2 text-violet-900 bg-violet-600/20 rounded-full'><FaFlagCheckered className='inline text-xs' /></span>
                    <div>
                      <p className='font-semibold'>{item.destination[0]?.route_ends_where_lat.split('.')[0]} {item.destination[0]?.route_ends_where_lon.split('.')[0]}</p>
                      <p className='text-sm text-gray-600'>lat: {item.destination[0]?.route_ends_where_lat.split('.')[0]}, lon: {item.destination[0]?.route_ends_where_lon.split('.')[0]}</p>
                    </div>
                  </div>
                </td>
                <td className='py-4 pl-10 sm:px-4'>
                  <span className={`rounded-full flex max-w-19 items-center ${item.is_shipped ? 'text-violet-700 bg-violet-300/30' : 'text-sky-500 bg-blue-300/30'} px-2 py-1`}><GoDotFill className='inline' /> {item.is_shipped ? 'YETKAZILDI' : 'FAOL'}</span>
                </td>
                <td className='py-4 pl-10 sm:px-4'>
                  <p className='font-semibold'>{item.created_at.split('-')[0]} M{item.created_at.split('-')[1]} {item.created_at.split('-')[2].split('T')[0]}</p>
                  <p className='text-sm text-gray-600'>Yetkazish: {item.created_at.split('-')[0]}-{item.created_at.split('-')[1]}-{item.created_at.split('-')[2].split('T')[0]}</p>
                </td>
                <td className='py-4 pl-10 sm:px-4'>
                  <p>{item.freight_rate_amount.split('.')[0]} {item.freight_rate_currency}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-10"></div>
    </div>
    <Footer />
    <CargoModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onRefresh={loadData}
    />
  </div>)
}

export default Yuk