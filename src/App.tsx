import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useCycle,
  LayoutGroup,
  Reorder,
  useScroll,
  useInView,
  useAnimate,
  useReducedMotion,
} from 'framer-motion'
import { useRef } from 'react'
import MotionSkillsPage from './MotionSkillsPage'
import InstructionsBox from './InstructionsBox'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { y: 12, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

type Page = 'demos' | 'skills'

export default function App() {
  const [page, setPage] = useState<Page>('demos')
  const [showPresence, setShowPresence] = useState(true)
  const [items, setItems] = useState(['Item A', 'Item B', 'Item C'])
  const [cycleIndex, cycle] = useCycle('idle', 'hover', 'tap')
  const [modalOpen, setModalOpen] = useState(false)
  const [swipeItems, setSwipeItems] = useState(['Swipe 1', 'Swipe 2', 'Swipe 3'])
  const [disabled, setDisabled] = useState(false)
  const [activeTab, setActiveTab] = useState<'a' | 'b' | 'c'>('a')
  const x = useMotionValue(0)
  const background = useTransform(
    x,
    [-120, 0, 120],
    ['#ef4444', '#22c55e', '#3b82f6']
  )
  const cardX = useMotionValue(0)
  const rotateY = useTransform(cardX, [-150, 150], [25, -25])
  const { scrollYProgress } = useScroll()
  const [scope, animate] = useAnimate()
  const shouldReduceMotion = useReducedMotion()
  const inViewRef = useRef<HTMLDivElement>(null)
  const inView = useInView(inViewRef, { once: true, margin: '-50px' })

  if (page === 'skills') {
    return (
      <div style={{ padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
        <nav style={navStyle}>
          <button
            type="button"
            onClick={() => setPage('demos')}
            style={navLinkStyle(false)}
          >
            Demos
          </button>
          <button
            type="button"
            onClick={() => setPage('skills')}
            style={navLinkStyle(true)}
          >
            Motion skills
          </button>
        </nav>
        <MotionSkillsPage />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <nav style={navStyle}>
        <button
          type="button"
          onClick={() => setPage('demos')}
          style={navLinkStyle(true)}
        >
          Demos
        </button>
        <button
          type="button"
          onClick={() => setPage('skills')}
          style={navLinkStyle(false)}
        >
          Motion skills
        </button>
      </nav>
      <motion.h1
        style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Framer Motion possibilities
      </motion.h1>
      <motion.p
        style={{ color: '#71717a', marginBottom: '2.5rem', fontSize: '0.95rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        This screen shows what you can do with the package you added.
      </motion.p>

      <InstructionsBox />

      {/* 1. Basic: initial → animate */}
      <Section title="1. Basic animation (initial → animate)">
        <motion.div
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </Section>

      {/* 2. Variants + stagger */}
      <Section title="2. Variants + stagger children">
        <motion.ul
          style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 8, flexWrap: 'wrap' }}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {['One', 'Two', 'Three', 'Four'].map((label) => (
            <motion.li
              key={label}
              variants={item}
              style={{
                padding: '10px 16px',
                background: '#27272a',
                borderRadius: 8,
                fontSize: '0.9rem',
              }}
            >
              {label}
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* 3. whileHover (scale + glow) */}
      <Section title="3. whileHover (scale + glow)">
        <motion.button
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            border: 'none',
            borderRadius: 10,
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          Hover me
        </motion.button>
      </Section>

      {/* 3b. Hover lift (translateY) */}
      <Section title="3b. Hover lift (translateY)">
        <motion.div
          style={{
            width: 100,
            padding: '14px 20px',
            background: '#27272a',
            borderRadius: 12,
            cursor: 'pointer',
            textAlign: 'center',
            fontWeight: 600,
          }}
          whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          Lift on hover
        </motion.div>
      </Section>

      {/* 3c. Hover color shift */}
      <Section title="3c. Hover color shift">
        <motion.div
          style={{
            width: 100,
            padding: '14px 20px',
            background: '#7c3aed',
            borderRadius: 12,
            cursor: 'pointer',
            textAlign: 'center',
            fontWeight: 600,
            color: 'white',
          }}
          whileHover={{ backgroundColor: '#a78bfa' }}
          transition={{ duration: 0.2 }}
        >
          Color shift
        </motion.div>
      </Section>

      {/* 4. whileTap */}
      <Section title="4. whileTap">
        <motion.div
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            background: '#ec4899',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <span style={{ color: 'white', fontWeight: 700 }}>Tap</span>
        </motion.div>
      </Section>

      {/* 4b. Ripple-style feedback (tap) */}
      <Section title="4b. Ripple-style feedback (tap)">
        <motion.button
          style={{
            padding: '14px 28px',
            background: '#0ea5e9',
            border: 'none',
            borderRadius: 12,
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          Click (ripple feel)
        </motion.button>
      </Section>

      {/* 5. whileFocus */}
      <Section title="5. whileFocus">
        <motion.input
          type="text"
          placeholder="Focus me"
          style={{
            padding: '12px 16px',
            borderRadius: 10,
            border: '2px solid #3f3f46',
            background: '#18181b',
            color: '#e4e4e7',
            fontSize: '1rem',
            outline: 'none',
            width: 200,
          }}
          whileFocus={{
            borderColor: '#22c55e',
            boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.2)',
          }}
        />
      </Section>

      {/* 6. Drag */}
      <Section title="6. Drag (+ whileDrag)">
        <motion.div
          style={{
            width: 72,
            height: 72,
            borderRadius: 14,
            background: '#f59e0b',
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f0f12',
            fontWeight: 700,
          }}
          drag
          dragConstraints={{ left: -80, right: 80, top: -40, bottom: 40 }}
          dragElastic={0.2}
          whileDrag={{
            scale: 1.1,
            boxShadow: '0 12px 28px rgba(245, 158, 11, 0.5)',
            cursor: 'grabbing',
          }}
        >
          Drag
        </motion.div>
      </Section>

      {/* 7. useMotionValue + useTransform (color from x) */}
      <Section title="7. useMotionValue + useTransform">
        <motion.div
          style={{
            width: 120,
            height: 56,
            borderRadius: 12,
            x,
            background,
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
          }}
          drag="x"
          dragConstraints={{ left: -120, right: 120 }}
          dragElastic={0.1}
          whileTap={{ scale: 1.02 }}
        >
          Drag me
        </motion.div>
      </Section>

      {/* 8. whileInView */}
      <Section title="8. whileInView">
        <motion.div
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
            borderRadius: 14,
            fontWeight: 600,
            color: 'white',
          }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          I animate when I enter the viewport
        </motion.div>
      </Section>

      {/* 8b. useInView (ref-based) */}
      <Section title="8b. useInView (ref-based)">
        <motion.div
          ref={inViewRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          style={{
            padding: '16px 20px',
            background: '#1e3a5f',
            borderRadius: 12,
            color: '#93c5fd',
            fontSize: '0.9rem',
          }}
        >
          I use useInView(ref) to animate when visible
        </motion.div>
      </Section>

      {/* Loading: Pulse, Skeleton, Progress bar */}
      <Section title="Loading — Pulse, Skeleton, Progress bar">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <motion.div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#3b82f6',
              }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Pulse</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <motion.div
              style={{ height: 12, borderRadius: 6, background: '#27272a', overflow: 'hidden' }}
              initial={{ opacity: 1 }}
            >
              <motion.div
                style={{
                  height: '100%',
                  width: '40%',
                  background: '#3f3f46',
                  borderRadius: 6,
                }}
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.div
              style={{ height: 12, borderRadius: 6, background: '#27272a', width: '70%' }}
            >
              <motion.div
                style={{
                  height: '100%',
                  width: '30%',
                  background: '#3f3f46',
                  borderRadius: 6,
                }}
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
            <span style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Skeleton wave</span>
          </div>
          <div style={{ width: '100%', maxWidth: 200 }}>
            <motion.div
              style={{
                height: 8,
                borderRadius: 4,
                background: '#27272a',
                overflow: 'hidden',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  width: '100%',
                  background: '#22c55e',
                  borderRadius: 4,
                  originX: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0.65 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              />
            </motion.div>
            <span style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>Progress bar</span>
          </div>
        </div>
      </Section>

      {/* 9. Layout animation */}
      <Section title="9. Layout animation (layout prop)">
        <LayoutGroup>
          <motion.div
            layout
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              padding: 12,
              background: '#18181b',
              borderRadius: 12,
            }}
          >
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                layout
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 10,
                  background: '#3f3f46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              >
                {n}
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
      </Section>

      {/* 9b. Shared layout (layoutId) — tabs */}
      <Section title="9b. Shared layout (layoutId) — tabs">
        <LayoutGroup>
          <div style={{ display: 'flex', gap: 4, background: '#18181b', padding: 4, borderRadius: 10, width: 'fit-content' }}>
            {(['a', 'b', 'c'] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                style={{
                  position: 'relative',
                  padding: '10px 20px',
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === id ? '#fff' : '#71717a',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                {activeTab === id && (
                  <motion.div
                    layoutId="tabBg"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#3f3f46',
                      borderRadius: 8,
                      zIndex: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>Tab {id.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </Section>

      {/* 10. AnimatePresence + exit */}
      <Section title="10. AnimatePresence + exit">
        <button
          type="button"
          onClick={() => setShowPresence((v) => !v)}
          style={{
            padding: '10px 20px',
            marginBottom: 12,
            background: '#27272a',
            border: '1px solid #3f3f46',
            borderRadius: 8,
            color: '#e4e4e7',
            cursor: 'pointer',
            fontSize: '0.9rem',
          }}
        >
          Toggle card
        </button>
        <AnimatePresence mode="wait">
          {showPresence ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              style={{
                padding: 20,
                background: '#22c55e',
                borderRadius: 12,
                color: 'white',
                fontWeight: 600,
              }}
            >
              I exit with an animation
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Section>

      {/* 10b. Modal with backdrop (AnimatePresence) */}
      <Section title="10b. Modal with backdrop (AnimatePresence)">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          style={{
            padding: '12px 24px',
            background: '#6366f1',
            border: 'none',
            borderRadius: 10,
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Open modal
        </button>
        <AnimatePresence>
          {modalOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setModalOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.5)',
                  zIndex: 40,
                }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    pointerEvents: 'auto',
                    background: '#18181b',
                    borderRadius: 16,
                    padding: 24,
                    maxWidth: 320,
                    border: '1px solid #3f3f46',
                  }}
                >
                  <p style={{ marginBottom: 16, fontWeight: 600 }}>Modal with backdrop</p>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    style={{
                      padding: '10px 20px',
                      background: '#3f3f46',
                      border: 'none',
                      borderRadius: 8,
                      color: '#e4e4e7',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Section>

      {/* Interactive variants (button with disabled) */}
      <Section title="Interactive variants (button states)">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <motion.button
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05 },
              tap: { scale: 0.95 },
              disabled: { opacity: 0.5, scale: 1 },
            }}
            initial="initial"
            animate={disabled ? 'disabled' : 'initial'}
            whileHover={disabled ? 'disabled' : 'hover'}
            whileTap={disabled ? 'disabled' : 'tap'}
            disabled={disabled}
            onClick={() => {}}
            style={{
              padding: '12px 24px',
              background: '#3b82f6',
              border: 'none',
              borderRadius: 10,
              color: 'white',
              fontWeight: 600,
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            Variant button
          </motion.button>
          <button
            type="button"
            onClick={() => setDisabled((d) => !d)}
            style={{
              padding: '8px 16px',
              background: '#27272a',
              border: '1px solid #3f3f46',
              borderRadius: 8,
              color: '#a1a1aa',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            {disabled ? 'Enable' : 'Disable'}
          </button>
        </div>
      </Section>

      {/* 11. Spring vs tween (transition type) */}
      <Section title="11. Spring vs tween (transition)">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <motion.div
            style={boxStyle}
            initial={false}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Spring
          </motion.div>
          <motion.div
            style={boxStyle}
            initial={false}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 6 }}
            transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
          >
            Tween
          </motion.div>
        </div>
      </Section>

      {/* 12. useCycle */}
      <Section title="12. useCycle (cycle state)">
        <motion.div
          style={{
            padding: '16px 24px',
            borderRadius: 12,
            background: cycleIndex === 'idle' ? '#3f3f46' : cycleIndex === 'hover' ? '#3b82f6' : '#ec4899',
            cursor: 'pointer',
            fontWeight: 600,
            color: 'white',
            maxWidth: 200,
          }}
          onClick={() => cycle()}
          animate={{
            scale: cycleIndex === 'tap' ? 0.96 : 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          State: {cycleIndex}
        </motion.div>
      </Section>

      {/* 13. Reorder */}
      <Section title="13. Reorder (drag to reorder)">
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          {items.map((value) => (
            <Reorder.Item
              key={value}
              value={value}
              style={{
                padding: '14px 18px',
                background: '#27272a',
                borderRadius: 10,
                cursor: 'grab',
                border: '1px solid #3f3f46',
              }}
              whileDrag={{ scale: 1.02, boxShadow: '0 8px 20px rgba(0,0,0,0.3)' }}
            >
              {value}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </Section>

      {/* Swipe to dismiss */}
      <Section title="Swipe to dismiss">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AnimatePresence>
            {swipeItems.map((value) => (
              <motion.div
                key={value}
                layout
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) setSwipeItems((prev) => prev.filter((i) => i !== value))
                }}
                style={{
                  padding: '14px 18px',
                  background: '#27272a',
                  borderRadius: 10,
                  cursor: 'grab',
                  border: '1px solid #3f3f46',
                }}
                exit={{ opacity: 0, x: -200 }}
                transition={{ duration: 0.2 }}
              >
                {value} — swipe left to remove
              </motion.div>
            ))}
          </AnimatePresence>
          {swipeItems.length === 0 && (
            <button
              type="button"
              onClick={() => setSwipeItems(['Swipe 1', 'Swipe 2', 'Swipe 3'])}
              style={{
                padding: '10px 20px',
                background: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: 8,
                color: '#a1a1aa',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Reset list
            </button>
          )}
        </div>
      </Section>

      {/* Scroll progress bar */}
      <Section title="Scroll progress bar (useScroll)">
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: '#27272a',
            zIndex: 100,
            originX: 0,
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: '#3b82f6',
              borderRadius: 2,
              originX: 0,
              scaleX: scrollYProgress,
            }}
          />
        </motion.div>
        <p style={{ color: '#71717a', fontSize: '0.9rem' }}>
          Scroll this page — the blue bar at the top shows scroll progress.
        </p>
      </Section>

      {/* useAnimate (imperative sequence) */}
      <Section title="useAnimate (imperative sequence)">
        <motion.button
          ref={scope}
          onClick={async () => {
            await animate(scope.current, { scale: 0.95 }, { duration: 0.1 })
            await animate(scope.current, { scale: 1 }, { type: 'spring', stiffness: 400 })
            await animate(scope.current, { backgroundColor: '#22c55e' }, { duration: 0.2 })
            await animate(scope.current, { backgroundColor: '#3b82f6' }, { duration: 0.3, delay: 0.5 })
          }}
          style={{
            padding: '12px 24px',
            background: '#3b82f6',
            border: 'none',
            borderRadius: 10,
            color: 'white',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Run sequence
        </motion.button>
      </Section>

      {/* Rotating card (useTransform from drag) */}
      <Section title="Rotating card (useTransform from drag)">
        <motion.div
          style={{
            width: 140,
            height: 180,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            cursor: 'grab',
            x: cardX,
            rotateY,
            transformPerspective: 300,
          }}
          drag="x"
          dragConstraints={{ left: -150, right: 150 }}
          dragElastic={0.1}
        />
      </Section>

      {/* Transition presets */}
      <Section title="Transition presets (spring, bouncy, smooth, snappy)">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Spring', t: { type: 'spring' as const, stiffness: 300, damping: 24 } },
            { label: 'Bouncy', t: { type: 'spring' as const, stiffness: 500, damping: 15 } },
            { label: 'Stiff', t: { type: 'spring' as const, stiffness: 700, damping: 30 } },
            { label: 'Smooth', t: { type: 'tween' as const, duration: 0.3, ease: 'easeInOut' as const } },
            { label: 'Snappy', t: { type: 'tween' as const, duration: 0.15, ease: [0.25, 0.1, 0.25, 1] as const } },
          ].map(({ label, t }) => (
            <motion.div
              key={label}
              style={{
                width: 72,
                height: 72,
                borderRadius: 12,
                background: '#3f3f46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.1 }}
              transition={t}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* useReducedMotion */}
      <Section title="useReducedMotion (accessibility)">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          style={{
            padding: '16px 20px',
            background: '#1e293b',
            borderRadius: 12,
            border: '1px solid #334155',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            This block animates with reduced motion if your system preference is set.
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            Reduced: {String(!!shouldReduceMotion)}
          </p>
        </motion.div>
      </Section>

      {/* Entrance variants: slide-in, zoom-in */}
      <Section title="Entrance variants (slide-in, zoom-in)">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '12px 16px',
              background: '#374151',
              borderRadius: 10,
              fontSize: '0.85rem',
            }}
          >
            Slide in left
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '12px 16px',
              background: '#374151',
              borderRadius: 10,
              fontSize: '0.85rem',
            }}
          >
            Slide in right
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '12px 16px',
              background: '#374151',
              borderRadius: 10,
              fontSize: '0.85rem',
            }}
          >
            Zoom in
          </motion.div>
        </div>
      </Section>

      <div style={{ height: 80 }} />
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: '#a1a1aa',
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

const boxStyle: React.CSSProperties = {
  width: 80,
  height: 80,
  borderRadius: 12,
  background: '#3f3f46',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
}

const navStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  marginBottom: '1.5rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #27272a',
}

function navLinkStyle(active: boolean): React.CSSProperties {
  return {
    padding: '8px 16px',
    border: 'none',
    borderRadius: 8,
    background: active ? '#3f3f46' : 'transparent',
    color: active ? '#fff' : '#71717a',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
  }
}
