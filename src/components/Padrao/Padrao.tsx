import { Sphere, Html } from '@react-three/drei'
import { useState } from 'react'
import { TPadrao, TTarget } from '../../stores/useMainStore'

export function Padrao({ p, t }: { p: TPadrao, t: TTarget }) {

    // Controle de hover para dar display das informações do padrão
    const [hover, setHover] = useState(false);

    return <group>
        <Sphere
            args={[.2, 4, 4]}
            position={[p?.p1, p?.p2, 0]}
            onPointerMove={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            {/* Cor do material setada de acordo com target */}
            <meshBasicMaterial color={t < 0 ? '#000' : '#fff'} />
        </Sphere>

        {/* Informativo do padrão, caso hover */}
        {hover && <Html position={[p?.p1, p?.p2 - .25, 0]}>
            <div style={{ padding: 8, backgroundColor: "#f72323"}}>
                <h3>[[{p.p1.toFixed(2)},{p.p2.toFixed(2)}],{t.toFixed(2)}]</h3>
            </div>
        </Html>}
    </group>
}