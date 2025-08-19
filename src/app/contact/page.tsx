export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-zinc-400">Use this page to reach our team with questions or feedback.</p>
      <form className="space-y-4">
        <input type="text" placeholder="Company Email" className="w-full p-2 rounded bg-zinc-900 border border-zinc-800" />
        <input type="email" placeholder="Your Email" className="w-full p-2 rounded bg-zinc-900 border border-zinc-800" />
        <textarea placeholder="How can we help?" rows={4} className="w-full p-2 rounded bg-zinc-900 border border-zinc-800"></textarea>
        <button className="px-4 py-2 rounded bg-avalRed hover:brightness-110 text-white">Send</button>
      </form>
    </main>
  )
}
