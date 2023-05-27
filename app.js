/**
 * 
 */
class App {
   /**
    * 
    * @param {string} siteName The name of the application.
    */
   constructor(siteName) {
      document.body.appendChild(new TopBar(siteName).element)
   }

   get content()
   {
      let ele = document.createElement('div')
      ele.id = 'content'
      return ele
   }

   get queryParams()
   {
      let result = { }
      const search = window.location.search.substring(1)
      if (search != ""){
         search.split('&').forEach((n) => {
            let arg = n.split('=')
            result[arg[0].toLocaleLowerCase()] = arg[1].toLocaleLowerCase()
         })
      }
      return result
   }

   async load(params)
   {
      let res
      switch(state.currentPage) {
         case 'home':
            res = {
               src: "./home/home.js",
               href: "./home/home.css",
               version: 0
            }
            break
         default:
            res = false
            break
      }
      
      if (!res) return
      
      await this.loadScripts(res)
      .then(async (page) => {
         document.body.appendChild(page.element)
         await page.load(this.queryParams)
      })
   }

   async loadScripts(resource)
   {
      return new Promise((resolve, reject) => {
         try {
            if(resource.href) {
               let ele = document.createElement('link')
               ele.setAttribute('rel', 'stylesheet')
               ele.setAttribute('href',`${resource.href}?v=${resource.version}`)
               document.head.appendChild(ele)
            }

            if(resource.src) {
               let scr = document.createElement('script')
               scr.setAttribute('async', true)
               scr.setAttribute('type','text/javascript')
               scr.setAttribute('src',`${resource.src}?v=${resource.version}`)
               scr.addEventListener('load',() => {
                  resolve(page)
               })
               document.head.appendChild(scr)
            }
         } catch (error) {
            reject(error)
         }
      })
   }
}

class TopBar {
   constructor(siteName) {
      this.siteName = siteName
   }

   get element()
   {
      let e = document.createElement('div')
      e.id = 'top-bar'
      e.appendChild(this.siteLabel)
      return e
   }
   
   get siteLabel()
   {
      let e = document.createElement('div')
      e.id = 'site-lbl'
      e.innerText = this.siteName;
      return e
   }
}

class PageBase {
   constructor(name) {
      this.pageName = name
      this.element = document.createElement('div')
      this.element.id = 'content'
    }

   /**
    * 
    */
   get element()
   {
     return document.createElement('div')
   }

   /**
    * Overridable method for implementations of the Page class.
    * This is called when the site is loaded. This should be 
    * overriden by the inheriting PageBase class if it needs
    * to perform any async loading.
    */
   async load() { }
}
