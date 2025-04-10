const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html");
});



app.get("/api/houses", (req, res)=>{
    const houses = [
    {
        "_id": "1",
        "name": "Mower",
        "description": "Useful for cutting the grass when it gets too tall.",
        "price": "129.99",
        "rating": "4.2",
        "img1": "images/mower.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    },
    {
        "_id": "2",
        "name": "Rake",
        "description": "Useful for moving leaves into a pile.",
        "price": "9.99",
        "rating": "3.4",
        "img1": "images/rake.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    },
    {
        "_id": "3",
        "name": "Edger",
        "description": "Useful for trimming up the edge of the grass.",
        "price": "99.99",
        "rating": "4.4",
        "img1": "images/edger.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    },
    {
        "_id": "4",
        "name": "Leaf Blower",
        "description": "Useful for blowing leaves wherever you need to.",
        "price": "38.99",
        "rating": "3.3",
        "img1": "images/leafblower.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    },
    {
        "_id": "5",
        "name": "Spreader",
        "description": "Useful for spreading pesticide and other chemicals over a wide area.",
        "price": "49.99",
        "rating": "2.7",
        "img1": "images/spreader.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    }
    ];
    res.send(houses);
});

app.get("/api/plants", (req, res) =>{
    const plants = [
        {
            "_id": "1",
            "name": "Mulch",
            "description": "Useful for keep the soil a good temperature and to prevent weeds from growing.",
            "price": "3.99",
            "rating": "4.2",
            "img1": "images/mulch.png",
            "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
          },
          {
            "_id": "2",
            "name": "Pine Straw",
            "description": "Useful for fertilizing grass.",
            "price": "4.99",
            "rating": "3.4",
            "img1": "images/straw.png",
            "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
          },
          {
            "_id": "3",
            "name": "Pine Tree",
            "description": "Tall, bushy tree. Commonly used as Christmas trees.",
            "price": "32.99",
            "rating": "4.4",
            "img1": "images/tree.png",
            "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
          },
          {
            "_id": "4",
            "name": "Flowers",
            "description": "Roses are our speciality, especially around this time.",
            "price": "6.99",
            "rating": "3.3",
            "img1": "images/flower.jpg",
            "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
          }
        
    ];

    res.send(plants);
});

app.listen(3001, ()=>{
    console.log("I'm listening");
});

