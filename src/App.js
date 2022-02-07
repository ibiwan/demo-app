import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Home } from './components/Home'
import { ColorTool } from './components/ColorTool'

import { Layout } from './components/Layout'

import "./reset.css"
import { ColorToolStoreProvider } from './contexts/colorToolStoreContext'
import { CarToolStoreProvider } from './features/carTool/carToolStore'
import { CalcTool } from './features/calcTool/CalcTool'
import { store } from './store'
import { CarTool } from './features/carTool/components/CarTool'

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='color-tool' element={
            <ColorToolStoreProvider>
              <ColorTool />
            </ColorToolStoreProvider>
          } />
          <Route path='car-tool' element={
            <CarToolStoreProvider>
              <CarTool />
            </CarToolStoreProvider>
          } />
          <Route path='calc-tool' element={
            <CalcTool />
          } />
        </Route>
      </Routes>
    </Provider>
  )
}
