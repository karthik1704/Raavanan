import axios from 'axios';
import { toggleAppLoading } from '../data/actions/appAction';
import { logoutUser } from '../data/actions/loginActions';
import store  from '../data/store';

const delay = 8000; 
let lastExecution = 0;

let headers = {}
  const customAxios = axios.create({
      headers,
  });


  customAxios.interceptors.request.use(
      function (config) {
        
        let token = localStorage.getItem('app_token');
        
        if(token){
          console.log(token)
          config.headers.Authorization = `${token}`
        }
        
        store.dispatch(toggleAppLoading(true));        
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    customAxios.interceptors.response.use(
      
    function (response) {
      
      store.dispatch(toggleAppLoading(false));
      return response;
    },
    function (error) {
      if(error){
      if (error?.response?.status === 401) {
        localStorage.removeItem('app_token');
        customAxios.defaults.headers.common['Authorization'] = '';
        
    
        appendItem(store.dispatch).then(() => {
          
          navigation_functin();
        })
        
        
        return Promise.reject(error);
      }
    }
      
      return Promise.reject(error);
    }

    
  );
  
const appendItem = (dispatch) => new Promise((resolve, reject) => {  
  dispatch(logoutUser(''));
  resolve();
});


const navigation_functin=()=>{  
  if ((lastExecution + delay) < Date.now()){

    // execute my lines
    lastExecution = Date.now() 
    var protocol = window.location.protocol;
    var domain = window.location.hostname;
    var port = window.location.port;
    
  setTimeout(function() {
    if(port) {
      port = ':'+port
    }
     
    window.location.href=protocol+'//'+domain+port+'/'    
  }, 3000);
 }
  
  
}

export default customAxios

// export default Navigation;