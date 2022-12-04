export enum Hosts {
  LuisLoustaunau = "LuisLoustaunau",
  MikeMeyers = "MikeMeyers",
  None = "None",
}

export let listOfHosts = [Hosts.LuisLoustaunau, Hosts.MikeMeyers, Hosts.None];

export interface Inputs {
  title: string;
  date: string;
  host: Hosts;
  time: string;
  description: string;
  free: boolean;
  cost: Number;
}
