'use client'

import { MetricCard, StudentMixDonut, AttendanceDonut } from '@/components/shared'
import { useAppContext } from '@/components/providers'
import { Users, TrendingDown } from 'lucide-react'

export default function DashboardPage() {
  const { students } = useAppContext()

  const safeStudents = students.filter(s => s.risk === 'Safe')
  const atRiskStudents = students.filter(s => s.risk === 'At Risk')
  const criticalStudents = students.filter(s => s.risk === 'Critical')
  
  const avgAttendance = students.length ? (students.reduce((acc, s) => acc + s.attendance, 0) / students.length) : 0
  const uniqueDepartmentsCount = new Set(students.map(s => s.department)).size

  return (
    <div className="px-8 pb-24 pt-10">
      <div className="mb-10">
        <h1 className="text-[42px] font-semibold tracking-[-0.06em] text-white">
          Overview. <span className="text-gray-500">At a glance.</span>
        </h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard title="Weekly average" value={`${avgAttendance.toFixed(1)}%`} detail="Dynamic trend over time">
          <div className="relative mt-8 h-24 overflow-hidden">
            <svg className="absolute inset-0 size-full" viewBox="0 0 220 90" preserveAspectRatio="none" aria-label="Weekly attendance trend" role="img">
              <defs>
                <linearGradient id="weekly-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0071e3" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0071e3" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M6 38 C18 12 28 17 42 27 C54 36 66 27 83 29 C102 30 113 34 128 39 C143 44 151 31 164 29 C180 27 188 38 214 48 L214 90 L6 90 Z" fill="url(#weekly-fill)" />
              <path d="M6 38 C18 12 28 17 42 27 C54 36 66 27 83 29 C102 30 113 34 128 39 C143 44 151 31 164 29 C180 27 188 38 214 48" fill="none" stroke="#0071e3" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </div>
        </MetricCard>

        <MetricCard title="Total students" value={students.length.toString()} detail={`${safeStudents.length} safe · ${criticalStudents.length} critical`} icon={Users}>
          <div className="mt-7 flex justify-center">
            <StudentMixDonut safe={safeStudents.length} atRisk={atRiskStudents.length} critical={criticalStudents.length} />
          </div>
        </MetricCard>

        <MetricCard title="Avg attendance" value={`${avgAttendance.toFixed(1)}%`} detail="Across all students" icon={TrendingDown}>
          <div className="mt-7 flex justify-center">
            <AttendanceDonut value={avgAttendance} />
          </div>
        </MetricCard>

        <MetricCard title="Department load" value={uniqueDepartmentsCount.toString()} detail="Departments tracked">
            <div className="mt-7 flex h-16 items-end gap-3">
              {[...Array(Math.min(uniqueDepartmentsCount, 5))].map((_, i) => (
                <span key={i} className={`w-8 rounded-t-lg ${i % 2 === 0 ? 'bg-[#ff453a] h-14 shadow-[0_0_15px_rgba(255,69,58,0.3)]' : 'bg-[#ff9500] h-10 shadow-[0_0_15px_rgba(255,149,0,0.3)]'}`} />
              ))}
            </div>
        </MetricCard>
      </div>
    </div>
  )
}
