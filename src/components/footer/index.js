function Footer() {
  return (
    <footer className="w-full bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

      
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold tracking-tight">
              <span className="text-white">JOBS</span>
              <span className="text-blue-500">CO</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-400">
              Find top roles at product-based companies. Build your career
              with opportunities that actually excite you.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">12k+ Jobs</span>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">98% Success</span>
              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-400">3.4k Companies</span>
            </div>
          </div>

      
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="h-px w-4 bg-gray-700" />
                  Home
                </a>
              </li>
              <li>
                <a href="/jobs" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="h-px w-4 bg-gray-700" />
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/membership" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="h-px w-4 bg-gray-700" />
                  Membership
                </a>
              </li>
              <li>
                <a href="/account" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="h-px w-4 bg-gray-700" />
                  My Account
                </a>
              </li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@jobsco.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                India
              </li>
            </ul>

            <div className="flex gap-3 pt-1">
              <a href="https://github.com/rajdeepietlko27/JOBSCO" target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all duration-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/rajdeep-singh-615157282/" target="_blank" rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-all duration-200">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

    
        <div className="my-10 border-t border-gray-800" />

       
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} JOBSCO. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;