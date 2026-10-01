'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type RiskLevel = 'Safe' | 'At Risk' | 'Critical' | 'N/A'

export interface Student {
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

export function getRiskLevel(attendance: number): RiskLevel {
  if (attendance < 75) return 'Critical'
  if (attendance < 85) return 'At Risk'
  return 'Safe'
}

interface AppContextType {
  students: Student[]
  addStudent: (s: Omit<Student, 'id' | 'projected' | 'risk' | 'trend'>) => void
  deleteStudent: (id: string) => void
  markPresent: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function Providers({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(initialStudents)

  const addStudent = (newStudentData: Omit<Student, 'id' | 'projected' | 'risk' | 'trend'>) => {
    const newStudent: Student = {
      ...newStudentData,
      id: Math.random().toString(36).substr(2, 9),
      projected: newStudentData.attendance,
      risk: getRiskLevel(newStudentData.attendance),
      trend: 0
    }
    setStudents(prev => [newStudent, ...prev])
  }

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  }

  const markPresent = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const newAtt = Math.min(100, s.attendance + 2)
        return { ...s, attendance: Number(newAtt.toFixed(2)), risk: getRiskLevel(newAtt) }
      }
      return s
    }))
  }

  return (
    <AppContext.Provider value={{ students, addStudent, deleteStudent, markPresent }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within Providers')
  return context
}
