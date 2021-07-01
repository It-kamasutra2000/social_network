import { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Redux/store';
import { Preloader } from './Components/Common/Preloader/Preloader';
import { authorize } from './Redux/App-Reducer';
import { selectIsAuthorizeFinished } from './Redux/selectors/App-selector';
document.body.style.backgroundColor = "#F3F2EF";


function App() {

  const dispatch = useDispatch()
  const isAuthorizeFinished = useSelector(selectIsAuthorizeFinished)

  useEffect(() => {
    dispatch(authorize())
  }, [dispatch])

  if(!isAuthorizeFinished) {
    return <Preloader styles={'appPre'} />
  }

  return (
    <div className= {'App'}>
      <Header />
      <Main />
      <div className={'footer'}>
        this site was created by David Gasparian
      </div>
    </div>
  );
}


const AppContainer = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}

export default AppContainer;