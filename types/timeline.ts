export interface TimeLine {
  articles: Article[]
  //   hasNext: boolean
  //   offset: Number
}

export interface Article {
  id: string
  title: string
  pubDate: Date
  link: string
  content: string
  source: SourceSiteType
}

export const SourceSite = {
  YutasBlog: 'YutasBlog',
  Zenn: 'Zenn',
  Qiita: 'Qiita',
} as const
export type SourceSiteType = typeof SourceSite[keyof typeof SourceSite]
