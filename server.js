const express = require("express");
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
  
const upload = multer({ storage: storage });

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

let houses = [
    {
        "_id": "1",
        "name": "Mower",
        "description": "Useful for cutting the grass when it gets too tall.",
        "price": "129.99",
        "rating": "4.2",
        "main_image": "mower.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    },
    {
        "_id": "2",
        "name": "Rake",
        "description": "Useful for moving leaves into a pile.",
        "price": "9.99",
        "rating": "3.4",
        "main_image": "rake.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    },
    {
        "_id": "3",
        "name": "Edger",
        "description": "Useful for trimming up the edge of the grass.",
        "price": "99.99",
        "rating": "4.4",
        "main_image": "edger.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    },
    {
        "_id": "4",
        "name": "Leaf Blower",
        "description": "Useful for blowing leaves wherever you need to.",
        "price": "38.99",
        "rating": "3.3",
        "main_image": "leafblower.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    },
    {
        "_id": "5",
        "name": "Spreader",
        "description": "Useful for spreading pesticide and other chemicals over a wide area.",
        "price": "49.99",
        "rating": "2.7",
        "main_image": "spreader.png",
        "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
    }
];

app.get("/api/houses", (req, res)=>{
    res.send(houses);
});

app.post("/api/houses", upload.single("img"), (req,res)=>{
    const result = validateHouse(req.body);


    if(result.error){
        console.log("I have an error");
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const house = {
        _id: houses.length,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        rating:req.body.rating,
    };

    if(req.file){
        house.main_image = req.file.filename;
    }

    houses.push(house);
    res.status(200).send(house);
});

app.put("/api/houses/:id", upload.single("img"), (req, res)=>{
    const house = houses.find((house)=>house._id===parseInt(req.params.id));

    if(!house) {
        res.status(404).send("The house with the provided id was not found");
        return;
    }

    const result = validateHouse(req.body);

    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    house.name = req.body.name;
    house.description = req.body.description;
    house.price = req.body.price;
    house.rating = req.body.rating;

    if(req.file) {
        house.main_image = req.file.filename;
    }

    req.status(200).send(house);
});

app.delete("/api/houses/:id", upload.single("main_image"), (req, res)=>{
    const house = houses.find((house)=>house._id===parseInt(req.params.id));

    if(!house) {
        res.status(404).send("The house with the provided id was not found");
        return;
    }

    const index = houses.indexOf(house);
    houses.splice(index,1);
    res.status(200).send(house);
});

const validateHouse = (house) => {
    const schema = Joi.object({
        _id:Joi.allow(""),
        name:Joi.string().min(3).required(),
        description:Joi.string().min(3).required(),
        price:Joi.number().required().min(0),
        rating:Joi.number().required().min(0),
    });

    return schema.validate(house);
};


app.get("/api/plants", (req, res) =>{
    const plants = [
        {
            "_id": "1",
            "name": "Mulch",
            "description": "Useful for keep the soil a good temperature and to prevent weeds from growing.",
            "price": "3.99",
            "rating": "4.2",
            "main_image": "mulch.png",
            "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
          },
          {
            "_id": "2",
            "name": "Pine Straw",
            "description": "Useful for fertilizing grass.",
            "price": "4.99",
            "rating": "3.4",
            "main_image": "straw.png",
            "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
          },
          {
            "_id": "3",
            "name": "Pine Tree",
            "description": "Tall, bushy tree. Commonly used as Christmas trees.",
            "price": "32.99",
            "rating": "4.4",
            "main_image": "tree.png",
            "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
          },
          {
            "_id": "4",
            "name": "Flowers",
            "description": "Roses are our speciality, especially around this time.",
            "price": "6.99",
            "rating": "3.3",
            "main_image": "flower.jpg",
            "img2": "https://machine8822.github.io/project/part6/images/placeholder.jpg"
          }
        
    ];

    res.send(plants);
});

app.listen(3001, ()=>{
    console.log("I'm listening");
});

