import React, {useContext} from 'react';
import { FaArrowLeft } from "react-icons/fa";
import article from '../Images/article.png';
import  AppContext  from '../Context/AppContext';
import Loader from './Loader';
const Articles = () => {
  const {articlesData, setIsOpen, setPopupHeader, setPopupContent} = useContext(AppContext)
  const handleArticleClick = (header, content) => {
    setPopupHeader(header)
    setPopupContent(content)
    setIsOpen(true)
  }
  return (
    <>
      {!articlesData?
        <Loader/>
        :
        <section className='articles'>
          {
            articlesData.main_article &&
            <article className='article block'>
              <div className="col">
                <span className='rounded'>Business</span>
                <h2>{articlesData.main_article.title}</h2>
                <p>{articlesData.main_article.body.slice(0, articlesData.min_body_length)}....</p>
                <div className='footer' 
                  onClick={()=>handleArticleClick(articlesData.main_article.title, articlesData.main_article.body)}>
                  <p style={{direction:"ltr"}}>{articlesData.main_article.created_at}</p>
                  <FaArrowLeft/>
                </div>
              </div>
              <img style={{maxWidth:"631px", maxHeight:"389px"}} src={articlesData.main_article.image_url} alt="article-image" />
            </article>
          }
          {
            articlesData.articles.length > 0 &&
            Array.from({ length: Math.ceil(articlesData.articles.length / 2) }, (_, index) => {
              const firstArticle = articlesData.articles[index * 2];
              const secondArticle = articlesData.articles[index * 2 + 1];
              return (
                <div className="row-article" key={index}>
                  {firstArticle && (
                    <article  className='article'>
                      <img style={{maxHeight:'355px'}} src={firstArticle.image_url} alt="article-image" />
                      <div className="col">
                        <h2>{firstArticle.title}</h2>
                        <p>{firstArticle.body.slice(0, articlesData.min_body_length)}....</p>
                        <div className='footer'
                          onClick={() => handleArticleClick(firstArticle.title, firstArticle.body)}>
                          <span style={{ direction: "ltr" }}>{firstArticle.created_at}</span>
                          <FaArrowLeft />
                        </div>
                      </div>
                    </article>
                  )}
                  {secondArticle && (
                    <article className='article'>
                      <img style={{maxHeight:'355px'}} src={secondArticle.image_url} alt="article-image" />
                      <div className="col">
                        <h2>{secondArticle.title}</h2>
                        <p>{secondArticle.body.slice(0, articlesData.min_body_length)}....</p>
                        <div className='footer'
                          onClick={() => handleArticleClick(secondArticle.title, secondArticle.body)}>
                          <span style={{ direction: "ltr" }}>{secondArticle.created_at}</span>
                          <FaArrowLeft />
                        </div>
                      </div>
                    </article>
                  )}
                </div>
              );
            })
          }
        </section>
      }
    </>
  )
}

export default Articles
