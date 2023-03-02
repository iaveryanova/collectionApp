
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import locales from '../shared/constants/locales';
import GlobalContext from '../shared/contexts/GlobalContext';
import { useContext } from 'react';




const SwitchLocale: React.FC = () => {
//@ts-ignore
 const {currentLocale, setCurrentLocale} = useContext(GlobalContext);
    
  return (
    
    <FormControl sx={{width:"70px", height:"50px"}}>
      <InputLabel id="demo-simple-select-label">Locale</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentLocale}
        label="Locale"
        onChange={(e) => setCurrentLocale(e.target.value)}
      >
        <MenuItem value={locales.EN}>EN</MenuItem>
        <MenuItem value={locales.RU}>RU</MenuItem>
    
      </Select>
    </FormControl>
  )
}

export default SwitchLocale

