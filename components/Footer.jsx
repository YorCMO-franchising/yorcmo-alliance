import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="cols">
          <div>
            <Link className="brand" href="/"><b>yorCMO</b><span>Alliance</span></Link>
            <p className="tagline">Earn today. Scale tomorrow. Own the upside.</p>
            <p>You bring the expertise. We bring the leverage. You build the equity in your firm.</p>
          </div>
          <div>
            <h4>Alliance</h4>
            <Link href="/story">Our story</Link>
            <Link href="/membership">Membership</Link>
            <Link href="/marketplace">Marketplace</Link>
            <Link href="/operating-cmo">Operating CMO™</Link>
            <Link href="/join">Join</Link>
          </div>
          <div>
            <h4>Members</h4>
            <Link href="/login">Sign in</Link>
            <Link href="/member">Member area</Link>
            <a href="https://yorcmo.com/">yorcmo.com</a>
          </div>
        </div>
        <div className="legal">
          © {new Date().getFullYear()} yorCMO. All rights reserved. Membership is billed monthly; manage or cancel it from your account.
          Listings in the member marketplace are offered by independent members; terms are agreed between buyer and seller.
        </div>
      </div>
    </footer>
  );
}
