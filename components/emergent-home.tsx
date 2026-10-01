'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Mic,
  Paperclip,
  Shuffle,
  Sparkles,
  X,
} from 'lucide-react'

const promptIdeas = [
  'Tutor marketplace for a single subject',
  'Portfolio dashboard for a crypto investor',
  'CRM for a salon',
  'Wholesale order form for an indie food brand',
  'Client gallery for a wedding photographer',
]

const showcaseItems = [
  ['https://assets.emergent.sh/assets/showcase/thumbnail/auramax-headphone.png', 'Auramax headphone website', 'Landing Pages', true],
  ['https://assets.emergent.sh/assets/showcase/thumbnail/ops-manager_v2.png', 'Ops manager', 'Advanced Apps', true],
  ['https://assets.emergent.sh/assets/showcase/thumbnail/meditation-app.png', 'Meditation app', 'Mobile Apps', false],
  ['https://assets.emergent.sh/assets/showcase/thumbnail/Ocean-research-platform.png', 'Ocean research platform', 'Advanced Apps', true],
  ['https://assets.emergent.sh/assets/showcase/thumbnail/cinematic-spiderman-launch-website.png', 'Spiderman launch website', 'Landing Pages', true],
  ['https://assets.emergent.sh/assets/showcase/thumbnail/world-map-memory.png', 'Location based memory app', 'Personal Tools', true],
] as const

function Header() {
  return (
    <header id="global-header" data-testid="global-header-root" className="z-[10000] overflow-hidden max-md:bg-background sticky">
      <div className="flex items-center justify-between pr-2 max-md:pl-2 h-[56px] md:h-[56px] md:max-h-[56px] max-md:border-b max-md:border-header-bottom-border">
        <div className="flex-1 h-full flex md:items-end overflow-hidden md:mr-4 w-full md:max-w-[calc(100%-280px)]">
          <button type="button" title="Back to Home" data-testid="tab-mobile-back-home" className="z-10 flex items-center justify-center flex-shrink-0 rounded-full h-9 w-9 hover:bg-secondary/50 md:hidden bg-tabbar-btn-bg">
            <ArrowLeft aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2 px-3 text-sm text-foreground/70">
            <Sparkles aria-hidden="true" />
            <span>Emergent</span>
            <ChevronRight aria-hidden="true" />
            <span>Home</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" title="Upgrade Plan" className="relative flex h-8 justify-center items-center rounded-full font-[600] text-[14px] text-buy-credits-btn-text px-[12px] gap-[4px]">
            Upgrade Plan
          </button>
          <button type="button" title="Account menu" data-testid="menubar-avatar-button" className="inline-flex items-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-20 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground gap-2 relative h-8 w-8 min-h-8 min-w-8 p-0 rounded-full overflow-hidden shadow-none border-0 bg-menu-bg [box-shadow:var(--header-icon-btn-shadow)] hover:bg-menu-btn-bg justify-center">
            <CircleUserRound aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

function PromptComposer() {
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState<'web' | 'mobile'>('web')

  return (
    <section className="flex w-full max-w-[760px] flex-col items-center gap-6 px-4">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-foreground/50">Start with one prompt. You can change everything later.</p>
        <h1 className="text-3xl font-medium tracking-tight md:text-5xl">What do you want to build first, pravin?</h1>
        <p className="text-sm text-foreground/50">You have received 10 free credits for your first prompt</p>
      </div>
      <div className="flex w-full max-w-[680px] flex-col overflow-hidden rounded-[12px] border border-border bg-textarea-bg shadow-xl">
        <div className="flex border-b border-border/60">
          <button type="button" onClick={() => setMode('web')} data-testid="main-task-tab-desktop-fullstack" className="group relative flex h-[36px] shrink basis-[140px] grow-0 items-center justify-center gap-2 px-4 text-sm font-medium outline-none">
            <Sparkles aria-hidden="true" /> Web app
          </button>
          <button type="button" onClick={() => setMode('mobile')} data-testid="main-task-tab-desktop-mobile" className="group relative flex h-[36px] shrink basis-[140px] grow-0 items-center justify-center gap-2 px-4 text-sm font-medium outline-none">
            <CircleUserRound aria-hidden="true" /> Mobile app
          </button>
          <span className="ml-auto self-center pr-3 text-xs text-foreground/40">{mode === 'web' ? 'Web app' : 'Mobile app'}</span>
        </div>
        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe your idea we will bring it to life.." data-testid="main-task-input" className="flex rounded-md border-input ring-offset-background placeholder:text-white/20 focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 relative w-full bg-textarea-bg max-md:bg-textarea-bg-mobile rounded-t-[12px] text-txt-primary text-[16px] resize-none md:min-h-[100px] p-3 pb-4 max-md:pt-2 md:p-4 border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 caret-textarea-caret font-inter font-medium overflow-auto h-full min-h-[72px]" rows={3} />
        <div className="flex items-center gap-2 p-2">
          <button type="button" data-testid="chat-input-attach-button" className="p-2 pointer-events-auto rounded-[30px] group/paperclip flex items-center justify-center size-8 transition-colors duration-200 border border-transparent bg-transparent hover:bg-ds-surface-glass-heavy dark:hover:bg-white/10 dark:border-0 dark:bg-transparent" aria-label="Attach file"><Paperclip aria-hidden="true" /></button>
          <button type="button" title="Open agent and model menu" data-testid="chat-input-agent-model-menu-trigger" className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-transparent transition-colors duration-200 cursor-pointer hover:bg-ds-surface-glass-heavy dark:hover:bg-white/10 dark:border-0 dark:bg-transparent" aria-label="Choose model"><ChevronDown aria-hidden="true" /></button>
          <button type="button" data-testid="main-task-voice-record-button" className="flex size-8 shrink-0 items-center justify-center rounded-[30px] p-2 transition-colors duration-200 border border-transparent bg-transparent hover:bg-ds-surface-glass-heavy dark:border-0 dark:bg-transparent dark:hover:bg-white/10 text-control-icon" aria-label="Record voice"><Mic aria-hidden="true" /></button>
          <button type="button" data-testid="main-task-submit" disabled={!prompt.trim()} className="whitespace-nowrap text-sm font-medium ring-offset-background ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground hover:bg-primary/90 gap-2 relative h-[32px] w-[48px] shrink-0 rounded-[109.091px] p-0 transition-[color,opacity,box-shadow] duration-200 flex items-center overflow-hidden disabled:opacity-100 bg-textarea-submit-btn-bg-disabled cursor-not-allowed justify-center" aria-label="Submit prompt"><ArrowUp aria-hidden="true" /></button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button type="button" data-testid="home-new-prompt-chips-shuffle-button" className="group flex items-center gap-2 text-ds-caption text-ds-tertiary transition-colors hover:text-ds-secondary"><Shuffle aria-hidden="true" /> Not sure where to start? Try these</button>
        {promptIdeas.map((idea) => <button key={idea} type="button" onClick={() => setPrompt(idea)} className="flex items-center gap-1.5 rounded-[24px] border border-new-home-prompt-chip-border bg-new-home-prompt-chip-bg py-1 pl-2 pr-3 font-inter transition-colors hover:bg-new-home-prompt-chip-hover-bg">{idea}</button>)}
      </div>
    </section>
  )
}

function Showcase() {
  return (
    <section className="w-full max-w-6xl px-6 py-24">
      <div className="mb-8 flex items-end justify-between gap-4"><div><p className="mb-2 text-sm text-foreground/50">Showcase</p><h2 className="text-3xl font-medium">Explore what the community is building with Emergent.</h2></div><button type="button" className="hidden items-center gap-2 text-sm text-foreground/60 md:flex">View all <ChevronRight aria-hidden="true" /></button></div>
      <div className="mb-8 flex flex-wrap gap-2">{['All', 'Landing Pages', 'Advanced Apps', 'Business Tools', 'Personal Tools', 'Mobile Apps'].map((filter) => <button key={filter} type="button" className="rounded-full border border-border px-4 py-2 text-sm text-foreground/70 transition-colors hover:bg-secondary/50">{filter}</button>)}</div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{showcaseItems.map(([image, title, category, hasRemix]) => <article key={title} className="overflow-hidden rounded-[12px] border border-border bg-card p-3"><img className="rounded-[8px] w-full min-h-[200px] object-cover" src={image} alt={title} data-testid="showcase-card-image" /><div className="flex items-center justify-between gap-3 py-3"><div><h3 className="font-medium">{title}</h3><p className="text-sm text-foreground/50">{category}</p></div><div className="flex gap-1"><button type="button" className="flex rounded-[10px] py-2 items-center font-semibold text-[14px] gap-1 w-fit px-4">Preview</button>{hasRemix && <button type="button" className="flex rounded-[10px] py-2 items-center font-semibold text-[14px] gap-1 w-fit px-4">Remix</button>}</div></div></article>)}</div>
    </section>
  )
}

export function EmergentHome() {
  return <main className="font-sans antialiased min-h-screen bg-background text-foreground"><div className="fixed inset-0 pointer-events-none z-[-1] bg-[radial-gradient(circle_at_top,rgba(128,255,249,0.08),transparent_35%)]" /><Header /><div className="flex min-h-[calc(100vh-56px)] flex-col items-center"><div className="flex min-h-[620px] w-full flex-1 items-center justify-center"><PromptComposer /></div><Showcase /><section className="relative flex min-h-[480px] w-full items-center justify-center overflow-hidden bg-cta-bg"><div className="relative z-20 flex flex-col items-center justify-center w-full h-full"><div className="flex flex-col items-center"><div className="flex flex-col items-center md:gap-4"><h2 data-testid="cta-section-title" className="text-[40px] md:text-[80px] md:leading-[80px] font-medium text-cta-title-text">Start building with</h2><h2 className="text-cta-subtitle-text font-ndot text-[34px]  md:text-[72px] md:leading-[72px] uppercase">Emergent Today</h2></div><button data-testid="get-started-button" type="button" className="relative flex items-center gap-3 py-4 text-base font-semibold leading-6 tracking-wide transition-colors rounded-full mt-14 px-14 bg-cta-btn-bg text-cta-btn-text hover:bg-cta-btn-hover-bg get-started-button before:absolute before:inset-0 before:-m-1 before:rounded-full before:border before:border-cta-btn-ring before:-z-10">Keep Building</button></div></div></section></div></main>
}

export default EmergentHome
