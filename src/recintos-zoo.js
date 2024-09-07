class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: ['MACACO', 'MACACO', 'MACACO'] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: ['GAZELA'] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: ['LEAO'] },
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, bioma, carnivoro } = this.animais[animal];
        const espacoNecessario = quantidade * tamanho;

        let recintosViaveis = this.recintos.filter(recinto => {
            if (!bioma.some(b => recinto.bioma.includes(b))) return false;
            if (carnivoro && recinto.animais.some(a => a !== animal)) return false;

            const espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a].tamanho, 0);
            const espacoDisponivel = recinto.tamanho - espacoOcupado;

            return espacoDisponivel >= espacoNecessario;
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        
        recintosViaveis = recintosViaveis.map(recinto => {
            const espacoOcupado = recinto.animais.reduce((total, a) => total + this.animais[a].tamanho, 0);
            const espacoLivreRestante = recinto.tamanho - (espacoOcupado + espacoNecessario);

            return `Recinto ${recinto.numero} (espaço livre: ${espacoLivreRestante} total: ${recinto.tamanho})`;
        });

        return { recintosViaveis };
    }
}

export { RecintosZoo };