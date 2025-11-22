// data/database.js
export class DatabaseService {
  constructor() {
    this.dbName = 'SaborAquiDB';
    this.version = 4;
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('produtos')) {
          const produtosStore = db.createObjectStore('produtos', { keyPath: 'id' });
          produtosStore.createIndex('categoria', 'categoria', { unique: false });
          produtosStore.createIndex('vendedor', 'vendedor', { unique: false });
        }

        if (!db.objectStoreNames.contains('vendedores')) {
          db.createObjectStore('vendedores', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('categorias')) {
          db.createObjectStore('categorias', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('pedidos')) {
          db.createObjectStore('pedidos', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  async add(storeName, data) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getAll(storeName) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async delete(storeName, id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getProdutos() {
    return this.getAll('produtos');
  }

  async addProduto(produto) {
    return this.add('produtos', produto);
  }

  async getVendedores() {
    return this.getAll('vendedores');
  }

  async getCategorias() {
    return this.getAll('categorias');
  }

  async getPedidos() {
    return this.getAll('pedidos');
  }

  async addPedido(pedido) {
    return this.add('pedidos', pedido);
  }

  async deletePedido(id) {
    return this.delete('pedidos', id);
  }

  async initSampleData() {
    const existingProdutos = await this.getProdutos();

    if (existingProdutos.length === 0) {
      const categorias = [
        { id: 'burgers', name: 'Hambúrgueres', icon: '🍔', count: 12 },
        { id: 'pizzas', name: 'Pizzas', icon: '🍕', count: 8 },
        { id: 'drinks', name: 'Bebidas', icon: '🥤', count: 15 },
        { id: 'desserts', name: 'Sobremesas', icon: '🍰', count: 6 },
        { id: 'snacks', name: 'Lanches', icon: '🌭', count: 10 },
        { id: 'combos', name: 'Combos', icon: '📦', count: 5 }
      ];

      for (const categoria of categorias) {
        await this.add('categorias', categoria);
      }

      const vendedores = [
        { id: 'chef-joao', name: 'Chef João', initials: 'CJ', specialty: 'Carnes Premium', rating: 4.8, deliveryTime: '25-35 min', category: 'Churrasco' },
        { id: 'pizza-master', name: 'Pizza Master', initials: 'PM', specialty: 'Pizzas Artesanais', rating: 4.9, deliveryTime: '30-40 min', category: 'Pizzaria' },
        { id: 'doces-maria', name: 'Doces Maria', initials: 'DM', specialty: 'Sobremesas', rating: 4.7, deliveryTime: '15-25 min', category: 'Confeitaria' },
        { id: 'lanches-rapidos', name: 'Lanches Rápidos', initials: 'LR', specialty: 'Lanches', rating: 4.5, deliveryTime: '20-30 min', category: 'Fast Food' }
      ];

      for (const vendedor of vendedores) {
        await this.add('vendedores', vendedor);
      }

      const produtos = [
        { id: 1, name: 'Hambúrguer Artesanal', description: 'Carne 180g, queijo, alface, tomate', price: '24,90', rating: 4.8, preparationTime: '15-20 min', category: 'burgers', vendor: 'Chef João', icon: '🍔' },
        { id: 2, name: 'Pizza Calabresa', description: 'Molho, calabresa, cebola, azeitonas', price: '49,90', rating: 4.9, preparationTime: '25-35 min', category: 'pizzas', vendor: 'Pizza Master', icon: '🍕' },
        { id: 3, name: 'Coca-Cola 2L', description: 'Refrigerante gelado', price: '12,00', rating: 4.5, preparationTime: '5-10 min', category: 'drinks', vendor: 'Lanches Rápidos', icon: '🥤' },
        { id: 4, name: 'Brownie com Sorvete', description: 'Brownie quente com sorvete de creme', price: '18,90', rating: 4.7, preparationTime: '10-15 min', category: 'desserts', vendor: 'Doces Maria', icon: '🍫' },
        { id: 5, name: 'Hot Dog Especial', description: '2 salsichas, purê, batata palha', price: '16,90', rating: 4.6, preparationTime: '12-18 min', category: 'snacks', vendor: 'Lanches Rápidos', icon: '🌭' },
        { id: 6, name: 'Combo Família', description: '2 pizzas + 2 refrigerantes', price: '89,90', rating: 4.8, preparationTime: '30-40 min', category: 'combos', vendor: 'Pizza Master', icon: '📦' },
        { id: 7, name: 'Costela no Bafo', description: 'Costela suína temperada', price: '42,90', rating: 4.9, preparationTime: '35-45 min', category: 'burgers', vendor: 'Chef João', icon: '🥩' },
        { id: 8, name: 'Torta de Limão', description: 'Torta gelada com limão siciliano', price: '14,90', rating: 4.8, preparationTime: '5-10 min', category: 'desserts', vendor: 'Doces Maria', icon: '🍰' }
      ];

      for (const produto of produtos) {
        await this.addProduto(produto);
      }

      const pedidos = [
        {
          cliente: "Maria Oliveira",
          endereco: "Rua das Flores, 123 - Centro, Recife/PE",
          itens: [
            { nome: "X-Burger", preco: 18.5 },
            { nome: "Batata Média", preco: 9.0 },
          ]
        },
        {
          cliente: "João Silva",
          endereco: "Av. Paulista, 890 - Bela Vista, São Paulo/SP",
          itens: [
            { nome: "Pizza Calabresa", preco: 32.0 },
            { nome: "Coca-Cola 1L", preco: 8.0 },
          ]
        }
      ];

      for (const pedido of pedidos) {
        await this.addPedido(pedido);
      }
    }
  }
}

export const dbService = new DatabaseService();