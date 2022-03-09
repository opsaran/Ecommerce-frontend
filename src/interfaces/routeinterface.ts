export default interface routeInterface {
  path: string;
  name: string;
  exact: boolean;
  component: any;
  props?: any;
}
