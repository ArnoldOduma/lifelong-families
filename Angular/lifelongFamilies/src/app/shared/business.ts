export class Business {
  constructor(public id: string, public name: string) { }
}
export interface IBusinessResponse {
  total: number;
  results: Business[];
}
