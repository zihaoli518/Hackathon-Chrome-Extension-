// import sitemap from './Data/mdnSitemap.js';
// import fetch from "node-fetch";

// runBrowserCode();
// getRandomUrl();
console.log("I ran!");

// moved main div outside our function so we can populate it with multiple articles 
const mainDiv = document.createElement('div');
mainDiv.classList.add("mainDiv")
const titleForMainDiv = document.createElement('h1');
titleForMainDiv.innerText = "Today's MDN"
mainDiv.append(titleForMainDiv);

// progress tracker 
const progressTrackerDiv = document.createElement('div'); 
progressTrackerDiv.classList.add('progressTrackerDiv');

const titleForProgressTrackerDiv = document.createElement('h1');
titleForProgressTrackerDiv.innerText = "Your Progress: "

const progressDivHTML = document.createElement('div');
const progressHTMLKey = document.createElement('h4');
progressHTMLKey.innerText = "HTML: ";
const progressHTMLValue = document.createElement('h4');
progressHTMLValue.setAttribute('id', 'progressHTMLValue');
progressHTMLValue.innerText = localStorage.getItem("HTML")
progressDivHTML.append(progressHTMLKey, progressHTMLValue);

const progressDivCSS = document.createElement('div');
const progressCSSKey = document.createElement('h4');
progressCSSKey.innerText = "CSS: ";
const progressCSSValue = document.createElement('h4');
progressCSSValue.setAttribute('id', 'progressCSSValue');
progressCSSValue.innerText = localStorage.getItem("CSS")
progressDivCSS.append(progressCSSKey, progressCSSValue); 

const progressDivJAVASCRIPT = document.createElement('div');
const progressJAVASCRIPTKey = document.createElement('h4');
progressJAVASCRIPTKey.innerText = "Javascript: ";
const progressJAVASCRIPTValue = document.createElement('h4');
progressJAVASCRIPTValue.innerText = localStorage.getItem("Javascript")
progressJAVASCRIPTValue.setAttribute('id', 'progressJAVASCRIPTValue');

progressDivJAVASCRIPT.append(progressJAVASCRIPTKey, progressJAVASCRIPTValue); 

progressTrackerDiv.append(titleForProgressTrackerDiv, progressDivHTML, progressDivCSS, progressDivJAVASCRIPT)
// appending the 2 divs we created 
const targetDivMain = document.querySelector("body > div.L3eUgb > div.o3j99.qarstb");
targetDivMain.append(mainDiv);

const targetDivProgress = document.querySelector("body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf")
targetDivProgress.append(progressTrackerDiv);


// render articles!! 

const numberOfArticles = 3;
for (let i=0; i<numberOfArticles; i++) {
    fetchSiteDetails(getRandomUrl())
}

// functions 
function runBrowserCode(url, titleText, description) {
    // console.log('inside runBrowserCode with url:' + url)
    const articleDiv = document.createElement('div');
    articleDiv.classList.add("articleDiv")

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('titleDiv');
    const title = document.createElement('a');
    title.innerText = titleText;
    title.setAttribute("href", url);
    titleDiv.append(title);
    // add event listener 
// 
    // When a MDN link is click, trigger updateProgress function
    // title.addEventListener("click", updateProgress(url))
    articleDiv.addEventListener("click", updateProgress(url))
    
    const snippetDiv = document.createElement('div');
    snippetDiv.classList.add('snippetDiv');
    const snippet = document.createElement('h2');
    let descriptionText = (description.innerText).toString().replace(/[\r\n]/gm, '');
    while (descriptionText.charCodeAt(0)<65 || descriptionText.charCodeAt(0)>90) {
        descriptionText = descriptionText.slice(1)
    }
    snippet.innerText = descriptionText;
    console.log(descriptionText)
    // cut the length of snippet if too long 
    if (snippet.innerText.length>300) {
        snippet.innerText = snippet.innerText.substring(0, 300)
    }
    snippetDiv.append(snippet);
    
    const urlDiv = document.createElement('div');
    // urlDiv.classList.add('urlDiv');
    // const urlContent = document.createElement('h5');
    // urlContent.innerHTML = url;
    // urlDiv.append(urlContent)
    
    articleDiv.append(titleDiv, snippetDiv, urlDiv);
    mainDiv.append(articleDiv)
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
        // console.log('in getTitle:' + title.innerText)
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

function determineType(url) {
    // const type = url.slice(45, 48);
    // return type

    // Find matching pattern in url and return corresponding type
    if (url.match('/Web/JavaScript')) {
        return 'JavaScript';
      } else if (url.match('/Web/HTML')) {
        return 'HTML';
      } else if (url.match('/Web/CSS')) {
        return 'CSS';
      } else if (url.match('/Web/API')) {
        return 'API';
      } else if (url.match('/Web/HTTP')) {
        return 'HTTP';
      }
}

// setting initial state for progress
localStorage.setItem('HTML', 0);
localStorage.setItem('CSS', 0);
localStorage.setItem('Javascript', 0);

function updateProgress(url) {
    const type = determineType(url);
        console.log('progress updated')    
    if (type==='HTML') {
        let count = Number(localStorage.getItem("HTML"))
        localStorage.setItem('HTML', count+1)
    } else if (type==='CSS') {
        let count = Number(localStorage.getItem("CSS"))
        localStorage.setItem('CSS', count+1)
    } else if (type==='JavaScript') {
        let count = Number(localStorage.getItem("Javascript"))
        localStorage.setItem('Javascript', count+1)
    }
    const updateHTML = document.getElementById('progressHTMLValue');
    updateHTML.innerText = localStorage.getItem('HTML');
    const updateCSS = document.getElementById('progressCSSValue');
    updateCSS.innerText = localStorage.getItem('CSS');
    const updateJavascript = document.getElementById('progressJAVASCRIPTValue');
    updateJavascript.innerText = localStorage.getItem('Javascript');
}






