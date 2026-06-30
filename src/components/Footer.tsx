import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-accent py-8 md:py-12 px-4 md:px-8 w-full mt-auto">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-[24px] p-6 md:p-12 mb-4 md:mb-6 flex flex-col md:flex-row justify-between gap-6 md:gap-12">
          
          {/* Logo */}
          <div className="shrink-0 md:w-56">
            <Link href="/" className="flex items-center justify-center md:justify-start">
              <Image src="/logo-footer-transparent.png" alt="Aura Dental Logo" width={250} height={250} className="w-auto h-28 md:h-48 object-contain" />
            </Link>
          </div>

          {/* Links Grid */}
          <div className="flex-grow grid grid-cols-2 md:grid-cols-5 gap-y-5 md:gap-y-8 gap-x-4 md:gap-6">
            
            {/* Quick Links */}
            <div className="flex flex-col space-y-2 md:space-y-3">
              <h4 className="font-semibold text-accent text-[15px] mb-1">Quick Links:</h4>
              <Link href="/" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">Contact</Link>
            </div>

            {/* Legal */}
            <div className="flex flex-col space-y-2 md:space-y-3">
              <h4 className="font-semibold text-accent text-[15px] mb-1">Legal</h4>
              <Link href="/privacy" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/accessibility" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">Accessibility</Link>
            </div>

            {/* Services */}
            <div className="flex flex-col space-y-2 md:space-y-3">
              <h4 className="font-semibold text-accent text-[15px] mb-1">Services</h4>
              <Link href="/services" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">All Treatments</Link>
              <Link href="/before-after" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">Before & After</Link>
            </div>

            {/* Patient Resources */}
            <div className="flex flex-col space-y-2 md:space-y-3">
              <h4 className="font-semibold text-accent text-[15px] mb-1">Patient Resources</h4>
              <Link href="/new-patients" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">New Patients</Link>
              <Link href="/insurance-financing" className="text-[13px] font-medium text-black/80 hover:text-primary transition-colors">Insurance & Financing</Link>
            </div>

            {/* Social */}
            <div className="flex flex-col space-y-2 md:space-y-3">
              <h4 className="font-semibold text-accent text-[15px] mb-1">Social</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="text-black hover:text-primary transition-colors" aria-label="Twitter">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#" className="text-black hover:text-primary transition-colors" aria-label="Instagram">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="text-black hover:text-primary transition-colors" aria-label="Facebook">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" className="text-black hover:text-primary transition-colors" aria-label="Youtube">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="text-black hover:text-primary transition-colors" aria-label="TikTok">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.13-3.65-5.41-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
              </div>
            </div>
            
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center text-[11px] font-medium text-white/90 tracking-wide">
          © {new Date().getFullYear()} All rights Reserved • Aura • Dental Clinic • 75914
        </div>
      </div>
    </footer>
  );
}
