<template>
  <tr class="p-2">
    <td class="p-2">{{ account.id }}</td>
  </tr>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { AccountType } from "../../model/Accounts";
export default defineComponent({
  props: {
    account: {
      required: true,
      type: Object as PropType<AccountType>,
    },
  },
});
</script>
