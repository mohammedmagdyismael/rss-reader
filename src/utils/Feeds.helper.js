import { getContrastColor, getContrastColorDarkMode, stringToColor } from './Colors';
import { feedUrls } from './Feeds';

export const FETCH_FEED_INTERVAL = 60000;

export const getAggregatedFeedList = feeds => {
    const isDarkMode = true;
    const aggList = [];
    let aggListSorted = [];
    feeds.forEach(feed => {
      const feedTitle = feed?.feed?.title;
      const feedItems = feed?.items;
      
      feedItems.forEach(item => {
        const color = stringToColor(feedTitle);
        const textColor = isDarkMode ? getContrastColorDarkMode(color) : getContrastColor(color);
        aggList.push({
          feedTitle,
          textColor,
          color,
          ...item,
        })
      })
      aggListSorted = aggList.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    })
    return aggListSorted;
  };

  export const fetchFeeds = async callBack => {
    const promises = feedUrls.map(async (url) => {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
      const data = await response.json();
      return data;
    });  
    const parsedFeeds = await Promise.all(promises);
    if (callBack) callBack(getAggregatedFeedList(parsedFeeds));
  };