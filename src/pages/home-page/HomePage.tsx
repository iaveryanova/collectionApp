import { Typography } from "@mui/material";
import * as React from "react";
import ItemCard from "../../components/ItemCard";
import http from "../../http";
import { useEffect, useState } from "react";
import CollectionCard from "../../components/CollectionCard";
import { FormattedMessage } from "react-intl";

const HomePage: React.FC = () => {
  const [items, setItems] = useState<any>([]);
  const [collections, setCollections] = useState<any>([]);

  const getRecentlyAddedItems = async () => {
    let items = await http.get("/items/");

    if (items.data) {
      console.log(items.data);
      setItems(items.data);
    }
  };

  const getBiggestCollections= async () => {
    let collections = await http.get("/collections/");

    if (collections.data) {
      console.log(collections.data.collections);
      setCollections(collections.data.collections);
    }
  };



  useEffect(() => {
    getRecentlyAddedItems();
    getBiggestCollections();
  }, []);

  return (
    <>
      {/* На главной странице отображаются: последние добавленные айтемы, коллекции с самым большим числом айтемов, кликабельное облако тэгов (при клике результат - список ссылок на айтемы, аналогично результатам поиска, по сути это может быть одна вьюшка). */}
      <Typography variant="h5" gutterBottom mt={2}>
        <FormattedMessage id="app.home-page.header1" />
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "900px",
        }}
      >
        {items &&
          items.map((option: any) => {
            return (
              <ItemCard
                key={option.id}
                date={option.createdAt}
                name={option.name}
                user={option.Collection.User.firstName}
                collection={option.Collection.name}
                id={option.id}
              />
            );
          })}
      </div>


      <Typography variant="h5" gutterBottom mt={2}>
      <FormattedMessage id="app.home-page.header2" />
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "900px",
        }}
      >
        {collections &&
          collections.map((option: any) => {
            return (
              <CollectionCard
                key={option.id}
                date={option.createdAt}
                name={option.name}
                id={option.id}
              />
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
