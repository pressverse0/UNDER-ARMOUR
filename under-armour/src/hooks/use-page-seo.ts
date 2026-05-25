import { useEffect } from "react"

const BRAND = "Under Armour®"

export function usePageSeo(title?: string, description?: string) {
  useEffect(() => {
    if (!title) return

    const fullTitle = title.includes("Under Armour") ? title : `${title} | ${BRAND}`
    const prevTitle = document.title
    document.title = fullTitle

    const prevDesc = (document.querySelector('meta[name="description"]') as HTMLMetaElement)?.content ?? ""
    const prevOgTitle = (document.querySelector('meta[property="og:title"]') as HTMLMetaElement)?.content ?? ""
    const prevOgDesc = (document.querySelector('meta[property="og:description"]') as HTMLMetaElement)?.content ?? ""
    const prevTwitterTitle = (document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement)?.content ?? ""
    const prevTwitterDesc = (document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement)?.content ?? ""

    const set = (sel: string, attr: string, val: string) => {
      const el = document.querySelector(sel) as HTMLMetaElement | null
      if (el) el.setAttribute(attr, val)
    }

    set('meta[property="og:title"]', "content", fullTitle)
    set('meta[name="twitter:title"]', "content", fullTitle)

    if (description) {
      set('meta[name="description"]', "content", description)
      set('meta[property="og:description"]', "content", description)
      set('meta[name="twitter:description"]', "content", description)
    }

    return () => {
      document.title = prevTitle
      set('meta[name="description"]', "content", prevDesc)
      set('meta[property="og:title"]', "content", prevOgTitle)
      set('meta[property="og:description"]', "content", prevOgDesc)
      set('meta[name="twitter:title"]', "content", prevTwitterTitle)
      set('meta[name="twitter:description"]', "content", prevTwitterDesc)
    }
  }, [title, description])
}
