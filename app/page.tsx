'use client'

import Link from 'next/link'
import { GraduationCap, ArrowRight, Activity, Users, AlertTriangle, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="font-sans antialiased min-h-screen bg-black text-white flex flex-col relative overflow-hidden selection:bg-[#0071e3] selection:text-white">
      {/* Dynamic Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ease-out"
        style={{
          background: `radial-gradient(1000px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 113, 227, 0.2), transparent 50%)`,
          opacity: isMounted ? 1 : 0
        }}
      />
      
      {/* Ambient Moving Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0071e3]/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#ff453a]/5 blur-[150px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <header className={`z-50 sticky top-0 flex items-center justify-between px-8 h-[60px] border-b border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3 text-[19px] font-semibold tracking-[-0.04em]">
          <GraduationCap className="size-5 text-[#0071e3]" strokeWidth={2} />
          AttendanceHub
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link 
            href="/dashboard" 
            className="flex h-9 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-all hover:bg-gray-200 hover:scale-105"
          >
            Go to App
          </Link>
        </div>
      </header>

      <div className="flex flex-col items-center flex-1 justify-center py-32 px-6 relative z-10">
        <div className="text-center max-w-[800px] flex flex-col items-center">
          
          <div className={`flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium backdrop-blur-sm transition-all duration-700 delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Sparkles className="size-4 text-[#0071e3]" />
            <span>AttendanceHub 2.0 is now live</span>
          </div>
          
          <h1 className={`text-[56px] md:text-[94px] font-semibold leading-[1.05] tracking-[-0.04em] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 transition-all duration-1000 delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The smartest way to track attendance.
          </h1>
          
          <p className={`text-[20px] md:text-[25px] leading-[1.4] text-gray-400 max-w-[640px] mb-12 transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Predict shortages before they happen. Intervene early. Keep your students on the path to success with our predictive machine learning models.
          </p>
          
          <div className={`transition-all duration-1000 delay-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link 
              href="/dashboard"
              className="group relative flex h-14 items-center justify-center gap-2 rounded-full bg-[#0071e3] px-10 text-lg font-medium text-white transition-all hover:bg-[#0071e3]/90 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,113,227,0.4)] active:scale-95"
            >
              Launch Dashboard
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Decorative App Preview Section with Hover Effects */}
        <div className={`mt-24 w-full max-w-5xl rounded-[32px] bg-white/5 p-4 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-1000 delay-700 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0071e3]/50 to-transparent" />
          
          <div className="grid gap-6 md:grid-cols-3 relative z-10">
            <div className="group h-[240px] rounded-[24px] bg-white/5 border border-white/10 p-8 flex flex-col justify-between transition-colors hover:bg-white/10 hover:border-white/20">
               <Activity className="size-8 text-[#00c66b] transition-transform group-hover:scale-110" />
               <div>
                 <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Weekly Average</p>
                 <p className="text-4xl font-semibold text-white">89.4%</p>
               </div>
            </div>
            
            <div className="group h-[240px] rounded-[24px] bg-white/5 border border-white/10 p-8 flex flex-col justify-between transition-colors hover:bg-white/10 hover:border-white/20">
               <Users className="size-8 text-[#0071e3] transition-transform group-hover:scale-110" />
               <div>
                 <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Total Students</p>
                 <p className="text-4xl font-semibold text-white">2,419</p>
               </div>
            </div>
            
            <div className="group h-[240px] rounded-[24px] bg-black border border-white/10 p-8 shadow-[0_8px_28px_rgba(0,0,0,0.4)] flex flex-col justify-between transform md:-translate-y-6 transition-all hover:border-[#ff453a]/50 hover:shadow-[0_0_30px_rgba(255,69,58,0.15)] relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-[#ff453a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <AlertTriangle className="size-8 text-[#ff453a] transition-transform group-hover:scale-110 relative z-10" />
               <div className="relative z-10">
                 <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Critical Alerts</p>
                 <p className="text-4xl font-semibold text-white">12</p>
                 <p className="text-sm text-[#ff453a] mt-2 font-medium">Requires immediate action</p>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className={`border-t border-white/10 px-8 py-10 text-center text-gray-500 mt-auto transition-opacity duration-1000 delay-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        AttendanceHub · Built for the modern university.
      </footer>
    </main>
  )
}
