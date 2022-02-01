import { Routes, Route } from 'react-router-dom'

import { Home } from './components/Home'
import { ColorTool } from './components/ColorTool'
import { CarTool } from './components/CarTool'

import { Layout } from './components/Layout'

import "./reset.css"

const colorList = [
  { id: 1, name: 'red', hexcode: 'FF0000' },
  { id: 2, name: 'green', hexcode: '33BB33' },
  { id: 3, name: 'blue', hexcode: '0000FF' },
]

const carList = [
  {
      id: 68,
      make: 'Honda',
      model: 'Civic LX',
      year: 2010,
      color: 'Gray',
      price: 23000
  },
  {
      id: 89,
      make: 'Kia',
      model: 'Soul +',
      year: 2011,
      color: 'Blue',
      price: 17000
  },
]

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='color-tool' element={<ColorTool colors={colorList} />} />
        <Route path='car-tool' element={<CarTool cars={carList} />} />
      </Route>
    </Routes>
  )
}
