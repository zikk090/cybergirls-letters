import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CG</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-slate-100">CyberGirls</span>
          </div>
          <Link
            href="/status"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            Track my request
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium px-3 py-1 rounded-full mb-6">
            CyberSafe Foundation Alumni Services
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Recommendation Letter Requests
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-300 mb-2">
            For CyberGirls alumni applying to schools, jobs, or other opportunities.
          </p>
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-10">
            Please allow at least <strong>two weeks</strong> before your deadline.
            Have your CyberGirls admission number ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit a Request
            </Link>
            <Link
              href="/status"
              className="inline-flex items-center justify-center px-8 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-semibold rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Track My Request
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 text-center mb-10">
            How it works
          </h2>
          <div className="grid sm:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Submit Your Request",
                desc: "Fill out the form with your details and upload your drafted letter.",
              },
              {
                step: "2",
                title: "We Verify",
                desc: "The team confirms your records and program participation.",
              },
              {
                step: "3",
                title: "We Polish the Letter",
                desc: "Your draft is reviewed and improved, then sent to CyberSafe for signing.",
              },
              {
                step: "4",
                title: "You Receive It",
                desc: "The signed letter is sent to you or directly to the organisation.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 py-6 px-4 text-center text-sm text-gray-500 dark:text-slate-400">
        Questions? Email{" "}
        <a
          href="mailto:alumni@cybersafefoundation.org"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          alumni@cybersafefoundation.org
        </a>
      </footer>
    </main>
  );
}
