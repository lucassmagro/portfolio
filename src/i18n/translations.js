export const translations = {
  pt: {
    navbar: {
      work: 'Trabalhos',
      about: 'Info',
      contact: 'Contato',
    },
    hero: {
      tag: 'Desenvolvedor de Software · Estudante de Sistemas de Informação',
      intro:
        'Arquiteto de formação que migrou para a tecnologia. Estou no terceiro semestre de Sistemas de Informação e trabalho como analista de suporte júnior, caminhando para o desenvolvimento full-stack. A bagagem da arquitetura molda meu jeito de pensar design e de resolver problemas no código.',
      marker: 'Chapecó, Brasil',
      ctaWork: 'Ver trabalhos',
      ctaContact: 'Contato',
      status: 'Disponível',
      greeting: 'Olá, eu sou',
      scroll: 'Role',
    },
    cta: {
      section: 'Contato',
      headline: 'Quer tirar um projeto do papel?',
      sub: 'Estou aceitando trabalhos novos. Me chama no WhatsApp e a gente conversa.',
      whatsappCta: 'Falar no WhatsApp',
      orEmail: 'ou por e-mail:',
      button: 'Iniciar Conversa',
      form: {
        name: 'Nome',
        email: 'E-mail',
        message: 'Mensagem',
        send: 'Enviar mensagem',
        sending: 'Abrindo e-mail…',
        or: 'ou fale agora no',
        whatsapp: 'WhatsApp',
        subject: 'Contato pelo portfólio',
        success: 'Pronto! Seu cliente de e-mail abriu com a mensagem.',
        errors: {
          name: 'Informe seu nome.',
          email: 'Informe um e-mail válido.',
          message: 'Escreva uma mensagem (mín. 10 caracteres).',
        },
      },
    },
    about: {
      section: 'Perfil',
      title: 'Quem eu sou.',
      bio: 'Comecei na arquitetura, desenhando casas e acompanhando obras, e acabei migrando para a tecnologia. Hoje curso Sistemas de Informação e trabalho como analista de suporte júnior, enquanto avanço para o desenvolvimento full-stack. Da arquitetura trouxe o costume de cuidar de proporção, espaço e dos detalhes que ninguém repara à primeira vista, e levo isso para a forma como escrevo código e penso interfaces.',
      specialty: 'Especialidade',
      skills: ['Front-end', 'Back-end', 'Design e UI', 'Resolução de problemas'],
      stack: 'Stack',
      tools: ['React / Next.js', 'Node.js / Python', 'TypeScript / MySQL'],
      resume: 'Ver Currículo',
    },
    resume: {
      title: 'Currículo',
      contact: 'Contato',
      experience: 'Experiência',
      projects: 'Projetos',
      education: 'Formação',
      skills: 'Habilidades',
      back: 'Voltar',
      current: 'Presente',
      location: 'Chapecó, SC, Brasil',
      download: 'Baixar em PDF',
      langLabel: 'Linguagens',
      techLabel: 'Tecnologias',
      footerNote: 'Design & Desenvolvimento © 2026 Lucas Santos Magro',
      sections: {
        experience: [
          {
            company: 'ATS Jornada by nstech',
            role: 'Suporte Técnico',
            period: 'Out. 2025 – Presente',
            description:
              'Atuação com suporte ao cliente e centro de suporte técnico especializado.',
          },
          {
            company: 'Arroba Comunicação',
            role: 'Gerente de Mídias Sociais',
            period: 'Maio 2024 – Set. 2024',
            description:
              'Desenvolvimento de estratégias de conteúdo, análise de desempenho e gestão de ferramentas de marketing.',
          },
          {
            company: 'Applique Arquitetura',
            role: 'Estagiário em Arquitetura',
            period: 'Jul. 2022 – Dez. 2022',
            description:
              'Elaboração de projetos arquitetônicos, levantamento de dados e renderizações 3D.',
          },
          {
            company: 'CARRAROBERNARDI',
            role: 'Estagiário em Arquitetura',
            period: 'Mar. 2021 – Fev. 2022',
            description:
              'Acompanhamento de obras, compatibilização de projetos e pesquisa de normas técnicas.',
          },
        ],
        projects: [
          {
            title: 'Aplicações Web e API',
            period: 'Out. 2025 – Mar. 2026',
            description:
              'Desenvolvimento em Express.js para rotas lógicas e consumo de APIs públicas com JS puro.',
          },
          {
            title: 'Desenvolvimento Front-End',
            period: 'Ago. 2025',
            description:
              'Design e implementação de portfólio pessoal focado em performance e estética editorial.',
          },
          {
            title: 'Sistemas e Hardware',
            period: 'Set. 2025 – Nov. 2025',
            description:
              'Modelagem de sistemas UML e documentação LaTeX para integração de hardware e sensores.',
          },
        ],
        education: [
          {
            school: 'UNOESC',
            degree: 'Bacharelado em Sistemas de Informação',
            period: '2025 – 2028',
          },
          {
            school: 'Unochapecó',
            degree: 'Bacharelado em Arquitetura e Urbanismo',
            period: '2017 – 2023',
          },
        ],
        skills: {
          languages: 'C, C++, Python, JavaScript, HTML/CSS, Assembly',
          tools: 'Bootstrap, WordPress, Express.js, React, Tailwind',
        },
      },
    },
    projects: {
      section: 'Projetos Selecionados',
      title: 'Projetos.',
      view: 'VER',
      reworked: 'Ver versão reformulada',
      original: 'Ver original',
      soon: 'Estudo de caso em breve',
      conceptLabel: 'Marca fictícia',
      challengeLabel: 'Desafio',
      solutionLabel: 'Solução',
      items: [
        {
          id: 'cafeteria',
          title: 'Artisanal Coffee',
          brief:
            'Loja virtual para uma marca de café especial. A ideia foi dar à navegação o mesmo capricho do produto, do primeiro scroll até o carrinho.',
          challenge: 'Café especial sendo vendido em lojas genéricas, sem nada que mostrasse o cuidado por trás do produto.',
          solution:
            'Páginas com fotos grandes, textos curtos e um caminho de compra direto, sem etapas demais.',
          tags: ['E-commerce', 'Landing Page', 'Branding'],
          href: 'cafeteria/index.html',
          concept: true,
        },
        {
          id: 'refit',
          title: 'REFIT',
          brief:
            'Landing page para um estúdio de reforma residencial de alto padrão, com galeria de antes e depois e um pedido de orçamento simples.',
          challenge: 'O estúdio fazia obras caras, mas não tinha onde mostrar o resultado com qualidade.',
          solution: 'Galeria que dá para filtrar por tipo de obra e blocos de antes e depois para o cliente entender o trabalho.',
          tags: ['Arquitetura', 'Reforma', 'Landing Page'],
          href: 'refit/index.html',
          customImage: 'refit-thumb.png',
          concept: true,
        },
        {
          id: 'catedra',
          title: 'Cátedra Política',
          brief:
            'Portal de notícias e análise política. O foco foi leitura confortável em textos longos e páginas que abrem rápido.',
          challenge: 'Texto político é denso e pede leitura confortável sem fazer o leitor esperar a página carregar.',
          solution: 'Tipografia pensada para textos longos e páginas leves, que abrem rápido até no celular.',
          tags: ['Portal', 'Editorial', 'Política'],
          href: 'https://blog-maria.vercel.app/',
          customImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
        },
        {
          id: 'links',
          title: 'LinkHub / Bio Links',
          brief:
            'Uma página única para reunir meus links de redes e contato, do tipo que se coloca na bio do Instagram.',
          challenge: 'Bio de rede social dispersa em vários links soltos, difícil de manter.',
          solution: 'Uma página só, rápida, com tema claro e escuro, que centraliza tudo em um lugar.',
          tags: ['Pessoal', 'Branding', 'Social'],
          href: '#/links',
          customImage: 'https://images.unsplash.com/photo-1590381945249-b713d216adea?w=1200',
        },
      ],
    },
    footer: {
      statement: 'Desenvolvedor de software e estudante de Sistemas de Informação, em Chapecó, SC.',
      nav: 'Principal',
      links: { home: 'Início', work: 'Trabalhos', about: 'Info' },
      contact: 'Contato',
      emailLabel: 'E-mail',
      social: 'Social',
      availability: 'Aceitando novos projetos a partir de julho de 2026.',
      copyright: '© 2026 Lucas Santos Magro. Todos os direitos reservados.',
      madeBy: 'Feito por Lucas Santos Magro',
      resume: 'Baixar Currículo',
    },
    linkhub: {
      role: 'Designer & Desenvolvedor Web',
      latest: 'Projetos Recentes',
      links: {
        portfolio: 'Portfólio',
        resume: 'Currículo',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        spotify: 'Spotify',
        whatsapp: 'WhatsApp',
        email: 'E-mail',
      },
      projects: {
        portfolio: { title: 'Portfólio', sub: 'Front-end & Design' },
        cafeteria: { title: 'Artisanal Coffee', sub: 'E-commerce Editorial' },
        refit: { title: 'REFIT', sub: 'Arquitetura de Luxo' },
      },
      copyright: '© 2026 Lucas Santos Magro',
    },
  },
  en: {
    navbar: {
      work: 'Work',
      about: 'Info',
      contact: 'Contact',
    },
    hero: {
      tag: 'Software Developer · Information Systems Student',
      intro:
        'An architect who moved into tech. I am in my third semester of Information Systems and work as a junior support analyst while building toward full-stack development. My architecture background shapes how I think about design and how I solve problems in code.',
      marker: 'Chapecó, Brazil',
      ctaWork: 'View work',
      ctaContact: 'Contact',
      status: 'Available',
      greeting: "Hi, I'm",
      scroll: 'Scroll',
    },
    cta: {
      section: 'Contact',
      headline: 'Got a project in mind?',
      sub: "I'm taking on new work. Message me on WhatsApp and let's talk.",
      whatsappCta: 'Message me on WhatsApp',
      orEmail: 'or by email:',
      button: 'Start a Conversation',
      form: {
        name: 'Name',
        email: 'E-mail',
        message: 'Message',
        send: 'Send message',
        sending: 'Opening e-mail…',
        or: 'or reach me now on',
        whatsapp: 'WhatsApp',
        subject: 'Contact from portfolio',
        success: 'Done! Your e-mail client opened with the message.',
        errors: {
          name: 'Please enter your name.',
          email: 'Please enter a valid e-mail.',
          message: 'Please write a message (min. 10 characters).',
        },
      },
    },
    about: {
      section: 'Profile',
      title: 'Who I am.',
      bio: 'I started in architecture, designing houses and following construction sites, and ended up moving into tech. I am now studying Information Systems and working as a junior support analyst while moving toward full-stack development. From architecture I kept the habit of caring about proportion, space and the details no one notices at first, and I bring that into how I write code and think about interfaces.',
      specialty: 'Specialty',
      skills: ['Front-end', 'Back-end', 'Design and UI', 'Problem solving'],
      stack: 'Stack',
      tools: ['React / Next.js', 'Node.js / Python', 'TypeScript / MySQL'],
      resume: 'View Resume',
    },
    resume: {
      title: 'Resume',
      contact: 'Contact',
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      skills: 'Skills',
      back: 'Back',
      current: 'Present',
      location: 'Chapecó, SC, Brazil',
      download: 'Download PDF',
      langLabel: 'Languages',
      techLabel: 'Technologies',
      footerNote: 'Design & Development © 2026 Lucas Santos Magro',
      sections: {
        experience: [
          {
            company: 'ATS Jornada by nstech',
            role: 'Technical Support',
            period: 'Oct. 2025 – Present',
            description:
              'Focused on customer success and specialized technical support center operations.',
          },
          {
            company: 'Arroba Comunicação',
            role: 'Social Media Manager',
            period: 'May 2024 – Sep. 2024',
            description:
              'Development of content strategies, performance analysis, and marketing tool management.',
          },
          {
            company: 'Applique Arquitetura',
            role: 'Architecture Intern',
            period: 'Jul. 2022 – Dec. 2022',
            description:
              'Architectural project design, data collection, and 3D rendering developments.',
          },
          {
            company: 'CARRAROBERNARDI',
            role: 'Architecture Intern',
            period: 'Mar. 2021 – Feb. 2022',
            description:
              'Construction monitoring, project coordination, and technical standards research.',
          },
        ],
        projects: [
          {
            title: 'Web & API Applications',
            period: 'Oct. 2025 – Mar. 2026',
            description: 'Express.js development for logical routing and public API consumption.',
          },
          {
            title: 'Front-End Development',
            period: 'Aug. 2025',
            description:
              'Design and implementation of a personal portfolio focused on editorial aesthetics.',
          },
          {
            title: 'Systems & Hardware',
            period: 'Sep. 2025 – Nov. 2025',
            description:
              'UML modeling and LaTeX documentation for sensor-integrated hardware projects.',
          },
        ],
        education: [
          {
            school: 'UNOESC',
            degree: 'B.S. in Information Systems',
            period: '2025 – 2028',
          },
          {
            school: 'Unochapecó',
            degree: 'B.S. in Architecture & Urbanism',
            period: '2017 – 2023',
          },
        ],
        skills: {
          languages: 'C, C++, Python, JavaScript, HTML/CSS, Assembly',
          tools: 'Bootstrap, WordPress, Express.js, React, Tailwind',
        },
      },
    },
    projects: {
      section: 'Selected Works',
      title: 'Projects.',
      view: 'VIEW',
      reworked: 'See reworked version',
      original: 'See original',
      soon: 'Case study coming soon',
      conceptLabel: 'Fictional brand',
      challengeLabel: 'Challenge',
      solutionLabel: 'Solution',
      items: [
        {
          id: 'cafeteria',
          title: 'Artisanal Coffee',
          brief:
            'An online store for a specialty coffee brand. The goal was to give the browsing the same care as the product, from the first scroll to the cart.',
          challenge: 'Specialty coffee sold through generic stores, with nothing to show the care behind it.',
          solution:
            'Pages with large photos, short copy and a direct path to checkout, without extra steps.',
          tags: ['E-commerce', 'Landing Page', 'Branding'],
          href: 'cafeteria/index.html',
          concept: true,
        },
        {
          id: 'refit',
          title: 'REFIT',
          brief:
            'A landing page for a high-end residential renovation studio, with a before-and-after gallery and a simple quote request.',
          challenge: 'The studio did expensive work but had nowhere to show the results properly.',
          solution:
            'A gallery you can filter by type of work, plus before-and-after blocks so clients understand the job.',
          tags: ['Architecture', 'Renovation', 'Landing Page'],
          href: 'refit/index.html',
          customImage: 'refit-thumb.png',
          concept: true,
        },
        {
          id: 'catedra',
          title: 'Cátedra Política',
          brief:
            'A news and political analysis portal. The focus was comfortable reading for long articles and pages that open fast.',
          challenge: 'Political writing is dense and needs comfortable reading without making the reader wait for the page.',
          solution: 'Typography built for long reads and light pages that open quickly, even on a phone.',
          tags: ['Portal', 'Editorial', 'Politics'],
          href: 'https://blog-maria.vercel.app/',
          customImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
        },
        {
          id: 'links',
          title: 'LinkHub / Bio Links',
          brief:
            'A single page to gather my social and contact links, the kind you put in an Instagram bio.',
          challenge: 'A social bio scattered across many loose links, hard to keep up to date.',
          solution: 'One fast page, with light and dark themes, that pulls everything into one place.',
          tags: ['Personal', 'Branding', 'Social'],
          href: '#/links',
          customImage: 'https://images.unsplash.com/photo-1590381945249-b713d216adea?w=1200',
        },
      ],
    },
    footer: {
      statement: 'Software developer and Information Systems student, based in Chapecó, Brazil.',
      nav: 'Main',
      links: { home: 'Home', work: 'Work', about: 'Info' },
      contact: 'Contact',
      emailLabel: 'E-mail',
      social: 'Social',
      availability: 'Taking on new projects from July 2026.',
      copyright: '© 2026 Lucas Santos Magro. All rights reserved.',
      madeBy: 'Made by Lucas Santos Magro',
      resume: 'Download Resume',
    },
    linkhub: {
      role: 'Web Designer & Developer',
      latest: 'Latest Projects',
      links: {
        portfolio: 'Portfolio',
        resume: 'Resume',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        instagram: 'Instagram',
        spotify: 'Spotify',
        whatsapp: 'WhatsApp',
        email: 'E-mail',
      },
      projects: {
        portfolio: { title: 'Portfolio', sub: 'Front-end & Design' },
        cafeteria: { title: 'Artisanal Coffee', sub: 'Editorial E-commerce' },
        refit: { title: 'REFIT', sub: 'Luxury Architecture' },
      },
      copyright: '© 2026 Lucas Santos Magro',
    },
  },
}
