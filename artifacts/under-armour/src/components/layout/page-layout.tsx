import Header from "@/components/header"
import Footer from "@/components/footer"

interface PageLayoutProps {
  activePage?: string
  children: React.ReactNode
}

export default function PageLayout({ activePage, children }: PageLayoutProps) {
  return (
    <>
      <Header activePage={activePage} />
      {children}
      <Footer />
    </>
  )
}
