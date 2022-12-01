export class GameScore {
    gameName : string;
    uid : string;
    public history : Score[];
    public highscore : number;

    constructor(uid : string, gameName : string, history : Score[] = [], highscore : number = 0, firstScore? : Score){
        this.uid = uid;
        this.gameName = gameName;
        this.highscore = highscore;
        this.history = history;
        if(firstScore){
            this.addScore(firstScore);
        }
    }

    addScore (newScore : Score){
        this.history.push(newScore);
        if(newScore.score > this.highscore){
            this.highscore = newScore.score;
        }
    }

    static objToGameScores(obj : any[]) : GameScore[]{
        let gameScores : GameScore[] = [];
        obj.forEach(element => {
            gameScores.push(new GameScore(
                element.uid,
                element.gameName,
                element.history,
                element.highscore
            ))
        });
        return gameScores;
    }
}

export interface Score {
    date : string;
    score : number;
}
