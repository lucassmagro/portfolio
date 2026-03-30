import React from 'react'
import { motion } from 'framer-motion'

const socialLinks = [
  {
    name: 'Portfolio',
    url: '#/',
    icon: 'home',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/lucassmagro',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lucassmagro/',
    icon: 'linkedin',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/lucassmagro',
    icon: 'instagram',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/5549999999999',
    icon: 'whatsapp',
  },
  {
    name: 'E-mail',
    url: 'mailto:lucassmagro@gmail.com',
    icon: 'mail',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function LinkHub({ isDark, toggleTheme }) {
  const bgColor = isDark ? 'bg-black' : 'bg-white'
  const textColor = isDark ? 'text-white' : 'text-black'
  const cardBg = isDark ? 'bg-white/5' : 'bg-black/[0.03]'
  const borderColor = isDark ? 'border-white/10' : 'border-black/5'
  const sublineColor = isDark ? 'bg-white/10' : 'bg-black/10'

  return (
    <div
      className={`linkhub-page min-h-screen ${bgColor} ${textColor} font-sans flex flex-col items-center py-16 px-4 transition-colors duration-700 relative`}
    >
      
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`fixed top-8 right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full border ${borderColor} ${cardBg} backdrop-blur-3xl`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="8" y1="0.5" x2="8" y2="2.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="8" y1="13.5" x2="8" y2="15.5" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0.5" y1="8" x2="2.5" y2="8" stroke="currentColor" strokeWidth="1.5" />
            <line x1="13.5" y1="8" x2="15.5" y2="8" stroke="currentColor" strokeWidth="1.5" />
            <line x1="2.7" y1="2.7" x2="4.1" y2="4.1" stroke="currentColor" strokeWidth="1.5" />
            <line x1="11.9" y1="11.9" x2="13.3" y2="13.3" stroke="currentColor" strokeWidth="1.5" />
            <line x1="2.7" y1="13.3" x2="4.1" y2="11.9" stroke="currentColor" strokeWidth="1.5" />
            <line x1="11.9" y1="4.1" x2="13.3" y2="2.7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 9.5A6.5 6.5 0 1 1 4.5 1 5 5 0 0 0 13 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        )}
      </motion.button>

      {/* Profile Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center mb-12 text-center"
      >
        <div className={`w-24 h-24 rounded-full overflow-hidden mb-6 border ${borderColor} p-1`}>
          <img 
            src="eu.jpg" 
            alt="Lucas Magro" 
            className="w-full h-full object-cover rounded-full filter contrast-125"
          />
        </div>
        
        <h1 className="flex flex-col items-center gap-y-1 mb-4">
          <span className="text-4xl sm:text-5xl font-sans font-black uppercase tracking-perry leading-[0.8] mb-1">LUCAS</span>
          <span className="text-3xl sm:text-4xl font-serif italic lowercase opacity-90 leading-[0.8] mb-1">santos</span>
          <span className="text-4xl sm:text-5xl font-sans font-black uppercase tracking-perry leading-[0.8]">MAGRO</span>
        </h1>
        
        <p className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase opacity-40 font-medium mt-4">
          DESIGNER & DESENVOLVEDOR WEB
        </p>
      </motion.div>

      {/* Link Stack */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] space-y-3"
      >
        {socialLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.url}
            target={link.url.startsWith('http') ? "_blank" : "_self"}
            rel={link.url.startsWith('http') ? "noopener noreferrer" : ""}
            variants={itemVariants}
            whileHover={{ scale: 1.01, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            className={`group block p-5 flex items-center justify-between transition-all duration-300 rounded-[4px] border ${borderColor} ${cardBg} backdrop-blur-3xl`}
          >
            <span className="text-sm font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
              {link.name}
            </span>
            <motion.span 
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 3, y: -3 }}
              className="text-lg opacity-40 group-hover:opacity-100 transition-opacity"
            >
              ↗
            </motion.span>
          </motion.a>
        ))}
      </motion.div>

      {/* Latest Project Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        viewport={{ once: true }}
        className="w-full max-w-[440px] mt-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`h-[1px] flex-1 ${sublineColor}`}></div>
          <span className="text-[9px] uppercase tracking-[0.3em] opacity-30 font-bold">Latest Project</span>
          <div className={`h-[1px] flex-1 ${sublineColor}`}></div>
        </div>

        <motion.a
          href="cafeteria/index.html"
          className={`group block relative aspect-video overflow-hidden rounded-[4px] border ${borderColor} ${cardBg} backdrop-blur-3xl`}
          whileHover={{ scale: 1.01 }}
        >
          <img 
            src="projects/cafeteria.png" 
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            }}
            alt="Artisanal Coffee"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className={`absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t ${isDark ? 'from-black/80' : 'from-white/80'} to-transparent`}>
            <h3 className="font-serif italic text-xl mb-1">Artisanal Coffee</h3>
            <p className="text-[10px] uppercase tracking-widest opacity-60">Editorial E-commerce</p>
          </div>
        </motion.a>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 text-[9px] uppercase tracking-[0.2em] opacity-20 font-medium">
        © 2026 Lucas santos Magro
      </footer>
    </div>
  )
}
