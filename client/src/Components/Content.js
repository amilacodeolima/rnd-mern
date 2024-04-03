import React from 'react'
import RndFunCom from './RndFunCom'
import RndClsCom from './RndClsCom'

export default function Content() {
  return (
    <>
      <hr/>
      <h3>Rnd Fun Com</h3>
      <div>
        <RndFunCom />
      </div>
      <hr/>
      <h3>Rnd Cls Com</h3>
      <div>
        <RndClsCom />
      </div>
      <hr/>
    </>
  )
}