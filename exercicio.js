class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: ['macaco', 'macaco', 'macaco'] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['gazela'] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: ['leão'] },
      ];
  
      this.tamanhosAnimais = {
        leão: 3,
        leopardo: 2,
        crocodilo: 3,
        macaco: 1,
        gazela: 2,
        hipopotamo: 4,
      };
  
      this.carnívoros = new Set(['leão', 'leopardo']);
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      
      if (!this.tamanhosAnimais[tipoAnimal.toLowerCase()]) {
        return { erro: "Animal inválido" };
      }
  
     
      if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const recintosViáveis = [];
  
      
      this.recintos.forEach((recinto) => {
        const { bioma, tamanho, animais } = recinto;
        const tamanhoAnimal = this.tamanhosAnimais[tipoAnimal.toLowerCase()];
  
       
        if (tipoAnimal.toLowerCase() === 'macaco' && animais.length === 0) {
          return; 
        }
  
        if (tipoAnimal.toLowerCase() === 'hipopotamo' && bioma !== 'savana e rio') {
          return; 
        }
  
        if (this.carnívoros.has(tipoAnimal.toLowerCase()) &&
            animais.some(animal => this.carnívoros.has(animal) && animal !== tipoAnimal.toLowerCase())) {
          return; 
        }
  
        
        let tamanhoTotalNecessario = animais.reduce((total, animal) => total + this.tamanhosAnimais[animal], 0);
        tamanhoTotalNecessario += quantidade * tamanhoAnimal;
  
        
        if (animais.length > 0 && (tipoAnimal.toLowerCase() in this.carnívoros || new Set(animais).size > 1)) {
          if (tamanho > 0) tamanho -= 1;
        }
  
       
        if (tamanhoTotalNecessario <= tamanho) {
          const espacoLivre = tamanho - tamanhoTotalNecessario;
          recintosViáveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${tamanho})`);
        }
      });
  
      
      if (recintosViáveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis: recintosViáveis.sort((a, b) => a.localeCompare(b)) };
    }
  }
  
  
  const zoo = new RecintosZoo();
  console.log(zoo.analisaRecintos('MACACO', 2)); 
  console.log(zoo.analisaRecintos('UNICORNIO', 1)); 