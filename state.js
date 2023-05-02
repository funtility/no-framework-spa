/**
 * Use the State class for persisting data across pages.
 * The state class also has a localstorage interface for
 * accessing Window.localStorage to persiste state
 * accross sesssions.
 */
class State {
   #name = ""
   constructor(name) {
      this.#name = name
      this.load()
   }

   #currentPage
   get currentPage() { return this.#currentPage }
   set currentPage(value)
   {
      this.#currentPage = value
      this.save()
   }

   //#region Local Storage

   load() {
      let local = localStorage.getItem(this.#name)
      if (local == null)
      {
         this.#currentPage = "home"
      }
      else
      {
         local = JSON.parse(local)
         this.#currentPage = local.currentPage
      }
      this.save()
   }

   save()
   {
      localStorage.setItem(this.#name,this.toJson())
   }

   toJson()
   {
      return `{
         "currentPage": "${this.currentPage}"
      }`
   }

   //#endregion
}
