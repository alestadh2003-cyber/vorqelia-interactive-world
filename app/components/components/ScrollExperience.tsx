import {useEffect, useState} from 'react';
import {Character123} from './Character123';

export function ScrollExperience(){
 const [scene,setScene]=useState(0);
 useEffect(()=>{const f=()=>setScene(Math.min(3,Math.floor(window.scrollY/Math.max(1,window.innerHeight*.8)))); window.addEventListener('scroll',f,{passive:true}); f(); return()=>window.removeEventListener('scroll',f)},[]);
 const states=['idle','walking','looking_product','presenting'];
 return <div className="floating-character"><Character123 state={states[scene]} label="VORQELIA digital presenter"/><div className="scene-tag">{['01 / WORLD','02 / DISCOVER','03 / PRODUCT','04 / SERVICES'][scene]}</div></div>
}
