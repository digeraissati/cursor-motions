import { motion } from 'framer-motion'
import InstructionsBox from './InstructionsBox'

const SKILLS_REPO = 'https://github.com/patricio0312rev/skills'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
}

const item = {
  hidden: { y: 8, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const motionByNumber: Array<{
  number: string
  name: string
  when: string
  how: string
}> = [
  {
    number: '1',
    name: 'Basic animation (initial → animate)',
    when: 'When something should animate as soon as it appears on screen (cards, images, headings).',
    how: 'Set initial and animate on a motion component; use transition for duration and easing. Prefer opacity + transform (e.g. y, scale) for performance.',
  },
  {
    number: '2',
    name: 'Variants + stagger children',
    when: 'When you have a list or group of items that should appear one after another (menus, feature lists, tags).',
    how: 'Define a container variant with transition.staggerChildren (and optional delayChildren). Give each child an item variant. Use initial="hidden" and animate="visible" on the parent.',
  },
  {
    number: '3',
    name: 'whileHover (scale + glow)',
    when: 'When you want buttons or clickable cards to feel responsive and “lifted” on hover.',
    how: 'Add whileHover with scale (e.g. 1.05) and/or boxShadow. Use transition type "spring" for a natural feel.',
  },
  {
    number: '3b',
    name: 'Hover lift (translateY)',
    when: 'When you want an element to move up slightly on hover (tiles, cards, nav items).',
    how: 'Use whileHover with y: -4 (or similar) and optionally a stronger boxShadow. Pair with spring transition.',
  },
  {
    number: '3c',
    name: 'Hover color shift',
    when: 'When you want a clear hover state without moving or scaling (links, pills, tags).',
    how: 'Use whileHover with backgroundColor (or color). Keep duration short (e.g. 0.2s) so it feels instant.',
  },
  {
    number: '4',
    name: 'whileTap',
    when: 'When the user presses a button or tappable area and you want instant feedback.',
    how: 'Add whileTap with a slight scale down (e.g. 0.92–0.97). Use with whileHover for full press feedback.',
  },
  {
    number: '4b',
    name: 'Ripple-style feedback (tap)',
    when: 'When you want a “pressed” feel without a full ripple effect (material-style buttons).',
    how: 'Use whileTap with scale (e.g. 0.97). You can combine with a pseudo-ripple using a child that scales from center if needed.',
  },
  {
    number: '5',
    name: 'whileFocus',
    when: 'When you need visible focus state for inputs or custom focusable elements (accessibility).',
    how: 'Add whileFocus with borderColor and/or boxShadow so keyboard users see where focus is.',
  },
  {
    number: '6',
    name: 'Drag (+ whileDrag)',
    when: 'When the user should be able to drag an element (sliders, cards, reorderable items).',
    how: 'Set drag (or drag="x"/"y"). Use dragConstraints and dragElastic. Add whileDrag for scale or cursor change while dragging.',
  },
  {
    number: '7',
    name: 'useMotionValue + useTransform',
    when: 'When a value (color, rotation, opacity) should depend on another (e.g. drag position or scroll).',
    how: 'Create a motion value with useMotionValue, then useTransform to map it to another value. Pass both to style. Great for “drag to change color” or parallax.',
  },
  {
    number: '8',
    name: 'whileInView',
    when: 'When an element should animate only when it scrolls into view (sections, images, stats).',
    how: 'Use initial, whileInView, and viewport (e.g. once: true, amount: 0.5). No ref needed.',
  },
  {
    number: '8b',
    name: 'useInView (ref-based)',
    when: 'When you need to know “is this in view?” in state or for conditional logic (e.g. trigger one-off effects).',
    how: 'Call useInView(ref, { once, margin }). Use the returned boolean in animate. Attach ref to the element.',
  },
  {
    number: '—',
    name: 'Loading — Pulse, Skeleton, Progress bar',
    when: 'When content is loading: pulse for a single placeholder, skeleton wave for lines/blocks, progress bar for known duration.',
    how: 'Pulse: animate opacity between two values with repeat. Skeleton: animate a bar’s x (or gradient position) across the container. Progress: animate scaleX from 0 to 1 (or use a motion value tied to progress).',
  },
  {
    number: '9',
    name: 'Layout animation (layout prop)',
    when: 'When layout changes (flex wrap, add/remove items) and you want items to animate to new positions.',
    how: 'Add layout to motion components inside a LayoutGroup. Framer Motion will animate position/size changes. Use layout on both parent and children as needed.',
  },
  {
    number: '9b',
    name: 'Shared layout (layoutId) — tabs',
    when: 'When two elements are “the same” in different places (e.g. tab indicator, active underline) and should animate between positions.',
    how: 'Give the moving element the same layoutId on both tabs. Wrap in LayoutGroup. The indicator will animate when the active tab changes.',
  },
  {
    number: '10',
    name: 'AnimatePresence + exit',
    when: 'When an element is removed from the tree and you want it to animate out (cards, toasts, panels).',
    how: 'Wrap the conditional render in AnimatePresence. Add exit to the motion component. Use mode="wait" if only one child should be visible at a time.',
  },
  {
    number: '10b',
    name: 'Modal with backdrop (AnimatePresence)',
    when: 'When you show a modal or overlay that should fade in and out with a backdrop.',
    how: 'Render backdrop and modal inside AnimatePresence when open. Use initial/animate/exit on both. Backdrop often fades opacity; modal uses opacity + scale + y.',
  },
  {
    number: '—',
    name: 'Interactive variants (button states)',
    when: 'When a button has multiple visual states (idle, hover, tap, disabled) and you want one variant set for all.',
    how: 'Define variants (e.g. initial, hover, tap, disabled). Use initial, animate, whileHover, whileTap and pass the state (e.g. disabled) into animate. Lets you keep state logic in one place.',
  },
  {
    number: '11',
    name: 'Spring vs tween (transition)',
    when: 'When you need to choose how the animation feels: spring for bouncy/natural, tween for precise timing.',
    how: 'Use transition: { type: "spring", stiffness, damping } for spring; { type: "tween", duration, ease } for tween. Use spring for UI feedback; tween for consistent durations.',
  },
  {
    number: '12',
    name: 'useCycle (cycle state)',
    when: 'When you have a small set of states that cycle on click (e.g. idle → hover → tap, or toggle A/B).',
    how: "Call useCycle('state1', 'state2', ...). Use the returned [current, cycle] and call cycle() on click. Drive animate from the current state.",
  },
  {
    number: '13',
    name: 'Reorder (drag to reorder)',
    when: 'When the user should reorder a list by dragging (todo list, playlist, dashboard widgets).',
    how: 'Use Reorder.Group (axis, values, onReorder) and Reorder.Item (value). Keep values as a state array; onReorder updates it. Items animate to new positions automatically.',
  },
  {
    number: '—',
    name: 'Swipe to dismiss',
    when: 'When the user can swipe (e.g. left) to remove an item (list rows, notifications).',
    how: 'Use drag="x" and onDragEnd. If offset.x is past a threshold (e.g. -80), remove the item from state. Wrap list in AnimatePresence and add exit so removed items animate out.',
  },
  {
    number: '—',
    name: 'Scroll progress bar (useScroll)',
    when: 'When you want a progress indicator tied to how far the user has scrolled (reading progress, page indicator).',
    how: 'Use useScroll() and take scrollYProgress. Put it in style.scaleX on a fixed bar (originX: 0). The bar grows as the user scrolls down.',
  },
  {
    number: '—',
    name: 'useAnimate (imperative sequence)',
    when: 'When you need a fixed sequence of steps (e.g. button: press → bounce back → turn green → reset) that you trigger from code.',
    how: 'Call useAnimate() to get [scope, animate]. Attach ref={scope} to the element. In a handler, call await animate(ref, keyframes, options) in order. Good for multi-step feedback.',
  },
  {
    number: '—',
    name: 'Rotating card (useTransform from drag)',
    when: 'When you want 3D-style rotation (e.g. rotateY) driven by drag position (card flip feel, carousel).',
    how: 'Use useMotionValue for drag x, then useTransform(x, [xMin, xMax], [angleMin, angleMax]) for rotateY. Apply transformPerspective and the motion values to style.',
  },
  {
    number: '—',
    name: 'Transition presets (spring, bouncy, smooth, snappy)',
    when: 'When you want consistent motion feel across the app (e.g. all buttons use “snappy”, all modals use “smooth”).',
    how: 'Define preset objects (e.g. spring: { type: "spring", stiffness, damping }; snappy: { type: "tween", duration: 0.15, ease: [...] }). Pass the preset into transition.',
  },
  {
    number: '—',
    name: 'useReducedMotion (accessibility)',
    when: 'When you want to respect the user’s “Reduce motion” system preference for accessibility.',
    how: 'Call useReducedMotion(). If true, use shorter duration (e.g. 0), no movement (y: 0 instead of y: 20), or skip animation. Apply to initial/animate/transition.',
  },
  {
    number: '—',
    name: 'Entrance variants (slide-in, zoom-in)',
    when: 'When you want different entrance directions or effects (slide from left/right, zoom in, fade only).',
    how: 'Use initial with different values: slide left (x: -40), slide right (x: 40), zoom (scale: 0.8). Animate to opacity: 1, x: 0, scale: 1. Reuse as variants if you have many.',
  },
]

export default function MotionSkillsPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <motion.h1
        style={{ marginBottom: '0.5rem', fontSize: '1.75rem' }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Motion skills — when & how to use each
      </motion.h1>
      <motion.p
        style={{ color: '#71717a', marginBottom: '2rem', fontSize: '0.95rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        Each item matches the <strong>Demos</strong> tab by number. Use the number to find the live example.
      </motion.p>

      <InstructionsBox />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        {motionByNumber.map((entry) => (
          <motion.section
            key={entry.name}
            variants={item}
            style={{
              padding: '1rem 1.25rem',
              background: '#18181b',
              borderRadius: 12,
              border: '1px solid #27272a',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#71717a',
                  minWidth: 24,
                  textTransform: 'uppercase',
                }}
              >
                {entry.number}
              </span>
              <h2 style={entryTitleStyle}>{entry.name}</h2>
            </div>
            <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div>
                <dt style={dtStyle}>When to use</dt>
                <dd style={ddStyle}>{entry.when}</dd>
              </div>
              <div>
                <dt style={dtStyle}>How to use</dt>
                <dd style={ddStyle}>{entry.how}</dd>
              </div>
            </dl>
          </motion.section>
        ))}
      </motion.div>

      <motion.section
        style={{ marginTop: '2rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 style={sectionTitleStyle}>Best practices</h2>
        <ul style={listStyle}>
          <li>Use <strong>200–300ms</strong> for small micro-interactions.</li>
          <li>Animate <strong>transform</strong> and <strong>opacity</strong> (GPU-friendly); avoid animating width/height when possible.</li>
          <li>Use <strong>easing</strong> (ease-out, springs) so motion feels natural.</li>
          <li>Respect <strong>prefers-reduced-motion</strong> (e.g. useReducedMotion).</li>
        </ul>
      </motion.section>

      <motion.p
        style={{
          marginTop: '2rem',
          padding: '1rem',
          background: '#18181b',
          borderRadius: 12,
          fontSize: '0.9rem',
          color: '#a1a1aa',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <strong>Repo:</strong>{' '}
        <a href={SKILLS_REPO} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
          github.com/patricio0312rev/skills
        </a>
        {' '}— Frontend: <em>animation-micro-interaction-pack</em>, <em>framer-motion-animator</em>.
      </motion.p>

      <div style={{ height: 80 }} />
    </div>
  )
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  color: '#a1a1aa',
  marginBottom: '0.5rem',
}

const entryTitleStyle: React.CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  color: '#e4e4e7',
  margin: 0,
}

const dtStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#71717a',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: 0,
}

const ddStyle: React.CSSProperties = {
  margin: '2px 0 0',
  fontSize: '0.9rem',
  color: '#d4d4d8',
  lineHeight: 1.5,
}

const listStyle: React.CSSProperties = {
  margin: 0,
  paddingLeft: '1.25rem',
  color: '#d4d4d8',
  fontSize: '0.9rem',
  lineHeight: 1.7,
}
