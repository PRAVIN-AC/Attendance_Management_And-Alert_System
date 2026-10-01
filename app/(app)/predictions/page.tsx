'use client'

import { useAppContext } from '@/components/providers'
import { AlertTriangle } from 'lucide-react'

export default function PredictionsPage() {
  const { students } = useAppContext()
  const criticalStudents = students.filter(s => s.risk === 'Critical')

  return (
    <div className="px-8 pb-24 pt-10">
      <h1 className="mb-10 text-[42px] font-semibold tracking-[-0.06em] text-white">
        Predictive Insights. <span className="text-gray-500">Even more reasons to act early.</span>
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {criticalStudents.length > 0 ? criticalStudents.map((student) => (
          <article key={student.id} className="min-w-[390px] rounded-[28px] bg-[#111] border border-white/10 p-9 shadow-2xl relative group overflow-hidden hover:border-[#ff453a]/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-b from-[#ff453a]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#ff453a]/10 border border-[#ff453a]/20">
              <AlertTriangle className="size-7 text-[#ff453a]" />
            </div>
            <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#ff453a]">Critical Trend</p>
            <h3 className="mt-4 text-[26px] font-semibold text-white">{student.name}</h3>
            <p className="mt-4 text-[18px] leading-7 text-gray-400">{student.name} is predicted to drop to <span className="text-white">{student.projected}%</span> next month.<br />Immediate intervention required.</p>
            <div className="mt-14 flex justify-between border-t border-white/10 pt-7 text-[15px] text-gray-500">
              <span>Consecutive absences detected</span>
              <strong className={student.trend < 0 ? "text-[#ff453a]" : "text-white"}>{student.trend < 0 ? '↘' : '↗'} {Math.abs(student.trend)}%</strong>
            </div>
          </article>
        )) : (
          <p className="col-span-full text-gray-500 text-lg text-center py-12">No critical predictions at the moment. Keep it up!</p>
        )}
      </div>
    </div>
  )
}
