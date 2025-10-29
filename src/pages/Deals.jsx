return (
  <section className="space-y-8 px-4 py-12 sm:px-8">
    <h2 className="text-4xl font-black uppercase text-yellow drop-shadow-[3px_3px_0_#000]">
      Gary's Sweet Deals
    </h2>

    {/* Mobile: single column, alternating Static then DOTW */}
    <div className="space-y-6 md:hidden">
      {staticDeals.map((s, i) => (
        <React.Fragment key={s.id}>
          <DealCard deal={s} />
          {weeklyDeals[i] && <DealCard deal={weeklyDeals[i]} />}
        </React.Fragment>
      ))}
    </div>

    {/* Medium (md): 2 columns — all Statics left, all DOTWs right */}
    <div className="hidden md:grid lg:hidden md:grid-cols-2 md:gap-6">
      {/* Left column: all 6 statics */}
      <div className="flex flex-col gap-6">
        {staticDeals.map((s) => (
          <DealCard key={s.id} deal={s} />
        ))}
      </div>

      {/* Right column: 4 DOTWs (in order) */}
      <div className="flex flex-col gap-6">
        {weeklyDeals.map((d, idx) => d && <DealCard key={d.id || idx} deal={d} />)}
      </div>
    </div>

    {/* Large (lg): 4 columns balanced (unchanged) */}
    <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
      {/* Column 1: S1, S3, S5 */}
      <div className="flex flex-col gap-6">
        {staticDeals[0] && <DealCard deal={staticDeals[0]} />}
        {staticDeals[2] && <DealCard deal={staticDeals[2]} />}
        {staticDeals[4] && <DealCard deal={staticDeals[4]} />}
      </div>

      {/* Column 2: S2, S4, S6 */}
      <div className="flex flex-col gap-6">
        {staticDeals[1] && <DealCard deal={staticDeals[1]} />}
        {staticDeals[3] && <DealCard deal={staticDeals[3]} />}
        {staticDeals[5] && <DealCard deal={staticDeals[5]} />}
      </div>

      {/* Column 3: D1, D3 */}
      <div className="flex flex-col gap-6">
        {weeklyDeals[0] && <DealCard deal={weeklyDeals[0]} />}
        {weeklyDeals[2] && <DealCard deal={weeklyDeals[2]} />}
      </div>

      {/* Column 4: D2, D4 */}
      <div className="flex flex-col gap-6">
        {weeklyDeals[1] && <DealCard deal={weeklyDeals[1]} />}
        {weeklyDeals[3] && <DealCard deal={weeklyDeals[3]} />}
      </div>
    </div>
  </section>
);

