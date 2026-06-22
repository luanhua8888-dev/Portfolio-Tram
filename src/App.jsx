import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Facebook, Instagram, Mail, Send, CheckCircle2, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import heroAvatar from './assets/hero_avatar.png'
import slide1 from './assets/slide1.png'
import slide2 from './assets/slide2.png'
import slide3 from './assets/slide3.png'
import slide4 from './assets/slide4.png'
import ig1 from './assets/ig_1.png'
import ig2 from './assets/ig_2.png'
import ig3 from './assets/ig_3.png'
import ig4 from './assets/ig_4.png'
import ig5 from './assets/ig_5.png'
import ig6 from './assets/ig_6.png'
import ig7 from './assets/ig_7.png'
import ig8 from './assets/ig_8.png'
import ig9 from './assets/ig_9.png'
import ig10 from './assets/ig_10.png'
import ig11 from './assets/ig_11.png'
import ig12 from './assets/ig_12.png'

const slides = [slide1, slide2, slide3, slide4]

const igGallery = [
  { img: ig1, link: "https://www.instagram.com/chuttoii/p/DZAXvqkFB1J6-TrkPm4l4YXcutVPP18KcYtK2c0/" },
  { img: ig2, link: "https://www.instagram.com/chuttoii/p/DYzZ9fXlC_W_0wdbgNE-62a-7eVQmLH4P9qgQI0/" },
  { img: ig3, link: "https://www.instagram.com/chuttoii/p/DYWSzKrFAAufMVxGUhga2KjgSkrH1apdeP5Bkk0/" },
  { img: ig4, link: "https://www.instagram.com/chuttoii/p/DW1nN0nlG2OHZpOZpGjRCrAdU3YasgFHtOQgHI0/" },
  { img: ig5, link: "https://www.instagram.com/chuttoii/p/DWjNdquFFw0S1mphl28WDsArzhsRkFMQ2mO5aU0/" },
  { img: ig6, link: "https://www.instagram.com/chuttoii/p/DWYFLVolGp8_3EzzyxBT6do_xKc1ITtfNuEO-w0/" },
  { img: ig7, link: "https://www.instagram.com/chuttoii/p/DVnzqvfFCYohf_j3u09eQHDfXrymXkfPxW3Re80/" },
  { img: ig8, link: "https://www.instagram.com/chuttoii/p/DU-76fagYwfQTIMsXVruRjfVoOk3T2q_hCJ4DU0/" },
  { img: ig9, link: "https://www.instagram.com/chuttoii/p/DT70L0XlJBGJlKa6q1Qs4TjPZnVvOJigCxy3Kg0/" },
  { img: ig10, link: "https://www.instagram.com/chuttoii/p/DT0QElIAbaT7s1BZs1w-zvOJpapLkQlBzxojv00/" },
  { img: ig11, link: "https://www.instagram.com/chuttoii/p/DS-QnyugZbKExhutXGAKPQWYT1HWpg9KsNOT_M0/" },
  { img: ig12, link: "https://www.instagram.com/chuttoii/p/DSsSVblgQjaECwuOIT197FG0f9UIufGO_iXQjI0/" }
]

const FallingFlowers = () => {
  const [flowers, setFlowers] = React.useState([])

  React.useEffect(() => {
    // Generate 35 random flowers/images with different sizes, positions, durations, delays
    const initialFlowers = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 20, // 20px to 40px (since PNGs look better slightly larger)
      delay: Math.random() * -15, // Starts immediately distributed
      duration: Math.random() * 8 + 6, // 6s to 14s
      type: i % 3 === 0 ? 'daisy' : (i % 3 === 1 ? 'cat' : 'frog'),
      swayDuration: Math.random() * 3 + 2, // 2s to 5s
    }))
    setFlowers(initialFlowers)
  }, [])

  const renderShape = (type) => {
    if (type === 'daisy') {
      return (
        <img 
          src="/image-removebg-preview.png" 
          alt="Daisy" 
          className="w-full h-full object-contain pointer-events-none" 
        />
      )
    }
    if (type === 'cat') {
      return (
        <img 
          src="/image-removebg-preview (1).png" 
          alt="Cat" 
          className="w-full h-full object-contain pointer-events-none" 
        />
      )
    }
    // frog
    return (
      <img 
        src="/image-removebg-preview (2).png" 
        alt="Frog" 
        className="w-full h-full object-contain pointer-events-none" 
      />
    )
  }

  return (
    <div className="falling-flower-container">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="falling-flower"
          style={{
            left: `${flower.x}%`,
            width: `${flower.size}px`,
            height: `${flower.size}px`,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
          }}
        >
          <div
            className="falling-flower-inner"
            style={{
              animationDuration: `${flower.swayDuration}s`,
            }}
          >
            <div className="falling-flower-interactive">
              {renderShape(flower.type)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    let timer
    if (activeTab === 'contacts') {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 3000)
    }
    return () => clearInterval(timer)
  }, [activeTab])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
      }, 3000)
    }
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  }

  const contentVariants = {
    initial: (direction) => ({
      opacity: 0,
      x: direction > 0 ? 30 : -30,
      y: 0
    }),
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction) => ({
      opacity: 0,
      x: direction < 0 ? 30 : -30,
      transition: { duration: 0.3 }
    })
  }

  const waveVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  }

  const getDirection = (tab) => {
    const order = ['home', 'about', 'projects', 'contacts']
    const currentIndex = order.indexOf(activeTab)
    const nextIndex = order.indexOf(tab)
    return nextIndex - currentIndex
  }

  const changeTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-brand-yellow flex items-center justify-center p-4 md:p-8 font-sans selection:bg-brand-yellow/30">
      <FallingFlowers />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="relative w-full max-w-6xl bg-[#FAFAFA] rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row min-h-[620px]"
      >
        {/* SVG Wave Divider (Desktop Only) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-10">
          <svg className="w-full h-full" viewBox="0 0 1000 620" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              d="M 540 0 
                 L 1000 0 
                 L 1000 420 
                 C 940 500, 840 580, 760 620 
                 C 680 620, 600 540, 640 460 
                 C 680 370, 470 340, 490 270 
                 C 510 180, 540 100, 540 0 
                 Z"
              fill="#F4B41A"
            />
          </svg>
        </div>

        {/* Navigation Header */}
        <header className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-8 py-4 md:px-12 md:py-8 flex justify-between items-center w-full">
          {/* Logo / Name */}
          <button 
            onClick={() => changeTab('home')}
            className="text-slate-900 font-cursive text-3xl sm:text-4xl md:text-5xl hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap flex-shrink-0 pt-2"
          >
         
          </button>

          {/* Nav Links */}
          <nav className="flex space-x-3 sm:space-x-6 md:space-x-10 text-xs sm:text-sm md:text-base font-semibold">
            {['about', 'projects', 'contacts'].map((tab) => {
              const isActive = activeTab === tab
              const labels = {
                about: 'Giới thiệu',
                projects: 'Mạng xã hội',
                contacts: 'Liên hệ'
              }
              return (
                <button
                  key={tab}
                  onClick={() => changeTab(tab)}
                  className={`relative py-1 cursor-pointer transition-colors duration-300 ${
                    isActive ? 'text-slate-900 md:text-white font-bold' : 'text-slate-700/80 md:text-white/85 hover:text-slate-900 md:hover:text-white'
                  }`}
                >
                  {labels[tab]}
                  {isActive && (
                    <motion.div 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 md:bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </nav>
        </header>

        {/* Left Column: Dynamic Content Area (White background) */}
        <div className="w-full md:w-[54%] bg-[#FAFAFA] md:bg-transparent z-20 flex flex-col justify-center px-4 sm:px-8 pt-20 pb-6 md:px-16 md:py-20 text-left min-h-[420px] md:min-h-0">
          <div className="w-full max-w-lg">
            <AnimatePresence mode="wait" custom={getDirection(activeTab)}>
              <motion.div
                key={activeTab}
                custom={getDirection(activeTab)}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                {activeTab === 'home' && (
                  <>
                    <span className="text-brand-yellow font-bold tracking-wider text-xs md:text-sm uppercase block font-sans">
                    </span>
                    <h1 className="text-slate-950 font-serif text-4xl md:text-6xl font-bold leading-[1.2] md:leading-[1.25]">
                      Xin chào, mình là <span className="font-cursive text-brand-yellow font-normal text-5xl md:text-7xl block sm:inline-block pt-2 sm:pt-0 align-middle">Bích Trâm</span>
                    </h1>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md font-sans">
                      Một vài dòng giới thiệu ngắn về bản thân, công việc hoặc định hướng sự nghiệp của bạn. Bạn có thể cập nhật thêm thông tin chi tiết ở trang giới thiệu.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => changeTab('projects')}
                        className="bg-brand-yellow hover:bg-brand-yellow-hover text-slate-950 font-bold px-6 py-3 rounded-xl shadow-[0_4px_14px_rgba(244,180,26,0.3)] transition-colors flex items-center gap-2 cursor-pointer text-sm md:text-base"
                      >
                        Liên kết
                        <ArrowRight size={18} />
                      </motion.button>
                      <motion.a
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://www.facebook.com/bich.tram.388670"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-950 font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-2 text-sm md:text-base"
                      >
                        Facebook
                        <Facebook size={18} />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://www.instagram.com/chuttoii/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-950 font-bold px-5 py-3 rounded-xl transition-all flex items-center gap-2 text-sm md:text-base"
                      >
                        Instagram
                        <Instagram size={18} />
                      </motion.a>
                    </div>
                  </>
                )}

                {activeTab === 'about' && (
                  <>
                    <span className="text-brand-yellow font-bold tracking-wider text-xs md:text-sm uppercase block font-sans">
                      Tìm hiểu về mình
                    </span>
                    <h1 className="text-slate-950 font-serif text-4xl md:text-5xl font-bold leading-[1.2] md:leading-snug">
                      Về <span className="font-cursive text-brand-yellow font-normal text-5xl md:text-6xl pl-1 inline-block align-middle">Bích Trâm</span>
                    </h1>
                    <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed font-sans">
                      <p>
                        Mình là một nhà thiết kế UI/UX đầy nhiệt huyết. Mình chuyên tạo ra các trải nghiệm kỹ thuật số đẹp mắt, tập trung vào người dùng, kết hợp hài hòa giữa tính thẩm mỹ và sự tối giản, tiện dụng.
                      </p>
                      <p>
                        Trong những năm qua, mình đã làm việc cùng các đối tác và thương hiệu để thiết kế ứng dụng di động, trang web và các sản phẩm tương tác. Mình tin rằng một thiết kế tuyệt vời không chỉ nằm ở vẻ bề ngoài mà còn ở cách nó vận hành.
                      </p>
                    </div>

                  </>
                )}

                {activeTab === 'projects' && (
                  <>
                    <span className="text-brand-yellow font-bold tracking-wider text-xs md:text-sm uppercase block font-sans">
                      Kênh liên kết
                    </span>
                    <h1 className="text-slate-950 font-serif text-4xl md:text-5xl font-bold leading-tight">
                      Mạng lưới xã hội
                    </h1>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {[
                        { 
                          title: 'Trang Facebook', 
                          category: 'Facebook', 
                          desc: 'Theo dõi cuộc sống thường nhật và công việc.',
                          link: 'https://www.facebook.com/bich.tram.388670',
                          icon: 'facebook'
                        },
                        { 
                          title: 'Trang Instagram', 
                          category: 'Instagram', 
                          desc: 'Xem những khoảnh khắc đời thường & nghệ thuật.',
                          link: 'https://www.instagram.com/chuttoii/?hl=en',
                          icon: 'instagram'
                        }
                      ].map((project, i) => (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={project.title}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="group flex flex-col justify-between p-4 rounded-2xl border border-slate-100/80 bg-white/50 hover:bg-white hover:shadow-md hover:border-white transition-all duration-300 cursor-pointer block"
                        >
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-brand-yellow text-xs font-bold uppercase tracking-wider">{project.category}</span>
                              <motion.div 
                                whileHover={{ scale: 1.1 }}
                                className="text-slate-400 group-hover:text-slate-900 transition-colors"
                              >
                                {project.icon === 'facebook' ? (
                                  <Facebook size={18} />
                                ) : (
                                  <Instagram size={18} />
                                )}
                              </motion.div>
                            </div>
                            <h3 className="text-slate-900 font-bold text-base group-hover:text-brand-yellow transition-colors font-sans">{project.title}</h3>
                            <p className="text-slate-500 text-xs mt-1 leading-normal">{project.desc}</p>
                          </div>
                        </motion.a>
                      ))}
                    </div>

                    {/* Instagram Grid Divider & Header */}
                    <div className="pt-5 flex items-center justify-between border-t border-slate-200/50 mt-5">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">Bộ sưu tập Instagram</span>
                      <a 
                        href="https://www.instagram.com/chuttoii/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-brand-yellow hover:text-brand-yellow-hover font-bold flex items-center gap-1 transition-colors"
                      >
                        @chuttoii <ExternalLink size={12} />
                      </a>
                    </div>
                    
                    {/* 3x4 Grid Gallery */}
                    <div className="grid grid-cols-3 gap-3 pt-3 pb-1">
                      {igGallery.map((item, idx) => (
                        <motion.a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.03 }}
                          whileHover={{ scale: 1.04, y: -2 }}
                          className="relative rounded-2xl overflow-hidden aspect-square border border-slate-100/80 shadow-sm hover:shadow-md block cursor-pointer group"
                        >
                          <img 
                            src={item.img} 
                            alt={`Instagram Post ${idx + 1}`} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            loading="lazy"
                            draggable="false"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 text-white">
                            <div className="flex items-center gap-1.5 text-xs font-semibold">
                              <Instagram size={14} className="text-brand-yellow" />
                              <span>Xem ảnh</span>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'contacts' && (
                  <>
                    <span className="text-brand-yellow font-bold tracking-wider text-xs md:text-sm uppercase block font-sans">
                      Kết nối
                    </span>
                    <h1 className="text-slate-950 font-serif text-4xl md:text-5xl font-bold leading-tight">
                      Gửi lời nhắn
                    </h1>
                    
                    {formSubmitted ? (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-2xl border border-green-200 text-center space-y-3"
                      >
                        <CheckCircle2 className="text-green-500 w-12 h-12" />
                        <h3 className="text-green-800 font-bold text-lg font-sans">Cảm ơn bạn!</h3>
                        <p className="text-green-600 text-sm">Tin nhắn của bạn đã được gửi thành công. Bích Trâm sẽ phản hồi lại bạn sớm nhé.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            name="name"
                            required
                            placeholder="Tên của bạn"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-white border border-slate-200 focus:border-brand-yellow rounded-xl px-4 py-2.5 text-sm outline-none transition-colors w-full text-slate-800 font-sans"
                          />
                          <input 
                            type="email" 
                            name="email"
                            required
                            placeholder="Email của bạn"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-white border border-slate-200 focus:border-brand-yellow rounded-xl px-4 py-2.5 text-sm outline-none transition-colors w-full text-slate-800 font-sans"
                          />
                        </div>
                        <textarea 
                          name="message"
                          required
                          rows="3"
                          placeholder="Lời nhắn của bạn"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="bg-white border border-slate-200 focus:border-brand-yellow rounded-xl px-4 py-2.5 text-sm outline-none transition-colors w-full resize-none text-slate-800 font-sans"
                        />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-slate-950 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                        >
                          Gửi tin nhắn
                          <Send size={16} />
                        </motion.button>
                      </form>
                    )}

                    {/* Slideshow Gallery */}
                    <div className="relative mt-5 rounded-2xl overflow-hidden aspect-[16/10] shadow-sm border border-slate-100/50 group h-40 sm:h-48 mx-auto">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentSlide}
                          src={slides[currentSlide]}
                          initial={{ opacity: 0, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="w-full h-full object-cover"
                          draggable="false"
                        />
                      </AnimatePresence>
                      
                      {/* Left/Right Controls */}
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-sm hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer flex items-center justify-center z-10"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCurrentSlide((prev) => (prev + 1) % slides.length)
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 p-1.5 rounded-full shadow-sm hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer flex items-center justify-center z-10"
                      >
                        <ChevronRight size={16} />
                      </button>
                      
                      {/* Slide Indicator Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-slate-950/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {slides.map((_, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                              currentSlide === idx ? 'bg-brand-yellow w-3' : 'bg-white/60 hover:bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Visual Section (Yellow background) */}
        <div className={`w-full md:w-[46%] bg-brand-yellow md:bg-transparent z-20 flex flex-col justify-end items-center relative overflow-hidden min-h-[350px] md:min-h-0 ${activeTab === 'home' ? 'flex' : 'hidden md:flex'}`}>
          {/* Decorative floating elements */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-16 right-16 w-8 h-8 rounded-full bg-white/20 blur-sm pointer-events-none hidden md:block"
          />
          <motion.div
            animate={{ 
              y: [0, 8, 0],
              rotate: [0, -8, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-24 left-10 w-12 h-12 rounded-full bg-white/10 blur-[2px] pointer-events-none hidden md:block"
          />

          {/* Hero Avatar Image with floating animations */}
          <motion.div
            animate={{ 
              y: [0, -8, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-[280px] sm:w-[320px] md:w-[420px] lg:w-[460px] h-auto pointer-events-auto md:absolute md:bottom-0 md:-right-4 lg:-right-8 select-none z-20"
          >
            <img 
              src={heroAvatar} 
              alt="Bích Trâm" 
              className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
              draggable="false"
            />
          </motion.div>
        </div>

        {/* Decorative Black Cat (Static in corner) */}
        <div
          style={{ transform: 'scaleX(-1)' }}
          className="absolute bottom-2 left-6 z-40 group cursor-pointer"
        >
          {/* Speech Bubble */}
          <div 
            style={{ transform: 'scaleX(-1)' }}
            className="absolute bottom-[65px] left-1/2 -translate-x-[30%] mb-2 bg-slate-950 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-md z-50"
          >
            Meow~ 🐾
            <div className="absolute top-full left-[25%] -translate-x-1/2 border-4 border-transparent border-t-slate-950"></div>
          </div>
          <article className="cute-cat" role="img" aria-labelledby="alt">
            <div id="alt">Cartoon of a black cat drawn in cute/kawaii style</div>
            <div className="shadow"></div>
            <div className="tail"></div>
            <div className="body">
              <div className="leg"></div>
              <div className="leg"></div>
              <div className="paw"></div>
              <div className="paw"></div>
            </div>
            <div className="ear"></div>
            <div className="ear"></div>
            <div className="head">
              <div className="whisker"></div>
              <div className="whisker"></div>
              <div className="whisker"></div>
              <div className="whisker"></div>
              <div className="eye"></div>
              <div className="eye"></div>
              <div className="nose"></div>
            </div>
          </article>
        </div>
      </motion.div>
    </div>
  )
}

export default App
