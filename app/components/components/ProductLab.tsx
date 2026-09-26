import {Canvas, useFrame} from '@react-three/fiber';
import {Environment, OrbitControls, RoundedBox} from '@react-three/drei';
import {useRef} from 'react';
import * as THREE from 'three';

function ProductObject(){const ref=useRef<THREE.Group>(null); useFrame((_,d)=>{if(ref.current) ref.current.rotation.y+=d*.45}); return <group ref={ref}><RoundedBox args={[1.4,2.1,.7]} radius={.18} smoothness={6}><meshPhysicalMaterial metalness={.12} roughness={.18} clearcoat={.8}/></RoundedBox><mesh position={[0,1.22,0]}><cylinderGeometry args={[.3,.3,.16,48]}/><meshStandardMaterial metalness={.7} roughness={.2}/></mesh></group>}
export function ProductLab(){return <div className="product-lab"><Canvas camera={{position:[0,0,4.8],fov:35}} dpr={[1,1.5]}><ambientLight intensity={1.2}/><directionalLight position={[3,4,4]} intensity={3}/><Environment preset="studio"/><ProductObject/><OrbitControls enablePan={false} minDistance={3.4} maxDistance={6}/></Canvas><div className="lab-caption"><span>PRODUCT LAB</span><strong>Rotate the object.</strong></div></div>}
