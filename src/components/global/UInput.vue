<script setup>
import { defineProps, defineEmits, toRefs, watch, ref } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
    validator: (val) =>
        ['text', 'password', 'tel', 'email', 'search', 'textarea','date','option'].includes(val),
  },
  pattern: String,
  options: {
    type: Array,
    default: () => [],
  },
})

const { modelValue, placeholder, type } = toRefs(props)

const value = ref(modelValue.value)
watch(value, () => {
  emits('update:modelValue', value.value)
})

const emits = defineEmits(['update:modelValue'])
</script>
<template>
  <div>
    <input
        v-if="type !== 'textarea' && type !== 'options'"
        :type="type"
        :placeholder="placeholder"
        class="form-control mb-3"
        v-model="value"
        :pattern="pattern"
    />
    <textarea
        v-else-if="type === 'textarea'"
        rows="3"
        class="form-control mb3"
        placeholder="asdasda"
        v-model="value"
        :pattern="pattern"
    ></textarea>
    <select v-else-if="type === 'options'" class="form-control mb-3" v-model="value">
      <option value="" disabled><slot></slot></option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>


<style scoped>

input[type="date"], input[type="time"] {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: #090909;
  background-color: #e1e0e0;
  width: 133px;
}

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  width: 16px;
  height: 16px;
  margin-left: 8px;
  background-color: #e1e0e0;
}
input{
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 23px;
}
textarea{
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 23px;
}
select {
  width: 100%;
  font-size: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 23px;
}

</style>