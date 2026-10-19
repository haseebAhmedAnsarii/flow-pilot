import { Contact } from './components/Contact'
import { FeatureTabs } from './components/FeatureTabs'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Pricing } from './components/Pricing'
import { TestimonialSlider } from './components/TestimonialSlider'
import { TrustedCompanies } from './components/TrustedCompanies'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustedCompanies />
        <Features />
        <FeatureTabs />
        <TestimonialSlider />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
