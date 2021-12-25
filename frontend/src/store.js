import { writable, derived, readable } from 'svelte/store';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const apiData = writable([]);
export const tasksData = writable([]);
export const accData = writable({});
export const provider = writable({});
export const client = readable(new effectsdk.EffectClient('jungle'));
/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const acc = derived(accData, ($accData) => {
  let storedAccount = window.localStorage.getItem('account');
  if($accData === null) {
    window.localStorage.setItem('account', '{}');
    return {}
  }
  if(Object.keys(JSON.parse_incl_func(storedAccount)).length != 0) {
    return JSON.parse_incl_func(storedAccount);
  }
  else {
    window.localStorage.setItem('account', JSON.stringify_incl_func($accData));
    return $accData;
  }
});
export const tasks = derived(tasksData, ($tasksData) => {
  return $tasksData
})
export const articles = derived(apiData, ($apiData) => {
  if ($apiData.articles){
    let arr = $apiData.articles.slice(0, 5)
    
    arr.forEach(article => {
      if (article.title.length > 62) {
        article.shortTitle = article.title.substr(0, 62);
        article.shortTitle = article.shortTitle.substr(
          0, Math.min(article.shortTitle.length, article.shortTitle.lastIndexOf(" "))) + "...";
      } else {
        article.shortTitle = null;
      }
    });
    return arr;
  }
  return []; // Default to empty array
});