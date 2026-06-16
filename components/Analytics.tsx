'use client'

import { useEffect } from 'react'
import Script from 'next/script'

interface AnalyticsProps {
  gaId?: string
  posthogKey?: string
}

export function Analytics({ gaId, posthogKey }: AnalyticsProps) {
  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined') {
      const handleRouteChange = () => {
        if (gaId && window.gtag) {
          window.gtag('config', gaId, {
            page_location: window.location.href,
            page_title: document.title,
          })
        }
      }

      // Track initial page view
      handleRouteChange()

      // Listen for route changes (for SPA navigation)
      window.addEventListener('popstate', handleRouteChange)
      
      return () => {
        window.removeEventListener('popstate', handleRouteChange)
      }
    }
  }, [gaId])

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_location: window.location.href,
                page_title: document.title,
              });
            `}
          </Script>
        </>
      )}
      
      {posthogKey && (
        <Script id="posthog-analytics" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);var n=t;if("undefined"!=typeof e)try{n=t[e]}catch(t){n=void 0}return n}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('${posthogKey}', {api_host: 'https://app.posthog.com'})
          `}
        </Script>
      )}
    </>
  )
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    posthog: any
  }
}