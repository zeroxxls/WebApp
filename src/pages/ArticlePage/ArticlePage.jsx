import React from 'react'
import { NewsContent, NewsGridSection } from '../../modules/News'
import { Footer } from '../../modules/Footer'

export const ArticlePage = () => {
  return (
    <div>
        <NewsContent/>
        <NewsGridSection/>
        <Footer/>
    </div>
  )
}
