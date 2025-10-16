import Header from './Header';
import Menu from './Menu';

function App() {
  return (
    <div>
      <h1 className="text-5xl font-bold bg-red-800 text-red-100 text-center p-4">{Header()}</h1>
      {Menu()}     
    </div>
    
  )
}

export default App
