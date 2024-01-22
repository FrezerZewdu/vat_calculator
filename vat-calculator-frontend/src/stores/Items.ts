import { CreateItemType, ItemListType, ItemsFetchFilter } from "@/model/Item";
import baseAPI from "../services/axios";
import { defineStore } from "pinia";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    availableItems: [] as ItemListType[],
    allInventoryItems: [] as ItemListType[],
    loadingItems: false,
  }),
  actions: {
    async fetchAvailableItems() {
      try {
        this.loadingItems = true;
        await baseAPI
          .get("item/active")
          .then((response) => {
            this.availableItems = response.data.data;
          })
          .finally(() => {
            this.loadingItems = false;
          });
      } catch (error) {
        this.loadingItems = false;
        console.log(error);
      }
    },
    async fetchAllItems(filter: ItemsFetchFilter) {
      try {
        this.loadingItems = true;
        await baseAPI
          .get("item/getAll", {
            params: filter,
          })
          .then((response) => {
            this.allInventoryItems = response.data.data;
          })
          .finally(() => {
            this.loadingItems = false;
          });
      } catch (error) {
        this.loadingItems = false;
        console.log(error);
      }
    },
    async createItem(itemInfo: CreateItemType) {
      try {
        this.loadingItems = true;
        await baseAPI
          .post("item", itemInfo)
          .then((response) => {
            console.log(response);
          })
          .finally(() => {
            this.loadingItems = false;
          });
      } catch (error) {
        this.loadingItems = false;
        console.log(error);
      }
    },
  },
});
