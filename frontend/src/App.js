
import List from './components/List';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Update from './components/Update';
import Title from './components/Title';



function App() {
  return (
    <div className="App">
      <Title/>
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<List/> 
      }
      />
      <Route path='/update/:id' element={<Update/>}></Route>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
