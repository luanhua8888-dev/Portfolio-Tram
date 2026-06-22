import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Linkedin, Github, Mail, Send, CheckCircle2, ExternalLink } from 'lucide-react'
import heroAvatar from './assets/hero_avatar.png'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

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
        <header className="absolute top-0 left-0 right-0 z-30 px-8 py-6 md:px-12 md:py-8 flex justify-between items-center w-full">
          {/* Logo / Name */}
          <button 
            onClick={() => changeTab('home')}
            className="text-slate-900 font-bold text-xl md:text-2xl hover:opacity-80 transition-opacity cursor-pointer font-sans"
          >
            Bích Trâm
          </button>

          {/* Nav Links */}
          <nav className="flex space-x-6 md:space-x-10 text-sm md:text-base font-semibold">
            {['about', 'projects', 'contacts'].map((tab) => {
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  onClick={() => changeTab(tab)}
                  className={`relative py-1 capitalize cursor-pointer transition-colors duration-300 ${
                    isActive ? 'text-slate-900' : 'text-slate-700/80 hover:text-slate-900'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.div 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </nav>
        </header>

        {/* Left Column: Dynamic Content Area (White background) */}
        <div className="w-full md:w-[54%] bg-[#FAFAFA] md:bg-transparent z-20 flex flex-col justify-center px-6 py-24 md:px-16 md:py-20 text-left min-h-[420px] md:min-h-0">
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
                      UI/UX Designer
                    </span>
                    <h1 className="text-slate-950 font-serif text-4xl md:text-6xl font-bold leading-[1.1] md:leading-[1.15]">
                      Hello, Bích Trâm
                    </h1>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-md">
                      Short text with details about you, what you do or your professional career. You can add more information on the about page.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => changeTab('projects')}
                        className="bg-brand-yellow hover:bg-brand-yellow-hover text-slate-950 font-bold px-6 py-3 rounded-xl shadow-[0_4px_14px_rgba(244,180,26,0.3)] transition-colors flex items-center gap-2 cursor-pointer text-sm md:text-base"
                      >
                        Projects
                        <ArrowRight size={18} />
                      </motion.button>
                      <motion.a
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://www.linkedin.com/feed/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-950 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-sm md:text-base"
                      >
                        LinkedIn
                        <Linkedin size={18} />
                      </motion.a>
                    </div>
                  </>
                )}

                {activeTab === 'about' && (
                  <>
                    <span className="text-brand-yellow font-bold tracking-wider text-xs md:text-sm uppercase block font-sans">
                      Get to know me
                    </span>
                    <h1 className="text-slate-950 font-serif text-4xl md:text-5xl font-bold leading-tight">
                      About Bích Trâm
                    </h1>
                    <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                      <p>
                        I am a passionate UI/UX Designer based in San Francisco. I specialize in creating beautiful, user-centered digital experiences that blend aesthetic appeal with functional simplicity.
                      </p>
                      <p>
                        Over the past 5 years, I have worked with startups and brands to design mobile apps, web applications, and interactive websites. I believe that great design is not just how it looks, but how it works.
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="text-slate-800 font-bold text-sm md:text-base mb-3 font-sans">My Core Skills:</h3>
                      <div className="flex flex-wrap gap-2">
                        {['UI/UX Design', 'Framer Motion', 'Figma', 'React', 'Tailwind CSS', 'Prototyping', 'User Research'].map((skill, i) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05, backgroundColor: '#FEF08A' }}
                            className="bg-brand-yellow/10 text-slate-800 border border-brand-yellow/30 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-colors cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'projects' && (
                  <>
                    <span className="text-brand-yellow font-bold tracking-wider text-xs md:text-sm uppercase block font-sans">
                      Selected Work
                    </span>
                    <h1 className="text-slate-950 font-serif text-4xl md:text-5xl font-bold leading-tight">
                      Recent Projects
                    </h1>
                    
                    <div className="space-y-3 pt-2">
                      {[
                        { title: 'Amélie Garden', category: 'Mobile App Design', desc: 'Plant care companion with water schedules and community.' },
                        { title: 'Solaria Dashboard', category: 'SaaS Web App', desc: 'Visual Analytics for household solar panel energy yields.' },
                        { title: 'Zenith Storefront', category: 'Brand & E-Commerce', desc: 'Sleek luxury storefront experience for sustainable fashion.' }
                      ].map((project, i) => (
                        <motion.div
                          key={project.title}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ x: 6 }}
                          className="group flex flex-col justify-start p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-sm transition-all duration-300"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-brand-yellow text-xs font-bold uppercase tracking-wider">{project.category}</span>
                              <h3 className="text-slate-900 font-bold text-base md:text-lg group-hover:text-brand-yellow transition-colors font-sans">{project.title}</h3>
                            </div>
                            <motion.div 
                              whileHover={{ scale: 1.2 }}
                              className="text-slate-400 group-hover:text-slate-900 transition-colors p-1"
                            >
                              <ExternalLink size={18} />
                            </motion.div>
                          </div>
                          <p className="text-slate-500 text-xs md:text-sm mt-1 leading-snug">{project.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'contacts' && (
                  <>
                    <span className="text-brand-yellow font-bold tracking-wider text-xs md:text-sm uppercase block font-sans">
                      Let's Connect
                    </span>
                    <h1 className="text-slate-950 font-serif text-4xl md:text-5xl font-bold leading-tight">
                      Get in Touch
                    </h1>
                    
                    {formSubmitted ? (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-2xl border border-green-200 text-center space-y-3"
                      >
                        <CheckCircle2 className="text-green-500 w-12 h-12" />
                        <h3 className="text-green-800 font-bold text-lg font-sans">Thank you!</h3>
                        <p className="text-green-600 text-sm">Your message has been sent successfully. Bích Trâm will get back to you soon.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3 pt-1">
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            name="name"
                            required
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-white border border-slate-200 focus:border-brand-yellow rounded-xl px-4 py-2.5 text-sm outline-none transition-colors w-full text-slate-800 font-sans"
                          />
                          <input 
                            type="email" 
                            name="email"
                            required
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-white border border-slate-200 focus:border-brand-yellow rounded-xl px-4 py-2.5 text-sm outline-none transition-colors w-full text-slate-800 font-sans"
                          />
                        </div>
                        <textarea 
                          name="message"
                          required
                          rows="3"
                          placeholder="Your Message"
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
                          Send Message
                          <Send size={16} />
                        </motion.button>
                      </form>
                    )}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Visual Section (Yellow background) */}
        <div className="w-full md:w-[46%] bg-brand-yellow md:bg-transparent z-20 flex flex-col justify-end items-center relative overflow-hidden min-h-[350px] md:min-h-0">
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
      </motion.div>
    </div>
  )
}

export default App
