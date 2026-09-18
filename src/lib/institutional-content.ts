export type InstitutionalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type InstitutionalDocument = {
  title: string;
  eyebrow: string;
  intro: string;
  sections: InstitutionalSection[];
};

export const BRAZIL_SELLER = {
  tradeName: "NOVIDADES.STORE",
  legalName: "69.093.616 MICAELA GOMES DE JESUS",
  cnpj: "69.093.616/0001-50",
  capital: "R$ 5.000,00",
  addressLines: [
    "AVENIDA JOAO FLORENTINO",
    "Lote 9 Quadra 2",
    "RESIDENCIAL ARAGUAIA",
    "75071-430 ANAPOLIS - GO",
    "BRASIL",
  ],
  phone: "+55 (62) 99190-3462",
  email: "contato@novidades.store",
  supportEmail: "suporte@novidades.store",
  privacyEmail: "privacidade@novidades.store",
};

export const UK_SELLER = {
  legalName: "MGJ EXPERT LTD",
  companyNumber: "17422467",
  addressLines: [
    "71-75 Shelton Street",
    "Covent Garden",
    "London",
    "United Kingdom",
    "WC2H 9JQ",
  ],
  phone: "+44 7451 214299",
  email: "hello@novidades.store",
  supportEmail: "support@novidades.store",
  privacyEmail: "privacy@novidades.store",
};

export const INSTITUTIONAL_DOCS: Record<string, InstitutionalDocument> = {
  sobre: {
    title: "Sobre a Novidades.store",
    eyebrow: "QUEM SOMOS",
    intro:
      "A Novidades.store é uma plataforma de discovery commerce: selecionamos produtos e coleções de diferentes universos e criamos experiências de compra próprias ou funnels dedicados para cada oferta.",
    sections: [
      {
        title: "Curadoria antes de quantidade",
        paragraphs: [
          "A proposta não é publicar um catálogo infinito. Preferimos trabalhar com seleções menores, páginas mais claras e informação comercial objetiva.",
          "Alguns produtos podem ter experiências dedicadas em subdomínios, sempre identificadas como parte do ecossistema Novidades.store.",
        ],
      },
      {
        title: "Operação por mercado",
        paragraphs: [
          "No Brasil, as vendas em BRL são operadas pela entidade brasileira identificada nas Informações Legais.",
          "Nas operações internacionais, o vendedor aplicável, moeda, condições de entrega e políticas são apresentados antes da confirmação da compra.",
        ],
      },
    ],
  },

  contato: {
    title: "Contato",
    eyebrow: "ATENDIMENTO",
    intro:
      "Use apenas os canais oficiais abaixo para dúvidas sobre produtos, pedidos, pagamentos, entregas, privacidade ou parcerias.",
    sections: [
      {
        title: "Brasil",
        bullets: [
          "Atendimento: suporte@novidades.store",
          "Contato geral: contato@novidades.store",
          "Privacidade: privacidade@novidades.store",
          "Telefone / WhatsApp: +55 (62) 99190-3462",
        ],
      },
      {
        title: "Internacional",
        bullets: [
          "Support: support@novidades.store",
          "General contact: hello@novidades.store",
          "Privacy: privacy@novidades.store",
          "Telefone: +44 7451 214299",
        ],
      },
      {
        title: "Ao entrar em contato",
        paragraphs: [
          "Se a solicitação estiver relacionada a uma compra, informe o número ou referência do pedido. Nunca envie senha, número completo de cartão ou credenciais bancárias por e-mail ou mensagem.",
        ],
      },
    ],
  },

  ajuda: {
    title: "Central de Ajuda",
    eyebrow: "SUPORTE",
    intro:
      "Reunimos aqui os principais temas da jornada de compra. Para um caso específico, contacte o suporte e informe a referência do pedido.",
    sections: [
      {
        title: "Antes de comprar",
        bullets: [
          "Confira descrição, variante, preço, moeda e vendedor exibidos na página.",
          "Consulte as condições de entrega antes de confirmar o pagamento.",
          "Em funnels dedicados, procure a assinatura Novidades.store e os links institucionais.",
        ],
      },
      {
        title: "Depois de comprar",
        bullets: [
          "Guarde a referência do pedido e a confirmação de pagamento.",
          "Acompanhe comunicações enviadas pelos canais oficiais.",
          "Para alteração, cancelamento, troca ou devolução, contacte o suporte assim que possível.",
        ],
      },
    ],
  },

  entregas: {
    title: "Entregas",
    eyebrow: "LOGÍSTICA",
    intro:
      "As opções, custos e prazos disponíveis dependem do produto, endereço, mercado e operação logística ativa no momento da compra.",
    sections: [
      {
        title: "Cálculo antes do pagamento",
        paragraphs: [
          "O valor de entrega deve ser apresentado antes da confirmação final do pedido. Quando uma oferta utilizar frete grátis, essa condição precisa estar efetivamente configurada no checkout.",
        ],
      },
      {
        title: "Endereço",
        paragraphs: [
          "O cliente é responsável por conferir CEP, rua, número, complemento, bairro, cidade e UF antes do pagamento. Se identificar erro após a compra, contacte o suporte imediatamente.",
        ],
      },
      {
        title: "Rastreamento e ocorrências",
        paragraphs: [
          "Quando houver código de rastreamento, ele será associado ao pedido. Atrasos, avarias ou extravios devem ser comunicados ao suporte para abertura de tratamento junto à operação logística aplicável.",
        ],
      },
      {
        title: "Internacional",
        paragraphs: [
          "Condições internacionais só são exibidas quando o mercado estiver ativo para o produto. Custos, impostos, transportadores e eventuais formalidades são informados conforme a oferta e o destino.",
        ],
      },
    ],
  },

  pagamentos: {
    title: "Pagamentos",
    eyebrow: "XPAYMENTS",
    intro:
      "A Novidades.store utiliza a infraestrutura XPAYMENTS para os métodos ativados em cada mercado. O método disponível é apresentado no checkout antes da confirmação.",
    sections: [
      {
        title: "Brasil · BRL",
        paragraphs: [
          "O lançamento utiliza PIX server-to-server através da Store XPAYMENTS NOVIDADES-BRL. O valor final é recalculado no servidor; o navegador não define o valor da cobrança.",
        ],
      },
      {
        title: "Europa · EUR",
        paragraphs: [
          "A estrutura NOVIDADES-EURO está preparada, mas métodos internacionais só serão publicados depois de ativados e testados de ponta a ponta.",
        ],
      },
      {
        title: "Segurança operacional",
        bullets: [
          "Chaves privadas de pagamento permanecem no servidor.",
          "O pedido usa referência própria para conciliação.",
          "Estados de pagamento são separados dos estados de entrega.",
          "Nenhuma página da Novidades.store deve solicitar a senha do seu banco.",
        ],
      },
    ],
  },

  "trocas-e-devolucoes": {
    title: "Trocas, devoluções e reembolsos",
    eyebrow: "PÓS-VENDA",
    intro:
      "Queremos que o processo de pós-venda seja claro. As condições abaixo complementam os direitos obrigatórios aplicáveis ao consumidor e não os substituem.",
    sections: [
      {
        title: "Direito de arrependimento · Brasil",
        paragraphs: [
          "Em compras realizadas fora do estabelecimento comercial, o consumidor pode solicitar o exercício do direito de arrependimento dentro do prazo legal aplicável, contado conforme a legislação brasileira.",
          "Para iniciar a solicitação, envie a referência do pedido para suporte@novidades.store. O atendimento fornecerá as instruções aplicáveis ao retorno e reembolso.",
        ],
      },
      {
        title: "Produto incorreto, avariado ou com defeito",
        paragraphs: [
          "Informe o suporte assim que identificar o problema. Quando útil para agilizar a análise, poderão ser solicitadas fotos do produto e da embalagem, sem limitar direitos legais do consumidor.",
        ],
      },
      {
        title: "Reembolso",
        paragraphs: [
          "Quando devido, o reembolso é processado pelo meio compatível com a forma de pagamento e com o fluxo financeiro aplicável ao pedido. O prazo efetivo pode envolver etapas do provedor de pagamento.",
        ],
      },
      {
        title: "Operações internacionais",
        paragraphs: [
          "A política aplicável varia conforme o vendedor e o país de entrega. Os direitos obrigatórios do consumidor no mercado aplicável permanecem preservados.",
        ],
      },
    ],
  },

  cancelamentos: {
    title: "Cancelamentos",
    eyebrow: "PEDIDOS",
    intro:
      "Se precisar cancelar uma compra, contacte o suporte com a referência do pedido. O tratamento depende do estado do pagamento e do fulfillment.",
    sections: [
      {
        title: "Antes da expedição",
        paragraphs: [
          "Pedidos ainda não expedidos podem ser elegíveis para interrupção operacional imediata. A confirmação do cancelamento só ocorre após validação do estado do pedido.",
        ],
      },
      {
        title: "Após a expedição",
        paragraphs: [
          "Quando o produto já foi entregue ao transportador, poderão ser necessárias instruções de devolução ou recusa de recebimento conforme o caso.",
        ],
      },
      {
        title: "Canal",
        bullets: [
          "Brasil: suporte@novidades.store · +55 (62) 99190-3462",
          "Internacional: support@novidades.store · +44 7451 214299",
        ],
      },
    ],
  },

  termos: {
    title: "Termos de Uso e Compra",
    eyebrow: "LEGAL",
    intro:
      "Estes termos regulam o uso da plataforma Novidades.store e estabelecem condições gerais para ofertas comercializadas através das experiências vinculadas ao ecossistema.",
    sections: [
      {
        title: "1. Identificação do vendedor",
        paragraphs: [
          "Cada checkout deve identificar a entidade vendedora aplicável antes da confirmação do pedido. No Brasil, o vendedor padrão da Novidades.store é 69.093.616 MICAELA GOMES DE JESUS, CNPJ 69.093.616/0001-50. Em operações internacionais elegíveis, a entidade poderá ser MGJ EXPERT LTD, Company No. 17422467, conforme indicado no checkout.",
        ],
      },
      {
        title: "2. Produtos e ofertas",
        paragraphs: [
          "Imagens, descrições, variantes, disponibilidade e preços devem corresponder à oferta publicada. Cores e aparência podem variar conforme iluminação e tela. Informações materiais específicas prevalecem quando apresentadas na página do produto.",
        ],
      },
      {
        title: "3. Preços e pagamento",
        paragraphs: [
          "A moeda e o valor total são exibidos antes da confirmação. No Brasil, a Store NOVIDADES-BRL pode disponibilizar PIX via XPAYMENTS. Métodos de outros mercados só são exibidos quando efetivamente habilitados.",
        ],
      },
      {
        title: "4. Pedidos",
        paragraphs: [
          "A submissão do checkout gera uma referência de pedido ou tentativa de pagamento. A confirmação comercial depende da validação do pagamento e da disponibilidade operacional.",
        ],
      },
      {
        title: "5. Entrega",
        paragraphs: [
          "Condições de frete e entrega são apresentadas no checkout. O cliente deve fornecer endereço correto e acessível para a modalidade selecionada.",
        ],
      },
      {
        title: "6. Cancelamentos, devoluções e direitos do consumidor",
        paragraphs: [
          "A Novidades.store não procura limitar direitos obrigatórios do consumidor. Regras de arrependimento, garantia legal, conformidade e reembolso aplicáveis ao mercado permanecem válidas.",
        ],
      },
      {
        title: "7. Uso da plataforma",
        paragraphs: [
          "É proibido utilizar a plataforma para fraude, abuso, interferência técnica, tentativa de acesso não autorizado ou manipulação de preço e pagamento.",
        ],
      },
      {
        title: "8. Conteúdo e propriedade intelectual",
        paragraphs: [
          "Identidade visual, textos, fotografias próprias, software e demais ativos protegidos não podem ser explorados comercialmente sem autorização, salvo quando outra licença for expressamente indicada.",
        ],
      },
      {
        title: "9. Contato",
        paragraphs: [
          "Questões sobre pedidos e termos podem ser encaminhadas para suporte@novidades.store no Brasil ou support@novidades.store em operações internacionais.",
        ],
      },
    ],
  },

  privacidade: {
    title: "Política de Privacidade",
    eyebrow: "DADOS PESSOAIS",
    intro:
      "Esta política explica como dados pessoais podem ser tratados durante navegação, atendimento, checkout, pagamento, entrega, prevenção a fraude e melhoria da experiência.",
    sections: [
      {
        title: "Controladores por mercado",
        paragraphs: [
          "Brasil: 69.093.616 MICAELA GOMES DE JESUS, CNPJ 69.093.616/0001-50, operando a marca NOVIDADES.STORE.",
          "Internacional, quando indicado como vendedor/controlador aplicável: MGJ EXPERT LTD, Company No. 17422467.",
        ],
      },
      {
        title: "Dados que podemos tratar",
        bullets: [
          "Dados de cadastro e contato, como nome, e-mail e telefone.",
          "Dados necessários ao checkout e entrega, incluindo endereço.",
          "Dados fiscais necessários ao método de pagamento, quando aplicável.",
          "Referências de pedido e estados de pagamento, sem armazenamento de senhas bancárias.",
          "Dados técnicos de navegação, atribuição de campanhas e consentimentos.",
          "Histórico de atendimento e solicitações de privacidade.",
        ],
      },
      {
        title: "Finalidades",
        bullets: [
          "Executar e administrar compras.",
          "Processar pagamentos e prevenir abuso/fraude.",
          "Entregar produtos e prestar suporte.",
          "Cumprir obrigações legais e regulatórias.",
          "Medir desempenho e marketing quando permitido e consentido.",
          "Melhorar segurança, estabilidade e experiência da plataforma.",
        ],
      },
      {
        title: "Prestadores e integrações",
        paragraphs: [
          "Dados podem ser tratados por prestadores necessários à operação, como hospedagem, banco de dados, pagamentos, logística, analytics e comunicação, respeitando a finalidade aplicável.",
        ],
      },
      {
        title: "Retenção e segurança",
        paragraphs: [
          "Os dados são mantidos pelo período necessário às finalidades informadas, obrigações legais, prevenção a fraude, defesa de direitos e gestão operacional. Aplicamos controles técnicos e organizacionais compatíveis com o contexto, sem prometer risco zero.",
        ],
      },
      {
        title: "Direitos e contato",
        paragraphs: [
          "Solicitações relacionadas a dados pessoais podem ser enviadas para privacidade@novidades.store no Brasil ou privacy@novidades.store em operações internacionais. Poderemos solicitar informações proporcionais para confirmar a identidade e evitar entrega indevida de dados.",
        ],
      },
    ],
  },

  cookies: {
    title: "Política de Cookies",
    eyebrow: "PREFERÊNCIAS",
    intro:
      "Cookies e tecnologias semelhantes podem ser usados para funcionamento essencial, preferências, medição e marketing. Categorias não essenciais devem respeitar o mecanismo de consentimento configurado para o mercado.",
    sections: [
      {
        title: "Essenciais",
        paragraphs: [
          "Necessários para segurança, sessão, carrinho, preferências técnicas e funcionamento básico. Não são usados como substituto para consentimento de marketing.",
        ],
      },
      {
        title: "Funcionais",
        paragraphs: [
          "Podem lembrar escolhas como idioma, moeda, região e preferências de interface.",
        ],
      },
      {
        title: "Analytics",
        paragraphs: [
          "Quando habilitados, ajudam a compreender uso e desempenho. A ativação deve respeitar as preferências e requisitos aplicáveis.",
        ],
      },
      {
        title: "Marketing",
        paragraphs: [
          "Quando habilitados e permitidos, podem apoiar atribuição e medição de campanhas. Não devem ser ativados apenas porque existe uma ID de Pixel configurada; a lógica de consentimento aplicável deve ser respeitada.",
        ],
      },
      {
        title: "Gerenciar preferências",
        paragraphs: [
          "A plataforma deve oferecer acesso permanente às configurações de cookies no rodapé. O utilizador pode rever categorias não essenciais a qualquer momento.",
        ],
      },
    ],
  },

  "direitos-de-privacidade": {
    title: "Direitos de Privacidade",
    eyebrow: "DADOS PESSOAIS",
    intro:
      "Você pode entrar em contato para exercer direitos de privacidade aplicáveis ao seu contexto e mercado.",
    sections: [
      {
        title: "Tipos de solicitação",
        bullets: [
          "Acesso ou confirmação de tratamento.",
          "Correção de dados.",
          "Informações sobre compartilhamento.",
          "Exclusão ou anonimização quando aplicável.",
          "Oposição ou retirada de consentimento quando aplicável.",
          "Opt-out de comunicações de marketing.",
          "Outras solicitações previstas no mercado aplicável.",
        ],
      },
      {
        title: "Como solicitar",
        paragraphs: [
          "Brasil: privacidade@novidades.store. Internacional: privacy@novidades.store. Informe nome, e-mail utilizado na relação com a plataforma, país e uma descrição objetiva do pedido. Número do pedido é opcional e útil quando a solicitação estiver relacionada a uma compra.",
        ],
      },
    ],
  },

  "informacoes-legais": {
    title: "Informações Legais",
    eyebrow: "IDENTIFICAÇÃO",
    intro:
      "A entidade responsável pela venda é mostrada no checkout conforme o mercado. Abaixo estão os dados institucionais atualmente configurados para a Novidades.store.",
    sections: [
      {
        title: "Brasil · NOVIDADES.STORE",
        bullets: [
          "CNPJ: 69.093.616/0001-50",
          "Nome Empresarial: 69.093.616 MICAELA GOMES DE JESUS",
          "Capital Social: R$ 5.000,00",
          "AVENIDA JOAO FLORENTINO · Lote 9 Quadra 2",
          "RESIDENCIAL ARAGUAIA · 75071-430 ANAPOLIS - GO · BRASIL",
          "Telefone: +55 (62) 99190-3462",
          "E-mail: contato@novidades.store",
        ],
      },
      {
        title: "Internacional · MGJ EXPERT LTD",
        bullets: [
          "Company number: 17422467",
          "71-75 Shelton Street, Covent Garden",
          "London, United Kingdom, WC2H 9JQ",
          "Telefone: +44 7451 214299",
          "E-mail: hello@novidades.store",
        ],
      },
      {
        title: "Nota",
        paragraphs: [
          "A presença destas entidades na plataforma não significa que ambas participem da mesma venda. O checkout identifica o vendedor e a moeda aplicáveis a cada operação.",
        ],
      },
    ],
  },
};
