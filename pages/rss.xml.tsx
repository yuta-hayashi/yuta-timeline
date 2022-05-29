import { GetServerSideProps } from 'next'
import React from 'react'
import { getTimeline } from './api/timeline'

const Sitemap: React.FC = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const timeline = await getTimeline()
  let items = ''
  timeline.articles.forEach((article) => {
    items += `<item>
          <title>${article.title}</title>
          <link>${article.link}</link>
          <description>${article.content}</description>
          <pubDate>${article.pubDate}</pubDate>
          <guid>${article.link}</guid>
      </item>`
  })

  if (res) {
    res.setHeader('Content-Type', 'text/xml')
    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>yuta.run timeline</title>
            <link>https://yuta.run</link>
            <description>yuta-hayashiのアウトプットを全部まとめたRSSです。</description>
            <language>ja</language>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
            <docs>https://yuta.run/rss.xml</docs>
        </channel>
        ${items}
    </rss>`)
    res.end()
  }
  return {
    props: {},
  }
}

export default Sitemap
