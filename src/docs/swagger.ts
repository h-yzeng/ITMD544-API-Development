import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital Appointment System API',
      version: '1.0.0',
      description: 'REST and GraphQL API for managing hospital appointments, patients, and doctors.',
    },
    servers: [{ url: process.env.BASE_URL ?? 'http://localhost:3000' }],
  },
  apis: ['./src/routes/*.ts'],
});
