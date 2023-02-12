import React, { useState, useEffect } from 'react'

function GridContent(){

const [data, setData] = useState([]);
const [search, setSearch] = useState('');

const fetchData = () => {
    const URL = 'https://jsonplaceholder.typicode.com/photos';
    fetch(URL)
    .then(response => response.json())
    .then((data) => setData(data))
    .catch((error) => console.log(error));  
}
  
useEffect(() => {
    fetchData()
},[])

const handleSearch = (e) => {
e.preventDefault();
setSearch(e.target.value.toLowerCase());
}

const Ascending = () => {
    const sortedData = [...data].sort((a,b) => {
    if(a.title < b.title) return -1;
    return 1;
}) 
setData(sortedData)
} 

const Descending = () => {
    const sortedData = [...data].sort((a,b) => {
    if(a.title < b.title) return 1;
    return -1;
}) 
setData(sortedData)
}


  return (
    <>
    <header className='wrapper'>
        <h2>ID</h2>
        <h2>Photo</h2>
        <h2>Logo</h2>
        <h2 className='title-class'>Title</h2>
        <div className='btn-wrapper'>
          <button className='up' onClick={Ascending}>Up</button>
          <button className='down' onClick={Descending}>Down</button>
        </div>
    </header>
    <div className='main-container'>
    <input type="text" placeholder='Search' onChange={handleSearch}/>
    {data.filter((item) => {
        if(search === '') 
        return item
        else if (item.title.includes(search)){
        return search
    }})
      .slice(0,200)
      .filter((item) => {return item.title.length < 60})
      .map((item) => {
        return <div className='container' key={item.id}>
        <p className='id-style'>{item.id}</p>
        <p className='title-style'>{item.title}</p>
        <img className='url-style' alt='bigger-logo' src={item.url}/>
        <img className='logo-style' alt='smaller-logo' src={item.thumbnailUrl}/>
      </div>
    })}
    </div>
    </>
    )
}

export default GridContent;
