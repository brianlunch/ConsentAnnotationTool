// To make sure we can uniquely identify each screenshot tab, add an id as a
// query param to the url that displays the screenshot.
let id = 100;
let url = " ";
var images = []
chrome.browserAction.setBadgeText({text: (images.length).toString()});



chrome.contextMenus.create({
  id: "tool",
  title: "Open Annotation Tool with Screenshots",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "HowTo",
  title: "How to use the tool",
  contexts: ["all"]
});

chrome.contextMenus.create({
  id: "website",
  title: "Tool Website ",
  contexts: ["all"]
});




chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "tool") {
    chrome.tabs.create({ url: chrome.extension.getURL('index.html?id=' + id + '#/') }, (tab) => {
      targetId = tab.id;
      id++;
    });
  }

  if (info.menuItemId == "HowTo") {
    chrome.tabs.create({ url: "https://brianlunch.github.io/ConsentAnnotationToolSite/#/HowTo"}, (tab) => {
      targetId = tab.id;
      id++;
    });
  }

  if (info.menuItemId == "website") {
    chrome.tabs.create({ url: "https://brianlunch.github.io/ConsentAnnotationToolSite/#/"}, (tab) => {
      targetId = tab.id;
      id++;
    });
  }

});


chrome.runtime.onMessage.addListener((msg, sender, response) => {
  switch (msg.type) {
      case 'popupInit':
          response(images)
          console.log("hey")
          images=[]
          chrome.browserAction.setBadgeText({text: (images.length).toString()});
          break;
      default:
          response('unknown request');
          break;
  }
});




// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(() => {

  chrome.browserAction.setBadgeText({text: (images.length+1).toString()});

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    url = tabs[0].url;
    console.log(tabs);
    // use `url` here inside the callback because it's asynchronous!
    
   

    console.log(url);

    chrome.tabs.captureVisibleTab((screenshotUrl) => {

      const viewTabUrl = chrome.extension.getURL('index.html?id=' + id + '#/')

      
      console.log(screenshotUrl)
      let targetId = null;

      var time = new Date()
      time = time.toString();

      var imgObj={
        img:screenshotUrl,
        url: url,
        time: time
      }
      images.push(imgObj)

  

      //We open the tab URL by using the chrome tabs create method and passing it the
      // URL that we just created and we save the tab id that we get from this method
      // after the tab is created in the targetId variable.
    });
  });
});
