# Setup
- npm install
- npm run dev
 
# High overview
- index.html = entrypoint, has only div#app
- main.js = Router, it decides which controller to load
- controllers/*.js = Controllers for different pages
  - they load data and load that data into a view
  - they are also responsible for mapping DOM events to actual actions which they do in the function `setupListeners()` (like filters changing, clicking an article, or saving form data)
- views/*.js = View Pages, These get the data from the controller and use ViewComponents to show that data 
- views/components/*.js = View Components, these are the blocks like "header", "filters", "chips" on the main page
  - These are the ones that actually produce HTML for the user
  - They also link the click events in the browser to the actions in the controllers
- models/article.js = The Article model, it uses both the LocalStore (store.js) and the SpaceFlightNews API to get and save articles
- services/event_bus.js = An Event Listener, other classes can use it to listen to events without knowing where they are coming from.
  - ie: In views/components/filters.js, when the filters change it triggers an event "filters-changed". In the IndexController (in setupListeners()) we listen for that event to reload the articles with the news filters
- services.store.js = Like a Database, but we save things into the LocalStorage of the users' browser, we save:
  - the current filters
  - the custom articles
  - and the view counts for the articles
- services/space_*.js = Classes to communicate with the APIs of SpaceX and SpaceFlightNews
- utils/functions.js = Just some functions that are needed in multiple files, for now only a "pluralize" function to decide whether we should use singular or plural form of a word.
