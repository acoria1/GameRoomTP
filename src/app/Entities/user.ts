import { GameScore, Score } from "./game-score";

export class User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    metadata : { 
        creationTime : string, 
        lastSignInTime : string 
    }
    isAdmin : boolean;
    gameScores : GameScore[];

    constructor(email : string, displayName : string, photoURL : string, emailVerified : boolean, metadata : { creationTime : string, lastSignInTime : string}, isAdmin : boolean = false, gameScores : GameScore[] = [], uid?){
        this.uid = uid;
        this.email = email;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.emailVerified = emailVerified;
        this.metadata = metadata;
        this.isAdmin = isAdmin;
        this.gameScores = gameScores;
    }

    highScoreByGame(gameName : string) : number | undefined{
        let gameScore = this.gameScores.find(gameScore =>
            gameScore.gameName == gameName
          );
        if (gameScore != undefined){
            return gameScore.highscore;
        }
        return undefined; 
    }

    addScore (gameName : string, newScore : Score){
        let gameScore = this.gameScores.find((g)=> g.gameName == gameName);
        if (gameScore != undefined){
            gameScore.addScore(newScore);
        } else {
            this.gameScores.push(
                new GameScore (this.uid, gameName, [] , undefined , newScore)
            )
        }       
    }

    static objToCustomUser (user : any) : User{ 
        return new User (
          user.email,
          user.displayName,
          user.photoURL,
          user.emailVerified,
          { 
            creationTime : user.metadata.creationTime!, 
            lastSignInTime : user.metadata.lastSignInTime
          },
          user.isAdmin,
          user.gameScores ? GameScore.objToGameScores(user.gameScores) : [],
          user.uid
        )
    }
}
