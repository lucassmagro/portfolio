export const translations = {
  pt: {
    navbar: {
      work: 'Trabalhos',
      about: 'Info',
      contact: 'Contato',
    },
    hero: {
      tag: 'Desenvolvedor Front-End & Design Editorial',
      intro:
        'Arquiteto de formação, desenvolvedor front-end por escolha. Transformo esse olhar espacial em sites rápidos, com estética editorial e foco em conversão — para estúdios, marcas e negócios que se recusam a parecer template.',
      marker: 'CHAPECÓ, BRASIL / FRONT-END & DESIGN / PORTFÓLIO 2026',
    },
    cta: {
      headline: 'Vamos criar algo extraordinário?',
      sub: 'Estou disponível para novos projetos e parcerias criativas.',
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
      section: 'Sobre Mim (04)',
      title: 'Informação.',
      bio: 'Comecei na arquitetura — desenhando casas, compatibilizando projetos e acompanhando obras — e levei esse rigor espacial para o desenvolvimento front-end. Hoje construo interfaces editoriais em React que equilibram estética, performance e conversão. Gosto de projeto em que cada pixel tem um motivo para existir.',
      trusted: 'Experiência em',
      companies: ['nstech', 'Arroba Comunicação', 'Applique Arquitetura', 'CARRAROBERNARDI'],
      specialty: 'Especialidade',
      skills: ['Estratégia UI/UX', 'Dev Editorial', 'Lógica de Movimento'],
      stack: 'Stack',
      tools: ['React / Vite', 'GSAP / Framer', 'Tailwind CSS'],
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
      section: 'Projetos Selecionados (06)',
      title: 'Obras.',
      view: 'VER',
      reworked: 'Ver versão reformulada',
      original: 'Ver original',
      soon: 'Estudo de caso em breve',
      challengeLabel: 'Desafio',
      solutionLabel: 'Solução',
      items: [
        {
          id: 'cafeteria',
          title: 'Artisanal Coffee',
          brief:
            'Uma experiência de e-commerce editorial que eleva a jornada do café artesanal. Implementação de micro-interações para engajamento sensorial.',
          challenge: 'Cafés artesanais disputam atenção em vitrines digitais genéricas.',
          solution:
            'Loja editorial com micro-interações que transmitem o ritual do café e guiam até a compra.',
          tags: ['E-commerce', 'Landing Page', 'Branding'],
          href: 'cafeteria/index.html',
        },
        {
          id: 'refit',
          title: 'REFIT',
          brief:
            'Uma landing page de luxo para arquitetura e reforma residencial, com estética premium e interatividade avançada.',
          challenge: 'Reformas de alto padrão sem uma vitrine à altura do serviço.',
          solution: 'Landing premium com galeria filtrável e narrativa de antes/depois.',
          tags: ['Arquitetura', 'Luxo', 'Landing Page'],
          href: 'refit/index.html',
          customImage: 'refit-thumb.png',
        },
        {
          id: 'hotel',
          title: 'Lumina Hotel',
          brief:
            'Redefinindo a hospitalidade digital através de uma interface minimalista e conversão otimizada. Foco em arquitetura de informação e fluidez narrativa.',
          challenge: 'Reservar um hotel costuma ser burocrático e impessoal.',
          solution:
            'Fluxo guiado de busca → quarto → confirmação, com estética calma e minimalista.',
          tags: ['Hospitalidade', 'UI/UX', 'Negócios'],
          href: 'hotel/index.html',
        },
        {
          id: 'arquitetura',
          title: 'FORMA Studio',
          brief:
            'Portfolio de arquitetura com foco em minimalismo extremo e grid dinâmico. Um estudo sobre espaço negativo e hierarquia tipográfica.',
          challenge: 'Portfólios de arquitetura poluídos acabam escondendo a própria obra.',
          solution: 'Grid minimalista que deixa o espaço negativo e os projetos falarem.',
          tags: ['Editorial', 'Minimalismo', 'Portfolio'],
          href: 'arquitetura/index.html',
        },
        {
          id: 'catedra',
          title: 'Cátedra Política',
          brief:
            'Um portal de notícias e blog focado em análise política, com arquitetura de alto desempenho e foco em legibilidade editorial.',
          challenge: 'Análise política densa exige leitura confortável e carregamento veloz.',
          solution: 'Portal editorial com tipografia legível e performance alta.',
          tags: ['Portal', 'Editorial', 'Política'],
          comingSoon: true,
          customImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
        },
        {
          id: 'links',
          title: 'LinkHub / Bio Links',
          brief:
            'Um hub de branding pessoal de alto nível, otimizado para bios de redes sociais e cartões de visita digitais.',
          challenge: 'Bio de redes sociais dispersa em vários links soltos.',
          solution: 'Hub único de marca pessoal, rápido e com troca de tema.',
          tags: ['Pessoal', 'Branding', 'Social'],
          href: '#/links',
          customImage: 'https://images.unsplash.com/photo-1590381945249-b713d216adea?w=1200',
        },
      ],
    },
    footer: {
      statement: 'Especializado em interfaces narrativas de alto impacto.',
      nav: 'Principal',
      links: { home: 'Início', work: 'Trabalhos', about: 'Info' },
      contact: 'Contato',
      emailLabel: 'E-mail',
      social: 'Social',
      availability: 'Abertura para novos projetos em Abril 2026.',
      copyright: '© 2026 LUCAS SANTOS MAGRO. TODOS OS DIREITOS RESERVADOS.',
      madeBy: 'Feito com ❤ por Lucas Santos Magro',
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
        whatsapp: 'WhatsApp',
        email: 'E-mail',
      },
      projects: {
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
      tag: 'Front-End Developer & Editorial Design',
      intro:
        'Architect by training, front-end developer by choice. I turn that spatial eye into fast, editorial websites built to convert — for studios, brands and businesses that refuse to look like a template.',
      marker: 'CHAPECÓ, BRAZIL / FRONT-END & DESIGN / 2026 PORTFOLIO',
    },
    cta: {
      headline: "Let's create something extraordinary?",
      sub: "I'm available for new projects and creative partnerships.",
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
      section: 'About Me (04)',
      title: 'Information.',
      bio: 'I started in architecture — designing houses, coordinating projects and following construction sites — and brought that spatial rigor into front-end development. Today I build editorial React interfaces that balance aesthetics, performance and conversion. I like work where every pixel has a reason to exist.',
      trusted: 'Experience at',
      companies: ['nstech', 'Arroba Comunicação', 'Applique Arquitetura', 'CARRAROBERNARDI'],
      specialty: 'Specialty',
      skills: ['UI/UX Strategy', 'Editorial Dev', 'Motion Logic'],
      stack: 'Stack',
      tools: ['React / Vite', 'GSAP / Framer', 'Tailwind CSS'],
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
      section: 'Selected Works (06)',
      title: 'Works.',
      view: 'VIEW',
      reworked: 'See reworked version',
      original: 'See original',
      soon: 'Case study coming soon',
      challengeLabel: 'Challenge',
      solutionLabel: 'Solution',
      items: [
        {
          id: 'cafeteria',
          title: 'Artisanal Coffee',
          brief:
            'An editorial e-commerce experience that elevates the artisanal coffee journey. Implementation of micro-interactions for sensory engagement.',
          challenge: 'Artisanal coffee competes inside generic digital storefronts.',
          solution:
            'An editorial store with micro-interactions that convey the coffee ritual and guide to purchase.',
          tags: ['E-commerce', 'Landing Page', 'Branding'],
          href: 'cafeteria/index.html',
        },
        {
          id: 'refit',
          title: 'REFIT',
          brief:
            'A luxury landing page for architecture and residential renovation, with premium aesthetics and advanced interactivity.',
          challenge: 'High-end renovations without a showcase worthy of the service.',
          solution:
            'A premium landing page with a filterable gallery and before/after storytelling.',
          tags: ['Architecture', 'Luxury', 'Landing Page'],
          href: 'refit/index.html',
          customImage: 'refit-thumb.png',
        },
        {
          id: 'hotel',
          title: 'Lumina Hotel',
          brief:
            'Redefining digital hospitality through a minimalist interface and optimized conversion. Focused on information architecture and narrative fluidity.',
          challenge: 'Booking a hotel tends to feel bureaucratic and impersonal.',
          solution: 'A guided search → room → confirmation flow with a calm, minimalist aesthetic.',
          tags: ['Hospitality', 'UI/UX', 'Business'],
          href: 'hotel/index.html',
        },
        {
          id: 'arquitetura',
          title: 'FORMA Studio',
          brief:
            'Architecture portfolio focused on extreme minimalism and dynamic grid. A study on negative space and typographic hierarchy.',
          challenge: 'Cluttered architecture portfolios end up hiding the work itself.',
          solution: 'A minimalist grid that lets negative space and the projects speak.',
          tags: ['Editorial', 'Minimalism', 'Portfolio'],
          href: 'arquitetura/index.html',
        },
        {
          id: 'catedra',
          title: 'Cátedra Política',
          brief:
            'A news portal and blog focused on political analysis, featuring high-performance architecture and a focus on editorial readability.',
          challenge: 'Dense political analysis demands comfortable reading and fast loads.',
          solution: 'An editorial portal with readable typography and high performance.',
          tags: ['Portal', 'Editorial', 'Politics'],
          comingSoon: true,
          customImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200',
        },
        {
          id: 'links',
          title: 'LinkHub / Bio Links',
          brief:
            'A high-end personal branding hub optimized for social media bios and digital business cards.',
          challenge: 'A social bio scattered across many loose links.',
          solution: 'A single personal-brand hub, fast and with theme switching.',
          tags: ['Personal', 'Branding', 'Social'],
          href: '#/links',
          customImage: 'https://images.unsplash.com/photo-1590381945249-b713d216adea?w=1200',
        },
      ],
    },
    footer: {
      statement: 'Specialized in high-impact narrative interfaces.',
      nav: 'Main',
      links: { home: 'Home', work: 'Work', about: 'Info' },
      contact: 'Contact',
      emailLabel: 'E-mail',
      social: 'Social',
      availability: 'Open for new projects in April 2026.',
      copyright: '© 2026 LUCAS SANTOS MAGRO. ALL RIGHTS RESERVED.',
      madeBy: 'Made with ❤ by Lucas Santos Magro',
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
        whatsapp: 'WhatsApp',
        email: 'E-mail',
      },
      projects: {
        cafeteria: { title: 'Artisanal Coffee', sub: 'Editorial E-commerce' },
        refit: { title: 'REFIT', sub: 'Luxury Architecture' },
      },
      copyright: '© 2026 Lucas Santos Magro',
    },
  },
}
