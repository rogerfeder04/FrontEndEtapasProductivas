import { router } from '@/routes/routes.js';  

const goToRoute = (routeName) => {
  router.push(routeName);
}

export default goToRoute;