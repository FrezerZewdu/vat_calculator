<template>
  <LoadingPageVue :loading="loading">
    <h2>Sales Point</h2>
    <div class="h-full mt-5 py-6 px-4 flex space-x-5">
      <div class="w-2/3 h-full">
        <div class="flex justify-between">
          <h4>Items</h4>
          <div class="relative w-36">
            <input
              type="text"
              class="w-full rounded border py-1 px-4"
              placeholder="Search"
            />
            <svg
              class="absolute right-1 top-1 text-black/50"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
              />
            </svg>
          </div>
        </div>
        <div
          class="mt-4 py-6 px-4 h-1/2 overflow-y-auto grid grid-cols-5 gap-6 border rounded-lg shadow-inner"
        >
          <!-- item card -->
          <div
            v-if="items.length < 1"
            class="col-span-full flex items-center justify-center"
          >
            <p class="text-center font-light text-black/70">No Items Yet</p>
          </div>
          <div
            v-for="item in items"
            :key="item.id"
            class="p-3 rounded-xl bg-white shadow"
          >
            <div class="flex space-x-3">
              <p class="text-sm text-black/70">{{ item.name }}</p>
              <p>ETB {{ item.currentPrice }}</p>
            </div>
            <div class="mt-2 flex space-x-3">
              <div class="flex flex-col space-y-2">
                <label class="text-xs text-black/60">In Stock (normal)</label>
                <p class="text-sm font-medium">
                  {{ item.inStock }} {{ item.unit }}
                </p>
              </div>
              <div class="flex flex-col space-y-2">
                <label class="text-xs text-black/60">In Stock (VAT)</label>
                <p class="text-sm font-medium">
                  {{ item.inStockVat }} {{ item.unit }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-t-2xl p-7 bg-white shadow">
          <div class="flex justify-between">
            <p class="text-black/70">Receipt</p>
            <div class="flex items-center">
              <input
                type="checkbox"
                class="border rounded"
                v-model="allVatCheck"
              />
              <label class="ml-2">All VAT</label>
            </div>
          </div>
          <table class="mt-6 w-full border">
            <thead>
              <th class="py-1 font-normal text-sm text-gray-600">#</th>
              <th class="py-1 font-normal text-sm text-gray-600">Name</th>
              <th class="py-1 font-normal text-sm text-gray-600">Quantity</th>
              <th class="py-1 font-normal text-sm text-gray-600">Unit Price</th>
              <th class="py-1 font-normal text-sm text-gray-600">Is VAT</th>
              <th class="py-1 font-normal text-sm text-gray-600">VAT amount</th>
              <th class="py-1 font-normal text-sm text-gray-600">Total</th>
              <th class="py-1 font-normal text-sm text-gray-600"></th>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in addedItems"
                :key="index"
                class="border-b"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td class="py-2">
                  <input
                    class="border rounded py-1 pl-1"
                    type="number"
                    v-model="item.quantity"
                  />
                </td>
                <td>
                  <input
                    class="border rounded py-1 pl-1"
                    type="number"
                    v-model="item.unitPrice"
                  />
                </td>
                <td>
                  <input
                    class="border rounded py-1 pl-1"
                    type="checkbox"
                    v-model="item.isVat"
                  />
                </td>
                <td>
                  {{
                    item.isVat ? item.unitPrice + item.unitPrice * 0.15 : "null"
                  }}
                </td>
                <td>{{ item.unitPrice * item.quantity }}</td>
                <td class="flex justify-center items-center">
                  <button
                    @click="addedItems.splice(index, 1)"
                    class="hover:scale-105 text-black/70 hover:text-red-400 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="w-1/3 p-6 rounded-lg bg-white">
        <h4>Sale Information</h4>
        <div class="mt-4 flex flex-col space-y-3">
          <div class="w-full flex justify-between">
            <label class="text-black/70">Sub Total:</label>
            <p>ETB {{ saleInformation.subTotal }}</p>
          </div>
          <div class="w-full flex justify-between">
            <label class="text-black/70">VAT Total:</label>
            <p>ETB {{ saleInformation.vat }}</p>
          </div>
          <div class="w-full flex justify-between">
            <label class="text-black">Grand Total:</label>
            <p>ETB {{ saleInformation.grandTotal }}</p>
          </div>
        </div>
      </div>
    </div>
  </LoadingPageVue>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ItemListType, SaleItemsType } from "@/model/Item";
import LoadingPageVue from "../../layout/LoadingPage.vue";

export default defineComponent({
  components: {
    LoadingPageVue,
  },
  data() {
    return {
      loading: true,
      items: [] as ItemListType[],
      addedItems: [] as SaleItemsType[],
      allVatCheck: false,
      saleInformation: {
        subTotal: 0.0,
        vat: 0.0,
        grandTotal: 0.0,
        credit: false,
        upFrontPayment: 0.0,
        creditFile: null,
      },
    };
  },
  watch: {
    allVatCheck(value: boolean) {
      this.addedItems.forEach((item) => {
        item.isVat = value;
      });
    },
    addedItems(value) {
      if (value.length > 0) {
        this.saleInformation.subTotal = value.reduce(
          (total: number, item: SaleItemsType) => {
            return total + item.unitPrice * item.quantity;
          },
          0.0
        );
        this.saleInformation.vat = value.reduce(
          (total: number, item: SaleItemsType) => {
            if (item.isVat) {
              return total + (item.unitPrice + item.unitPrice * 0.15);
            }
          },
          0.0
        );
        this.saleInformation.grandTotal =
          this.saleInformation.subTotal + this.saleInformation.vat;
      } else {
        this.saleInformation.subTotal = 0.0;
        this.saleInformation.vat = 0.0;
        this.saleInformation.grandTotal = 0.0;
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1300);
    this.$emit("menuSelected", 3);
  },
});
</script>
