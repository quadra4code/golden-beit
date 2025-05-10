import React,{ useEffect, useState } from 'react';
import Logo from '../Images/LOGO (2).png';
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { HashLink } from "react-router-hash-link"; 
import { Link } from "react-router-dom"; 
import { IoIosArrowDown } from "react-icons/io";
import {Dialog,DialogPanel,PopoverGroup,Disclosure,DisclosureButton,DisclosurePanel,} from '@headlessui/react';
import { ChevronDownIcon} from '@heroicons/react/20/solid';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import {Bars3Icon,XMarkIcon,} from '@heroicons/react/24/outline';
import { MdLogout } from "react-icons/md";
import { useContext } from 'react';
import AppContext from '../Context/AppContext';
import defaultImage from '../Images/user-image.webp';
const Navbar = () => {
  const userImage = localStorage.getItem('user_image_url');
  useEffect(() => {
    if(localStorage.getItem('user_image_url') === undefined || localStorage.getItem('user_image_url') === null){
      localStorage.setItem('user_image_url', defaultImage);
    }
  }, [])
  const referral_code = localStorage.getItem('referral_code');
  const pathname = window.location.pathname
  const navigate = useNavigate();
  const { handleLogout,token, openNotificationWithIcon, setIsNormalPop,changePassUi, setChangePassUi,
        setIsOpen, setPopupHeader, setPopupContent, setIsReview } = useContext(AppContext)
  const handleOurServicesRoutes = (type)=> {
    setMobileMenuOpen(false)
    if(token){
      if(type==='invite'){
        setChangePassUi(false)
        setIsNormalPop(true)
        setIsOpen(true);
        setPopupHeader('قم بنسخ لينك الدعوة');
        setPopupContent(`https://goldenbeit.com/register/${referral_code}`)    
      }else if(type==='add-review'){
        setIsNormalPop(true)
        setIsOpen(true);
        setIsReview(true)
        setPopupHeader('')
      }
      else{navigate('/add-new-unit')}
    }else{
      return openNotificationWithIcon('info', '', 'برجاء تسجيل الدخول')
    }
  }
  const handleAddUnitRoute = (type)=> {
    setMobileMenuOpen(false)
    if(token){
      navigate('/add-new-unit')
    }else{
      return openNotificationWithIcon('info', '', 'برجاء تسجيل الدخول')
    }
  }
  const name = localStorage.getItem('name')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleChangePass = () => {
    setChangePassUi(true);
    setIsOpen(true);
    setMobileMenuOpen(false);
    setPopupHeader('تغيير كلمة المرور')
  }
  return (
    <header className="z-10 bg-white fixed navbar top-0 w-full">
      <nav aria-label="Global" className="mx-auto px-2 flex max-w-7xl items-center justify-between p-1 lg:px-8">
        <div className="flex lg:flex-1">
          <a href='/' className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt='logo image' src={Logo} style={{height:"5rem"}} className="h-16 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="cursor-pointer -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <HashLink 
          scroll={(el) => {
            const yOffset = -100; // Adjust this value to match the height of your navbar
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }}
          smooth to='/#landing' className={`${pathname === '/' ? 'font-active' : 'font-semibold'} cursor-pointer tracking-wider text-lg font-cairo leading-6 text-navbar-blue`}>
            الرئيسية
          </HashLink>
          <div className="links-nav font-bold cursor-pointer tracking-wider text-lg font-cairo font-semibold leading-6 text-navbar-blue">
            <span className={` our-services ${pathname=== '/add-new-unit' || pathname=== '/inquiry-page' ? 'font-active' : 'font-semibold'}`}>
              خدماتنا
              <IoIosArrowDown/>
            </span>
            <div className="nav-menu">
              {/* <span className='list-unit' onClick={()=>handleAddUnitRoute('add-unit')}>اضف وحدتك</span> */}
              {/* <span className='list-unit' onClick={()=>handleAddUnitRoute('invite')}>دعوة صديق</span> */}
              <span className='list-unit' onClick={()=>handleOurServicesRoutes('add-review')}>اضف تقييمك</span>
              <Link className='list-unit' to="/inquiry-page">استعلام عن الفائزين</Link>
              {/* <Link className='list-unit' to="/leader-board">لوحة المتصدرين</Link> */}
            </div>
          </div>
          <Link to= "/all-units" className={`${pathname.startsWith('/all-units')? 'font-active' : 'font-semibold'} cursor-pointer tracking-wider text-lg font-cairo leading-6 text-navbar-blue`}>
            الوحدات
          </Link>
          <span onClick={()=>handleAddUnitRoute('add-unit')} to=  "/add-new-unit" className={`${pathname=== '/add-new-unit' ? 'font-active' : 'font-semibold'} cursor-pointer tracking-wider text-lg font-cairo leading-6 text-navbar-blue`} >اضف وحدتك</span>
          <HashLink
            scroll={(el) => {
              const yOffset = -60; // Adjust this value to match the height of your navbar
              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'smooth' });
              }}
              smooth to="/#why-us" className={`${pathname.startsWith('/faq') ? 'font-active' : 'font-semibold'} cursor-pointer tracking-wider text-lg font-cairo leading-6 text-navbar-blue`}>
            الاستشارات
          </HashLink>
          <Link to='/contact-us' className={`${pathname === '/contact-us' ? 'font-active' : 'font-semibold'} cursor-pointer tracking-wider text-lg font-cairo leading-6 text-navbar-blue`}>
            اتصل بنا
          </Link>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {name&&token?
          <span className='user-span'>
            <span className='user-image'>
              <img src={userImage ? userImage : defaultImage} alt="userImage" />
            </span>
            <span> {name}</span>
            <IoIosArrowDown/>
            <div className="nav-menu nav-menu-logout">
              <Link className='list-unit' to="my-account/account-details">
                حسابي
              </Link>
              {/* <span className='list-unit' onClick={handleChangePass}> 
                تغيير كلمة المرور
                <RiLockPasswordLine />
              </span>
              <span className='list-unit' onClick={()=>navigate('/favorites')}> 
                المفضلة
                <FaRegHeart />
              </span> */}
              <span className='list-unit' onClick={handleLogout}> 
                تسجيل الخروج
                <MdLogout />
              </span>
            </div>
          </span>
          :
          <Link to="/register" className="font-bold py-3  flex gap-2 items-center text-lg leading-6 rounded-2xl text-navbar-blue">
            <FaUserAlt className='text-xl '/> 
            <p className='text-lg '>تسجيل الدخول</p>
          </Link>
          }
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt='Logo image'
                src={Logo}
                className="h-16 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 ">
                <HashLink smooth
                  scroll={(el) => {
                    const yOffset = -100; // Adjust this value to match the height of your navbar
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  to='/#landing'
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${pathname === '/' ? 'font-active' : 'font-semibold'} cursor-pointer -mx-3 tracking-wider block font-cairo rounded-lg px-3 py-2 text-base leading-7 text-navbar-blue `}
                >
                  الرئيسية
                </HashLink>
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton
                  className={`${pathname=== '/add-new-unit' || pathname=== '/inquiry-page' ? 'font-active' : 'font-semibold'} group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 text-navbar-blue `}
                  >
                    خدماتنا 
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    <span className='cursor-pointer font-bold block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-navbar-blue hover:bg-gray-50' onClick={()=>handleAddUnitRoute('add-unit')}>اضف وحدتك</span>
                    {/* <span className='cursor-pointer font-bold block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-navbar-blue hover:bg-gray-50' onClick={()=>handleAddUnitRoute('invite')}>دعوة صديق</span> */}
                    <span className='cursor-pointer font-bold block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-navbar-blue hover:bg-gray-50' onClick={()=>handleOurServicesRoutes('add-review')}>اضف تقييمك</span>
                    <Link onClick={() => setMobileMenuOpen(false)} className='font-bold block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-navbar-blue hover:bg-gray-50' to="/inquiry-page">استعلام عن الفائزين</Link>
                    {/* <Link onClick={() => setMobileMenuOpen(false)} className='font-bold block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-navbar-blue hover:bg-gray-50' to="/leader-board">لوحة المتصدرين</Link> */}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  to='/all-units'
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${pathname === '/all-units' ? 'font-active' : 'font-semibold'} cursor-pointer -mx-3 tracking-wider block font-cairo rounded-lg px-3 py-2 text-base leading-7 text-navbar-blue `}
                >
                  الوحدات
                </Link>
                <HashLink
                  to='/#why-us'
                  scroll={(el) => {
                    const yOffset = -60; // Adjust this value to match the height of your navbar
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  smooth
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${pathname.startsWith('/faq') ? 'font-active' : 'font-semibold'} cursor-pointer -mx-3 tracking-wider block font-cairo rounded-lg px-3 py-2 text-base leading-7 text-navbar-blue `}
                >
                  الاستشارات
                </HashLink>
                {/* <HashLink
                  scroll={(el) => {
                    const yOffset = -60; // Adjust this value to match the height of your navbar
                    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }}
                  to='/#about-us'
                  smooth
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${pathname === '/contact-us' ? 'font-active' : 'font-semibold'} cursor-pointer -mx-3 tracking-wider block font-cairo rounded-lg px-3 py-2 text-base leading-7 text-navbar-blue `}
                  // className=" font-bold cursor-pointer -mx-3 tracking-wider block font-cairo rounded-lg px-3 py-2 text-base font-semibold leading-7 text-navbar-blue hover:bg-gray-50"
                >
                  من نحن
                </HashLink> */}
                <Link 
                  to='/contact-us'
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${pathname === '/contact-us' ? 'font-active' : 'font-semibold'} cursor-pointer -mx-3 tracking-wider block font-cairo rounded-lg px-3 py-2 text-base leading-7 text-navbar-blue `}
                >
                  اتصل بنا
                </Link>
              </div>
              <div className="py-6">
                {name&&token?
                <span className='user-span w-max'>
                  <span className='user-image'>
                    <img src={userImage ? userImage : defaultImage} alt="userImage" />
                  </span>
                  <span> {name}</span>
                  <IoIosArrowDown/>
                  <div className="nav-menu nav-menu-mobile">
                    <span className='list-unit'>
                      <Link to="my-account/account-details">
                        حسابي
                      </Link>
                    </span> 
                    {/* <span className='list-unit' onClick={handleChangePass}> 
                      تغيير كلمة المرور
                      <RiLockPasswordLine />
                    </span>
                    <span className='list-unit' onClick={()=>navigate('/favorites')}> 
                      المفضلة
                      <FaRegHeart />
                    </span> */}
                    <span className='list-unit' onClick={handleLogout}> 
                      تسجيل الخروج
                      <MdLogout />
                    </span>
                  </div>
                </span>
                :
                <Link to="/register" className="font-bold py-3 px-6 flex gap-2 items-center text-lg leading-6 rounded-2xl text-navbar-blue">
                  <FaUserAlt className='text-xl '/> 
                  <p className='text-lg '>تسجيل الدخول</p>
                </Link>
                }
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
export default Navbar;

