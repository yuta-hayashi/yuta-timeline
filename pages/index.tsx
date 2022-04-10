import type { NextPage } from 'next'
import Head from 'next/head'
import { config } from '../config'
import { TimeLine, Article } from '../types/timeline'
import dayjs from 'dayjs'
import styles from '../styles/Home.module.css'

interface Props {
  timeline: TimeLine
}

const TimeLineItem: React.VFC<{ article: Article }> = ({ article }) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_title_box}>
        <img
          className={styles.card_title_icon}
          src={`/icons/${article.source}.png`}
          alt="article icon"
        />
        <a
          href={article.link}
          className={styles.card_title}
          target="_blank"
          rel="noopener noreferrer"
        >
          {article.title}
        </a>
      </div>
      <p className={styles.card_description}>
        {article.content.slice(0, 120)} ...
      </p>
      <p className={styles.card_date}>
        Published a post on {article.source}{' '}
        {dayjs(article.pubDate).format('M/ D/ YYYY')}
      </p>
    </div>
  )
}

const Home: NextPage<Props> = ({ timeline }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>yuta.run</title>
        <meta name="description" content="yuta's website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>🤓 💻 🍛 🍣 🐑</h1>
        <p className={styles.name}>Yuta Hayashi</p>
        <p className={styles.description}>
          いろいろなことに関心があるWeb Engineerです。
          <br />
          最近はFlutterでアプリを開発したり3Dを触ってみたりしています。
        </p>

        <p className={styles.name}>Timeline</p>
        {timeline.articles.map((article) => {
          return <TimeLineItem key={article.id} article={article} />
        })}
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Yuta Hayashi</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${config.siteRood}/api/timeline`)
  const timeline = await res.json()
  return {
    props: {
      timeline: timeline,
    },
  }
}

export default Home
