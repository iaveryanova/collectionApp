import { Typography } from '@mui/material';
import * as React from 'react';
import ItemCard from '../../components/ItemCard';

const HomePage: React.FC = () => {
  
  return (
    <>
    {/* На главной странице отображаются: последние добавленные айтемы, коллекции с самым большим числом айтемов, кликабельное облако тэгов (при клике результат - список ссылок на айтемы, аналогично результатам поиска, по сути это может быть одна вьюшка). */}
      <Typography variant="h5" gutterBottom>
        Recently added items
      </Typography>

      <div style={{ display: "flex", width: "900px", justifyContent: "space-between" }}>
         <ItemCard />
      <ItemCard />
      <ItemCard />
      </div>
     
    
      
    </>
  );
};

export default HomePage;
