import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap"><div className="narrow auth-card card center">
      <h1>Page not found</h1>
      <p style={{ margin: '12px 0 20px' }}>That page doesn't exist or isn't available to you.</p>
      <Link className="btn dark" href="/">Back to the Alliance</Link>
    </div></div>
  );
}
