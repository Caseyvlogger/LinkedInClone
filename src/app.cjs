const express=require('express');
const v1Routes=require('./routes/v1/auth.route.cjs')

const app=express();

app.use(express.json())
app.use('/v1', v1Routes)

app.listen(3000, ()=>{
    console.log(`LinkedInClone server listening on http://localhost:3000`);
})