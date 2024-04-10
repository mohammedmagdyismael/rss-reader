import { useState, useEffect } from 'react';
import { fetchFeeds, FETCH_FEED_INTERVAL } from './utils/Feeds.helper';
import './App.css';

const App = () => {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    fetchFeeds(setFeeds);
    setInterval(() => {
      fetchFeeds(setFeeds);
    }, FETCH_FEED_INTERVAL);
  }, []);

  return (
    <div className='container'>
      <h1 className='container-title'>My RSS Feeder</h1>
      <ul className='feeds-items-list'>
        {feeds.map((item, itemIndex) => (
          <li key={itemIndex} className='feed-item'>
            <div className='feed-meta-data'>
              <p className='feed-date'>{`${new Date(`${item.pubDate}Z`).toLocaleString()}`}</p>
              <p style={{ color: item.color }} >{`[${item.feedTitle}]`}</p>
            </div>
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
        {feeds?.length === 0 && (
          <p>Loading Feeds ...</p>
        )}
      </ul>
    </div>
  );
};

export default App;