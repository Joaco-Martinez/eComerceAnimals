import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'API', version: '1.0.0' },
    components: {
      schemas: {
      CartItemInput: {
      type: 'object',
      required: ['productId', 'quantity'],
      properties: {
        productId: { type: 'integer', example: 1 },
        quantity: { type: 'integer', example: 2 }
      }
    },
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
    AddressInput: {
  type: 'object',
  required: ['fullName', 'street', 'number', 'city', 'province', 'postalCode'],
  properties: {
    fullName: { type: 'string', example: 'Joaquín Martínez' },
    street: { type: 'string', example: 'Av. Siempre Viva' },
    number: { type: 'string', example: '1234' },
    city: { type: 'string', example: 'Springfield' },
    province: { type: 'string', example: 'Buenos Aires' },
    postalCode: { type: 'string', example: '1234' },
  },
},
Address: {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    userId: { type: 'integer', example: 5 },
    fullName: { type: 'string', example: 'Joaquín Martínez' },
    street: { type: 'string', example: 'Av. Siempre Viva' },
    number: { type: 'string', example: '1234' },
    city: { type: 'string', example: 'Springfield' },
    province: { type: 'string', example: 'Buenos Aires' },
    postalCode: { type: 'string', example: '1234' },
    isPrimary: { type: 'boolean', example: true },
  }
},

    CreateOrderInput: {
        type: 'object',
        properties: {
          addressId: { type: 'integer', example: 1 },
          couponId: { type: 'integer', nullable: true, example: 2 },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: { type: 'integer', example: 10 },
                quantity: { type: 'integer', example: 2 },
              },
              required: ['productId', 'quantity'],
            },
          },
        },
        required: ['addressId', 'items'],
      },
       Category: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "Smartphones",
          },
          description: {
            type: "string",
            example: "Celulares de última generación",
          },
          image: {
            type: "string",
            example: "https://miweb.com/images/smartphones.jpg",
          },
        },
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 123 },
          userId: { type: 'integer', example: 1 },
          addressId: { type: 'integer', example: 1 },
          couponId: { type: 'integer', nullable: true },
          items: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderItem' },
          },
          totalAmount: { type: 'number', format: 'float', example: 3500.75 },
          status: { type: 'string', example: 'pending' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      OrderItem: {
        type: 'object',
        properties: {
          productId: { type: 'integer', example: 10 },
          quantity: { type: 'integer', example: 2 },
          unitPrice: { type: 'number', format: 'float', example: 1750.375 },
        },
      },
    CartItem: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        productId: { type: 'integer', example: 1 },
        quantity: { type: 'integer', example: 2 },
        product: { 
          $ref: '#/components/schemas/Product' 
        }
      }
    },
    Cart: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        userId: { type: 'integer', example: 1 },
        items: {
          type: 'array',
          items: { $ref: '#/components/schemas/CartItem' }
        },
        updatedAt: { type: 'string', format: 'date-time', example: '2025-07-09T13:00:00Z' }
      }
    },
    // Asegurate de tener definido el schema Product también
    Product: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'Collar para perros' },
        description: { type: 'string', example: 'Collar ajustable resistente' },
        price: { type: 'number', format: 'float', example: 1500.5 },
        stock: { type: 'integer', example: 100 },
        sku: { type: 'string', example: 'COL-001' },
        isActive: { type: 'boolean', example: true },
        categoryId: { type: 'integer', example: 2 }
      }
    },
        RegisterInput: {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string', example: 'Joaquín Martínez' },
        email: { type: 'string', example: 'joaquin@mail.com' },
        password: { type: 'string', example: '123456' }
      }
    },
    LoginInput: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', example: 'joaquin@mail.com' },
        password: { type: 'string', example: '123456' }
      }
    },
    MeResponse: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'Joaquín Martínez' },
        email: { type: 'string', example: 'joaquin@mail.com' }
      }
    },
        
    ProductInput: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Collar para perros' },
        description: { type: 'string', example: 'Collar ajustable resistente' },
        price: { type: 'number', format: 'float', example: 1500.5 },
        stock: { type: 'integer', example: 100 },
        sku: { type: 'string', example: 'COL-001' },
        isActive: { type: 'boolean', example: true },
        categoryId: { type: 'integer', example: 2 },
      },
      required: ['name', 'price', 'stock', 'categoryId'],
    },
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Joaquín Martínez' },
            email: { type: 'string', example: 'joaquin@mail.com' },
            role: { type: 'string', example: 'customer' },
            phone: { type: 'string', example: '+541112345678' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        UserInput: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Joaquín Martínez' },
            email: { type: 'string', example: 'joaquin@mail.com' },
            password: { type: 'string', example: '123456' },
            phone: { type: 'string', example: '+541112345678' },
          },
          required: ['name', 'email', 'password'],
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiHandler = swaggerUi.serve;
export const swaggerUiSetup = swaggerUi.setup(swaggerSpec);
