# Online e-Shop

## 📌 Project Overview

This is a React-based eCommerce web application where users can browse products, add items to a cart, and proceed to checkout. The project fetches data from the Noroff Online Shop API.

## 🚀 Getting Started

To run this project locally, follow the steps below.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (Comes with Node.js) or yarn
- A terminal or command prompt

### 📥 Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/ChristianWestby/online-e-shop.git
   ```
2. **Navigate to the project folder**:
   ```sh
   cd online-e-shop
   ```
3. **Install dependencies**:
   ```sh
   npm install
   ```
   *or*
   ```sh
   yarn install
   ```

### ▶️ Running the Application

To start the development server:

```sh
npm start
```

*or*

```sh
yarn start
```

This will open the project in your browser at: [http://localhost:3000](http://localhost:3000)

### 📦 Building for Production

To create a production-ready build, run:

```sh
npm run build
```

This will generate an optimized `build/` folder containing static files for deployment.

## 🛠 Features

- 📌 Homepage with product listing and search functionality
- 🛒 Cart system (add/remove items, adjust quantities, clear cart)
- 🔍 Search products by name and tags
- 🏷️ Display of original price, discount percentage, and final price
- 📝 Individual product pages with reviews
- ✅ Checkout page with order confirmation
- 📩 Contact page with validation

## 📡 API

This project fetches products from the Noroff Online Shop API:

- **Base API URL:** `https://v2.api.noroff.dev/online-shop`
- **Single product:** `https://v2.api.noroff.dev/online-shop/{id}`

## 🔥 Project Structure

```
📂 online-e-shop
├── 📂 public        # Static assets (HTML, favicon, etc.)
├── 📂 src           # Source files
│   ├── 📂 components  # Reusable UI components (Header, Footer, Cart Icon, etc.)
│   ├── 📂 context     # Global state management (CartContext.js)
│   ├── 📂 pages       # Page components (HomePage, ProductPage, CartPage, etc.)
│   ├── 📂 styles      # Global and modular styles
│   ├── App.js        # Main React component
│   ├── index.js      # Entry point
│   ├── routes.js     # App routing (if applicable)
├── .gitignore     # Ignore unnecessary files in Git
├── package.json   # Project metadata & dependencies
└── README.md      # Project documentation
```

## 🔄 Deployment

This project is deployed using [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/). To deploy, follow these steps:

1. Push your latest changes to GitHub.
2. Connect the repository to Netlify/Vercel.
3. Set up automatic deployments.

## ❓ Troubleshooting

### Port Already in Use

If `npm start` fails because port 3000 is in use, run:

```sh
kill $(lsof -t -i:3000)
```

Then restart the server with:

```sh
npm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

💡 **Contributions & Issues**: If you find any bugs or have feature requests, feel free to open an issue or contribute via pull requests!

