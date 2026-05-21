import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// --- NAVBAR ---
const Navbar = ({ cartCount, isFlying }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const userEmail = localStorage.getItem('email'); 
  const userName = localStorage.getItem('username');

  const ADMIN_EMAIL = 'admin@fastdelice.com';
  const isAdmin = userEmail?.toLowerCase().trim() === ADMIN_EMAIL;
  const navUserLabel = isAdmin ? 'ADMIN' : (userName || userEmail?.split('@')[0] || '');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menuLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'À Propos', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white sticky top-0 z-[2000] w-full border-b border-gray-100 shadow-sm h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center relative">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3 shrink-0">
          <div className="bg-orange-600 p-2 rounded-full shadow-md">
            <svg width="24" height="24" viewBox="0 0 512 512" fill="white">
              <path d="M416 0c-35.3 0-64 28.7-64 64V288c0 17.7 14.3 32 32 32h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V32C480 14.3 465.7 0 448 0H416zM80 0C44.7 0 16 28.7 16 64V224c0 35.3 28.7 64 64 64h16V480c0 17.7 14.3 32 32 32s32-14.3 32-32V288h16c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80z" />
            </svg>
          </div>
          <span className="font-black text-xl tracking-tighter text-gray-900 uppercase italic">
            Fast<span className="text-orange-600">Délice</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center space-x-8 text-[12px] font-black uppercase text-gray-800">
          {menuLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`relative pb-1 transition-all duration-300 hover:text-orange-600 ${isActive(link.path) ? 'text-orange-600' : ''}`}>
              {link.name}
              {isActive(link.path) && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full"></span>}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin-orders" className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-lg border border-orange-200 flex items-center gap-1 hover:bg-orange-600 hover:text-white transition-all shadow-sm">
              Dashboard <span className="animate-pulse">🔔</span>
            </Link>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center space-x-4">
          <motion.div animate={isFlying ? { scale: [1, 1.2, 1], 
  rotate: [0, -20, 20, -20, 20, 0] } : {}}>
           {/* PANIER ICON MA3A L-BADGE M9AD */}
<Link to="/panier" className="relative p-2 text-gray-800 hover:text-orange-600 transition-colors">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
  
  {/* HAD L-SPAN HUWA LI KHASSO Y-T-BEDDEL BACH L-0 Y-HBAT */}
  <span className="absolute top-4 right-0 bg-orange-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm transform translate-x-1 -translate-y-1">
    {cartCount}
  </span>
</Link>
          </motion.div>

       {/* DESKTOP ACTIONS - FIXING THE ERROR ✅ */}
<div className="hidden lg:flex items-center space-x-3">
  {userEmail ? (
    <>
      <span className="text-sm font-black uppercase italic text-blach-700">
        {navUserLabel}
      </span>
      <button 
        onClick={handleLogout} 
        className="bg-orange-600 text-white px-5 py-2.5 rounded-xl font-black uppercase italic text-[12px] tracking-widest hover:bg-black transition-all"
      >
        Déconnexion
      </button>
    </>
  ) : (
    /* HADOU HUMA LI KHASS-HOM L-FRAGMENT BACH L-ERROR I-MCHI */
    <>
  {/* 1. S'inscrire t-welli hiya l-lowla o f l-noir */}
  <Link 
    to="/register" 
    className="text-black px-4 py-2 font-black uppercase italic text-[11px] tracking-widest hover:text-orange-600 transition-all"
  >
    S'inscrire
  </Link>
  
  {/* 2. Connexion t-welli bouton orange o k-at-welli k7ela f l-hover */}
  <Link 
    to="/login" 
    className="bg-orange-600 text-white px-8 py-2.5 rounded-full font-black uppercase italic text-[11px] tracking-widest shadow-lg shadow-orange-500/30 hover:bg-black hover:text-white transition-all duration-300"
  >
    Connexion
  </Link>
</>
  )}
</div>

          {/* BURGER BUTTON (WELLI X NICHEN) ✅ */}
          <button className="lg:hidden z-[3000] p-2 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-8 flex flex-col items-end justify-center space-y-1.5">
              <span className={`h-1 bg-gray-900 rounded-full transition-all duration-300 ${isOpen ? 'w-8 rotate-45 translate-y-2.5' : 'w-8'}`} />
              <span className={`h-1 bg-gray-900 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-6'}`} />
              <span className={`h-1 bg-gray-900 rounded-full transition-all duration-300 ${isOpen ? 'w-8 -rotate-45 -translate-y-2.5' : 'w-4'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU - SIDEBAR DESIGN */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[2400] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[2500] flex flex-col p-8 lg:hidden shadow-2xl"
            >
              {/* Header "BIENVENUE" */}
              {userEmail && (
                <div className="mt-16 p-5 bg-orange-50 rounded-3xl border border-orange-100 flex flex-col">
                  <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-1 italic">Bienvenue,</span>
                  <p className="text-xl font-black text-gray-900 uppercase italic leading-none truncate">
                    {navUserLabel}
                  </p>
                </div>
              )}
{/* Navigation Links - Glass Design ✅ */}
<div className="flex flex-col space-y-4 mt-10">
  {menuLinks.map((link) => (
    <Link 
      key={link.path} 
      to={link.path} 
      onClick={() => setIsOpen(false)} 
      className={`relative group flex items-center justify-between p-5 rounded-2xl font-black uppercase italic tracking-tighter transition-all duration-300 ${
        isActive(link.path) 
          ? 'bg-orange-500 text-white shadow-xl shadow-orange-200 -translate-y-1' 
          : 'bg-white/40 backdrop-blur-md border border-gray/20 text-gray-900 hover:bg-orange-50 hover:translate-x-2'
      }`}
    >
      <span className="z-10">{link.name}</span>
      {isActive(link.path) && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </Link>
  ))}

  {/* --- 2. DASHBOARD (T-zad hna bach i-koun dima te7t Contact) --- */}
  {userEmail && isAdmin && (
     <Link
     to="/admin-orders" 
     onClick={() => setIsOpen(false)} // Bach dghya i-tsedd l-menu mlli t-cliquie
     className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 border shadow-sm active:scale-95 ${ 
       isActive('/admin-orders')
         ? 'bg-orange-500 border-orange-600 shadow-xl shadow-orange-200 -translate-y-1' // Active: Orange sghoun
         : 'bg-orange-100 border-orange-200 hover:bg-orange-200' // Normal: Orange bahet
      }`}>
     {/* Had l-text houwa DASHBOARD */}
     <span className={`font-black uppercase italic tracking-tighter px-8 py-1.5 rounded-lg border flex items-center gap-1 transition-all shadow-sm ${ 
       isActive('/admin-orders')
          ? 'bg-white text-orange-600 border-white' // Fach k-tkoni fih: Ktaba f byed
          : 'bg-orange-100 text-orange-600 font-black uppercase italic tracking-tighter px-8 py-1.5 rounded-lg border border-orange-200 flex items-center gap-1 hover:bg-orange-600 hover:text-white transition-all shadow-sm'
      }`}>
        Dashboard
      </span>
      {/* Hadik l-cloche (Bell) */}
      <span className={isActive('/admin-orders') ? 'animate-bounce' : 'animate-pulse'}>🔔</span> 
     {/* Glow effect - k-i-ban ghir fach t-koni fih */} 
     {isActive('/admin-orders') && (
        <div className="absolute inset-0 rounded-2xl bg-white/20 blur-md"></div>
      )}
   </Link>
  )}
</div>

{/* --- 3. Bottom Actions (Déconnexion bohdiha l-te7t) --- */}
<div className="mt-auto space-y-4 pb-8">
  {userEmail && (
    <div className="pt-6 border-t border-gray-100"> 
      <button 
        onClick={handleLogout} 
        className="w-full bg-orange-600 text-white p-5 rounded-2xl font-black uppercase italic tracking-widest text-[12px] shadow-lg active:scale-95 transition-all duration-300 hover:bg-black"
      >
        DÉCONNEXION
      </button>
    </div>
  )}

  {!userEmail && (
    <div className="space-y-4">
      <Link to="/login" className="block w-full bg-orange-500 text-white p-5 rounded-2xl font-black uppercase text-center italic text-[13px] tracking-widest shadow-lg hover:bg-orange-600 transition-all active:scale-95">
        CONNEXION
      </Link>
      <Link to="/register" className="block w-full bg-gray-50/80 backdrop-blur-sm text-orange-600 p-5 rounded-2xl font-black uppercase text-center italic text-[13px] tracking-widest border border-orange-100 hover:bg-orange-50 transition-all active:scale-95">
        S'INSCRIRE
      </Link>
    </div>
  )}
</div>

{/* Action Buttons - Modern Style */}

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};



// --- LAYOUT ---
const PageLayout = ({ children, title, isHome = false }) => (
  <div className="relative min-h-screen">
    <div className={`${isHome ? 'absolute' : 'fixed'} inset-0 z-0 h-[80vh] md:h-screen`}>
      <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070" className="w-full h-full object-cover" alt="bg" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]"></div>
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      {title && (
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase drop-shadow-2xl">{title}</h2>
          <div className="h-1.5 w-20 bg-orange-600 mx-auto mt-4 rounded-full"></div>
        </div>
      )}
      {children}
    </div>
  </div>
);

// --- REGISTER ---

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Erreur t-t-reinitia 
    
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register/', {
        username: formData.email, // Ghaliban Django kiy-bghi username, ghadi n-khalliw l-email hna
        email: formData.email,
        password: formData.password,
        first_name: formData.name
      });

      // DAROURI: N-7etto 'email' bach l-Navbar t-qraha o t-tla3 s-smiya
      localStorage.setItem('email', formData.email);
      localStorage.setItem('username', res.data.username || formData.name);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);

      // Redirect l-Accueil
      window.location.href = "/";
    } catch (err) {
      console.error("Erreur Backend:", err.response?.data);
      // Ila l-backend sift detail dyal l-khata'
      setError(err.response?.data?.error || err.response?.data?.detail || "Erreur d'inscription");
    }
  };

  return (
    <PageLayout title="Inscription">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-2xl p-12 rounded-[3.5rem] border border-white/20 shadow-2xl mt-10">
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 p-4 rounded-2xl">
            <p className="text-red-400 text-center font-bold text-sm italic">{error}</p>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <input 
              type="text" 
              placeholder="VOTRE NOM" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-gray-400 focus:border-orange-600 outline-none transition" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          <div>
            <input 
              type="email" 
              placeholder="VOTRE E-MAIL" 
              required 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-bold placeholder:text-gray-400 focus:border-orange-600 outline-none transition" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
            />
          </div>

          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="MOT DE PASSE" 
              required 
              autoComplete="new-password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-12 text-white font-bold placeholder:text-gray-400 focus:border-orange-600 outline-none transition" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition shadow-lg shadow-orange-600/20 active:scale-95"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </PageLayout>
  );
};



// --- LOGIN ---
const Login = () => {
  // 1. Beddelna 'username' b 'email' bach t-ji nqiya m3a l-fekra dyalk
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sifto l-formData l-Django
      const res = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      
      // 🏆 Aham 7aja: Khass n-khzno l-Email bach l-Navbar t-عرف l-admin
      localStorage.setItem('email', formData.email); 
      
      localStorage.setItem('username', res.data.username || "User");
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      
      window.location.href = "/";
    } catch (err) {
      setError("❌ Email ou mot de passe incorrect.");
    }
  };

  return (
    <PageLayout title="Connexion">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 p-12 rounded-[3.5rem]">
        {error && <p className="mb-6 text-red-400 text-center font-bold text-sm bg-red-400/10 py-2 rounded-xl">{error}</p>}
        
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Input dial l-Email */}
          <input 
            type="email" 
            placeholder="Votre E-mail" 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-orange-600 transition font-bold" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          
          {/* Input dial l-Password */}
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="MOT DE PASSE" 
              required 
              autoComplete="current-password"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-12 text-white outline-none focus:border-orange-600 transition font-bold placeholder:text-gray-400" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition shadow-lg"
          >
            Se Connecter
          </button>
        </form>
      </div>
    </PageLayout>
  );
};


// --- ABOUT (Zdna fih l-ktaba) ---
const About = () => (
  <PageLayout title="Notre Passion">
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-12 rounded-[3.5rem] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <svg width="200" height="200" fill="white" viewBox="0 0 512 512"><path d="M416 0c-35.3 0-64 28.7-64 64V288c0 17.7 14.3 32 32 32h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V32C480 14.3 465.7 0 448 0H416z"/></svg>
        </div>
        
        <h3 className="text-4xl font-black text-orange-600 italic mb-8 uppercase tracking-tighter text-center">Plus Qu'un Simple Restaurant</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-white text-lg leading-relaxed font-medium italic opacity-95">
            <p>
              Depuis notre ouverture en **2026**, FastDélice s'est imposé comme une référence incontournable de la gastronomie rapide au Maroc. Notre concept est né d'une idée simple : allier la rapidité du service à l'exigence de la haute cuisine.
            </p>
            <p>
              Chaque ingrédient est sélectionné avec le plus grand soin auprès de nos producteurs locaux. Nos légumes sont cueillis le matin même et nos viandes sont garanties 100% fraîches.
            </p>
            <p className="border-l-4 border-orange-600 pl-6 py-2 bg-orange-600/10 rounded-r-xl">
              "La qualité n'est pas un luxe, c'est notre engagement quotidien envers chaque client qui franchit notre porte."
            </p>
          </div>
          
          <div className="space-y-6 text-white text-lg leading-relaxed font-medium italic opacity-95">
            <p>
              Notre secret réside dans notre pâte à pizza artisanale, pétrie à la main et reposée durant 48 heures pour garantir une légèreté et un croustillant incomparables.
            </p>
            <p>
              L'équipe FastDélice, c'est avant tout une famille de passionnés, des chefs aux livreurs, tous unis pour vous offrir une expérience mémorable, que ce soit sur place dans notre ambiance feutrée ou chez vous.
            </p>
            <div className="pt-6 flex gap-10">
               <div><p className="text-4xl font-black text-orange-600">15+</p><p className="text-xs uppercase font-bold tracking-widest">Spécialités</p></div>
               <div><p className="text-4xl font-black text-orange-600">10k</p><p className="text-xs uppercase font-bold tracking-widest">Clients Heureux</p></div>
               <div><p className="text-4xl font-black text-orange-600">30min</p><p className="text-xs uppercase font-bold tracking-widest">Livraison Max</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

// --- CONTACT ---
 
 const Contact = () => {
   // Kan-akhdo l-m3loumat l-m-khazzna
   const savedUsername = localStorage.getItem('username') || "Client Anonyme";
   const savedEmail = localStorage.getItem('email') || "no-email@fastdelice.com";
 
  const [formData, setFormData] = useState({
    name: savedUsername,
    email: savedEmail,
    subject: '',
    message: ''
  });
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await axios.post('http://127.0.0.1:8000/api/contactmessages/', formData);
       
       Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Merci pour votre message. ✨',
        showConfirmButton: false,
        timer: 3000,
        background: '#ffffff',
        conColor: '#f97316',
        customClass: {
          popup: 'rounded-xl shadow-sm border border-gray-100'
        }
      });
       setFormData({ ...formData, subject: '', message: '' });
     } catch (err) {
       Swal.fire('Erreur', "Problème d'envoi.", 'error');
     }
   };
 
   return (
    <PageLayout title="Contactez-Nous">
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
      
      {/* --- COORDONNÉES (Dima banyin) --- */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl group-hover:bg-orange-600/40 transition-all duration-700"></div>
        <div className="relative z-10">
          <h3 className="text-4xl font-black text-orange-600 italic mb-6 uppercase leading-[0.9] tracking-tighter">
            Votre avis <br/> 
            <span className="text-white whitespace-nowrap">est notre secret !</span>
          </h3>
          <p className="text-gray-300 text-sm font-medium italic mb-10 leading-relaxed max-w-[250px]">
            Partagez votre expérience avec nous. Chaque commentaire nous aide à rendre <span className="text-orange-500 font-bold">FastDélice</span> encore plus savoureux pour vous.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group/item">
              <div className="bg-orange-600/20 p-3 rounded-2xl group-hover/item:bg-orange-600 transition-colors">
                <span className="text-lg">📍</span>
              </div>
              <p className="text-white font-bold italic text-sm tracking-wide">123 Boulevard Gourmand, Casablanca</p>
            </div>
            <div className="flex items-center gap-4 group/item">
              <div className="bg-orange-600/20 p-3 rounded-2xl group-hover/item:bg-orange-600 transition-colors">
                <span className="text-lg">📞</span>
              </div>
              <p className="text-white font-bold italic text-sm tracking-wide">+212 522 12 34 56</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.5em]">Stay Hungry, Stay Fast</p>
          </div>
        </div>
      </div>
  
      {/* --- FORMULAIRE (K-i-ban ghir mlli i-koun m-connecté) --- */}
      {!localStorage.getItem('username') ? (
        /* ILA MA-M-CONNECTÉCH: Tl3i lih had l-box */
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 bg-orange-600/20 rounded-full flex items-center justify-center shadow-inner">
            <span className="text-4xl italic">🔒</span>
          </div>
          <div>
            <h4 className="text-white font-black uppercase italic text-xl">Connexion Requise</h4>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2 leading-relaxed">
              Connectez-vous pour partager <br/> votre avis avec nous
            </p>
          </div>
          <button 
            onClick={() => window.location.href='/login'}
            className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-lg shadow-orange-600/20"
          >
            Se Connecter
          </button>
        </div>
      ) : (
        /* ILA M-CONNECTÉ: Tl3i l-form dyalk */
        <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] space-y-6">
          <input type="hidden" value={formData.name} />
          <input type="hidden" value={formData.email} />
  
          <div className="relative mb-10 text-center">
            <div className="inline-flex items-center justify-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-3xl shadow-2xl">
              <span className="text-2xl">💬</span>
              <div className="text-left">
              <h4 className="text-white font-black uppercase italic tracking-wider text-lg leading-none">
                 Salut, {localStorage.getItem('username')?.split('@')[0]} !
              </h4>
                <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Votre avis compte</p>
              </div>
            </div>
          </div>
  
          <input
            type="text"
            placeholder="OBJET..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-xs font-bold outline-none focus:border-orange-600 transition ring-1 ring-white/5 placeholder:text-gray-500"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />

          <textarea 
            placeholder="VOTRE MESSAGE ICI..." 
            rows="6" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-xs font-bold outline-none focus:border-orange-600 transition ring-1 ring-white/5 placeholder:text-gray-500"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          ></textarea>
  
          <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition shadow-lg">
            Envoyer
          </button>
        </form>
      )}
  
    </div>
  </PageLayout>
   );
 };
 

// --- HOME ---
const Home = ({ testimonials, handleDeleteQuick, setTestimonials }) => {
  const userName = localStorage.getItem('userName'); 
  const userEmail = localStorage.getItem('userEmail') || localStorage.getItem('email');
  useEffect(() => {
    const refreshData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/contactmessages/');
        const approvedOnes = res.data.filter(msg => msg.is_testimonial === true);
        
        // Hna k-n-updatiw l-state dial App.js men west Home!
        setTestimonials(approvedOnes); 
      } catch (err) {
        console.log("Erreur refresh:", err);
      }
    };

    refreshData();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070" className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tighter italic">Fast<span className="text-orange-600">Délice</span></h1>
          <p className="text-xl text-white mb-12 font-black italic opacity-90">"La passion du goût, l'élégance du service."</p>
          <Link to="/menu" className="bg-orange-600 text-white px-14 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:bg-white hover:text-orange-600 transition shadow-2xl inline-block">Commander Maintenant</Link>
        </div>
      </div>
      {/* --- SECTION: AVIS CLIENTS --- */}
<div className="bg-white py-24 px-6">
  
  {/* Hadou homa l-titles li bghiti t-zidi l-fo9 */}
  <div className="container mx-auto text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-black italic uppercase text-black tracking-tighter">
      Avis de nos <span className="text-orange-600">Clients</span>
    </h2>
    <div className="w-24 h-1.5 bg-orange-600 mx-auto mt-4 rounded-full"></div>
    <p className="text-gray-400 font-bold mt-4 uppercase tracking-[0.3em] text-[10px]">
      Ce que disent les gourmets de FastDélice
    </p>
  </div>

  {/* L-Grid dial l-avis (Dynamic) */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {testimonials.length > 0 ? (
      testimonials.slice(0, 3).map((v, i) => (
        <div key={i} className="relative bg-gray-50 p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
{((userEmail?.toLowerCase().trim() === 'admin@fastdelice.com') || 
  (userName?.toLowerCase().trim() === 'admin@fastdelice.com') ||
  (localStorage.getItem('userEmail')?.toLowerCase().trim() === 'admin@fastdelice.com')) && (
  <button
    onClick={() => handleDeleteQuick(v.id)}
    className="absolute top-6 right-6 bg-red-500 text-white w-9 h-9 rounded-full shadow-xl flex items-center justify-center z-50 hover:bg-red-700 transition-all active:scale-90"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
)}
          {/* Njoum */}
          <div className="text-orange-500 mb-6 text-sm flex gap-1">
             {"★".repeat(Number(v.rating) || 5)}
          </div>

          {/* Message */}
          <p className="text-gray-700 italic font-bold mb-8 text-lg leading-relaxed flex-1">
            "{v.message || v.content || "Excellente expérience !"}"
          </p>

          {/* Smiya */}
          <div className="mt-auto pt-6 border-t border-gray-200/50">
            <span className="text-[11px] font-black text-orange-600 uppercase tracking-widest">
              — {v.name || "Client Anonyme"}
            </span>
          </div>
        </div>
      ))
    ) : (
      /* Ila l-backend mazal ma-sift d-data */
      <div className="col-span-3 text-center py-10">
        <div className="animate-pulse text-gray-300 font-black italic">CHARGEMENT DES AVIS...</div>
      </div>
    )}
  </div>
</div>
      <footer className="bg-gray-50 py-8 border-t border-gray-100 text-center">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">© 2026 FAST DÉLICE. TOUS DROITS RÉSERVÉS.</p>
      </footer>
    </div>
  );
};

// --- MENU ---
const Menu = ({ categories, addToCart }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tout");

  const allDishes = categories.flatMap(c => (c.dishes || []).map(dish => ({ ...dish, categoryName: c.name })));
  
  const filteredDishes = allDishes.filter(item => 
    (activeCategory === "Tout" || item.categoryName === activeCategory) && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 

  return (
    <PageLayout title="Menu">
      {/* 🔍 RECHERCHE - Responsive width */}
      <div className="max-w-md mx-auto mb-8 px-4">
        <input 
          type="text" 
          placeholder="RECHERCHER UN PLAT..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-4 md:py-5 px-10 text-white text-center font-black uppercase text-[10px] md:text-xs outline-none focus:border-orange-600 transition" 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* 📁 CATEGORIES - Scroll horizontal f mobile bach ma-i-tkhreb9och */}
      <div className="flex overflow-x-auto md:flex-wrap md:justify-center gap-3 mb-12 pb-4 no-scrollbar px-4">
        <button 
          onClick={() => setActiveCategory("Tout")} 
          className={`whitespace-nowrap px-8 py-3 rounded-full font-black uppercase text-[11px] transition-all ${activeCategory === "Tout" ? "bg-orange-600 text-white shadow-lg" : "text-white/50 border border-white/10 hover:border-white/30"}`}
        >
          Tout
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.name)} 
            className={`whitespace-nowrap px-8 py-3 rounded-full font-black uppercase text-[11px] transition-all ${activeCategory === cat.name ? "bg-orange-600 text-white shadow-lg" : "text-white/50 border border-white/10 hover:border-white/30"}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 🍕 GRID DES PLATS - 1 col mobile, 2 tablet, 3 PC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 px-4">
        {filteredDishes.map(item => (
          <div key={item.id} className="bg-black/40 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 text-center group transition hover:border-orange-600/50">
            <div className="h-48 md:h-64 overflow-hidden rounded-2xl mb-6">
              <img 
                src={item.image || "https://via.placeholder.com/300"} 
                alt={item.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
              />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white italic mb-2 uppercase tracking-tighter">{item.name}</h3>
            <p className="text-orange-500 font-black text-xl md:text-2xl mb-6">{item.price} DH</p>
            <button 
              onClick={() => setSelectedItem(item)} 
              className="w-full py-4 bg-white rounded-2xl font-black uppercase text-[10px] hover:bg-orange-600 hover:text-white transition active:scale-95"
            >
              Commander
            </button>
          </div>
        ))}
      </div>

      {/* 🛒 MODAL CHOIX MODE - Responsive & Centered */}
      {selectedItem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 max-w-sm w-full text-center shadow-2xl"
          >
            <h3 className="text-xl md:text-2xl font-black mb-6 italic uppercase text-gray-900">Choisir le Mode</h3>
            <div className="space-y-4">
                <button 
                    onClick={() => { addToCart({...selectedItem, type: 'Sur Place'}); setSelectedItem(null); }} 
                    className="w-full py-4 bg-gray-100 rounded-2xl font-black uppercase text-[11px] hover:bg-orange-600 hover:text-white transition flex items-center justify-center gap-2"
                >
                    <span className="text-lg">🍽️</span> Sur Place
                </button>
                <button 
                    onClick={() => { addToCart({...selectedItem, type: 'À Emporter'}); setSelectedItem(null); }} 
                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase text-[11px] hover:bg-orange-600 transition flex items-center justify-center gap-2"
                >
                    <span className="text-lg">🛍️</span> À Emporter
                </button>
            </div>
            <button 
              onClick={() => setSelectedItem(null)} 
              className="mt-6 text-gray-400 font-bold text-[11px] uppercase hover:text-red-500 transition tracking-widest"
            >
              ← Retour au menu
            </button>
          </motion.div>
        </div>
      )}
    </PageLayout>
  );
};
// --- PANIER ---
const Panier = ({ cart, updateQuantity, removeFromCart, validateOrder, orderType }) => (
  <PageLayout title="Panier">
    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[3.5rem] text-white font-bold italic relative">
      {orderType && (
        <div className="absolute top-0 right-0 bg-orange-600 px-6 py-2 rounded-bl-[2rem] text-xs uppercase tracking-tighter not-italic z-10">
          Mode: {orderType}
        </div>
      )}
      {cart.length === 0 ? (
        <p className="text-center opacity-60 uppercase tracking-widest">Votre panier est vide.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-white/10 py-6">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl border border-white/10 shadow-lg" />
              <div className="flex-1">
                <p className="uppercase text-lg leading-tight">{item.name} <span className="text-orange-500 text-[10px] block md:inline md:ml-2">({item.type})</span></p>
                <p className="text-orange-500 font-black mt-1">{item.price} DH</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-2 border border-white/10">
                <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-orange-600 rounded-xl transition"> - </button>
                <span className="text-white font-black text-lg w-4 text-center">{item.quantity || 1}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-orange-600 rounded-xl transition"> + </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="ml-2 text-white/20 hover:text-red-500 transition text-xl">🗑️</button>
            </div>
          ))}
          <div className="text-3xl font-black pt-8 flex justify-between uppercase italic border-t-2 border-orange-600/30">
            <span>Total:</span>
            <span className="text-orange-600">{cart.reduce((a, b) => a + (parseFloat(b.price) * (b.quantity || 1)), 0)} DH</span>
          </div>
          <button onClick={validateOrder} className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition shadow-xl mt-6">Valider la commande</button>
        </div>
      )}
    </div>
  </PageLayout>
);
// --- ADMIN ORDERS DASHBOARD ---

const AdminOrders = ({setTestimonials}) => {
  const [orders, setOrders] = useState([]);
  const [lastCount, setLastCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isOrdersOpen, setIsOrdersOpen] = useState(false); // Zdna hadi
  const [isMessagesOpen, setIsMessagesOpen] = useState(false); // O hadi
  const [messages, setMessages] = useState([]);
  


  const [newDish, setNewDish] = useState({
    name: '', price: '', description: '', category: '', image: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const ordRes = await axios.get('http://127.0.0.1:8000/api/orders/').catch(() => ({ data: [] }));
      const catRes = await axios.get('http://127.0.0.1:8000/api/categories/').catch(() => ({ data: [] }));
      const dishRes = await axios.get('http://127.0.0.1:8000/api/dishes/').catch(() => ({ data: [] }));
      const msgRes = await axios.get('http://127.0.0.1:8000/api/contactmessages/').catch(() => ({ data: [] }));
      
      setOrders(ordRes.data);
      setCategories(catRes.data);
      setAllDishes(dishRes.data);
      setContactMessages(msgRes.data);

      if (ordRes.data.length > lastCount && lastCount !== 0) {
        new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
      }
      setLastCount(ordRes.data.length);
    } catch (e) { console.log("Erreur:", e); }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [lastCount]);

  const handleDeleteCategory = async (id) => {
    const result = await Swal.fire({
      title: 'Supprimer la catégorie ?',
      icon: 'warning',
      iconColor: '#ea580c',
      showCancelButton: true,
      confirmButtonText: 'CONFIRMER',
      cancelButtonText: 'ANNULER', // Hna beddeltaha b kelma d9i9a ktar
      reverseButtons: true,      // Bach Annuler t-ji f l-isser o Confirm f l-limen
      
      background: '#ffffff', 
      color: '#1f2937',      
      backdrop: `rgba(255,255,255,0.4) blur(10px)`, 
      
      buttonsStyling: false, 
      customClass: {
        popup: 'rounded-[3rem] border border-gray-100 shadow-2xl',
        title: 'font-black italic text-xl tracking-tighter text-gray-800 pt-6',
        htmlContainer: 'text-gray-500 font-medium pb-4',
        
        // --- HNA L-SIRR: Ghadi n-9lbo l-ordre dyal l-boutonat ---
        actions: 'flex flex-row-reverse justify-center gap-4 w-full', 
        
        confirmButton: 'bg-[#ea580c] text-white px-10 py-3 rounded-2xl font-bold uppercase italic hover:scale-105 transition-all shadow-lg shadow-orange-500/30',
        cancelButton: 'bg-gray-100 text-gray-400 px-10 py-3 rounded-2xl font-bold uppercase italic hover:bg-gray-200 transition-all'
      }
    })
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/categories/${id}/`);
        setCategories(categories.filter(c => c.id !== id));
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Catégorie Supprimée ! 🗑️',
          showConfirmButton: false,
          timer: 3000,
          background: '#ffffff',
          conColor: '#f97316',
          customClass: {
            popup: 'rounded-xl shadow-sm border border-gray-100'
          }
        });
      } catch (e) { Swal.fire('Erreur', 'Impossible.', 'error'); }
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName) return Swal.fire({
      title: 'Attention',
      text: 'Veuillez donner un nom à votre catégorie.',
      icon: 'warning', // هادي هي اللي كتدير الدائرة وسطها "!"
      confirmButtonText: 'OK',
      confirmButtonColor: '#ea580c', // لون أورنج (Orange 600 بحال Tailwind)
      background: '#ffffff',
      customClass: {
        popup: 'rounded-[2rem] shadow-2xl border border-gray-100', // باش تجي مدورة بحال لي كارد ديالك
        confirmButton: 'px-10 py-2 rounded-full font-bold uppercase tracking-widest' // ستايل البوتون
      }
    });
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/categories/', { name: newCategoryName });
      setCategories([...categories, res.data]); 
      setNewCategoryName(""); 
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Catégorie ajoutée.✨',
        showConfirmButton: false,
        timer: 3000,
        background: '#ffffff',
        conColor: '#f97316',
        customClass: {
          popup: 'rounded-xl shadow-sm border border-gray-100'
        }
      });
    } catch (e) { Swal.fire('Erreur', "Impossible d'ajouter.", 'error'); }
  };

  const handleSubmitDish = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token') || localStorage.getItem('token') || localStorage.getItem('access');
    if (!token) return Swal.fire('Oups !', 'Veuillez vous reconnecter (Session vide).', 'error');

    const formData = new FormData();
    formData.append('name', newDish.name);
    formData.append('price', newDish.price);
    formData.append('description', newDish.description || "");
    formData.append('category', newDish.category); 
    if (newDish.image && newDish.image instanceof File) formData.append('image', newDish.image);

    try {
      const url = isEditing ? `http://127.0.0.1:8000/api/dishes/${editId}/` : 'http://127.0.0.1:8000/api/dishes/';
      await axios({
        method: isEditing ? 'put' : 'post',
        url: url,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
      });
      setNewDish({ name: '', price: '', description: '', category: '', image: null });
      setIsEditing(false);
      fetchData(); 
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Plat ajouté avec succès.✨',
        showConfirmButton: false,
        timer: 3000,
        background: '#ffffff',
        conColor: '#f97316',
        customClass: {
          popup: 'rounded-xl shadow-sm border border-gray-100'
        }
      });
    } catch (error) {
      const errorMsg = error.response?.status === 401 ? "Session expirée." : "Champs invalides.";
      Swal.fire('Erreur', errorMsg, 'error');
    }
    // 1. Khwi l-state (ila ma-dertihach)
    setNewDish({ name: '', price: '', category: '', description: '', image: null });

    // ✅ 2. Khwi l-input dial t-swira nichen men l-ecran
    const fileInput = document.getElementById('dishImage');
    if (fileInput) {
      fileInput.value = ""; // Had s-star houwa li k-i-mse7 "Delicious Pizza.jpg"
    }
  };

  const handleEditClick = (dish) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsEditing(true);
    setEditId(dish.id);
    setNewDish({ name: dish.name, price: dish.price, description: dish.description, category: dish.category, image: null });
    setIsMenuOpen(true);
  };

  const handleDeleteDish = async (dish) => {
    const result = await Swal.fire({
      title: 'Supprimer ce plat ?',
      text: `Voulez-vous vraiment retirer "${dish.name}" de votre Menu ?`, 
      icon: 'warning',
      iconColor: '#ea580c',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Non, garder',
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#000000',
      showCancelButton: true,
      reverseButtons: true,      // Bach Annuler t-ji f l-isser o Confirm f l-limen
      background: '#ffffff', 
      color: '#1f2937',      
      backdrop: `rgba(255,255,255,0.4) blur(10px)`, 
      buttonsStyling: false, 
      customClass: {
        popup: 'rounded-[3rem] border border-gray-100 shadow-2xl',
        title: 'font-black italic text-xl tracking-tighter text-gray-800 pt-6',
        htmlContainer: 'text-gray-500 font-medium pb-4',
        actions: 'flex flex-row-reverse justify-center gap-4 w-full', 
        confirmButton: 'bg-[#ea580c] text-white px-10 py-3 rounded-2xl font-bold uppercase italic hover:scale-105 transition-all shadow-lg shadow-orange-500/30',
        cancelButton: 'bg-gray-200 text-gray-600 px-10 py-3 rounded-2xl font-bold uppercase italic hover:bg-gray-300 transition-all'
      }
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/dishes/${dish.id}/`);
        setAllDishes(prevDishes => prevDishes.filter(d => d.id !== dish.id));
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Plat supprimé ! 🗑️',
          showConfirmButton: false,
          timer: 3000,
          background: '#ffffff',
          customClass: {
            popup: 'rounded-xl shadow-sm border border-gray-100'
          }
        });
      } catch (e) { Swal.fire({ title: 'Erreur', icon: 'error', confirmButtonColor: '#ea580c' }); }
    }
  };

  const handleDone = async (orderId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/orders/${orderId}/`);
      setOrders(orders.filter(order => order.id !== orderId));
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Prêt. ✨ ',
        showConfirmButton: false,
        timer: 3000,
        background: '#ffffff',
        color: '#ea580c',
        customClass: {
          popup: 'rounded-xl shadow-md border border-gray-50'
        }
      });
    } catch (e) { console.error(e); }
  };
  const handleDeleteMessage = (id) => {
    Swal.fire({
      // --- Message Classy o Shrt ---
      title: 'SUPPRIMER CE MESSAGE ?',
      text: "Ce message sera définitivement retiré de votre liste.",
      icon: 'warning',
      iconColor: '#ea580c',
      showCancelButton: true,
      confirmButtonText: 'CONFIRMER',
      cancelButtonText: 'ANNULER',
      
      // --- DESIGN BYAD O N9I (Light Mode) ---
      background: '#ffffff', // Background byad kima bghiti
      color: '#1f2937',      // Ktiba f l-k7el bach t-ban wad7a
      backdrop: `rgba(255,255,255,0.4) blur(10px)`, // Dbaba byda f l-background
      
      buttonsStyling: false, // Bach n-gaddo l-boutonat b-id-na
      customClass: {
        popup: 'rounded-[2rem] border border-gray-100 shadow-2xl',
        title: 'font-black italic text-xl tracking-tighter text-gray-800 pt-6',
        htmlContainer: 'text-gray-500 font-medium',
        confirmButton: 'bg-[#ea580c] text-white px-10 py-3 rounded-xl font-bold uppercase italic mx-2 hover:scale-105 transition-all shadow-lg shadow-orange-500/30',
        cancelButton: 'bg-gray-200 text-gray-600 px-10 py-3 rounded-xl font-bold uppercase italic mx-2 hover:bg-gray-300 transition-all'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // T-7eqqi men l-URL l-correct
          const response = await fetch(`http://127.0.0.1:8000/api/contactmessages/${id}/`, {
            method: 'DELETE',
          });
  
          if (response.ok) {
            setContactMessages(contactMessages.filter(msg => msg.id !== id));
            
            // Toast s-ghira byda o n9ia
            Swal.fire({
              toast: true,
              position: 'top-end',
              icon: 'success',
              title: 'Mis à jour avec succès',
              showConfirmButton: false,
              timer: 3000,
              background: '#ffffff',
              color: '#ea580c',
              customClass: {
                popup: 'rounded-xl shadow-md border border-gray-50'
              }
            });
          }
        } catch (error) {
          console.error("Erreur API:", error);
        }
      }
    });
  };
  const handleApprove = async (message) => {
    // 1. Confirmation l-oula
    const result = await Swal.fire({
      title: 'Êtes-vous sûre ?',
      text: "Voulez-vous vraiment afficher cet avis sur l'accueil ?",
      icon: 'question',
      iconColor: '#ea580c',
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, afficher !',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      reverseButtons: true,      
      background: '#ffffff', 
      color: '#1f2937',      
      backdrop: `rgba(255,255,255,0.4) blur(10px)`, 
      
      buttonsStyling: false, 
      customClass: {
        popup: 'rounded-[3rem] border border-gray-100 shadow-2xl',
        title: 'font-black italic text-xl tracking-tighter text-gray-800 pt-6',
        htmlContainer: 'text-gray-500 font-medium pb-4',
        
        // --- HNA L-SIRR: Ghadi n-9lbo l-ordre dyal l-boutonat ---
        actions: 'flex flex-row-reverse justify-center gap-4 w-full', 
        
        confirmButton: 'bg-[#ea580c] text-white px-10 py-3 rounded-2xl font-bold uppercase italic hover:scale-105 transition-all shadow-lg shadow-orange-500/30',
        cancelButton: 'bg-gray-200 text-gray-600 px-10 py-3 rounded-2xl font-bold uppercase italic hover:bg-gray-300 transition-all'
      }
    });
  
    // 2. Ila derti "Oui"
    if (result.isConfirmed) {
      try {
        // a. Sifet l Django
        await axios.patch(`http://127.0.0.1:8000/api/contactmessages/${message.id}/`, {
          is_testimonial: true
        });
  
        // b. Update React State (Bach i-ban f l-accueil bla refresh)
        setTestimonials(prev => [...prev, { ...message, is_testimonial: true }]);
        
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Avis affiché ! ✨',
          showConfirmButton: false,
          timer: 3000,
          background: '#ffffff',
          customClass: {
            popup: 'rounded-xl shadow-sm border border-gray-100'
          }
        });
        
  
      } catch (err) {
        console.error(err);
        Swal.fire('Erreur', "Impossible d'afficher l'avis.", 'error');
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- SECTION: GESTION DES CATÉGORIES --- */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm mb-6 border border-orange-100">
          <h2 className="text-xl font-black uppercase italic mb-4 text-orange-600 flex items-center gap-2">
            <span className="bg-orange-100 p-2 rounded-lg">📁</span> Gestion des Catégories
          </h2>
          <div className="flex gap-4 mb-6">
            <input type="text" placeholder="Ex : Tacos, Burgers..." className="flex-1 border-2 border-gray-100 p-3 rounded-xl focus:border-orange-500 outline-none" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
            <button onClick={handleAddCategory} className="bg-orange-500 text-white px-10 py-3 rounded-xl font-black uppercase text-xs hover:bg-orange-600 transition-all shadow-md">Ajouter +</button>
          </div>
          <div className="flex flex-wrap gap-2 border-t pt-4 border-gray-50">
            {categories.map(cat => (
              <div key={cat.id} className="bg-gray-100 px-4 py-2 rounded-full flex items-center gap-3 group hover:bg-red-50 transition">
                <span className="text-xs font-bold text-gray-600 group-hover:text-red-700">{cat.name}</span>
                <button onClick={() => handleDeleteCategory(cat.id)} className="text-gray-400 hover:text-red-600 font-black text-xs">✕</button>
              </div>
            ))}
          </div>
        </div>

        {/* --- SECTION 1: FORMULAIRE PLAT --- */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm mb-12 border border-orange-100">
          <h2 className="text-2xl font-black uppercase italic mb-6">{isEditing ? "📝 Modifier le Plat" : "➕ Nouveau Plat"}</h2>
          <form onSubmit={handleSubmitDish} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Nom du plat" className="border-2 p-4 rounded-xl border-gray-90 bg-gray-50/30" onChange={(e) => setNewDish({...newDish, name: e.target.value})} required value={newDish.name}/>
            <input type="number" placeholder="Prix (DH)" className="border-2 p-4 rounded-xl border-gray-90 bg-gray-50/30" onChange={(e) => setNewDish({...newDish, price: e.target.value})} required value={newDish.price}/>
            <select className="border-2 p-4 rounded-xl bg-white" onChange={(e) => setNewDish({...newDish, category: e.target.value})} required value={newDish.category}>
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <input 
  type="file" 
  id="dishImage" // ✅ Zidi had l-ID darouri
  className="p-3 text-xs border-2 border-dashed border-gray-200 rounded-xl bg-gray-50" 
  onChange={(e) => setNewDish({...newDish, image: e.target.files[0]})} 
/>
            <textarea placeholder="Description du plat..." className="col-span-1 md:col-span-2 border-2 p-4 rounded-xl bg-gray-50/30 h-24" onChange={(e) => setNewDish({...newDish, description: e.target.value})} value={newDish.description}></textarea>
            <button type="submit" className="col-span-full bg-orange-500 text-white font-black p-5 rounded-2xl hover:bg-orange-600 transition-all shadow-lg uppercase italic tracking-widest">
              {isEditing ? "Enregistrer les modifications" : "Ajouter au Menu"}
            </button>
          </form>
        </div>

        {/* --- SECTION 2: GÉRER LE MENU (ACCORDION) --- */}
        <div className="bg-white rounded-[2.5rem] shadow-sm mb-6 border border-gray-100 overflow-hidden">
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-8 cursor-pointer flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
            <h2 className="text-2xl font-black uppercase italic text-black flex items-center gap-3">
              <span className="bg-orange-100 p-2 rounded-lg text-lg flex items-center justify-center">🍴</span> Gérer le Menu actuel
            </h2>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>
               <span className="text-orange-600 font-bold">▼</span>
            </div>
          </div>
          {isMenuOpen && (
            <div className="p-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
              {allDishes.map(dish => (
                <div key={dish.id} className="group relative bg-white border-2 border-gray-50 p-6 rounded-[2rem] hover:border-orange-200 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Produit</span>
                      <h3 className="font-black text-gray-800 text-lg uppercase truncate italic">{dish.name}</h3>
                    </div>
                    <div className="bg-orange-50 px-4 py-1.5 rounded-full border border-orange-100">
                      <span className="text-orange-600 font-black text-sm">{dish.price} DH</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <button onClick={() => handleEditClick(dish)} className="flex-1 bg-black text-white py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all">✏️ MODIFIER</button>
                    <button onClick={() => handleDeleteDish(dish)} className="text-red-500 font-black hover:text-red-700 text-[11px] uppercase ml-4">✕ Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- SECTION 3: COMMANDES (MODIFIÉ: ACCORDION) --- */}
     
<div className="bg-white rounded-[2.5rem] shadow-sm mb-6 border border-gray-100 overflow-hidden">
  <div onClick={() => setIsOrdersOpen(!isOrdersOpen)} className="p-8 cursor-pointer flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
    <h2 className="text-2xl font-black uppercase italic text-black flex items-center gap-3">
      <span className="bg-orange-100 text-white p-2 rounded-lg text-lg flex items-center justify-center">🔔</span> Commandes
    </h2>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 transition-transform ${isOrdersOpen ? 'rotate-180' : ''}`}>
       <span className="text-orange-600 font-bold">▼</span>
    </div>
  </div>
  {isOrdersOpen && (
    <div className="p-8 pt-0 grid gap-6">
      {orders.length === 0 ? (
        /* NEFS D-DESIGN DIAL L-COMMANDES */
        <div className="py-12 flex flex-col items-center justify-center bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-[2.5rem]">
          <div className="text-4xl mb-4 opacity-20">🥡</div>
          <p className="text-gray-400 font-black uppercase italic tracking-[0.2em] text-xs">Aucune commande pour le moment</p>
          <p className="text-[10px] text-gray-300 font-bold mt-2 uppercase tracking-widest">Attente de nouveaux clients...</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-00 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                  <span className="bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full">#{order.id}</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{order.order_type}</span>
              </div>
              <h3 className="text-2xl font-black text-black uppercase italic">{order.full_name}</h3>
              <p className="text-gray-500 font-bold italic mt-2 bg-white p-4 rounded-xl border-l-4 border-orange-400">{order.items}</p>
            </div>
            <div className="text-right w-full md:w-auto">
              <p className="text-3xl font-black text-black whitespace-nowrap">{order.total_price} DH</p>
              <button onClick={() => handleDone(order.id)} className="mt-4 w-full bg-orange-600 text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase hover:bg-black transition shadow-lg">prêt ✅</button>
            </div>
          </div>
        ))
      )}
    </div>
  )}
</div>

{/* --- SECTION: MESSAGES CLIENTS (ACCORDION) --- */}
<div className="bg-white rounded-[2.5rem] shadow-sm mb-12 border border-gray-100 overflow-hidden">
  <div onClick={() => setIsMessagesOpen(!isMessagesOpen)} className="p-8 cursor-pointer flex justify-between items-center bg-white hover:bg-gray-50 transition-colors">
    <h2 className="text-2xl font-black uppercase italic text-black flex items-center gap-4">
      <span className="bg-orange-100 p-3 rounded-2xl text-xl flex items-center justify-center text-white">📩</span> Messages Clients
    </h2>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 transition-transform ${isMessagesOpen ? 'rotate-180' : ''}`}>
       <span className="text-orange-600 font-bold">▼</span>
    </div>
  </div>
  
  {isMessagesOpen && (
  <div className="p-8 pt-0">
    {/* 1. Condition: Ila kant l-list khawya */}
    {contactMessages.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
        <div className="text-4xl mb-4 opacity-20">📩</div>
        <p className="text-gray-400 italic font-medium">Aucun message pour le moment.</p>
      </div>
    ) : (
      /* 2. Ila kanu l-messages, dir l-grid dialk */
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactMessages.map((msg) => (
          <div 
            key={msg.id} 
            className="group relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[3.5rem] hover:bg-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden mb-8"
          >
            {/* ... l-code dial l-card dyalk kamel ... */}
            <div key={msg.id} className="group relative bg-white rounded-[2.5rem] p-7 shadow-xl border border-gray-100 transition-all hover:shadow-2xl mb-6">
  <div className="relative z-10 flex flex-col gap-6">
    
    {/* Header Section: Ghadi n-9smouh l-foug o l-te7t bach kolchi i-ban */}
    <div className="flex flex-col gap-5">
      
      {/* 1. Client Info: Smiya o Email baynin mzyan */}
      <div className="flex items-start gap-4 w-full">
        <div className="w-16 h-16 bg-gradient-to-br from-[#FF7010] to-orange-400 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-black italic text-2xl shadow-lg shadow-orange-500/20">
          {msg.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          {/* Smiya: Ma-ndirouch truncate bach t-welli l-star ila kant twila */}
          <h3 className="text-black font-black italic text-xl tracking-tighter leading-tight mb-1 break-words">
            {msg.name}
          </h3>
          {/* Email: Break-all bach dima i-ban kamel */}
          <p className="text-orange-600 text-[11px] font-black tracking-widest opacity-80 break-all">
            {msg.email}
          </p>
        </div>
      </div>

      {/* 2. Action Buttons: I-jiw m9addin l-ta7t bach may-z7mouch s-smiya */}
      <div className="flex items-center gap-3 w-full border-t border-gray-50 pt-4">
      <button 
  onClick={() => handleApprove(msg)} // ✅ Passi 'msg' kamel, machi 'msg.id'
  className="flex-1 bg-black hover:bg-[#FF7010] text-white px-6 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-xl active:scale-95 group/btn"
>
  <span className="text-xl group-hover/btn:animate-bounce">✨</span>
  <span className="font-black text-[10px] uppercase italic leading-none tracking-widest">
    Afficher sur l'accueil
  </span>
</button>
        
        <button 
          onClick={() => handleDeleteMessage(msg.id)}
          className="w-14 h-14 rounded-2xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white flex-shrink-0 flex items-center justify-center transition-all duration-300 border border-red-100 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    {/* 3. Message Body */}
    <div className="bg-orange-50/50 p-7 rounded-[2.5rem] border border-orange-100/50 shadow-inner">
      <p className="text-black italic text-[17px] leading-relaxed font-bold opacity-90 break-words">
        "{msg.message}"
      </p>
    </div>
  </div>
</div>
          </div>
        ))}
      </div>
    )}
  </div>
)}
</div>
      </div>
      {showSuccessModal && (
  <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
    {/* 1. Kebberna l-container (max-w-md) o rounded-3xl */}
    <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center transform transition-all animate-in fade-in zoom-in duration-300">
      
      <div className="mb-8">
        {/* 2. SUCCÈS b font-black o ghlida b7al image_c2f4f3.png */}
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-gray-900 mb-4">
          SUCCÈS !
        </h2>
        
        {/* 3. Text kbir chwiya o italic */}
        <p className="text-gray-500 font-bold italic text-lg leading-tight px-4">
          L'avis est maintenant visible sur l'accueil ! 🚀
        </p>
      </div>
      
      {/* 4. Bouton OK kbir o orange b7al image_c2f4f3.png */}
      <button 
        onClick={() => setShowSuccessModal(false)}
        className="w-full bg-[#FF7010] text-white py-5 rounded-[2rem] font-black uppercase italic tracking-widest text-xl hover:bg-black transition-all active:scale-95 shadow-xl shadow-orange-200"
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
};


// --- MAIN APP ---
export default function App() {
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState(""); 
  const [isFlying, setIsFlying] = useState(false);
  const [testimonials, setTestimonials] = useState([]); 
  const [refreshSignal, setRefreshSignal] = useState(0);

  

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/contactmessages/');
        const approvedOnes = res.data.filter(msg => msg.is_testimonial === true);
        setTestimonials(approvedOnes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTestimonials();
  }, [refreshSignal]);
  const triggerFly = () => {
    setIsFlying(true);
    // Zdna lwaqt l 1000ms bach t-ban l-vibration mzyan f l-navbar
    setTimeout(() => setIsFlying(false), 1000); 
  };
  const handleDeleteQuick = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Retirer de l\'accueil ?',
        icon: 'warning',
        iconColor: '#ea580c',
        confirmButtonColor: '#ea580c',
        confirmButtonText: 'Oui, retirer',
        cancelButtonText: 'ANNULER',
      showCancelButton: true, 
      reverseButtons: true,      // Bach Annuler t-ji f l-isser o Confirm f l-limen
      
      background: '#ffffff', 
      color: '#1f2937',      
      backdrop: `rgba(255,255,255,0.4) blur(10px)`, 
      
      buttonsStyling: false, 
      customClass: {
        popup: 'rounded-[3rem] border border-gray-100 shadow-2xl',
        title: 'font-black italic text-xl tracking-tighter text-gray-800 pt-6',
        htmlContainer: 'text-gray-500 font-medium pb-4',
        
        // --- HNA L-SIRR: Ghadi n-9lbo l-ordre dyal l-boutonat ---
        actions: 'flex flex-row-reverse justify-center gap-4 w-full', 
        
        confirmButton: 'bg-[#ea580c] text-white px-10 py-3 rounded-2xl font-bold uppercase italic hover:scale-105 transition-all shadow-lg shadow-orange-500/30',
        cancelButton: 'bg-gray-200 text-gray-600 px-10 py-3 rounded-2xl font-bold uppercase italic hover:bg-gray-300 transition-all'
      }
      });
  
      if (result.isConfirmed) {
        // 1. Update Backend
        await axios.patch(`http://127.0.0.1:8000/api/contactmessages/${id}/`, {
          is_testimonial: false
        });
  
        // 2. Update UI (Hna fin k-at-khdem setTestimonials)
        setTestimonials(prev => prev.filter(t => t.id !== id));
  
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Avis retiré ✨',
          showConfirmButton: false,
          timer: 3000
        });
      }
    } catch (err) {
      console.error(err); 
    }
  };

  const addToCart = (dish) => {
    triggerFly();
    setOrderType(dish.type);
    setCart((prev) => {
      const existing = prev.find(item => item.id === dish.id);
      if (existing) {
        return prev.map(item => item.id === dish.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...dish, quantity: 1, type: dish.type }];
    });
  };

  const validateOrder = async () => {
    const user = localStorage.getItem('username'); // Smyt l-user li m-connecté
    
    if (!user) {
      Swal.fire({
        title: "Connexion Requise",
        text: "Veuillez vous connecter pour passer commande.",
        icon: "warning",
        confirmButtonColor: "#ea580c",
          background: '#ffffff', 
          color: '#1f2937',      
          backdrop: `rgba(255,255,255,0.4) blur(10px)`, 
          
          buttonsStyling: false, 
          customClass: {
            popup: 'rounded-[3rem] border border-gray-100 shadow-2xl',
            title: 'font-black italic text-2xl tracking-tighter text-gray-800 pt-6',
            htmlContainer: 'text-gray-500 font-medium pb-4',
            actions: 'flex justify-center w-full', 
            
            confirmButton: 'bg-[#ea580c] text-white px-12 py-4 rounded-2xl font-bold uppercase italic hover:scale-105 transition-all shadow-lg shadow-orange-500/30',
          }
      });
      return;
    }

    if (cart.length === 0) return;

    // 1. N-7sbo l-total
    const total = cart.reduce((acc, item) => acc + (parseFloat(item.price) * (item.quantity || 1)), 0);
    
    // 2. N-jm3o l-items f text wa7ed (ex: Pizza x2, Coca x1)
    const itemsSummary = cart.map(i => `${i.name} (x${i.quantity || 1})`).join(', ');

    // 3. L-data li ghadi t-ssift l Django
    const orderData = {
      full_name: user,
      items: itemsSummary,
      total_price: total,
      order_type: orderType || "Sur place", 
      status: "En attente"
    };

    try {
      // --- HNA L-KHIDMA L-JDIDA (CONNECT M3A DJANGO) ---
      await axios.post('http://127.0.0.1:8000/api/orders/', orderData);

      Swal.fire({
        title: 'C’EST NOTÉ ! 🍕',
        text: 'Votre commande est en cuisine. Préparez-vous à vous régaler !',
        icon: 'success',
        confirmButtonText: 'PARFAIT !', 
        
        background: '#ffffff', 
        color: '#1f2937',      
        backdrop: `rgba(255,255,255,0.4) blur(10px)`, 
        
        buttonsStyling: false, 
        customClass: {
          popup: 'rounded-[3rem] border border-gray-100 shadow-2xl',
          title: 'font-black italic text-2xl tracking-tighter text-gray-800 pt-6',
          htmlContainer: 'text-gray-500 font-medium pb-4',
          actions: 'flex justify-center w-full', 
          
          confirmButton: 'bg-[#ea580c] text-white px-12 py-4 rounded-2xl font-bold uppercase italic hover:scale-105 transition-all shadow-lg shadow-orange-500/30',
        }
      });;
    } catch (error) {
      console.error("Erreur API:", error);
      Swal.fire({
        title: 'Erreur',
        text: "Impossible d'envoyer la commande. Vérifie que Django est allumé.",
        icon: 'error'
      });
    }
  };

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + amount) } : item));
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(res => setCategories(res.data))
      .catch(e => console.log(e));
  }, []);

  return (
    <Router>
    <div 
      className="min-h-screen w-full relative flex flex-col"
      style={{ 
        backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070')",
        backgroundAttachment: 'fixed',    // Darori: k-at-khel-li tswira s-mra
        backgroundSize: 'cover',          // Darori: k-at-jebbed tswira 3la l-ecran
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',    // HADCHI LI KHASSK: Bach mat-3awedch s-soura l-ta7t
        backgroundColor: "#000"           // Ila tswira t-7tat, l-ta7t i-bqa k7el m9ad m3a d-dell
      }}
    >
<div className="fixed inset-0 bg-black/50 backdrop-blur-[4px] pointer-events-none z-0"></div>

      {/* 2. L-Content dyalk (Navbar + Pages) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar cartCount={cart.length} isFlying={isFlying} />
        
        <main className="flex-1 w-full">
        
        <Routes>
          <Route path="/" element={<Home testimonials={testimonials} handleDeleteQuick={handleDeleteQuick} />} />
          <Route path="/admin-orders" element={<AdminOrders setTestimonials={setTestimonials} testimonials={testimonials} />} />
          <Route path="/menu" element={<Menu categories={categories} addToCart={addToCart} isFlying={isFlying} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panier" element={<Panier cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} validateOrder={validateOrder} orderType={orderType} />} />
          </Routes>
        </main>
      </div>

    </div>
  </Router>
  );
}