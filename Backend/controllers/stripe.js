require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const handlePayment = async (req, res) => {
    const products = req.body;

    console.log(products);
    
    const lineItems = products.map((product) => ({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.item.title,
                images:[product.item.imageUrl]
            },
            unit_amount:Math.round(product.item.price*100)
        },
        quantity:product.counter
    }));

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode:"payment",
        payment_method_types: ["card"],
        success_url:"http://localhost:5173/paymentsuccess",
        cancel_url:"http://localhost:5173/paymentcanclled"
    });
    res.send({id:session.id});
};


module.exports = { handlePayment };