
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import locales from '../shared/constants/locales';
import GlobalContext from '../shared/contexts/GlobalContext';
import { useContext } from 'react';
import { Button } from '@mui/material';




const SwitchLocale: React.FC = () => {
  //@ts-ignore
   const {currentLocale, setCurrentLocale} = useContext(GlobalContext);
      
    return (
      
        <Button variant="outlined" color="inherit" onClick={(e) => {
            if(currentLocale == locales.EN){
              setCurrentLocale(locales.RU);
            }
            else{
              setCurrentLocale(locales.EN);
            }
          }
        }>
          {currentLocale == locales.RU ? locales.RU : locales.EN}
        </Button>
    )
  }

export default SwitchLocale

