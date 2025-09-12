const DealCard = ({ deal }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex h-full flex-col rounded-xl border-[4px] border-black bg-white p-4 shadow-[6px_6px_0_#000]">
      {/* Media zone… (same as before) */}

      <div className="flex flex-1 flex-col">
        <h3 className="text-xl font-black">{deal.title}</h3>

        <div className="mt-auto flex flex-wrap gap-3 pt-4">
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl border-[4px] border-black bg-purple-500 px-4 py-2 font-black uppercase text-white shadow-[4px_4px_0_#000]"
          >
            Enter Draw
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="rounded-xl border-[4px] border-black bg-white p-6 shadow-[6px_6px_0_#000] w-full max-w-md">
            <h3 className="text-xl font-black mb-4">{deal.title}</h3>
            <form
              name="deal-entry"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="grid gap-3"
              onSubmit={() => setOpen(false)}
            >
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

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border-[3px] border-black bg-gray-300 px-3 py-1 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl border-[3px] border-black bg-yellow-300 px-3 py-1 font-bold shadow-[3px_3px_0_#000]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
