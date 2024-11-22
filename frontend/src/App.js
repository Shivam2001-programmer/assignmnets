import React from 'react';
import WebpageScraper from './component/WebScrapper';
import ResultsTable from './component/ResultsTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      <h1 className="text-xl font-bold mb-6">BE Assignment Wireframe/Flow Diagram</h1>
      <div className="">
        <div className='p-10'>
        <WebpageScraper />
        </div>
        <ResultsTable />
      </div>
    </div>
  );
}

export default App;
