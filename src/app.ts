import express ,{Application} from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";


const app:Application=express();

//middleware
app.use(express.json());
app.use(cors());

//Routes


//swagger setup
const swaggerOptions={
    swaggerDefinition:{
        openapi:'3.0.0',
        info:{
            title:'Laundary App Api',
            version:'1.0.0',
            description:'Api for On-Demand Laundary Application'
        }
    },
    apis:['./routes/*.ts'],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//swaggers-route
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Default Route
app.get('/',(req,res)=>{
    res.send('Welcome to the On-Demand Laundary App Api!')
})

export default app;