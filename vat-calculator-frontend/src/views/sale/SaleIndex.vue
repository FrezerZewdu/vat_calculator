<template>
  <LoadingPageVue :loading="loadingSale">
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
              v-model="itemSearchString"
              @input="searchItem"
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
          class="mt-4 py-6 px-4 h-1/2 overflow-y-auto grid grid-cols-4 auto-cols-min auto-row-min justify-items-start gap-6 border rounded-lg shadow-inner"
        >
          <!-- item card -->
          <!-- <div
            v-if="availableItems.length < 1"
            class="col-span-full flex items-center justify-center"
          >
            <p class="text-center font-light text-black/70">No Items Yet</p>
          </div> -->
          <div
            v-for="(item, index) in availableItems"
            :key="item.id"
            @click="selectItem(index)"
            class="p-3 h-min rounded-xl bg-white shadow cursor-pointer hover:shadow-lg"
          >
            <div class="flex space-x-3">
              <p class="text-sm text-black/70">{{ item.name }}</p>
              <p>ETB {{ item.latestPrice }}</p>
            </div>
            <div class="mt-2 flex space-x-3">
              <div class="flex flex-col space-y-2">
                <label class="text-xs text-black/60">In Stock (normal)</label>
                <p class="text-sm font-medium">
                  {{ item.normalStock }} {{ item.unit }}
                </p>
              </div>
              <div class="flex flex-col space-y-2">
                <label class="text-xs text-black/60">In Stock (VAT)</label>
                <p class="text-sm font-medium">
                  {{ item.vatStock }} {{ item.unit }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="h-[46%] -mt-6 overflow-y-auto rounded-t-2xl rounded-b-lg p-7 bg-white shadow"
        >
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
          <table class="mt-4 w-full border">
            <thead class="bg-slate-500 text-white/80">
              <th class="p-1 font-normal text-sm">#</th>
              <th class="py-1 font-normal text-sm text-left">Name</th>
              <th class="py-1 font-normal text-sm text-left">Quantity</th>
              <th class="py-1 font-normal text-sm text-left">Unit Price</th>
              <th class="py-1 font-normal text-sm text-left">VAT amount</th>
              <th class="py-1 font-normal text-sm text-left">Total</th>
              <th class="py-1 font-normal text-sm"></th>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in addedItems"
                :key="index"
                class="border-b"
              >
                <td class="text-xs">{{ index + 1 }}</td>
                <td class="text-xs font-medium">{{ item.name }}</td>
                <td class="py-1">
                  <input
                    class="border rounded py-1 pl-1 text-xs"
                    type="number"
                    v-model="item.quantity"
                  />
                </td>
                <td>
                  <input
                    class="border rounded py-1 pl-1 text-xs"
                    type="number"
                    v-model="item.unitPrice"
                  />
                </td>
                <td class="text-xs">
                  {{ allVatCheck ? item.unitPrice * VAT_PERCENTAGE : "-" }}
                </td>
                <td class="text-xs">
                  {{
                    allVatCheck
                      ? (item.unitPrice + item.unitPrice * VAT_PERCENTAGE) *
                        item.quantity
                      : item.unitPrice * item.quantity
                  }}
                </td>
                <td class="flex justify-center items-center pt-2">
                  <button
                    @click="addedItems.splice(index, 1)"
                    class="hover:scale-105 text-gary-500 hover:text-red-400 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
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
      <div class="w-1/3 p-6 flex flex-col justify-between rounded-lg bg-white">
        <div>
          <h4>Sale Information</h4>
          <div class="mt-4 pb-4 flex flex-col space-y-3 border-b">
            <div class="w-full flex justify-between">
              <label class="text-black/70">Sub Total:</label>
              <p>
                {{
                  $filters.formatPriceCurrency(saleInformation.subTotal, "ETB")
                }}
              </p>
            </div>
            <div class="w-full flex justify-between">
              <label class="text-black/70">VAT Total:</label>
              <p>
                {{ $filters.formatPriceCurrency(saleInformation.vat, "ETB") }}
              </p>
            </div>
            <div class="w-full flex justify-between">
              <label class="text-black">Grand Total:</label>
              <p>
                {{
                  $filters.formatPriceCurrency(
                    saleInformation.grandTotal,
                    "ETB"
                  )
                }}
              </p>
            </div>
          </div>
          <div class="mt-4 flex space-x-3 items-center">
            <p>Enable Credit:</p>
            <input
              class="rounded"
              type="checkbox"
              v-model="saleInformation.credit"
            />
          </div>
          <transition
            enter-from-class="-translate-y-20 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            enter-active-class="transition-all duration-300"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="-translate-y-20 opacity-0"
            leave-active-class="transition-all duration-300"
          >
            <div
              v-if="saleInformation.credit"
              class="mt-2 border rounded-xl p-3"
            >
              <div class="flex items-center">
                <label class="text-sm">Upfront payment:</label>
                <input
                  class="ml-2 border rounded py-1 pl-1 text-xs"
                  type="number"
                  v-model="saleInformation.upFrontPayment"
                />
              </div>
              <div class="mt-2 flex">
                <label class="text-sm">Remaining amount:</label>
                <p class="ml-2 font-medium text-sm">
                  {{
                    $filters.formatPriceCurrency(
                      saleInformation.grandTotal -
                        saleInformation.upFrontPayment,
                      "ETB"
                    )
                  }}
                </p>
              </div>
              <div class="mt-2 flex">
                <!-- add file SVG -->
                <button class="outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="72"
                    height="72"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M13 11h-2v3H8v2h3v3h2v-3h3v-2h-3zm1-9H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8zm4 18H6V4h7v5h5z"
                    />
                  </svg>
                </button>
                <p class="ml-5 text-black/70 text-xs">
                  Upload photo, screenshot or PDF
                </p>
              </div>
            </div>
          </transition>
        </div>
        <div class="flex justify-end">
          <button
            @click="processSale"
            class="py-2 px-8 font-semibold"
            :class="[
              disable
                ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed rounded text-white'
                : 'primary-button',
            ]"
            :disabled="disable"
          >
            Process
          </button>
        </div>
      </div>
    </div>
  </LoadingPageVue>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useItemStore } from "../../stores/Items";

import { SaleItemsType } from "@/model/Item";
import { VAT_PERCENTAGE } from "../../utils/constant";

import LoadingPageVue from "../../layout/LoadingPage.vue";

export default defineComponent({
  components: {
    LoadingPageVue,
  },
  data() {
    return {
      addedItems: [] as SaleItemsType[],
      allVatCheck: false,
      disable: true,
      itemSearchString: "",
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
  computed: {
    ...mapState(useItemStore, ["availableItems", "loadingSale"]),
    VAT_PERCENTAGE() {
      return VAT_PERCENTAGE;
    },
  },
  watch: {
    allVatCheck(value: boolean) {
      this.addedItems.forEach((item) => {
        item.isVat = value;
      });
    },
    addedItems: {
      handler(value) {
        if (value.length > 0) {
          this.saleInformation.subTotal = value.reduce(
            (total: number, item: SaleItemsType) => {
              if (item.unitPrice && item.quantity) {
                return total + item.unitPrice * item.quantity;
              } else {
                return total + 0.0;
              }
            },
            0.0
          );
          if (this.allVatCheck) {
            this.saleInformation.vat = value.reduce(
              (total: number, item: SaleItemsType) => {
                if (item.unitPrice && item.unitPrice) {
                  return (
                    total +
                    (item.unitPrice + item.unitPrice * this.VAT_PERCENTAGE)
                  );
                } else {
                  return total + 0.0;
                }
              },
              0.0
            );
          } else {
            this.saleInformation.vat = 0.0;
          }
          this.saleInformation.grandTotal =
            this.saleInformation.subTotal + this.saleInformation.vat;
          this.disable = !(this.saleInformation.grandTotal > 0);
        } else {
          this.disable = true;
          this.saleInformation.subTotal = 0.0;
          this.saleInformation.vat = 0.0;
          this.saleInformation.grandTotal = 0.0;
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(useItemStore, ["fetchAvailableItems", "makeSale"]),
    selectItem(index: number) {
      if (
        !this.addedItems.some(
          (item) => item.name === this.availableItems[index].name
        )
      ) {
        this.addedItems.push({ ...this.availableItems[index] });
      }
    },
    async processSale() {
      this.addedItems.forEach((item) => {
        if (!("isVat" in item)) {
          item["isVat"] = false;
        }
      });
      await this.makeSale(this.addedItems, {
        grandTotal: this.saleInformation.grandTotal,
        upFrontPayment: this.saleInformation.upFrontPayment,
      });
    },
    async searchItem() {
      await this.fetchAvailableItems(this.itemSearchString);
    },
  },
  async mounted() {
    await this.fetchAvailableItems();
    this.$emit("menuSelected", 3);
  },
});
</script>
