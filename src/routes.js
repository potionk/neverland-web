import React from 'react';

// Core UI
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// Neverland web
const Home = React.lazy(() => import('./views/Home/Home'));
const Free = React.lazy(() => import('./views/Community/Free/Free'));
const FreeBBS = React.lazy(() => import('./views/Community/Free/FreeBBS'));
const GameBBS = React.lazy(() => import('./views/Community/GameBBS/GameBBS'));
const Information = React.lazy(() => import('./views/Community/Information/Information'));
const Photo = React.lazy(() => import('./views/Community/Photo/Photo'));
const Travel = React.lazy(() => import('./views/Community/Travel/Travel'));
const Download = React.lazy(() => import('./views/Game/Download/Download'));
const Event = React.lazy(() => import('./views/Game/Event/Event'));
const Notice = React.lazy(() => import('./views/Game/Notice/Notice'));
const Ranking = React.lazy(() => import('./views/Game/Ranking/Ranking'));
const Update = React.lazy(() => import('./views/Game/Update/Update'));
const News = React.lazy(() => import('./views/News/News'));
const Write = React.lazy(() => import('./views/Community/Write'));
const COC = React.lazy(() => import('./views/COC/COC'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  // Neverland web
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', exact: true, name: 'Home', component: Home },
  { path: '/news', exact: true, name: 'News', component: News },
  { path: '/community/free', exact: true, name: 'Free', component: Free },
  { path: '/community/free:id', exact: true, name: 'Free', component: Free },
  { path: '/community/free/:id', exact: true, name: 'Free Details', component: FreeBBS },
  { path: '/community/gameBBS', exact: true, name: 'GameBBS', component: GameBBS },
  { path: '/community/information', exact: true, name: 'Information', component: Information },
  { path: '/community/photo', exact: true, name: 'HomPhotoe', component: Photo },
  { path: '/community/travel', exact: true, name: 'Travel', component: Travel },
  { path: '/game/download', exact: true, name: 'Home', component: Download },
  { path: '/game/event', exact: true, name: 'Event', component: Event },
  { path: '/game/notice', exact: true, name: 'Notice', component: Notice },
  { path: '/game/ranking', exact: true, name: 'Ranking', component: Ranking },
  { path: '/game/update', exact: true, name: 'Update', component: Update },
  { path: '/community/write', exact: true, name: 'Write', component: Write },
  { path: '/COC', exact: true, name: 'COC', component: COC },
  
  // Core UI
  { path: '/Page404', name: 'Page404', component: Page404 },
  { path: '/Page500', name: 'Page500', component: Page500 },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
