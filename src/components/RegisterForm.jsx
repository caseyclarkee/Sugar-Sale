import React, { useState } from "react";

function encode(data) {
  return Object.keys(data)
    .map(
      (key) =>
        encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
    )
    .join("&");
}

export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formName = form.getAttribute("name");
    const data = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": formName, ...Object.fromEntries(data) }),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error));
  };

  if (submitted) {
    return (
      <div className="bg-white border-[4px] border-black rounded-2xl shadow-[6px_6px_0_#000] p-6 max-w-md w-full">
        <h2 className="text-2xl font-black text-purple-700 mb-3">You’re in!</h2>
        <p className="font-medium">We’ll let you know when the sale drops.</p>
      </div>
    );
  }

  return (
    <form
      name="interest"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-white border-[4px] border-black rounded-2xl shadow-[6px_6px_0_#000] p-6 max-w-md w-full"
    >
      <input type="hidden" name="form-name" value="interest" />
      <p hidden>
        <label>
          Don’t fill this out if you’re human:
          <input name="bot-field" />
        </label>
      </p>
      <h2 className="text-2xl font-black mb-4 text-purple-700">Register your interest</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="border-[3px] border-black rounded-lg px-3 py-2 font-medium"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border-[3px] border-black rounded-lg px-3 py-2 font-medium"
        />
        <button
          type="submit"
          className="rounded-lg border-[3px] border-black bg-yellow-300 px-4 py-2 font-black uppercase shadow-[4px_4px_0_#000] hover:scale-105 transition-transform"
        >
          Notify Me
        </button>
      </div>
    </form>
  );
}
