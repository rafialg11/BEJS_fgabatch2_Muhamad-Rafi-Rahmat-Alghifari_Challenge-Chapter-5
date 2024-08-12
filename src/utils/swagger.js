const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple Banking System Challenge 5",
            description: `Simple Banking System Challenge 5.
            This documentation provides a comprehensive guide to using the simple Banking System API, designed to manage user data, accounts, and transfer transactions.
            \nKey Features:
            \nUser Management:
            \n- Create, update, and delete user data.
            \n- Manage user profiles.
            \n- Manage user addresses. 
            \nAccount Management:
            \n- Create new accounts.
            \n- View account details, such as account number and balance.
            \n- Manage account information, such as changing the account PIN.
            \nTransfer Transactions:
            \n- Transfer funds between accounts.
            \n- View transaction history.     
            \nRepo links:
            \n- [The Banking System Repository](https://github.com/rafialg11/BEJS_fgabatch2_Muhamad-Rafi-Rahmat-Alghifari_Challenge-Chapter-4)                    
            ` 
        },
        servers: [
			{
				url: "http://localhost:3200",
			},
		],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    
    apis: ["./src/docs/*.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs (app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerDocs;