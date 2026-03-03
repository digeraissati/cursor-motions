import { motion } from 'framer-motion'

const SKILLS_REPO = 'https://github.com/patricio0312rev/skills'

export default function InstructionsBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      style={{
        marginBottom: '2rem',
        padding: '1.25rem 1.5rem',
        background: '#18181b',
        borderRadius: 12,
        border: '1px solid #27272a',
      }}
    >
      <h3
        style={{
          margin: '0 0 0.75rem',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#a1a1aa',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        How to use this repo in Cursor
      </h3>
      <ol
        style={{
          margin: 0,
          paddingLeft: '1.25rem',
          color: '#d4d4d8',
          fontSize: '0.9rem',
          lineHeight: 1.8,
        }}
      >
        <li>
          <strong>Add the skill to your project.</strong> Copy the skill folder(s) from{' '}
          <a href={SKILLS_REPO} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
            patricio0312rev/skills
          </a>{' '}
          into your project’s skills folder, for example:
          <pre
            style={{
              margin: '0.5rem 0 0',
              padding: '0.75rem 1rem',
              background: '#0f0f12',
              borderRadius: 8,
              fontSize: '0.8rem',
              overflow: 'auto',
              border: '1px solid #27272a',
            }}
          >
            {`# In your project root:
mkdir -p .agents/skills
# Then copy e.g. frontend/animation-micro-interaction-pack
# and frontend/framer-motion-animator into .agents/skills/`}
          </pre>
        </li>
        <li>
          <strong>In Cursor chat, ask for the motion you want.</strong> Mention the skill name or keywords so the AI uses the right skill. Examples:
          <pre
            style={{
              margin: '0.5rem 0 0',
              padding: '0.75rem 1rem',
              background: '#0f0f12',
              borderRadius: 8,
              fontSize: '0.8rem',
              overflow: 'auto',
              border: '1px solid #27272a',
            }}
          >
            {`"Use the animation-micro-interaction-pack skill to add a hover lift effect to my card."

"Use the framer-motion-animator skill to add a modal with backdrop and exit animation."

"Add micro-interactions to my buttons using the motion skills."`}
          </pre>
        </li>
        <li>
          <strong>Use the motion skills tab</strong> for when and how to use each one (by number), and the <strong>Demos</strong> tab to see what each pattern does.
        </li>
      </ol>
    </motion.div>
  )
}
