const DealCard = ({ deal }) => {
  const now = new Date();
  const exp = deal.expires ? new Date(deal.expires) : null;
  const isExpired = exp ? now > exp : false;

  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  return (
    <div className="flex h-full flex-col rounded-xl border-[4px] border-black bg-white p-4 shadow-[6px_6px_0_#000]">
      {/* Media zone (same as before) */}
      <div className="rounded-lg border-[3px] border-black bg-gray-50 p-2 mb-4">
        <div className="w-full overflow-hidden rounded-md">
          {deal.platform === "instagram" && deal.postUrl ? (
            <InstagramEmbed url={deal.postUrl} width={"100%"} />
          ) : deal.platform === "tiktok" && deal.postUrl ? (
            <TikTokEmbed url={deal.postUrl} width={325} />
          ) : deal.image ? (
            <img src={deal.image} alt={deal.title} className="w-full rounded-md" />
          ) : (
            <div className="grid h-48 place-items-center text-gray-500">No media</div>
          )}
        </div>
      </div>

      {/* Text + actions */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-black">{deal.title}</h3>
        <div className="mt-2 flex items-center gap-2">
          {isExpired ? <Badge tone="gray">Expired</Badge> : <Badge>Today’s Deal</Badge>}
          {deal.platform && <Badge tone="purple">{deal.platform}</Badge>}
        </div>
        {deal.price != null && (
          <div className="mt-3 text-lg font-bold">${Number(deal.price).toFixed(2)}</div>
        )}

        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          {deal.postUrl && (
            <a
              href={deal.postUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-[4px] border-black bg-yellow-300 px-4 py-2 font-black uppercase shadow-[4px_4px_0_#000]"
            >
              View Post
            </a>
          )}
          <button
            onClick={() => { setOpen(true); setDone(false); }}
            className="rounded-xl border-[4px] border-black bg-purple-500 px-4 py-2 font-black uppercase text-white shadow-[4px_4px_0_#000]"
          >
            Enter Draw
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-md rounded-xl border-[4px] border-black bg-white p-6 shadow-[6px_6px_0_#000]">
            {!done ? (
              <>
                <h3 className="text-xl font-black mb-4">{deal.title}</h3>
                <form
                  name="deal-entry"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  className="grid gap-3"
                  onSubmit={(e) => {
                    setSubmitting(true);
                    // Let native POST submit; the page won’t navigate because SPA, but Netlify captures it.
                    // After a short delay, show local success.
                    setTimeout(() => { setSubmitting(false); setDone(true); }, 700);
                  }}
                >
                  {/* Netlify requirements */}
                  <input type="hidden" name="form-name" value="deal-entry" />
                  <input type="hidden" name="deal" value={deal.title} />
                  <p className="hidden">
                    <label>Don’t fill this out: <input name="bot-field" /></label>
                  </p>

                  <label className="font-black">
                    Name
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-1 w-full border-[3px] border-black p-2"
                    />
                  </label>

                  <label className="font-black">
                    Email
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-1 w-full border-[3px] border-black p-2"
                    />
                  </label>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="rounded-xl border-[3px] border-black bg-gray-300 px-3 py-1 font-bold"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl border-[3px] border-black bg-yellow-300 px-3 py-1 font-bold shadow-[3px_3px_0_#000]"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : "Submit"}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="grid gap-4 text-center">
                <div className="text-2xl font-black">You’re in the draw! 🎉</div>
                <button
                  onClick={() => setOpen(false)}
                  className="mx-auto rounded-xl border-[3px] border-black bg-yellow-300 px-4 py-2 font-black shadow-[3px_3px_0_#000]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
