@AGENTS.md

# Deploy — HostGator (cPanel) · iavendasmais.com

A LP é um **Next.js export estático** servido na hospedagem compartilhada HostGator (Apache/cPanel). No ar em **https://iavendasmais.com** desde 25/06/2026.

## Dados da hospedagem

| Item | Valor |
|------|-------|
| Domínio | `iavendasmais.com` (domínio principal) |
| Usuário cPanel | **`vilso815`** ⚠️ (v-**i**-l-s-o — NÃO "vllso" com dois L) |
| Home | `/home1/vilso815` |
| Document root | `/home1/vilso815/public_html` |
| Servidor cPanel | `br1088.hostgator.com.br:2083` |
| IP da conta (Shared IP) | `69.49.241.115` |
| Repo GitHub | `github.com/JuniorVln/vendasmais3d` (público, branch `master`) |
| Clone no servidor | `~/repositories/vendasmais3d` |
| SSH/Terminal | **habilitado** (cPanel → Terminal, ou SSH) |

> ⚠️ Sempre confirme o usuário real no Terminal com `echo $HOME` antes de mexer em caminhos.
> Confundir o `i` com `l` (fontes pequenas) já causou deploy numa pasta aninhada errada.

## Pré-requisito do build

`next.config.ts` precisa ter (já está commitado):

```ts
const nextConfig: NextConfig = {
  output: "export",              // gera /out estático
  images: { unoptimized: true }, // next/image sem servidor de otimização
  devIndicators: false,
};
```

`npm run build` gera a pasta `out/`. **O `out/` é versionado no git de propósito** (a hospedagem serve o build pronto). Build atual ~174 MB (inclui `frames/` e `videos/`).

## Como publicar uma atualização (recomendado)

1. Local — buildar e subir pro GitHub:
   ```bash
   npm run build
   git add -A && git commit -m "build: <descrição>"
   git push origin master
   ```
2. No servidor — Terminal do cPanel (ou SSH), 1 comando:
   ```bash
   cd ~/repositories/vendasmais3d && git pull && cp -a out/. ~/public_html/
   ```

Pronto, o site reflete na hora (Apache serve estático direto).

### Notas
- O `~/public_html/.htaccess` (handler PHP gerado pelo cPanel) é inofensivo — pode manter.
- Na primeira publicação havia um `default.html` (página "Bem-vindo a HostGator") em `public_html`; foi removido. `index.html` tem prioridade, mas se reaparecer: `rm -f ~/public_html/default.html`.
- Vídeos servem com Range/HTTP 206 (streaming OK).

## Verificação rápida

```bash
curl -s "https://iavendasmais.com/?v=$RANDOM" | grep -o '<title>[^<]*</title>'
# esperado: <title>Vendas Mais — Plataforma de Inteligência Comercial com IA</title>
curl -sI "https://iavendasmais.com/favicon.ico" | head -1   # 200
curl -sI -r 0-1 "https://iavendasmais.com/videos/vm-scroll.mp4" | head -1   # 206
```

## O que NÃO funciona / armadilhas

- **"Deploy HEAD Commit" do Git Version Control** (`.cpanel.yml`): só roda **com SSH habilitado**. Sem shell, fica eternamente "queued". Há um `.cpanel.yml` no repo (copia `out/` → `public_html`); com SSH ele funciona, mas o `git pull + cp` acima é mais direto.
- **File Manager é jailed ao home**: passar um caminho com usuário errado (ex. `/home1/vllso815/...`) **cria pasta aninhada** dentro do home em vez de dar erro — fácil de não perceber.
- **Upload via automação (Playwright)** não transfere arquivos >50 MB pro browser; o vídeo tem ~70 MB. Para upload manual use o File Manager (arrastar zip) ou prefira o fluxo git acima.

## Futuro: deploy automático

Opção recomendada: **GitHub Actions** que faz `git pull + cp` por SSH (ou FTP) a cada push — elimina o passo manual no servidor.
