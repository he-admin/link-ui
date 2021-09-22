import NavigationRouters from './navigation';

export const NavConfigs = [...NavigationRouters];

console.log(NavConfigs);
const routers = NavConfigs.map(item => item.children).flat(Infinity);

export default routers;
