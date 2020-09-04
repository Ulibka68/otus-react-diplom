import {string} from "yup";

export interface iState {
    name: string;
    description?: string;
    amount: number;
}

export const expenceRoute = {
  getList : "http://woodtools.site/api/expenses",
  appendExpence : "http://woodtools.site/api/expenses"
};