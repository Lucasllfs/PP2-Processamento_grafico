
# 🚀 Visualização Espacial 3D com Three.js

Este projeto é uma cena 3D interativa desenvolvida com **Three.js**, que representa uma nave espacial e um satélite flutuando no espaço. O cenário inclui efeitos de iluminação, animações e controle de câmeras, proporcionando uma visualização dinâmica e imersiva.

---

## 🧠 Funcionalidades

- **Importação de modelos GLTF/GLB**: Nave imperial e satélite carregados a partir de arquivos `.glb`.
- **Shader personalizado**: Um objeto TorusKnot vermelho escuro inserido dentro do satélite usando um shader GLSL.
- **Sistema de câmeras duplo**:
  - **Câmera 1**: OrbitControls padrão, centrado na nave.
  - **Câmera 2**: Fixa no satélite, com possibilidade de alternância (pressionando a tecla `C`).
- **Iluminação espacial personalizada**:
  - Luz ambiente.
  - Luz direcional (para gerar sombras).
  - Pontos de luz azul e vermelha para criar atmosfera espacial.
- **Animações**:
  - A nave gira e flutua suavemente com movimentos senoidais.
  - O satélite gira lentamente nos eixos Y e X.
  - A lua faz rotação em volta de si mesma e em volta de um eixo.
  - O planeta faz a rotação.
- **Controle interativo da cena** via mouse (zoom, rotação e pan) nas duas câmeras.
- **Fundo escuro espacial** (`0x000011`), simulando o vácuo do espaço.

---

## 📁 Estrutura de Arquivos

```
/meu-projeto
│
├── index.html              # Página principal (carrega o script JS)
├── main.js                 # Código JavaScript com lógica Three.js
├── /models
│   ├── nave-imperial.glb   # Modelo da nave
│   └── teste.glb           # Modelo do satélite
├── /textures               # (opcional) Imagens de fundo ou texturas futuras
└── /node_modules           # Pacotes npm (se aplicável)
```

---

## 🛠️ Tecnologias Utilizadas

- [Three.js](https://threejs.org/)
- GLTFLoader & DRACOLoader
- OrbitControls
- RawShaderMaterial (GLSL)
- JavaScript ES6

---

## 🔧 Como Executar

1. **Clone o repositório**:
```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

2. **Instale um servidor local (ex: `live-server` ou `vite`)**:
```bash
npm install -g live-server
```

3. **Execute o projeto**:
```bash
live-server
```

Ou abra diretamente o `index.html` com extensão Live Server no VSCode.

---

## 🎮 Controles

| Tecla | Ação |
|-------|------|
| `Mouse` | Orbitar, dar zoom e mover (quando a câmera ativa permitir) |
| `C` | Alterna entre Câmera 1 (nave) e Câmera 2 (satélite) |

---

## 💡 Melhorias Futuras (Ideias)

- Adicionar skybox com textura realista do universo.
- Incluir estrelas com partículas animadas.
- Adicionar som ambiente espacial.
- Incluir HUD informativa com nome dos objetos.

---

## 🖼️ Screenshot

![Cenário 3D](screenshot.png)

---

## 📄 Licença

Este projeto é de livre uso acadêmico e educacional. Sinta-se livre para modificar, adaptar e expandir conforme necessário.



### 🔍 Interação com o Satélite

Dentro do satélite, há um objeto especial (um TorusKnot com shader personalizado em vermelho escuro). Ao pressionar a tecla **C** para alternar para a câmera 2 e usar o zoom, é possível visualizar o **interior do satélite** com clareza.
