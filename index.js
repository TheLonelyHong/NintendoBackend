const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
require('dotenv').config({path:'config.env'});
const Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , async(req , res) => {
        res.send("Heelo backend");
})

app.post("/paynow" , async(req , res) => {
        try {   
                 await Stripe.charges.create({
                        amount:req.body.amount,
                        currency:'myr',
                        source:req.body.token.id
                 });
        } catch (error) {
                console.log(error.code , error.message);
        }
});
 
const PORT = process.env.PORT || 6000;

app.listen(PORT , () => {
        console.log(`Backend is running at PORT ${PORT}`);
})