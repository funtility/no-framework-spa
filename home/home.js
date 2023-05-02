class HomePage extends PageBase {
   constructor()
   {
      super()
      console.log(`HomePage.constructor:${Date.now()}`)
      this.element.innerText ="Home Page"
   }

   async load(parameters)
   {
      if(parameters) {
         console.log(parameters)
      }
   }
}

page = new HomePage()