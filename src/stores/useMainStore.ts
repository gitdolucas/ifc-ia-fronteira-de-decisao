import { create } from "zustand";

export type TPadrao = {
    p1: number,
    p2: number,
}

export type TTarget = 0 | 1;

export type TDatasetObject = {
    p: TPadrao,
    t: TTarget,
}

export type TUseMainStore = {
    weight: [number, number];
    setWeight: (newWeight: [number, number]) => void;
    gerarNovoWeight: () => void;

    dataset: TDatasetObject[];
    setDataset: (newDataset: TDatasetObject[]) => void;
    gerarNovoDataset: (numberOfObjects: number) => void;
}
export const useMainStore = create<TUseMainStore>((set, get) => ({
    weight: [0, 0],
    setWeight: (newWeight) => set({weight: newWeight}),
    gerarNovoWeight: () => get().setWeight([Math.random() * 10, Math.random() * 10]),

    dataset: [],
    setDataset: (novoDataset: TDatasetObject[]) => set({ dataset: novoDataset }),
    gerarNovoDataset: (numeroDeObjetos: number) => {
        get().gerarNovoWeight();
        const novoDataset = [...Array(numeroDeObjetos).keys()]
            .map(i => { 
                const p1 = (Math.random() * 10) - 5
                const p2 = (Math.random() * 10) - 5
                return ({
                    p: { 
                        p1, 
                        p2 
                    }, 
                    t: (p1*get().weight[0] + p2*get().weight[1]) as TTarget,
                })
            })
        console.table(novoDataset);
        get().setDataset(novoDataset);
    },
}))