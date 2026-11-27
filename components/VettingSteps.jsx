import { VETTING_STEPS } from '@/lib/config';

export default function VettingSteps({ dark = false }) {
  return (
    <ol className={`steps${dark ? ' dark-steps' : ''}`}>
      {VETTING_STEPS.map(([name, body]) => (
        <li key={name}><strong>{name}</strong><span>{body}</span></li>
      ))}
    </ol>
  );
}
