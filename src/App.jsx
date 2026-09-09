import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import JamoListPage from './pages/JamoListPage.jsx'
import JamoDetailPage from './pages/JamoDetailPage.jsx'
import SoundChangeRuleListPage from './pages/SoundChangeRuleListPage.jsx'
import SoundChangeRuleDetailPage from './pages/SoundChangeRuleDetailPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jamo" element={<JamoListPage />} />
      <Route path="/jamo/:id" element={<JamoDetailPage />} />
      <Route path="/sound-change-rules" element={<SoundChangeRuleListPage />} />
      <Route path="/sound-change-rules/:id" element={<SoundChangeRuleDetailPage />} />
    </Routes>
  )
}

export default App