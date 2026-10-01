'use client'

import { useAppContext, Student } from '@/components/providers'
import { RiskBadge } from '@/components/shared'
import { Search, Plus, CheckCircle2, Trash, X } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'

function AddStudentModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (s: Omit<Student, 'id' | 'projected' | 'risk' | 'trend'>) => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', roll: '', department: '', attendance: 100 })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({ name: '', email: '', roll: '', department: '', attendance: 100 })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] bg-[#111] border border-white/10 p-8 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
          <X className="size-6" />
        </button>
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-white">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">Full Name</label>
            <input required type="text" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#0071e3] transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. John Doe" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">Email Address</label>
            <input required type="email" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#0071e3] transition-all" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@edu.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-400">Roll No</label>
              <input required type="text" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#0071e3] transition-all" value={formData.roll} onChange={e => setFormData({ ...formData, roll: e.target.value })} placeholder="CS2024..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-400">Attendance %</label>
              <input required type="number" min="0" max="100" step="0.01" className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#0071e3] transition-all" value={formData.attendance} onChange={e => setFormData({ ...formData, attendance: parseFloat(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-400">Department</label>
            <select required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-[#0071e3] transition-all appearance-none" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })}>
              <option value="" className="bg-[#111]">Select Dept...</option>
              <option value="Computer Science" className="bg-[#111]">Computer Science</option>
              <option value="Mechanical" className="bg-[#111]">Mechanical</option>
              <option value="Electronics" className="bg-[#111]">Electronics</option>
              <option value="Civil" className="bg-[#111]">Civil</option>
            </select>
          </div>
          <div className="mt-8 flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="rounded-full px-5 py-2.5 font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="rounded-full bg-[#0071e3] px-5 py-2.5 font-medium text-white hover:bg-[#0071e3]/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,113,227,0.4)] cursor-pointer">Add Student</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Toast({ message, show, onClose }: { message: string, show: boolean, onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3000)
      return () => clearTimeout(t)
    }
  }, [show, onClose])
  
  if (!show) return null
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex animate-in slide-in-from-bottom-5 items-center gap-3 rounded-full bg-white px-6 py-3 text-black shadow-[0_0_40px_rgba(255,255,255,0.2)] border border-white/20">
      <CheckCircle2 className="size-5 text-[#00c66b]" />
      <span className="font-medium text-sm">{message}</span>
    </div>
  )
}

export default function StudentsPage() {
  const { students, addStudent, deleteStudent, markPresent } = useAppContext()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg: string) => setToastMessage(msg)

  const filteredStudents = useMemo(() => {
    return students.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.attendance - b.attendance)
  }, [students, searchQuery])

  return (
    <div className="px-8 pb-24 pt-10">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <h1 className="text-[42px] font-semibold tracking-[-0.06em] text-white">
          All students. <span className="text-gray-500">Manage and search.</span>
        </h1>
        <div className="flex items-center gap-4">
          <label className="flex h-12 items-center gap-3 rounded-full bg-white/10 px-5 text-gray-400 border border-white/10 focus-within:border-[#0071e3] transition-colors">
            <Search className="size-5" />
            <input 
              className="w-64 bg-transparent outline-none placeholder:text-gray-500 text-white" 
              placeholder="Search by name, roll, department" 
              aria-label="Search students"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </label>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex h-12 items-center gap-2 rounded-full bg-[#0071e3] px-5 text-white font-medium hover:bg-[#0071e3]/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,113,227,0.4)] cursor-pointer"
          >
            <Plus className="size-5" />
            Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-[28px] bg-[#111] border border-white/10 shadow-2xl">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-white/10 text-[14px] uppercase tracking-wider text-gray-500 bg-white/5">
              <th className="px-8 py-6 font-medium">Student</th>
              <th className="font-medium">Roll No</th>
              <th className="font-medium">Department</th>
              <th className="font-medium">Attendance</th>
              <th className="font-medium">Projected</th>
              <th className="font-medium">Risk</th>
              <th className="font-medium px-8 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                <td className="px-8 py-5">
                  <p className="font-medium text-[16px] text-white">{student.name}</p>
                  <p className="text-[14px] text-gray-400 mt-0.5">{student.email}</p>
                </td>
                <td className="text-[15px] text-gray-300">{student.roll}</td>
                <td className="text-[15px] text-gray-300">{student.department}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <span className="h-2 w-32 rounded-full bg-white/10 overflow-hidden">
                      <span 
                        className={`block h-full rounded-full transition-all duration-500 shadow-[0_0_10px_currentColor] ${student.risk === 'Critical' ? 'bg-[#ff453a] text-[#ff453a]' : student.risk === 'At Risk' ? 'bg-[#ff9500] text-[#ff9500]' : 'bg-[#00c66b] text-[#00c66b]'}`} 
                        style={{ width: `${Math.max(student.attendance, 2)}%` }} 
                      />
                    </span>
                    <strong className="text-[15px] text-white">{student.attendance.toFixed(1)}%</strong>
                  </div>
                </td>
                <td className="text-[15px] text-gray-400">{student.projected.toFixed(1)}%</td>
                <td><RiskBadge risk={student.risk} /></td>
                <td className="px-8 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { markPresent(student.id); showToast('Attendance updated'); }}
                      className="rounded-full bg-white/10 p-2 text-gray-400 hover:bg-[#00c66b]/20 hover:text-[#00c66b] transition-colors cursor-pointer"
                      title="Mark Present (+2%)"
                    >
                      <CheckCircle2 className="size-4" />
                    </button>
                    <button 
                      onClick={() => { deleteStudent(student.id); showToast('Student removed'); }}
                      className="rounded-full bg-white/10 p-2 text-gray-400 hover:bg-[#ff453a]/20 hover:text-[#ff453a] transition-colors cursor-pointer"
                      title="Remove Student"
                    >
                      <Trash className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-8 py-12 text-center text-gray-500">
                  No students found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddStudentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={s => { addStudent(s); showToast(`Added ${s.name} successfully`); }} 
      />
      <Toast message={toastMessage} show={!!toastMessage} onClose={() => setToastMessage('')} />
    </div>
  )
}
