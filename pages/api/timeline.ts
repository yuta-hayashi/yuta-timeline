import type { NextApiRequest, NextApiResponse } from 'next'
import {
  TimeLine,
  Article,
  SourceSite,
  SourceSiteType,
} from '../../types/timeline'
import Parser from 'rss-parser'
import Crypto from 'crypto'

const RSSList: { url: string; source: SourceSiteType }[] = [
  {
    url: 'https://blog.yuta.run/rss.xml',
    source: SourceSite.YutasBlog,
  },
  {
    url: 'https://qiita.com/HYuta999/feed',
    source: SourceSite.Qiita,
  },
  {
    url: 'https://zenn.dev/hyuta/feed',
    source: SourceSite.Zenn,
  },
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TimeLine>
) {
  const response = await getTimeline()
  res.status(200).json(response)
}

export async function getTimeline(): Promise<TimeLine> {
  let articles: Article[] = []
  for await (const rss of RSSList) {
    const siteArticles = await fetchRss(rss.url, rss.source)
    articles.push.apply(articles, siteArticles)
  }
  articles.sort((a, b) => (new Date(a.pubDate) > new Date(b.pubDate) ? -1 : 1))
  return { articles: articles }
}

async function fetchRss(
  url: string,
  source: SourceSiteType
): Promise<Article[]> {
  const parser = new Parser()
  const feed = await parser.parseURL(url).catch((err) => {
    throw err
  })

  const artileList = feed.items.map((item) => {
    return {
      id: Crypto.createHash('md5')
        .update(item.pubDate! + item.title)
        .digest('hex'),
      title: item.title!,
      pubDate: item.pubDate!,
      link: item.link!,
      content: item.content!.slice(0, 100),
      source: source,
    }
  })
  return artileList
}
