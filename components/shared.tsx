import { Activity, AlertTriangle, Mail } from 'lucide-react'
import { Student } from './providers'

export function Donut({ value, color = '#ff453a' }: { value: number; color?: string }) {
  return (
    <div className="relative size-28 shrink-0">
      <div className="size-full rounded-full" style={{ background: `conic-gradient(${color} ${value * 3.6}deg, #333 ${value * 3.6}deg)` }} />
      <div className="absolute inset-[18px] rounded-full bg-[#111]" />
    </div>
  )
}

export function StudentMixDonut({ safe, atRisk, critical }: { safe: number, atRisk: number, critical: number }) {
  const total = safe + atRisk + critical || 1
  const safeDeg = (safe / total) * 360
  const atRiskDeg = (atRisk / total) * 360
  
  return (
    <div className="relative size-[100px] shrink-0">
      <div className="size-full rounded-full" style={{ background: `conic-gradient(#00c66b 0deg ${safeDeg}deg, #ff9500 ${safeDeg}deg ${safeDeg + atRiskDeg}deg, #ff453a ${safeDeg + atRiskDeg}deg 360deg)` }} />
      <div className="absolute inset-[16px] rounded-full bg-[#111]" />
    </div>
  )
}

export function AttendanceDonut({ value }: { value: number }) {
  return (
    <div className="relative size-[100px] shrink-0">
      <div className="size-full rounded-full" style={{ background: `conic-gradient(#0071e3 ${value * 3.6}deg, #333 ${value * 3.6}deg)` }} />
      <div className="absolute inset-[16px] rounded-full bg-[#111]" />
      <div className="absolute inset-0 flex items-center justify-center font-semibold text-lg text-white">{value.toFixed(0)}%</div>
    </div>
  )
}

export function MetricCard({ title, value, detail, icon: Icon = Activity, children }: { title: string; value: string; detail: string; icon?: typeof Activity; children?: React.ReactNode }) {
  return (
    <article className="h-[316px] overflow-hidden rounded-[28px] bg-[#111] border border-white/10 p-10 text-white shadow-2xl relative group hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between relative z-10">
        <p className="text-[15px] font-medium uppercase tracking-[0.04em] text-gray-400">{title}</p>
        <Icon className="size-5 text-gray-400" strokeWidth={1.5} />
      </div>
      <p className="mt-5 text-[48px] font-semibold leading-none tracking-[-0.06em] relative z-10">{value}</p>
      <p className="mt-4 text-[15px] leading-5 text-gray-400 relative z-10">{detail}</p>
      <div className="relative z-10">
        {children}
      </div>
    </article>
  )
}

export function AlertCard({ student, onAlert }: { student: Student, onAlert: () => void }) {
  const trendText = student.trend > 0 ? `+${student.trend}%` : `${student.trend}%`
  return (
    <article className="flex min-w-[420px] flex-1 flex-col rounded-[28px] bg-black border border-white/10 shadow-[0_0_40px_rgba(255,69,58,0.05)] p-12 text-white relative overflow-hidden group hover:border-[#ff453a]/50 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-b from-[#ff453a]/5 to-transparent pointer-events-none" />
      <p className="flex h-5 items-center gap-2 text-[13px] font-semibold uppercase leading-none tracking-[0.12em] text-[#ff453a] relative z-10">
        Critical shortage <AlertTriangle className="size-4" />
      </p>
      <h3 className="mt-8 flex h-14 items-center text-[48px] font-semibold leading-none tracking-[-0.06em] relative z-10">{student.name}</h3>
      <p className="mt-1 flex h-7 items-center text-[19px] leading-none text-white/55 relative z-10">{student.roll} · {student.department}</p>
      <div className="mt-10 flex min-h-[140px] items-center justify-between relative z-10">
        <div>
          <p className="flex items-baseline gap-3 text-[92px] font-semibold leading-none tracking-[-0.08em]">
            <span>{student.attendance}</span><span className="text-[48px] leading-none text-white/45">%</span>
          </p>
          <p className="mt-3 text-[15px] leading-none text-white/55">Projected: {student.projected}% · Trend {trendText}</p>
        </div>
        <Donut value={student.attendance} color="#ff453a" />
      </div>
      <button onClick={onAlert} className="mt-10 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-[17px] leading-none text-white relative z-10">
        <Mail className="size-5" />Send email alert
      </button>
    </article>
  )
}

export function RiskBadge({ risk }: { risk: string }) {
  const styles = risk === 'Critical' ? 'bg-[#ff453a]/20 text-[#ff453a] border border-[#ff453a]/30' : risk === 'At Risk' ? 'bg-[#ff9500]/20 text-[#ff9500] border border-[#ff9500]/30' : risk === 'Safe' ? 'bg-[#00c66b]/20 text-[#00c66b] border border-[#00c66b]/30' : 'bg-white/10 text-gray-400 border border-white/10'
  return <span className={`rounded-full px-3 py-1 text-[14px] font-semibold ${styles}`}>{risk}</span>
}
