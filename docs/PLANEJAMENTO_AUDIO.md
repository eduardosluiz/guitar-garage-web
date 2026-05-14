# 🎵 Planejamento de Integração de Áudio (Boutique Sound)

Este documento detalha as opções e estratégias para implementar uma trilha sonora e playlist oficial no site da **Guitar Garage**, focando na experiência do usuário e na ambientação da boutique.

---

## 🏛️ A Ideia: Botão "Boutique Experience" no Header

Para manter o visual limpo e luxuoso do projeto, a ideia é inserir um controle de áudio discreto no cabeçalho:

1.  **O Ícone:** Um ícone minimalista de "Frequência de Áudio" ou o logo da plataforma escolhida (em Dourado/Gold).
2.  **O Efeito:** Ao clicar, um **Mini-Player elegante** desliza da lateral (estilo Off-canvas) ou abre em um modal flutuante com efeito de vidro (*Glassmorphism*).
3.  **Ambientação:** A música cria uma atmosfera imersiva de Blues/Rock enquanto o cliente navega pelos instrumentos vintage e serviços de luthieria.

---

## 🛠️ Opções de Implementação

### 1. SoundCloud (Altamente Recomendado)
*O SoundCloud é a opção mais fluida para um ambiente de boutique onde você quer que a música toque sem interrupções.*

*   **Vantagens:** 
    *   Toca a música **na íntegra** para qualquer usuário.
    *   **Não exige login** ou conta do visitante.
    *   Integração direta com o perfil oficial da Guitar Garage já existente.
*   **Limitações:** O design do player padrão é um pouco "datado", mas podemos customizar as cores para o dourado da marca.
*   **Ideal para:** Criar uma "Rádio Boutique" onde o usuário clica e a música simplesmente flui.

### 2. Spotify (Foco em Branding)
*O Spotify é excelente para autoridade de marca, mas possui barreiras de direitos autorais.*

*   **Vantagens:** Interface familiar e playlist oficial que os usuários podem "seguir".
*   **Limitações Críticas:** 
    *   Se o usuário **não estiver logado** no Spotify pelo navegador, ele ouvirá apenas **30 segundos** de cada música.
    *   Se o usuário for "Free", haverá anúncios entre as músicas.
*   **Ideal para:** Quando o objetivo principal é fazer o usuário seguir a playlist no app dele, e não necessariamente ouvir tudo dentro do site.

### 3. YouTube (Áudio Background)
*Funciona como um player de vídeo "disfarçado" apenas para áudio.*

*   **Vantagens:** Acesso ao catálogo infinito do YouTube e toca músicas completas para todos.
*   **Desvantagens:** 
    *   Mais "pesado" para carregar (consome mais dados).
    *   Exige uma lógica de código mais complexa para esconder o vídeo e mostrar apenas os controles.
*   **Ideal para:** Se a playlist desejada existir apenas no YouTube.

---

## 💡 Próximos Passos Sugeridos

Quando decidirmos implementar, a recomendação técnica é:
1.  Utilizar o **SoundCloud** para garantir que 100% dos visitantes tenham a mesma experiência sonora.
2.  Criar o botão no Header com um componente `AnimatePresence` do *Framer Motion* para o efeito de deslize suave.
3.  Implementar uma trava de "Mute" automática para não sustentar o áudio caso o usuário mude de aba (opcional).

---
*Documento criado em 14 de Maio de 2026 para referência futura.*
