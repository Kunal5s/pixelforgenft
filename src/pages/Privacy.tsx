
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-futuristic-black text-white">
      <Header />
      <main className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy <span className="text-futuristic-yellow">Policy</span></h1>
          
          <div className="glass-panel p-8 mb-10">
            <p className="text-sm text-white/60 mb-6">Last Updated: June 1, 2023</p>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                <p>Welcome to PixelForge AI's Privacy Policy. This policy describes how PixelForge AI ("we", "our", or "us") collects, uses, and shares your personal information when you use our services, including our website and AI image generation platform.</p>
                <p className="mt-2">We are committed to protecting your privacy and handling your data in an open and transparent manner. Please read this policy carefully to understand our practices regarding your personal data.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
                <p className="mb-2"><strong>2.1 Information You Provide to Us</strong></p>
                <p>We collect information you provide directly to us when you:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Create an account (name, email, password)</li>
                  <li>Use our image generation services (prompts, preferences)</li>
                  <li>Contact customer support (communication content)</li>
                  <li>Participate in surveys or promotions (responses, contact details)</li>
                  <li>Subscribe to newsletters (email address)</li>
                </ul>
                
                <p className="mb-2 mt-4"><strong>2.2 Information Collected Automatically</strong></p>
                <p>When you use our platform, we automatically collect certain information, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Usage data (features used, time spent, actions taken)</li>
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Location data (general location based on IP address)</li>
                  <li>Cookies and similar technologies (as explained in our Cookie Policy)</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Send you technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Develop new products and services</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                  <li>Personalize your experience and deliver content relevant to your interests</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">4. How We Share Your Information</h2>
                <p>We may share your personal information in the following circumstances:</p>
                
                <p className="mb-2 mt-4"><strong>4.1 Service Providers</strong></p>
                <p>We share information with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>
                
                <p className="mb-2 mt-4"><strong>4.2 Legal Requirements</strong></p>
                <p>We may disclose your information when we believe in good faith that disclosure is necessary to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Comply with applicable laws, regulations, legal processes, or governmental requests</li>
                  <li>Protect our rights, privacy, safety, or property</li>
                  <li>Detect, prevent, or address fraud and other illegal activity</li>
                </ul>
                
                <p className="mb-2 mt-4"><strong>4.3 Business Transfers</strong></p>
                <p>If we are involved in a merger, acquisition, financing, or sale of business assets, your information may be transferred as part of that transaction.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">5. Your Rights and Choices</h2>
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Access to your personal data</li>
                  <li>Correction of inaccurate or incomplete information</li>
                  <li>Deletion of your personal information</li>
                  <li>Objection to or restriction of certain processing</li>
                  <li>Data portability</li>
                  <li>Withdrawal of consent</li>
                </ul>
                <p className="mt-2">To exercise these rights, please contact us at privacy@pixelforgeai.com.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">7. International Transfers</h2>
                <p>Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. If we make significant changes, we will notify you by posting a notice on our website or sending you an email.</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p className="mt-2">
                  PixelForge AI<br />
                  privacy@pixelforgeai.com<br />
                  123 Tech Innovation Way<br />
                  San Francisco, CA 94103
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
