import {
  CreateItemType,
  ItemListType,
  ItemsFetchFilter,
  SaleInformation,
  SaleItemsType,
} from "@/model/Item";
import baseAPI from "../services/axios";
import { defineStore } from "pinia";
import { createToaster } from "@meforma/vue-toaster";
import {
  POST_SUCCESS_STATUS,
  PUT_SUCCESS_STATUS,
  SERVER_ERROR_STATUS,
} from "@/utils/constant";

const toaster = createToaster({ position: "top" });

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    availableItems: [] as SaleItemsType[],
    allInventoryItems: [] as ItemListType[],
    selectedItem: {} as ItemListType,
    loadingItem: false, // for when updating or creating a new item
    loadingSale: true, // for when processing a sale
    itemSelected: false,
  }),
  actions: {
    async fetchAvailableItems(searchString = "") {
      try {
        this.loadingSale = true;
        await baseAPI
          .get("item/active", {
            params: {
              search: searchString,
            },
          })
          .then((response) => {
            this.availableItems = response.data;
          })
          .finally(() => {
            this.loadingSale = false;
          });
      } catch (error) {
        this.loadingSale = false;
        console.log(error);
      }
    },
    async fetchAllItems(filter: ItemsFetchFilter) {
      try {
        this.loadingItem = true;
        await baseAPI
          .get("item/getAll", {
            params: filter,
          })
          .then((response) => {
            console.log(response.data);
            this.allInventoryItems = response.data;
          })
          .finally(() => {
            this.loadingItem = false;
          });
      } catch (error) {
        this.loadingItem = false;
        console.log(error);
      }
    },
    async createItem(itemInfo: CreateItemType) {
      try {
        this.loadingItem = true;
        await baseAPI
          .post("item", itemInfo)
          .then((response) => {
            if (response.status === POST_SUCCESS_STATUS) {
              toaster.success("New Item Created Successfully");
            }
          })
          .finally(() => {
            this.loadingItem = false;
          });
      } catch (error: any) {
        this.loadingItem = false;
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something is wrong! Unable to create Item");
        }
      }
    },
    async updateItem(itemInfo: ItemListType) {
      console.log("the function is found");
      try {
        this.loadingItem = true;
        await baseAPI
          .put("item", itemInfo)
          .then((response) => {
            console.log(response);
            if (response.status === PUT_SUCCESS_STATUS) {
              this.fetchAllItems({
                page: 1,
                perPage: 15,
                search: "",
              });
              this.selectedItem = response.data;
              toaster.success("Item Updated");
            }
          })
          .finally(() => {
            setTimeout(() => {
              this.loadingItem = false;
            }, 1000);
          });
      } catch (error: any) {
        this.loadingItem = false;
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something is wrong! Unable to update Item");
        }
      }
    },
    async makeSale(saleItems: SaleItemsType[], saleInfo: SaleInformation) {
      try {
        this.loadingSale = true;
        const structuredItems = saleItems.map((item) => {
          return {
            itemId: item.id,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            isVat: item.isVat,
          };
        });
        const transaction = {
          totalAmount: saleInfo.grandTotal,
          remainingAmount: saleInfo.upFrontPayment
            ? saleInfo.grandTotal - saleInfo.upFrontPayment
            : 0.0,
          soldItems: structuredItems,
        };
        await baseAPI
          .post("transaction", transaction)
          .then(async (response) => {
            if (response.status === POST_SUCCESS_STATUS) {
              await this.fetchAvailableItems();
            }
          })
          .finally(() => {
            this.loadingSale = false;
            toaster.success("Sale made");
          });
      } catch (error: any) {
        this.loadingSale = false;
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something is wrong! Unable to register sale");
        }
      }
    },
  },
});
