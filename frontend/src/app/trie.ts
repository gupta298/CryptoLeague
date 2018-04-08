import { Serializable } from './serializable';

export class Trie {
    children: { [details: string] : Trie; } = {};
    isCompleted: Boolean;
    word: String;

    constructor() {    
        this.isCompleted = false;
        this.word = "";
    }

    addWord(word: String) {
    	this.add(word, 0, word.length, word.toLowerCase());
    }

    add(word: String, currIndex: number, length: number, wordForTrie: String) {
        if(length == currIndex){
            this.word = word;
            this.isCompleted = true;
            return;
        } else if(!this.children[(wordForTrie.charAt(currIndex))]){
        		this.children[wordForTrie.charAt(currIndex)] = new Trie();
        }
        this.children[(wordForTrie.charAt(currIndex))].add(word,currIndex+1, length, wordForTrie);
    }

    findWord(word: String) {
    	return this.find(word.toLowerCase(), 0, word.length);
    }

    find(wordForTrie: String, currIndex: number, length: number) {
        let res: String[] = [];
        if(currIndex == length){
          res = this.totalWordsFromANode();
        }
        else if(this.children[(wordForTrie.charAt(currIndex))]){
          let tmp: String[] = this.children[(wordForTrie.charAt(currIndex))].find(wordForTrie, currIndex +1, length);
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

        Object.keys(this.children).forEach((key) => {
        	//console.log(this.children[key]);
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