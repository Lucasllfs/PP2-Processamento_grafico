# Projeto de Processamento Gráfico - Cena 3D com Three.js

Este projeto foi desenvolvido como parte da disciplina de Processamento Gráfico, com o objetivo de criar e visualizar uma cena 3D interativa, aplicando os conceitos teóricos estudados.

## Objetivo do Projeto

Criar e visualizar uma cena 3D, mapeando os conceitos estudados em sala de aula, utilizando a biblioteca Three.js em um ambiente Web. O projeto foi desenvolvido em grupo, com contribuições individuais de cada membro diretamente no repositório do GitHub.

## Membros do Grupo

*   Eline Vieira - 815405
*   Lucas Lima Felix da Silva - 814131
*   Kaue Almeida Gonçalves de Oliveira - 813939
*   Yasmin Rossafa de Souza - 813938

## Tecnologias Utilizadas

-   **Linguagem:** JavaScript
-   **API Gráfica:** WebGL (através do Three.js)
-   **Biblioteca:** Three.js
-   **Ambiente de Desenvolvimento:** Vite

---

## Especificações Atendidas

O projeto cumpre com todas as especificações solicitadas para a avaliação:

1.  **Visualização de Objetos 3D Individuais:**
    *   **Nave Imperial (`nave-imperial.glb`):** Carregada, redimensionada e posicionada como o objeto central da cena.
    *   **Satélite (`satellite.glb`):** Carregado e posicionado em uma órbita distinta.
    *   **Planeta:** Criado como uma `SphereGeometry` e posicionado na cena.
    *   **Lua:** Criada como uma `SphereGeometry` e posicionada para orbitar o planeta.
    *(Cada objeto pode ser associado a um membro do grupo).*

2.  **Utilização de Shader Próprio:**
    *   Foi implementado um `RawShaderMaterial` customizado em um objeto `TorusKnotGeometry` que foi adicionado ao grupo do satélite. Este shader simples renderiza o objeto com uma cor vermelha sólida, demonstrando o conhecimento sobre a pipeline de renderização e a criação de shaders (vertex e fragment).

3.  **Definição de Duas Câmeras:**
    *   **Câmera Principal (`camera`):** Uma `PerspectiveCamera` com `OrbitControls` que permite a exploração livre da cena a partir de um ponto de vista geral.
    *   **Câmera Secundária (`camera2`):** Uma segunda `PerspectiveCamera` focada no satélite, também com `OrbitControls`. O usuário pode alternar para esta câmera para uma visão mais detalhada do satélite.

4.  **Movimento Simples de Objetos:**
    *   **Nave Imperial:** Possui uma animação de flutuação suave (para cima e para baixo) e rotação contínua em seu eixo Y.
    *   **Satélite:** Rotaciona em seus eixos X e Y.
    *   **Lua:** Realiza um movimento de translação (órbita) ao redor do planeta.
    *   **Planeta:** Rotaciona lentamente em seu próprio eixo.

5.  **Aplicação de Textura:**
    *   **Planeta:** Foi aplicada uma textura de superfície rochosa (`planeta.jpeg`).
    *   **Lua:** Foi aplicada uma textura da superfície lunar (`lua.jpg`).

---

## Modo de Interação

-   **Rotacionar a Câmera:** Clique e arraste com o botão esquerdo do mouse.
-   **Zoom:** Use a roda de rolagem (scroll) do mouse.
-   **Mover a Câmera (Pan):** Clique e arraste com o botão direito do mouse.
-   **Alternar Câmeras:** Pressione a tecla **C** para alternar entre a câmera principal (focada na nave) e a câmera secundária (focada no satélite).

## Como Executar o Projeto

Este projeto utiliza o [Vite](https://vitejs.dev/) como ferramenta de build. Para executá-lo localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-repositorio>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  Abra o navegador e acesse o endereço `http://localhost:5173` (ou a porta indicada no terminal).
