
const spaceId="uv5m8wm25wjm"
const environmentId = "master"
const accessToken ="_k6hRP4RUC4QfRTCxS74RswE6JdfV-hqy_d3pSqhM-Q"

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}`
// console.log(url)
const sectionTag = document.querySelector("section.grid")

const grabData = function () {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
              // store all the assets somewhere
        const assets = data.includes.Asset
      
        // turn our contentful data into something more useful    
          return data.items.fields.map(item => { 
          // set a default
          let imageUrl = "image1.png"
          
          // find the items image id
          const imageId = item.sys.id
          
          // look for something in the assets that matches
          const imageData = assets.find(asset => {
            return asset.sys.id == imageId
          })
          
          // if it does, make it that url
          if (imageData) {
            imageUrl = imageData.fields.file.url
          }
          
          item.fields.image = imageUrl
          return item.fields
        })
      })
  }
  
  // run this grabData function on load
  grabData().then(data => {
    // in here, do something with the returned data
    // console.log(data)
    
    // remove the loader
    sectionTag.innerHTML = ""
    
    data.forEach(item => {
      sectionTag.innerHTML = sectionTag.innerHTML + `
              <div class="item">
                  <img src="${item.image}">
                  
                  <div class="title">
                      <h2>${item.title}</h2>
                      <p>${item.price}</p>
                  </div>
  
                  <p>${item.description}</p>				
            </div>
          `
    })
  })
  
  
  
  
  
  
  
  
  
  
  