import { requireMember } from '@/lib/auth';
import { ADD_ONS, OFFERINGS, priceIdFor, stripeConfigured } from '@/lib/config';
import { startAddOnCheckout, openBillingPortal } from '@/lib/actions/billing';

export const metadata = { title: 'yorCMO services' };

const LIVE = ['active', 'trialing', 'past_due'];

export default async function Services({ searchParams }) {
  const sp = await searchParams;
  const { supabase, user, profile } = await requireMember('/member/services');
  const { data: subs } = await supabase.from('member_services').select('service_key, status').eq('profile_id', user.id);
  const has = (k) => (subs || []).some((s) => s.service_key === k && LIVE.includes(s.status));
  return (
    <>
      <div className="page-head"><div><div className="kicker">From yorCMO</div><h1>CORE and shared services</h1><p className="muted">Billed monthly. Each is optional and separately cancellable from Billing.</p></div></div>
      {sp?.purchased && OFFERINGS[sp.purchased] && <div className="alert ok">Thanks! {OFFERINGS[sp.purchased].name} is being activated. We'll be in touch to get you set up.</div>}
      {sp?.error && <div className="alert err">That service isn't available online yet. Contact the yorCMO team.</div>}
      <div className="grid g3">
        {ADD_ONS.map((k) => {
          const o = OFFERINGS[k];
          const available = stripeConfigured && priceIdFor(k);
          return (
            <div className="card listing" key={k}>
              <div className="top"><span className="type">yorCMO</span>{has(k) && <span className="status active">Active</span>}</div>
              <h3>{o.name}</h3>
              <p>{o.summary}</p>
              <div className="meta">
                <span className="lp">{o.price} <small>{o.unit}</small></span>
                {has(k) ? (
                  profile.stripe_customer_id && <form action={openBillingPortal}><button className="btn sm outline" type="submit">Manage</button></form>
                ) : available ? (
                  <form action={startAddOnCheckout}><input type="hidden" name="service_key" value={k} /><button className="btn sm dark" type="submit">Add to my firm</button></form>
                ) : <span className="small muted">Coming soon</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="callout" style={{ marginTop: 28 }}>
        <strong>Custom and niche COREs.</strong> Market-priced custom COREs pay a 20% commission on sales, and members who help build one earn 10%. Talk to the yorCMO team about building yours.
      </div>
    </>
  );
}
