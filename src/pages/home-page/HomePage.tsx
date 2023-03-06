import { Typography } from "@mui/material";
import * as React from "react";
import ItemCard from "../../components/ItemCard";
import http from "../../http";
import { useEffect, useState } from "react";
import CollectionCard from "../../components/CollectionCard";
import { FormattedMessage } from "react-intl";
//@ts-ignore
import { TagCloud } from 'react-tagcloud';

const HomePage: React.FC = () => {
  const [items, setItems] = useState<any>([]);
  const [collections, setCollections] = useState<any>([]);
  const [tags, setTags] = useState<any>([]);

  const getRecentlyAddedItems = async () => {
    let items = await http.get("/items/");

    if (items.data) {
      setItems(items.data);
    }
  };

  const getBiggestCollections= async () => {
    let collections = await http.get("/top-collections/");

    if (collections.data) {
      setCollections(collections.data);
    }
  };
  const getTags = async() => {
    try {
      let tags = await http.get("tags");
      if(tags.data){

        //@ts-ignore
        const outputTags = tags.data.map((tag) => {
          return {
            id: tag.id,
            value: tag.name,
            count: tag.count
          };
        })
        setTags(outputTags);
      }
    } catch (err: any) {
      console.log(err);
    }
  }



  useEffect(() => {
    getRecentlyAddedItems();
    getBiggestCollections();
    getTags();
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
                author={option.User.firstName} 
                countItem={option.itemsCount}
                />
            );
          })}
      </div>

      <Typography variant="h5" gutterBottom mt={3}>
      <FormattedMessage id="app.home-page.header3" />
      </Typography>
      <TagCloud
        minSize={12}
        maxSize={55}
        tags={tags}
        onClick={(tag:any) => alert(`'${tag.value}' was selected!`)}
      />
    </>
  );
};

export default HomePage;
