// App.tsx or any page
import React from 'react';
import NotebookViewer from '@/components/app/noteBookViewer';

const App = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-xl font-bold p-4">Jupyter Notebook Viewer</h1>
      <NotebookViewer />
    </div>
  );
};

export default App;
