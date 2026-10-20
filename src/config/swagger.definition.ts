export const swaggerDefinition = {
  openapi: "3.0.3",

  info: {
    title: "Sistema de Jam API",
    version: "1.0.0",
    description: [
      "API REST do Sistema de Jam.",
      "",
      "Permite cadastrar, consultar, atualizar e excluir recursos do sistema.",
      "Os endpoints recebem e retornam dados em JSON, salvo quando indicado de outra forma.",
      "",
      "Documentação interativa: [/api/docs](/api/docs).",
      "Especificação OpenAPI em JSON: [/api/openapi.json](/api/openapi.json).",
    ].join("\n"),
    contact: {
      name: "Suporte da API",
    },
  },

  servers: [
    {
      url: "/api",
      description: "Servidor principal da API",
    },
  ],

  tags: [
    {
      name: "Auth",
      description: "Autenticação e gerenciamento de acesso por token JWT.",
    },
    {
      name: "Instruments",
      description:
        "Cadastro, consulta, atualização e exclusão de instrumentos musicais.",
    },
    {
      name: "Addresses",
      description: "Consulta de endereços e integração com o serviço ViaCEP.",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Informe o token JWT obtido no login.",
      },
    },

    schemas: {
      // Dados para cadastrar um administrador
      RegisterAdmin: {
        type: "object",
        properties: {
          name: {
            type: "string",
            maxLength: 100,
            description: "Nome do administrador.",
            example: "Administrador",
          },
          email: {
            type: "string",
            format: "email",
            maxLength: 150,
            description: "E-mail do administrador.",
            example: "admin@exemplo.com",
          },
          password: {
            type: "string",
            description:
              "Senha que atende aos critérios de segurança definidos pela API.",
            example: "SenhaSegura123!",
          },
        },
        required: ["name", "email", "password"],
        additionalProperties: false,
      },

      // Credenciais para autenticação
      Login: {
        type: "object",
        properties: {
          email: {
            type: "string",
            format: "email",
            maxLength: 150,
            description: "E-mail cadastrado do administrador.",
            example: "admin@exemplo.com",
          },
          password: {
            type: "string",
            maxLength: 128,
            description: "Senha do administrador.",
            example: "SenhaSegura123!",
          },
        },
        required: ["email", "password"],
        additionalProperties: false,
      },

      // Resposta de autenticação com token JWT
      AuthTokenResponse: {
        type: "object",
        properties: {
          access_token: {
            type: "string",
            description: "Token JWT para autenticação.",
            example: "eyJhbGciOiJIUzI1NiIs...",
          },
          token_type: {
            type: "string",
            enum: ["Bearer"],
            example: "Bearer",
          },
        },
        required: ["access_token", "token_type"],
      },

      // Administrador retornado pela API, sem informações sensíveis
      AdminResponse: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Identificador único do administrador.",
            example: 1,
          },
          name: {
            type: "string",
            maxLength: 100,
            example: "Administrador",
          },
          email: {
            type: "string",
            format: "email",
            maxLength: 150,
            example: "admin@exemplo.com",
          },
          created_at: {
            type: "string",
            format: "date-time",
            example: "2026-10-20T12:00:00.000Z",
          },
          updated_at: {
            type: "string",
            format: "date-time",
            example: "2026-10-20T12:00:00.000Z",
          },
        },
        required: ["id", "name", "email", "created_at", "updated_at"],
      },

      // Instrumento retornado pela API
      InstrumentResponse: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "Identificador único do instrumento.",
            example: 1,
          },
          name: {
            type: "string",
            maxLength: 50,
            description: "Nome do instrumento musical.",
            example: "Guitarra",
          },
        },
        required: ["id", "name"],
      },

      // Dados para cadastrar um instrumento
      CreateInstrument: {
        type: "object",
        properties: {
          name: {
            type: "string",
            maxLength: 50,
            description: "Nome do instrumento musical.",
            example: "Guitarra",
          },
        },
        required: ["name"],
        additionalProperties: false,
      },

      // Dados para atualizar um instrumento
      UpdateInstrument: {
        type: "object",
        properties: {
          name: {
            type: "string",
            maxLength: 50,
            description: "Novo nome do instrumento musical.",
            example: "Violão",
          },
        },
        required: ["name"],
        additionalProperties: false,
      },

      // Metadados da paginação
      Pagination: {
        type: "object",
        properties: {
          page: {
            type: "integer",
            description: "Página atual.",
            example: 1,
          },
          limit: {
            type: "integer",
            description: "Quantidade máxima de registros por página.",
            example: 10,
          },
          total: {
            type: "integer",
            description: "Quantidade total de registros encontrados.",
            example: 25,
          },
          totalPages: {
            type: "integer",
            description: "Quantidade total de páginas.",
            example: 3,
          },
        },
        required: ["page", "limit", "total", "totalPages"],
      },

      // Resposta padronizada de listagem
      InstrumentListResponse: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["success"],
            example: "success",
          },
          message: {
            type: "string",
            example: "Instrumentos listados com sucesso.",
          },
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/InstrumentResponse",
            },
          },
          pagination: {
            $ref: "#/components/schemas/Pagination",
          },
        },
        required: ["status", "message", "data", "pagination"],
      },

      CreateAddress: {
        type: "object",
        required: ["place_name", "number", "zip_code"],
        properties: {
          place_name: {
            type: "string",
            maxLength: 255,
            example: "Escritório Principal",
          },
          number: {
            type: "string",
            example: "323",
          },
          zip_code: {
            type: "string",
            pattern: "^\\d{8}$",
            description:
              "CEP com oito dígitos. A entrada aceita hífen, que é removido pela validação.",
            example: "58400-550",
          },
          complement: {
            type: "string",
            nullable: true,
            maxLength: 255,
            example: "Sala 1234",
          },
        },
      },

      AddressResponse: {
        type: "object",
        required: [
          "id",
          "place_name",
          "street",
          "number",
          "district",
          "city",
          "state",
          "zip_code",
          "complement",
          "maps_url",
        ],
        properties: {
          id: { type: "integer", example: 1 },
          place_name: { type: "string", example: "Escritório Principal" },
          street: { type: "string", example: "Rua Rodrigues Alves" },
          number: { type: "string", example: "323" },
          district: { type: "string", example: "Prata" },
          city: { type: "string", example: "Campina Grande" },
          state: { type: "string", example: "PB" },
          zip_code: { type: "string", example: "58400550" },
          complement: {
            type: "string",
            nullable: true,
            example: "Sala 1234",
          },
          maps_url: {
            type: "string",
            format: "uri",
            example:
              "https://www.google.com/maps/search/?api=1&query=Rua%20Rodrigues%20Alves%2C%20323%2C%20Prata%2C%20Campina%20Grande%2C%20PB",
          },
        },
      },

      // Endereço retornado pela consulta ao ViaCEP
      ViaCepResponse: {
        type: "object",
        properties: {
          logradouro: {
            type: "string",
            description: "Nome do logradouro.",
            example: "Avenida Paulista",
          },
          bairro: {
            type: "string",
            description: "Bairro do endereço.",
            example: "Bela Vista",
          },
          localidade: {
            type: "string",
            description: "Cidade do endereço.",
            example: "São Paulo",
          },
          uf: {
            type: "string",
            minLength: 2,
            maxLength: 2,
            description: "Sigla do estado.",
            example: "SP",
          },
        },
        required: ["logradouro", "bairro", "localidade", "uf"],
      },

      // Formato padrão das respostas de erro
      ErrorResponse: {
        type: "object",
        properties: {
          status: {
            type: "string",
            enum: ["error"],
            example: "error",
          },
          message: {
            type: "string",
            description: "Descrição do erro ocorrido.",
            example: "Instrumento não encontrado.",
          },
        },
        required: ["status", "message"],
      },
    },
  },
};
