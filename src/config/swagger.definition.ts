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
    schemas: {
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
