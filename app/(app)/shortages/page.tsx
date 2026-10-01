'use client'

import { AlertCard } from '@/components/shared'
import { useAppContext } from '@/components/providers'
import { CheckCircle2 } from 'lucide-react'

export default function ShortagesPage() {
  const { students } = useAppContext()
  const criticalStudents = students.filter(s => s.risk === 'Critical')

  return (
    <div className="px-8 pb-24 pt-10">
      <h1 className="mb-10 text-[42px] font-semibold tracking-[-0.06em] text-white">
        Critical Alerts. <span className="text-gray-500">Take a look at who needs attention.</span>
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {criticalStudents.map(student => (
          <AlertCard 
            key={student.id} 
            student={student} 
            onAlert={() => alert(`Alert sent to ${student.name}`)} 
          />
        ))}
        {criticalStudents.length === 0 && (
          <div className="col-span-full flex h-[320px] w-full items-center justify-center rounded-[28px] border-2 border-dashed border-white/10 bg-white/5 text-gray-400 backdrop-blur-sm">
            <div className="text-center">
              <CheckCircle2 className="mx-auto size-12 mb-4 text-[#00c66b]" />
              <p className="text-2xl font-medium text-white mb-2">No critical shortages</p>
              <p className="text-gray-400">All students are attending well.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
