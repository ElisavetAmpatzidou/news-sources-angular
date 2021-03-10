import { from } from "rxjs";
import {Src} from './Src';
export interface NewSource{
    source: Src[];
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt : string;
    content : string;
}