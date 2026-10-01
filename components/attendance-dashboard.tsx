'use client'

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  GraduationCap,
  LayoutGrid,
  LogOut,
  Mail,
  Search,
  Settings,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  Users,
  Plus,
  Trash,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'

const navItems = [
  { label: 'Overview', icon: LayoutGrid, href: '#overview' },
  { label: 'Shortages', icon: AlertTriangle, href: '#shortages' },
  { label: 'Predictive ML', icon: Sparkles, href: '#predictions' },
  { label: 'Students', icon: Users, href: '#students' },
]

type RiskLevel = 'Safe' | 'At Risk' | 'Critical' | 'N/A'

interface Student {
  id: string
  name: string
  email: string
  roll: string
  department: string
  attendance: number
  projected: number
  risk: RiskLevel
  trend: number
}

const initialStudents: Student[] = [
  { id: '1', name: 'Priya Verma', email: 'priya.v@edu.com', roll: 'CS2024002', department: 'Computer Science', attendance: 46.51, projected: 57.22, risk: 'Critical', trend: -12.4 },
  { id: '2', name: 'Aarav Sharma', email: 'student@attendancehub.com', roll: 'CS2024001', department: 'Computer Science', attendance: 57.14, projected: 57.14, risk: 'Critical', trend: -5.1 },
  { id: '3', name: 'Ananya Gupta', email: 'ananya.g@edu.com', roll: 'ME2024008', department: 'Mechanical', attendance: 61.9, projected: 65.47, risk: 'Critical', trend: 2.1 },
  { id: '4', name: 'Sneha Patel', email: 'sneh.p@edu.com', roll: 'ME2024004', department: 'Mechanical', attendance: 69.05, projected: 54.77, risk: 'Critical', trend: -14.2 },
  { id: '5', name: 'Rohan Iyer', email: 'rohan.i@edu.com', roll: 'EC2024003', department: 'Electronics', attendance: 76.19, projected: 69.05, risk: 'At Risk', trend: -7.1 },
  { id: '6', name: 'Kabir Singh', email: 'kabir.s@edu.com', roll: 'EC2024007', department: 'Electronics', attendance: 78.57, projected: 71.42, risk: 'At Risk', trend: -7.1 },
  { id: '7', name: 'Ishita Roy', email: 'ishita.r@edu.com', roll: 'CV2024006', department: 'Civil', attendance: 88.1, projected: 100, risk: 'Safe', trend: 11.9 },
  { id: '8', name: 'Arjun Nair', email: 'arjun.n@edu.com', roll: 'CS2024005', department: 'Computer Science', attendance: 92.86, projected: 100, risk: 'Safe', trend: 7.1 },
]

function getRiskLevel(attendance: number): RiskLevel {
  if (attendance < 75) return 'Critical'
  if (attendance < 85) return 'At Risk'
  return 'Safe'
}

function Donut({ value, color = '#ff453a' }: { value: number; color?: string }) {
  return (
    <div className="relative size-28 shrink-0">
      <div className="size-full rounded-full" style={{ background: `conic-gradient(${color} ${value * 3.6}deg, #1d1d1f ${value * 3.6}deg)` }} />
      <div className="absolute inset-[18px] rounded-full bg-black" />
    </div>
  )
}

function StudentMixDonut({ safe, atRisk, critical }: { safe: number, atRisk: number, critical: number }) {
  const total = safe + atRisk + critical || 1
  const safeDeg = (safe / total) * 360
  const atRiskDeg = (atRisk / total) * 360
  
  return (
    <div className="relative size-[100px] shrink-0">
      <div className="size-full rounded-full" style={{ background: `conic-gradient(#00c66b 0deg ${safeDeg}deg, #ff9500 ${safeDeg}deg ${safeDeg + atRiskDeg}deg, #ff453a ${safeDeg + atRiskDeg}deg 360deg)` }} />
      <div className="absolute inset-[16px] rounded-full bg-white" />
    </div>
  )
}

function AttendanceDonut({ value }: { value: number }) {
  return (
    <div className="relative size-[100px] shrink-0">
      <div className="size-full rounded-full" style={{ background: `conic-gradient(#0071e3 ${value * 3.6}deg, #f0f0f2 ${value * 3.6}deg)` }} />
      <div className="absolute inset-[16px] rounded-full bg-white" />
      <div className="absolute inset-0 flex items-center justify-center font-semibold text-lg">{value.toFixed(0)}%</div>
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between border-b border-black/[0.06] bg-[#f5f5f7]/90 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-3 text-[19px] font-semibold tracking-[-0.04em]">
        <GraduationCap className="size-5" strokeWidth={1.8} />AttendanceHub
      </div>
      <nav className="hidden items-center gap-10 text-[15px] md:flex">
        <a href="#overview">Overview</a>
        <a href="#shortages">Shortages</a>
        <a href="#predictions">Predictive ML</a>
        <a href="#students">Students</a>
      </nav>
      <div className="flex items-center gap-4">
        <span className="hidden text-[15px] text-[#86868b] sm:inline">Dr. Sarah Chen</span>
        <button className="flex size-10 items-center justify-center rounded-full bg-white cursor-pointer" aria-label="Sign out">
          <LogOut className="size-4" />
        </button>
      </div>
    </header>
  )
}

function AlertCard({ student, onAlert }: { student: Student, onAlert: () => void }) {
  const trendText = student.trend > 0 ? `+${student.trend}%` : `${student.trend}%`
  return (
    <article className="flex min-w-[420px] flex-1 flex-col rounded-[28px] bg-black p-12 text-white">
      <p className="flex h-5 items-center gap-2 text-[13px] font-semibold uppercase leading-none tracking-[0.12em] text-[#ff453a]">
        Critical shortage <AlertTriangle className="size-4" />
      </p>
      <h3 className="mt-8 flex h-14 items-center text-[48px] font-semibold leading-none tracking-[-0.06em]">{student.name}</h3>
      <p className="mt-1 flex h-7 items-center text-[19px] leading-none text-white/55">{student.roll} · {student.department}</p>
      <div className="mt-10 flex min-h-[140px] items-center justify-between">
        <div>
          <p className="flex items-baseline gap-3 text-[92px] font-semibold leading-none tracking-[-0.08em]">
            <span>{student.attendance}</span><span className="text-[48px] leading-none text-white/45">%</span>
          </p>
          <p className="mt-3 text-[15px] leading-none text-white/55">Projected: {student.projected}% · Trend {trendText}</p>
        </div>
        <Donut value={student.attendance} />
      </div>
      <button onClick={onAlert} className="mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white transition-colors hover:bg-gray-200 text-[17px] leading-none text-black cursor-pointer">
        <Mail className="size-5" />Send email alert
      </button>
    </article>
  )
}

function MetricCard({ title, value, detail, icon: Icon = Activity, children }: { title: string; value: string; detail: string; icon?: typeof Activity; children?: React.ReactNode }) {
  return (
    <article className="h-[316px] overflow-hidden rounded-[28px] bg-[#ffffff] p-10 text-[#000000] shadow-[0_8px_28px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between">
        <p className="text-[15px] font-medium uppercase tracking-[0.04em] text-[#8a8a90]">{title}</p>
        <Icon className="size-5 text-[#8a8a90]" strokeWidth={1.5} />
      </div>
      <p className="mt-5 text-[48px] font-semibold leading-none tracking-[-0.06em]">{value}</p>
      <p className="mt-4 text-[15px] leading-5 text-[#8a8a90]">{detail}</p>
      {children}
    </article>
  )
}

function RiskBadge({ risk }: { risk: string }) {
  const styles = risk === 'Critical' ? 'bg-[#ff453a] text-white' : risk === 'At Risk' ? 'bg-[#ff9500] text-white' : risk === 'Safe' ? 'bg-[#00c66b] text-white' : 'bg-[#f0f0f2] text-[#8a8a90]'
  return <span className={`rounded-full px-3 py-1 text-[14px] font-semibold ${styles}`}>{risk}</span>
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Add New Student</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Full Name</label>
            <input required type="text" className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none focus:border-[#0071e3] focus:bg-white focus:ring-1 focus:ring-[#0071e3] transition-all" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. John Doe" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
            <input required type="email" className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none focus:border-[#0071e3] focus:bg-white focus:ring-1 focus:ring-[#0071e3] transition-all" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="john@edu.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Roll No</label>
              <input required type="text" className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none focus:border-[#0071e3] focus:bg-white focus:ring-1 focus:ring-[#0071e3] transition-all" value={formData.roll} onChange={e => setFormData({ ...formData, roll: e.target.value })} placeholder="CS2024..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Attendance %</label>
              <input required type="number" min="0" max="100" step="0.01" className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none focus:border-[#0071e3] focus:bg-white focus:ring-1 focus:ring-[#0071e3] transition-all" value={formData.attendance} onChange={e => setFormData({ ...formData, attendance: parseFloat(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Department</label>
            <select required className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 outline-none focus:border-[#0071e3] focus:bg-white focus:ring-1 focus:ring-[#0071e3] transition-all" value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })}>
              <option value="">Select Dept...</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electronics">Electronics</option>
              <option value="Civil">Civil</option>
            </select>
          </div>
          <div className="mt-8 flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="rounded-full px-5 py-2.5 font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">Cancel</button>
            <button type="submit" className="rounded-full bg-[#0071e3] px-5 py-2.5 font-medium text-white hover:bg-[#0071e3]/90 transition-colors cursor-pointer">Add Student</button>
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
    <div className="fixed bottom-6 right-6 z-50 flex animate-in slide-in-from-bottom-5 items-center gap-3 rounded-full bg-gray-900 px-6 py-3 text-white shadow-xl">
      <CheckCircle2 className="size-5 text-[#00c66b]" />
      <span className="font-medium text-sm">{message}</span>
    </div>
  )
}

export function AttendanceDashboard() {
  const [students, setStudents] = useState<Student[]>(initialStudents)
  const [searchQuery, setSearchQuery] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (msg: string) => {
    setToastMessage(msg)
  }

  const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'projected' | 'risk' | 'trend'>) => {
    const newStudent: Student = {
      ...newStudentData,
      id: Math.random().toString(36).substr(2, 9),
      projected: newStudentData.attendance,
      risk: getRiskLevel(newStudentData.attendance),
      trend: 0
    }
    setStudents([newStudent, ...students])
    showToast(`Added ${newStudent.name} successfully`)
  }

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id))
    showToast('Student removed')
  }

  const handleMarkPresent = (id: string) => {
    setStudents(students.map(s => {
      if (s.id === id) {
        const newAtt = Math.min(100, s.attendance + 2)
        return { ...s, attendance: Number(newAtt.toFixed(2)), risk: getRiskLevel(newAtt) }
      }
      return s
    }))
    showToast('Attendance updated')
  }

  const filteredStudents = useMemo(() => {
    return students.filter(s =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => a.attendance - b.attendance)
  }, [students, searchQuery])

  const criticalStudents = students.filter(s => s.risk === 'Critical')
  const atRiskStudents = students.filter(s => s.risk === 'At Risk')
  const safeStudents = students.filter(s => s.risk === 'Safe')

  const avgAttendance = students.length ? (students.reduce((acc, s) => acc + s.attendance, 0) / students.length) : 0
  const uniqueDepartmentsCount = new Set(students.map(s => s.department)).size

  return (
    <main className="min-h-screen bg-[#f5f5f7] font-sans text-[#1d1d1f] antialiased">
      <Header />
      
      <section id="overview" className="px-8 pb-24 pt-20 md:pt-24">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <h1 className="text-[78px] font-semibold leading-[0.9] tracking-[-0.08em] md:text-[94px]">Attendance.</h1>
            <p className="mt-14 max-w-[520px] text-[29px] font-semibold leading-[1.15] tracking-[-0.05em]">
              The smartest way to track student presence and predict shortages.
            </p>
            <div className="mt-9 flex flex-col gap-4 text-[21px] text-[#0071e3]">
              <a href="#students" className="hover:underline">View all students ↗</a>
              <a href="#predictions" className="hover:underline">Run prediction model ↗</a>
            </div>
          </div>
        </div>
      </section>

      <nav className="grid grid-cols-2 border-y border-black/[0.06] px-8 py-10 md:grid-cols-4" aria-label="Dashboard sections">
        {navItems.map(({ label, icon: Icon, href }) => (
          <a key={label} href={href} className="flex flex-col items-center gap-4 py-2 text-[15px] transition-opacity hover:opacity-60">
            <Icon className="size-8" strokeWidth={1.5} />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <section id="shortages" className="px-8 pb-20 pt-16">
        <h2 className="mb-10 text-[42px] font-semibold tracking-[-0.06em]">
          Critical Alerts. <span className="text-[#8a8a90]">Take a look at who needs attention.</span>
        </h2>
        
        <div className="flex gap-6 overflow-x-auto pb-2 snap-x">
          {criticalStudents.slice(0, 2).map(student => (
            <div className="snap-start" key={student.id}>
              <AlertCard student={student} onAlert={() => showToast(`Alert sent to ${student.name}`)} />
            </div>
          ))}
          {criticalStudents.length === 0 && (
            <div className="flex h-[320px] w-full items-center justify-center rounded-[28px] border-2 border-dashed border-gray-300 text-gray-500">
              <div className="text-center">
                <CheckCircle2 className="mx-auto size-10 mb-3 text-green-500" />
                <p className="text-xl font-medium">No critical shortages</p>
                <p className="text-sm">All students are attending well.</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          <MetricCard title="Weekly average" value={`${avgAttendance.toFixed(1)}%`} detail="Dynamic trend over time">
            <div className="relative mt-8 h-24 overflow-hidden">
              <svg className="absolute inset-0 size-full" viewBox="0 0 220 90" preserveAspectRatio="none" aria-label="Weekly attendance trend" role="img">
                <defs>
                  <linearGradient id="weekly-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b9ddfa" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#eaf5ff" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <path d="M6 38 C18 12 28 17 42 27 C54 36 66 27 83 29 C102 30 113 34 128 39 C143 44 151 31 164 29 C180 27 188 38 214 48 L214 90 L6 90 Z" fill="url(#weekly-fill)" />
                <path d="M6 38 C18 12 28 17 42 27 C54 36 66 27 83 29 C102 30 113 34 128 39 C143 44 151 31 164 29 C180 27 188 38 214 48" fill="none" stroke="#0071e3" strokeLinecap="round" strokeWidth="2.25" />
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
                 <span key={i} className={`w-8 rounded-t-lg ${i % 2 === 0 ? 'bg-[#ff453a] h-14' : 'bg-[#ff9500] h-10'}`} />
               ))}
             </div>
          </MetricCard>
        </div>
      </section>

      <section id="predictions" className="border-t border-black/[0.04] px-8 pb-24 pt-16">
        <h2 className="mb-10 text-[42px] font-semibold tracking-[-0.06em]">
          Predictive Insights. <span className="text-[#8a8a90]">Even more reasons to act early.</span>
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-2 snap-x">
          {criticalStudents.length > 0 ? criticalStudents.slice(0, 4).map((student) => (
            <article key={student.id} className="snap-start min-w-[390px] rounded-[28px] bg-white p-9 shadow-[0_8px_28px_rgba(0,0,0,0.05)]">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-[#fff0ef]">
                <AlertTriangle className="size-7 text-[#ff453a]" />
              </div>
              <p className="mt-9 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#ff453a]">Critical Trend</p>
              <h3 className="mt-4 text-[26px] font-semibold">{student.name}</h3>
              <p className="mt-4 text-[18px] leading-7">{student.name} is predicted to drop to {student.projected}% next month.<br />Immediate intervention required.</p>
              <div className="mt-14 flex justify-between border-t border-black/[0.08] pt-7 text-[15px] text-[#8a8a90]">
                <span>Consecutive absences detected</span>
                <strong className={student.trend < 0 ? "text-[#ff453a]" : "text-black"}>{student.trend < 0 ? '↘' : '↗'} {Math.abs(student.trend)}%</strong>
              </div>
            </article>
          )) : (
            <p className="text-gray-500 text-lg ml-2">No critical predictions at the moment. Keep it up!</p>
          )}
        </div>
      </section>

      <section id="students" className="border-t border-black/[0.04] px-8 pb-24 pt-16">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h2 className="text-[42px] font-semibold tracking-[-0.06em]">
            All students. <span className="text-[#8a8a90]">Manage and search.</span>
          </h2>
          <div className="flex items-center gap-4">
            <label className="flex h-12 items-center gap-3 rounded-full bg-white px-5 text-[#9a9aa0] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <Search className="size-5" />
              <input 
                className="w-64 bg-transparent outline-none placeholder:text-[#9a9aa0] text-black" 
                placeholder="Search by name, roll, department" 
                aria-label="Search students"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </label>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex h-12 items-center gap-2 rounded-full bg-[#0071e3] px-5 text-white font-medium hover:bg-[#0071e3]/90 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="size-5" />
              Add Student
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-[28px] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.05)]">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-black/[0.08] text-[14px] uppercase tracking-wider text-[#8a8a90]">
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
                <tr key={student.id} className="border-b border-black/[0.07] last:border-0 hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <p className="font-medium text-[16px]">{student.name}</p>
                    <p className="text-[14px] text-[#8a8a90] mt-0.5">{student.email}</p>
                  </td>
                  <td className="text-[15px]">{student.roll}</td>
                  <td className="text-[15px]">{student.department}</td>
                  <td>
                    <div className="flex items-center gap-4">
                      <span className="h-2 w-32 rounded-full bg-[#f0f0f2] overflow-hidden">
                        <span 
                          className={`block h-full rounded-full transition-all duration-500 ${student.risk === 'Critical' ? 'bg-[#ff453a]' : student.risk === 'At Risk' ? 'bg-[#ff9500]' : 'bg-[#00c66b]'}`} 
                          style={{ width: `${Math.max(student.attendance, 2)}%` }} 
                        />
                      </span>
                      <strong className="text-[15px]">{student.attendance.toFixed(1)}%</strong>
                    </div>
                  </td>
                  <td className="text-[15px] text-gray-600">{student.projected.toFixed(1)}%</td>
                  <td><RiskBadge risk={student.risk} /></td>
                  <td className="px-8 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleMarkPresent(student.id)}
                        className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors cursor-pointer"
                        title="Mark Present (+2%)"
                      >
                        <CheckCircle2 className="size-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)}
                        className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors cursor-pointer"
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
      </section>

      <footer className="border-t border-black/[0.06] px-8 py-10 text-center text-[#8a8a90]">
        AttendanceHub · Predictive attendance analytics for modern institutions.
      </footer>

      <AddStudentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddStudent} 
      />
      
      <Toast message={toastMessage} show={!!toastMessage} onClose={() => setToastMessage('')} />
    </main>
  )
}

export default AttendanceDashboard
