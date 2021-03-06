import type { NextPage } from 'next'
import Head from 'next/head'
import { config } from '../config'
import { TimeLine, Article } from '../types/timeline'
import { getTimeline } from './api/timeline'
import dayjs from 'dayjs'
import styles from '../styles/Home.module.css'
import { time } from 'console'

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
        <h1 className={styles.title}>π€ π» π π£ π</h1>
        <p className={styles.name}>Yuta Hayashi</p>
        <p className={styles.description}>
          γγγγγͺγγ¨γ«ι’εΏγγγWeb Engineerγ§γγ
          <br />
          ζθΏγ―Flutterγ§γ’γγͺγιηΊγγγ3Dγθ§¦γ£γ¦γΏγγγγ¦γγΎγγ
        </p>

        <p className={styles.name}>Timeline</p>
        {timeline.articles.map((article) => {
          return <TimeLineItem key={article.id} article={article} />
        })}
      </main>

      <footer className={styles.footer}>
        <p>Β© {new Date().getFullYear()} Yuta Hayashi</p>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const timeline = await getTimeline()
  return {
    props: {
      timeline: timeline,
    },
  }
}

export default Home
