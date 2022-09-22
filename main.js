// import sitemap from './Data/mdnSitemap.js';
// import fetch from "node-fetch";

// runBrowserCode();
// getRandomUrl();
console.log("I ran!");

fetchSiteDetails(getRandomUrl());

function runBrowserCode(url, titleText, description) {
    console.log('inside runBrowserCode with url:' + url)
    const mainDiv = document.createElement('div');
    mainDiv.classList.add("mainDiv")
    
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('titleDiv');
    const title = document.createElement('a');
    title.innerText = titleText;
    title.setAttribute("href", url);
    titleDiv.append(title);

    const snippetDiv = document.createElement('div');
    snippetDiv.classList.add('snippetDiv');
    const snippet = document.createElement('h2');
    snippet.innerHTML = description.innerText;
    snippetDiv.append(snippet);
    
    const urlDiv = document.createElement('div');
    urlDiv.classList.add('urlDiv');
    const urlContent = document.createElement('h5');
    urlContent.innerHTML = url;
    urlDiv.append(urlContent)
    
    mainDiv.append(titleDiv, snippetDiv, urlDiv);
    
    const targetDiv = document.querySelector("body > div.L3eUgb > div.o3j99.qarstb");
    targetDiv.append(mainDiv);
}

function getUrlsFromSitemap() 
{
    const allUrls = [];
    for (let i=0; i<sitemap.length; i++) {
        if (sitemap[i]==='h' && sitemap[i-1]==='>') {
            let j = i; 
            let currentStr = '';
            while(sitemap[j]!=='<') {
                currentStr += sitemap[j];
                j++;
            };
            // console.log(currentStr)
            allUrls.push(currentStr);
            i = j;
        }
    }
    return allUrls
}

function getRandomUrl()
{
    return selectRandom(getUrlsFromSitemap());
}

function selectRandom(array)
{
    let num = Math.floor(Math.random() * array.length)
    return array[num];
}

    
function fetchSiteDetails(url) {
    let str =  "https://cors-anywhere-drewdunne.herokuapp.com/"
    fetch(str+url)
   
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelectorAll('title')[0];
        const description = getDescription(doc);
        console.log('in getTitle:' + title.innerText)
        runBrowserCode(url, title.innerText, description);
      });
  }
  
// This one keeps the order the same as the URL list.
//   Promise.all(
//     allUrls.map((url) => getTitle(allUrls))
//   ).then((titles) => {
//     console.log(titles);
//   });

function getDescription(doc)
{
    //We can expand this to be smarter and include things like description, rather than intro, later.
    if(document.querySelector("#content > article > section:nth-child(4) > div > p:nth-child(1)"))
    
    return document.querySelector("#content > article > section:nth-child(4) > div > p:nth-child(1)");
    
    return doc.querySelector("#content > article > div.section-content > p");
    // doc.getElementsByClassName("main-page-content")[0].getAttribute("p")[0];
}

// "https://cors-anywhere-drewdunne.herokuapp.com/"










