import { useEffect } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls, Line } from '@react-three/drei/core'
import { Padrao } from './components/Padrao/Padrao'
import { useMainStore } from './stores/useMainStore'
// import { useControls } from 'leva'

function App() {
  
  const store = useMainStore((state) => state);

  // Controle de rotação manual da fronteira de decisão
  // const control = useControls({rotation: {label: 'line rotation', value: 0, step: .1} })

  // Ao iniciar App, um dataset de 30 objetos é gerado
  useEffect(() => {
    store.gerarNovoDataset(30);
  }, []);

  return (
    <div className="App">
      {/* Canvas onde a aplicação 3D será renderizada */}
      <Canvas>
        {/* Grid cartesiano*/}
        {/* Para gerar um set novo de dados, clique no grid. */}
        <gridHelper 
          args={[10, 10]} 
          rotation={[Math.PI / 2, 0, 0]} 
          onClick={() => store.gerarNovoDataset(30)} />

         {/* Dataset de padrões controlados pela store */}
        {store.dataset.map(
          (datasetObject) => (
            <Padrao 
              key={`${datasetObject.p.p1}-${datasetObject.p.p2}`} 
              p={datasetObject.p} 
              t={datasetObject.t} />
          )
        )}

        {/* Fronteira de decisão */}
        <Line 
          points={[[-10, 0, 0], [10, 0, 0]]} 
          color={'#D5FF61'} 
          rotation={[0, 0, store.weight[0] ]} />

        {/* Controle de câmera */}
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default App
