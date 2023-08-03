import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'

const Root = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Root