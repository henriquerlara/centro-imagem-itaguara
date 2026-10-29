# Centro de Imagem Integrado de Itaguara

Site institucional em Astro + TypeScript, com geração estática e CSS organizado por tokens. Requer Node.js 22.23.4 ou mais recente.

## Desenvolvimento

```sh
npm ci
npm run dev
```

Abra o endereço local indicado pelo Astro (normalmente `http://127.0.0.1:4321`).

```sh
npm run check
npm test
npm run build
npm run preview
```

O resultado pronto para hospedagem fica em `dist/`. O formulário monta uma mensagem com nome, cidade e exame e abre o WhatsApp de `(31) 97254-1945`. Nenhum dado é salvo pelo site; o paciente confirma o envio no WhatsApp e a equipe confirma o horário.

## Estrutura

- `src/pages/index.astro`: conteúdo e seções da página.
- `src/components/`: navegação, ícones e agendamento.
- `src/components/DockNavigation.astro`: dock na base, recolhimento com preferência nesta sessão, índice móvel em diálogo nativo e retorno de foco ao navegar.
- `src/components/Motion.astro`: entrada em sequência, revelação durante a rolagem, progresso de leitura e navegação ativa. As animações respeitam movimento reduzido; o conteúdo não depende delas para aparecer.
- `src/styles/global.css`: paleta, tipografia, espaçamento e estilos responsivos.
- `src/styles/navigation.css`: assinatura de marca no hero, dock e painel de exploração.
- `src/lib/whatsapp.mjs`: composição e codificação da mensagem.
- `src/assets/tomografo-canon.png` e `santa-casa.png`: fotos originais enviadas, otimizadas pelo Astro em WebP durante o build.
- `public/`: logos originais, favicon, Open Graph, CNAME e arquivos de SEO.

## GitHub Pages

O workflow `.github/workflows/deploy.yml` valida, compila e publica `dist/` nos pushes para `main` ou `master`. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**. O domínio é preservado pelo arquivo `public/CNAME` e pela configuração `site` do Astro. Não publique a pasta de código diretamente como se fosse o antigo HTML estático.

O mapa e o vídeo são embeds oficiais de terceiros e incluem links alternativos para abrir no Google Maps e no Instagram.
O Instagram usa um enquadramento reduzido para destacar o vídeo; o link abaixo abre a publicação completa.
