import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import EventDetail from './pages/EventDetail.jsx';
import Chapters from './pages/Chapters.jsx';
import ChapterDetail from './pages/ChapterDetail.jsx';
import Universities from './pages/Universities.jsx';
import Partners from './pages/Partners.jsx';
import News from './pages/News.jsx';
import Article from './pages/Article.jsx';
import Team from './pages/Team.jsx';
import Join from './pages/Join.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:slug" element={<EventDetail />} />
        <Route path="chapters" element={<Chapters />} />
        <Route path="chapters/:slug" element={<ChapterDetail />} />
        <Route path="universities" element={<Universities />} />
        <Route path="partners" element={<Partners />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<Article />} />
        <Route path="team" element={<Team />} />
        <Route path="join" element={<Join />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
