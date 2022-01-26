const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Banco de dados falso

var DB = {
    games: [
        {
        id:1,
        title:"Jogo 1",
        year:2012,
        price:10
        },
        {
            id:2,
            title:"Jogo 2",
            year:2014,
            price:12
        },
        {
            id:3,
            title:"Jogo 3",
            year:2016,
            price:15
        }
    ]
}

//GET
app.get("/games",(req,res)=>{
    res.statusCode = 200
    res.json(DB.games)
})

//GET UNICO
app.get("/game/:id",(req,res)=>{

    if(isNaN(req.params.id)){
        res.send("ISSO NAO É UM NUMERO")
    }else{
        let id = parseInt(req.params.id);

        let game =  DB.games.find(g => g.id == id)

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
})


//POST
app.post("/game",(req,res)=>{
    let { id,title,year,price } = req.body;

    //Deve validar todos os dados antes de inserir no banco de dados.

    DB.games.push({
        id,
        title,
        year,
        price
    })

    res.sendStatus(200);
})

//DELETE
app.delete("/game/:id",(req,res)=>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        let id = parseInt(req.params.id);
        let index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
        }
    }
})

//PUT
app.put("/game/:id",(req,res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        let id = parseInt(req.params.id);

        let game =  DB.games.find(g => g.id == id)

        if(game != undefined){
            let { id,title,year,price } = req.body;
            //Deve ser feita a verificacao dos dados.

            if(id != undefined){
                game.id = id;
            }
            if(title != undefined){
                game.title = title;
            }
            if(year != undefined){
                game.year = year;
            }
            if(price != undefined){
                game.price = price;
            }

            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
})

app.listen(1000,()=>{
    console.log("API em construcao");
})