import React, { useState, useEffect } from 'react';
import { FaTruckLoading, FaBars, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Asosiy', id: 'home' },
    { name: 'Ish tartibi', id: 'workflow' },
    { name: 'Xususiyatlar', id: 'features' },
    { name: 'Yuklar', id: 'cargo' },
    { name: 'Haydovchilar', id: 'drivers' },
    { name: 'FAQ', id: 'faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      navLinks.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 50;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className='h-20 flex items-center bg-white shadow-md sticky top-0 z-50 px-10'>
      <div className="w-7xl mx-auto px-4 sm:px-0 flex items-center justify-between">

        <div className="flex gap-3 items-center cursor-pointer duration-300 transform hover:scale-105" onClick={() => scrollToSection('home')}>
          <div className="w-10 h-10 rounded-lg flex items-center bg-linear-to-br from-[#4361ee] to-[#7209b7]">
            <FaTruckLoading className='text-xl text-white m-auto' />
          </div>
          <h2 className='text-2xl text-[#4361ee] font-bold'>Yuk.uz</h2>
        </div>

        <ul className='hidden lg:flex list-none gap-8'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-lg font-semibold cursor-pointer duration-300 relative pb-1
                ${activeSection === link.id ? 'text-[#4361ee]' : 'text-gray-600 hover:text-[#4361ee]'}
              `}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4361ee] transition-all duration-300"></span>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex gap-4">
          {/* <Link to={'/freight/asosiy'}><button className='text-[#4361ee] text-base font-semibold border-2 border-[#4361ee] rounded-lg py-2 px-5 hover:bg-[#4361ee] hover:text-white duration-300 cursor-pointer'>Dashboard</button></Link> */}
          <Link to={'/login'}>
          <button className='bg-[#4361ee] text-white text-base font-semibold border-2 border-[#4361ee] rounded-lg py-2 px-5 hover:bg-white hover:text-[#4361ee] duration-300 cursor-pointer'>Royxtdan o'tish</button>
          </Link>
        </div>

        <div className="lg:hidden text-2xl text-[#4361ee] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      <div className={`fixed top-20 left-0 w-full bg-white shadow-xl transition-all duration-300 lg:hidden overflow-hidden ${isOpen ? 'max-h-125 border-b' : 'max-h-0'}`}>
        <ul className='flex flex-col p-5 gap-4'>
          {navLinks.map((link) => (
            <li key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`text-lg font-semibold ${activeSection === link.id ? 'text-[#4361ee]' : 'text-gray-600'}`}
            >
              {link.name}
            </li>
          ))}
          <hr />
          <div className="flex flex-col gap-3">
            {/* <button className='w-full text-[#4361ee] border-2 border-[#4361ee] rounded-lg py-2 font-semibold'>Dashboard</button> */}
            <button className='w-full bg-[#4361ee] text-white rounded-lg py-2 font-semibold'>Royxatdan o'tish</button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
