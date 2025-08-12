
# Shopping List

> Um aplicativo web para gerenciar listas de compras de forma simples, eficiente e responsiva, com suporte a dark mode.

## Funcionalidades

- Adicione, visualize e gerencie itens da sua lista de compras
- Interface moderna com suporte a dark mode
- Autenticação de usuário (tela de login)
- Desenvolvido com Next.js, React, TailwindCSS, Prisma e Supabase

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Supabase](https://supabase.com/) (backend e autenticação)
- [FontAwesome](https://fontawesome.com/) (ícones)

## Como rodar o projeto localmente

1. **Clone o repositório:**
	```bash
	git clone https://github.com/bryanboone05/shopping-list.git
	cd shopping-list
	```

2. **Instale as dependências:**
	```bash
	npm install
	# ou
	yarn install
	```

3. **Configure as variáveis de ambiente:**
	- Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, por exemplo:
	  ```env
	  DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
	  DIRECT_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
	  NEXT_PUBLIC_SUPABASE_URL=...
	  NEXT_PUBLIC_SUPABASE_ANON_KEY=...
	  ```

4. **Rode as migrations do banco de dados:**
	```bash
	npx prisma migrate dev
	```

5. **Inicie o servidor de desenvolvimento:**
	```bash
	npm run dev
	# ou
	yarn dev
	```

6. **Acesse o app:**
	Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera a build de produção
- `npm start` — inicia o servidor em modo produção
- `npm run lint` — executa o linter

---

## Licença

Este projeto é open-source e está sob a licença MIT.
