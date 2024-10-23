import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams,useOutletContext } from 'react-router-dom';

function BlogPage() {
  const {title} = useParams();

  const data = useOutletContext();
  console.log(data);

  const extractTitle = (title)=>{
    const parser = new DOMParser();

    // Parse the HTML string into a document
    const doc = parser.parseFromString(title, 'text/html');

    // Extract the text content
    const plainText = doc.body.textContent;

    return plainText.replace(/\s+/g,'-');
  }

  const [blogData,setBlogData] = useState({});
  

  useEffect(()=>{
    if(data?.blogs){
        const blogfound = data?.blogs.find(b=>{
            const blogTitle = extractTitle(b.title);
            const parsedTitle = blogTitle.replace(/\s+/g, '-');
            return parsedTitle === title;
        })
        setBlogData(blogfound);
      }
  },[])
 
  return (
    <div className='m-2 p-2'>
        <iframe
            srcDoc={blogData.content}
            title={title}
            style={{ width: '500px', height: '500px', border: 'none' }}
        />
    </div>
  )
}

export default BlogPage