import NavigationRouters from './navigation';
import BasicRouters from './base'
export const NavConfigs = [...NavigationRouters,...BasicRouters];

console.log(NavConfigs);
const routers = NavConfigs.map(item => item.children).flat(Infinity);

export default routers;
