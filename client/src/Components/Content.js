import React from 'react'
import RndFunCom from './RndFunCom'
import RndClsCom from './RndClsCom'
import CreateProduct from './CreateProduct'

export default function Content() {
  return (
    <>
      <hr/>
      <h3>Create Product</h3>
      <div>
        <CreateProduct />
      </div>
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