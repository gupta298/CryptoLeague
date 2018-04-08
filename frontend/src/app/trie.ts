import { Serializable } from './serializable';
//import { Map } from 'core-js/modules/es6.map';

interface Map {
	[details: string] : Trie;
}

export class Trie {
    children: { [details: string] : Trie; } = {};
    isCompleted: Boolean;
    word: String;

    constructor() {    
        this.isCompleted = false;
        this.word = "";
        //this.children = new Map<String, Trie>();
    }

    add(word: String, currIndex: number, length: number) {
        if(length == currIndex){
            this.word = word;
            this.isCompleted = true;
            return;
        }
        else if(this.children[(word.charAt(currIndex))]){
            this.children[(word.charAt(currIndex))].add(word,currIndex+1, length);
        }
        else{
            this.children[word.charAt(currIndex)] = new Trie();
            this.children[(word.charAt(currIndex))].add(word,currIndex+1, length);
        }
    }

    find(word: String, currIndex: number, length: number) {
        let res: String[] = [];
        if(currIndex == length){
          res = this.totalWordsFromANode();
        }
        else if(this.children[(word.charAt(currIndex))]){
          let tmp: String[] = this.children[(word.charAt(currIndex))].find(word, currIndex +1, length);
          for(let e of tmp) {
           	if(e) {
          		res.push(e);
          	}
          }
        }

        return res;
    }

    totalWordsFromANode(): String[] {
        let res: String[] = [];
        if(this.isCompleted) {
            res.push(this.word);
        }

        // for(let entry of this.children)) {
        //     let tmp: String[] = entry.totalWordsFromANode();
        //     for(let e of tmp) {
        //     	if(e) {
        //     		res.push(e);
        //     	}
        //     }
        // }
        Object.keys(this.children).forEach((key) => {
        	console.log(this.children[key]);
        	let tmp: String[] = this.children[key].totalWordsFromANode();
            for(let e of tmp) {
            	if(e) {
            		res.push(e);
            	}
            }
        });
        return res;
    }
}