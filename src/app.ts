import express ,{Application} from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app:Application=express();

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
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;