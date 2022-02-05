import { useEffect } from 'react';
import 'antd/dist/antd.css';

import './App.css';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader } from './Components/Common/Preloader/Preloader';
import { authorize } from './Redux/App-Reducer';
import { selectIsAuthorizeFinished } from './Redux/selectors/App-selector';
import { Footer } from './Components/Footer/Footer';
document.body.style.backgroundColor = "#F3F2EF";


function App() {

  const dispatch = useDispatch()
  const isAuthorizeFinished = useSelector(selectIsAuthorizeFinished)

  useEffect(() => {
    dispatch(authorize());
  }, [dispatch]);

  if (!isAuthorizeFinished) {
    return <Preloader styles={'appPre'} />
  }

  return (
    <div className={'App'}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;