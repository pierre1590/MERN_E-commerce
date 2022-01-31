import React from 'react';
import {Helmet} from 'react-helmet'

 const Meta = ({title,description,keywords}) => {
  return (
  <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
  </Helmet>
  )
}


Meta.defaultProps = {
    title: 'Welcome to E-Shop',
    keywords: 'electronics, shop, online, cheap',
    description: 'E-Shop is an online electronics store'
}

export default Meta
