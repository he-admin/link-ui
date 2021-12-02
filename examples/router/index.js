import NavigationRouters from './navigation';
import BasicRouters from './base';
import TipsRouters from './tips';

export const NavConfigs = [...NavigationRouters, ...BasicRouters, ...TipsRouters];

const routers = NavConfigs.map(item => item.children).flat(Infinity);

export default routers;
