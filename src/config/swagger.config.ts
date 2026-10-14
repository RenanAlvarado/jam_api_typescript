import type { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

export function setupSwagger(app: Express): void {
  const swaggerSpec = swaggerJsdoc({
    definition: {
      openapi: "3.0.3",

      info: {
        title: "Sistema de Jam API",
        version: "1.0.0",
        description: [
          "API REST do Sistema de Jam.",
          "",
          "Permite gerenciar os recursos do sistema por meio de endpoints HTTP.",
          "Os endpoints recebem e retornam dados em JSON, salvo quando indicado de outra forma.",
        ].join("\n"),
        contact: {
          name: "Suporte da API",
        },
      },

      tags: [
        {
          name: "Instruments",
          description:
            "Cadastro, consulta, atualização e exclusão de instrumentos musicais.",
        },
      ],

      servers: [
        {
          url: "/api",
          description: "Servidor principal da API",
        },
      ],

      components: {
        schemas: {
          InstrumentResponse: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                example: 1,
              },
              name: {
                type: "string",
                maxLength: 50,
                example: "Guitarra",
              },
            },
            required: ["id", "name"],
          },

          UpdateInstrument: {
            type: "object",
            properties: {
              name: {
                type: "string",
                maxLength: 50,
                example: "Violão",
              },
            },
            required: ["name"],
          },

          Pagination: {
            type: "object",
            properties: {
              page: {
                type: "integer",
                example: 1,
              },
              limit: {
                type: "integer",
                example: 10,
              },
              total: {
                type: "integer",
                example: 25,
              },
              totalPages: {
                type: "integer",
                example: 3,
              },
            },
            required: ["page", "limit", "total", "totalPages"],
          },
        },
      },
    },

    apis: ["./src/modules/**/*.routes.ts"],
  });

  app.use(
    `/api/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customSiteTitle: "Sistema de Jam API | Swagger",
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
        docExpansion: "list",
      },
    }),
  );

  app.get(`/api/openapi.json`, (_req, res) => {
    res.status(200).json(swaggerSpec);
  });
}
