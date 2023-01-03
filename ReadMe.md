#HR PORTAL : AN APPLICATION FOR MAKING HR DAILY RESPONSIBILITIES EASY

#TECH USED:
React native, Redux created with createStore, Axios, Thunk middleware (for Async fetch api req)

#FOLDER STRUCTURE :

Src folder =>

Src > Components => Custom UI compoenets
..> CustomButton.js => custom (normal length) button
..> CustomNavigationBar.js => custom nav bar (located at top)
..> DrawerContnt.js => drawer nav bar content (nav structure) (left hand side)
..> DrawerNavigation.js => nav links/routes, AntDesign(add button)
..> SearchBox.js => custom search bar
..> SmallButton.js => custom small button (eg. Edit, Delete)

Src > Constants =>
..> assets > images => images used in app
..> appstate.js => App state const for displaying private or public nav stack
..> route.js => App route const for navigation
..> Styles.js => golbal styling props
..> Theme.js => Styling for app UI

Src > context => context API
..> appContext.js => context state for app maybe...? (if you know please fill here)
..> authContext.js => context state for authentication which decide wheather user is logged in or not

Src > Navigation => For all the navigation
..> PrivateStack => Nav stack visible/in use when user is logged in
..> PublicStack => Nav stack visible/in use when user is logged out
..> Rootroute > navigation_reference.js => navigation reference/constants
..> Rootroute > rootNavigation.js => Logic which decide which nav stack (public or private) to display based on token

Src > Redux => Folder for all redux stuff
..> Actions => All the Actions, Action creators for redux
..> Reducers => All reducers for redux
..> ActionConstants.js => All action const

Src > Screens => All UI screen components

Src > Util =>
..> Configure.js => Base URL constant
..> helper.js => Input field validation const
..> request.js => Axios instance , interceptor with tokens for making API requests and better error handling
..> requestFormData.js => Same as request.js but with form data

App.js => rootComponent for app + redux store
