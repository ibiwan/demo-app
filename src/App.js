import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import { Home } from './components/Home'
import { ColorTool } from './features/colorTool/components/ColorTool'

import { Layout } from './components/Layout'

import "./reset.css"
import { CarToolStoreProvider } from './features/carTool/carToolStore'
import { CalcTool } from './features/calcTool/CalcTool'
import { store } from './store'
import { CarTool } from './features/carTool/components/CarTool'
import { CarToolStringsProvider } from './features/carTool/carToolStringsContext'

export const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='color-tool' element={
            <ColorTool />
          } />
          <Route path='car-tool' element={
            <CarToolStoreProvider>
              <CarToolStringsProvider>
                <CarTool />
              </CarToolStringsProvider>
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
