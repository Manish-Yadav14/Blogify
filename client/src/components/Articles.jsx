import React from 'react'
import { useOutletContext,useParams,Link } from 'react-router-dom';


function Article() {
  const {slug} = useParams();

  const data = useOutletContext();

  const extractTitle = (title)=>{
    const parser = new DOMParser();

    // Parse the HTML string into a document
    const doc = parser.parseFromString(title, 'text/html');

    // Extract the text content
    const plainText = doc.body.textContent;

    return plainText.replace(/\s+/g,'-');
  }

  return (
    <div className='m-4 p-4'>
        <h1 className='text-2xl font-bold py-4'>Articles</h1>
        {(data.blogs).map(elem => (
        <Link 
          to={`/${slug}/${extractTitle(elem.title)}`}
          key={elem.blogId} 
          className="m-2 p-2 border-2 w-[500px] h-[100px] flex flex-col">
          <h1 className='text-xl font-mono font-semibold' dangerouslySetInnerHTML={{ __html: elem.title }} />
          <p>
            {new Date(elem.updatedAt)
              .toLocaleDateString('en-GB', 
              {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </Link>
      ))}
        
    </div>
  )
}

export default Article;