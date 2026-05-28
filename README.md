# RefSaaS - Sistema de Indicações Moderno

Um painel SaaS profissional e moderno para gerenciar indicações com integração Supabase, construído com React, TypeScript e Tailwind CSS.

## 🚀 Características

- ✅ Autenticação completa com Supabase
- ✅ Painel responsivo e moderno
- ✅ Sistema de indicações com rastreamento
- ✅ Cards e componentes modernos
- ✅ Design profissional com Tailwind CSS
- ✅ Dashboard com estatísticas em tempo real
- ✅ Integração com Supabase
- ✅ TypeScript para segurança de tipos

## 📋 Pré-requisitos

- Node.js 16+
- npm ou yarn
- Conta Supabase (https://supabase.com)

## 🛠️ Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/thiagoyayusatsky-eng/saasprovedor.git
cd saasprovedor
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.local.example .env.local
```

Edite `.env.local` e adicione suas credenciais Supabase:
```
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 4. Configure o Supabase

#### Criar as tabelas necessárias:

```sql
-- Tabela de usuários (criada automaticamente pelo Supabase Auth)

-- Tabela de indicações
CREATE TABLE referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_email VARCHAR NOT NULL,
  referred_name VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  commission_rate NUMERIC DEFAULT 15,
  total_earnings NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_status ON referrals(status);
```

#### Habilitar RLS (Row Level Security):

```sql
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Política de leitura: usuários podem ler suas próprias indicações
CREATE POLICY "Users can view their own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id);

-- Política de criação: usuários autenticados podem criar indicações
CREATE POLICY "Users can create referrals"
  ON referrals FOR INSERT
  WITH CHECK (auth.uid() = referrer_id);

-- Política de atualização: usuários podem atualizar suas indicações
CREATE POLICY "Users can update their own referrals"
  ON referrals FOR UPDATE
  USING (auth.uid() = referrer_id);
```

## 🚀 Execução

### Desenvolvimento
```bash
npm run dev
```

A aplicação abrirá em `http://localhost:3000`

### Build para produção
```bash
npm run build
```

### Preview do build
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.tsx          # Tela de login
│   │   └── Register.tsx        # Tela de registro
│   ├── Dashboard/
│   │   ├── ReferralPanel.tsx  # Painel principal de indicações
│   │   ├── StatsCard.tsx      # Cards de estatísticas
│   │   └── ReferralsList.tsx  # Tabela de indicações
│   └── Layout/
│       └── Navbar.tsx          # Barra de navegação
├── context/
│   └── AuthContext.tsx         # Context de autenticação
├── pages/
│   ├── Dashboard.tsx           # Página do dashboard
│   └── Profile.tsx             # Página de perfil
├── services/
│   └── supabase.ts            # Serviços Supabase
├── types/
│   └── index.ts               # Tipos TypeScript
├── App.tsx                     # Componente principal
├── main.tsx                    # Entrada React
└── index.css                   # Estilos globais
```

## 🎨 Design

- **Cores**: Azul profissional (Primary) e Cinza (Secondary)
- **Componentes**: Cards modernos com sombras e hover effects
- **Responsivo**: Funciona em mobile, tablet e desktop
- **Tailwind CSS**: Utilitários CSS para design rápido

## 🔐 Autenticação

- Email/Senha com Supabase Auth
- Context API para gerenciamento de estado
- Proteção de rotas privadas
- Logout seguro

## 📊 Funcionalidades do Dashboard

- Visão geral com estatísticas
- Lista de todas as indicações
- Status de cada indicação (Ativo, Pendente, Inativo)
- Rastreamento de ganhos
- Adicionar novas indicações
- Copiar IDs de indicações

## 🔄 Fluxo de Autenticação

1. Usuário se registra ou faz login
2. Supabase autentica e retorna token
3. Context armazena dados do usuário
4. Rotas protegidas verificam autenticação
5. Dashboard exibe painel personalizado

## 📝 Variáveis de Ambiente

```
VITE_SUPABASE_URL        # URL do seu projeto Supabase
VITE_SUPABASE_ANON_KEY   # Chave anônima do Supabase
```

## 🛡️ Segurança

- Autenticação com Supabase Auth
- RLS (Row Level Security) no banco de dados
- Senhas criptografadas
- Tokens JWT seguros
- Validação de entrada

## 📦 Dependências Principais

- **React 18.2** - UI library
- **React Router 6** - Roteamento
- **Supabase JS** - Backend as a Service
- **Tailwind CSS 3** - Styling
- **Lucide Icons** - Ícones modernos
- **TypeScript** - Type safety

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Autor

Desenvolvido por **Thiago Yayusatsky** - [@thiagoyayusatsky-eng](https://github.com/thiagoyayusatsky-eng)

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato.

---

**Última atualização**: Maio 2026