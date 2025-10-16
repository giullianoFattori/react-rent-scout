# Page Architecture & Content Strategy

Diretrizes para estruturar páginas, microcopy e variantes do Rent Scout, garantindo uma experiência consistente, acessível (WCAG 2.1 AA) e alinhada ao design system baseado em Radix Colors.

## Grid, Breakpoints e Layout Base
- **Container**: largura fluida até `sm`; limites progressivos em `sm (640px)`, `md (768px)`, `lg (1024px)`, `xl (1280px)` e `2xl (1536px)` — utilizar a mesma escala configurada no Tailwind.
- **Grid responsivo**:
  - Mobile (`< sm`): 1 coluna.
  - `sm–md`: 2 colunas (ou 3 para listas densas).
  - `lg+`: 3 a 4 colunas conforme contexto (cards, amenidades, etc.).
- **Spacing tokens**: usar `--space-*` e utilitários `gap-{token}` para manter consistência.
- **Toasts e navegabilidade**: feedbacks curtos (favoritar, copiar link) e cabeçalho fixo com `SearchCompact`.

## Componentes Transversais
- **Header** (`variant="solid"` por padrão) com `SearchCompact` integrado; em mobile a busca colapsa para botão/Sheet.
- **Footer** padronizado com navegação institucional e escolha de idioma/moeda.
- **FiltersBar** (chips) + `data-evt="filter_apply"`.
- **ResultsGrid`, `PropertyCard`, `EmptyState`, `Skeletons`** para estados de carregamento e ausência de dados.
- **Tracking** padrão:
  - `search_submit`, `filter_apply`, `card_open`, `book_start`, `book_confirm`.
  - CTA principais com `data-evt="cta_click"` + `data-ctx` contextual (ex.: `header_search`, `results_card`).

---

## Página: Home
- **Objetivo**: descoberta rápida, estimular busca inicial.
- **Ordem das seções**:
  1. **Header** + `SearchCompact` (inline, sem hero de imagem).
  2. **Destinos sugeridos**: `Chip` variáveis com destinos populares (`Buenos Aires`, `Ubatuba`, etc.) → CTA `Explorar`.
  3. **Coleções temáticas**: cards horizontais (`Stack` + ícone) para “Pet-friendly”, “Com vista”, “Cozinha completa”.
  4. **Prova social**: `RatingStars` + trechos de depoimentos curtos (até 120 caracteres).
  5. **FAQ curto**: três perguntas expandíveis (Accordion Flowbite) — “Como funciona a reserva?”, “Quais taxas existem?”, “É seguro pagar pelo site?”.
  6. **Footer**.
- **Microcopy chave**:
  - Título hero: “Encontre a estadia perfeita para sua próxima viagem”.
  - CTA de busca: “Buscar estadias”.
  - Chips destinos: “Buenos Aires · Argentina”, etc.
  - Prova social: “4,8/5 com base em 230 avaliações verificadas”.
- **Responsivo**:
  - `SearchCompact` variante `block` em mobile (campos empilhados).
  - Coleções → carrossel horizontal `snap-x` até `md`, grid a partir de `lg`.
- **Variants/Estados**:
  - Loading: usar `Skeletons.PropertyCardSkeleton`.
  - Erro ao carregar destinos → `EmptyState` inline com CTA “Tentar novamente”.

## Página: Resultados de Busca
- **Objetivo**: permitir comparação e refinamento rápido.
- **Layout**:
  1. **Header** + `SearchCompact` persistente (fixo).
  2. **FiltersBar** logo abaixo (chips + “Mais filtros” → modal no mobile).
  3. **Resumo da busca**: heading `h1` — “Estadias em {{location}} — {{dates}} · {{count}} opções”.
  4. **Resultados**: `ResultsGrid` com `PropertyCard` + botão “Ver detalhes”.
  5. **Mapa opcional**: `ResultsGrid layout="withMap"` em desktops; em mobile, botão `Ver no mapa` abre sheet.
  6. **Paginações / Carregar mais** (Flowbite Pagination).
  7. **EmptyState** quando sem resultados (explicar ajustes: “Tente datas diferentes ou expanda a região”).
- **Microcopy**:
  - Tooltip no preço: “Preço total estimado para {{n}} noite(s)”.
  - Botão de mapa: “Ver no mapa”.
  - Carregar mais: “Mostrar mais {{batchSize}} estadias”.
- **Responsivo**:
  - `FiltersBar` vira botão único (`Toolbar` colapsa).
  - `ResultsGrid` 1 col em mobile, 2 col `md`, 3 col `lg`, 3+ mapa `xl`.
- **Estados**:
  - Loading inicial: `Skeletons.PropertyCardSkeleton`.
  - Erro: mensagem “Não foi possível carregar estadias agora. Tente novamente.” + CTA.

## Página: Detalhe do Imóvel
- **Objetivo**: transmitir confiança, levar à reserva.
- **Ordem das seções**:
  1. **Cabeçalho**: título (`<h1>`), localização (`MapPinIcon`), nota média (`RatingStars`), botão favoritar.
  2. **Gallery**: grid 5 imagens (3 grandes + 2 menores) com modal fullscreen (`enableFullscreen`).
  3. **Resumo rápido**: hóspedes, quartos, camas, banheiros (usando `Stack` + ícones).
  4. **AmenitiesList** principais + CTA “Ver todas as comodidades”.
  5. **Descrição**: parágrafos curtos + bullets (ex.: diferenciais do anfitrião).
  6. **Regras e políticas**: tabs ou cards separados (“Regras da casa”, “Política de cancelamento”).
  7. **Mapa do bairro**: highlight aproximado, com nota “Localização aproximada”.
  8. **Reviews**: média + ordenação (“Mais recentes”, “Melhor avaliadas”).
  9. **FAQ curto / suporte**: 2–3 perguntas + link “Falar com suporte”.
  10. **BookingWidget**: sticky à direita em desktop (`top: 112px`), empilhado abaixo do conteúdo em mobile.
- **Microcopy**:
  - Heading: “Apartamento completo em {{city}}”.
  - BookingWidget:
    - CTA primário: “Reservar agora”.
    - Secundário: “Contatar anfitrião”.
    - Itemização: “{{noites}} noite(s) · {{precoNoite}}/noite”, “Taxa de limpeza”, “Taxa de serviço”.
    - Total: “Valor total estimado”.
  - Regras: “Check-in após 15h · Check-out antes de 11h”.
- **Responsivo**:
  - Gallery vira carrossel horizontal em mobile.
  - BookingWidget rola para fim, antecedido por CTA fixo “Ver detalhes de preço”.
- **Estados**:
  - Mostrar skeletons enquanto carrega fotos/amenidades.
  - EmptyState para reviews (“Seja o primeiro a avaliar este imóvel”).

## Página: Checkout / Reserva
- **Objetivo**: concluir pagamento com segurança.
- **Fluxo multi-step** (ideal em `Stepper`):
  1. **Resumo da reserva** (datas, hóspedes, endereço aproximado, total).
  2. **Dados do hóspede**: formulário com validações inline.
  3. **Pagamento**: cartão (com máscara), PIX (instruções), opção de salvar dados.
  4. **Revisão**: aceitar termos (checkbox obrigatório), mostrar política de cancelamento.
  5. **Confirmação**: número da reserva, e-mail enviado, CTA “Ver detalhes” / “Compartilhar”.
- **Microcopy de validação**:
  - Erros humanos: “Informe um telefone válido com DDD” (evitar jargões).
  - Botão principal desabilitado até completar campos obrigatórios.
- **UX/A11y**:
  - Indicar passo atual (“Passo 2 de 5 — Dados do hóspede”).
  - Autosave: snackbar “Progresso salvo automaticamente”.
  - Resumo sempre visível (sticky sidebar) em desktop; accordion em mobile.

## Página: Favoritos
- **Estrutura**:
  1. Heading: “Suas estadias favoritas”.
  2. Grid com `PropertyCard` (badge “Favorito”).
  3. `EmptyState` se vazio — título “Ainda não há favoritos”, descrição “Salve imóveis para comparar depois.”, CTA “Começar a buscar”.
- **Notas**:
  - Permitir remover via coração no card (toast “Removido dos favoritos”).
  - Ordenar por data adicionada (mais recente primeiro).

## Página: Autenticação
- **Modal** (`AuthModal`) acionado do Header ou antes de reservar:
  - Tabs “Entrar” e “Criar conta”.
  - Campos mínimos (nome somente para cadastro).
  - Microcopy: “Receba confirmação e atualizações no seu e-mail”.
  - Futuro: botões SSO (Google, Apple) — placeholders com `disabled`.

## Página: Ajuda / FAQ
- **Objetivo**: autoatendimento.
- **Layout**:
  1. Header (compacto) + campo `SearchCompact` variante `inline` restringido a tópicos.
  2. Categorias em cards (`Pagamento`, `Cancelamento`, `Segurança`, `Regulamentos`).
  3. Acordeões com perguntas frequentes.
  4. Bloco “Ainda precisa de ajuda?” com CTA “Falar com suporte” (`data-evt="cta_click"`, `data-ctx="support_contact"`).
- **Microcopy**:
  - Placeholder busca: “Busque por taxas, cancelamento, políticas…”.
  - CTA categoria: “Ver respostas”.

---

## Variantes e Estados Comuns
- **Loading**: Skeletons específicos (cards, detalhes, checkout).
- **EmptyState**: contextualizar motivo + CTA de próxima ação.
- **Erro**: mensagens em linguagem simples + links úteis.
- **Dark mode**: aplicar `data-theme="dark"` no `html` para usar tokens inversos.

## Acessibilidade & Microinterações
- Contraste mínimo: 4.5:1 texto normal, 3:1 ícones/bordas (verificado com Radix steps selecionados).
- Estados `focus-visible` sempre visíveis (`focus-ring` utilitário).
- Animações <= 200 ms com easing padrão (`transition duration-150 ease-out`), respeitando `prefers-reduced-motion`.

## Referências Aberta
- **Flowbite React**: base para Modals, Dropdowns, Accordions, Pagination.
- **Colorlib Vacation Rental**: inspiração estrutural (manter crédito se derivar).
- **Radix Colors**: escalas acessíveis (já mapeadas nos tokens).
- **WCAG 2.1**: seguir regras AA de contraste, rótulos, navegação por teclado.

Esta documentação deve guiar squads de produto/design e desenvolvimento ao compor novas páginas, garantindo alinhamento visual, textual e funcional em todo o produto.
