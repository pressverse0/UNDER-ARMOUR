import Header from "@/components/header"
import Footer from "@/components/footer"
import { usePageSeo } from "@/hooks/use-page-seo"

interface PageLayoutProps {
  activePage?: string
  seoTitle?: string
  seoDescription?: string
  children: React.ReactNode
}

export default function PageLayout({ activePage, seoTitle, seoDescription, children }: PageLayoutProps) {
  usePageSeo(seoTitle, seoDescription)
  return (
    <>
      <Header activePage={activePage} />
      {children}
      <Footer />
    </>
  )
}
