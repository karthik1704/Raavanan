import {useEffect} from 'react';
import {useDispatch,useSelector } from 'react-redux';

import {changeTheme} from '../data/actions/appAction';


const useDarkTheme = ()=> {
    const {theme} = useSelector(state => state.appUi);
    const dispatch = useDispatch();

    const setThemeMode = (mode) => {
        window.localStorage.setItem('theme', mode);
        dispatch(changeTheme(mode))

    }

    const onToggleTheme = () => {
        if(theme === 'light'){
            setThemeMode('dark')    
        } else {
            setThemeMode('light')
        }    

    }

    useEffect(()=> {
       const localTheme = window.localStorage.getItem('theme');
       window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
            setThemeMode('dark') : 
            localTheme?  dispatch(changeTheme(localTheme)) : setThemeMode('light')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    

    return [theme,onToggleTheme]
}

export default useDarkTheme;