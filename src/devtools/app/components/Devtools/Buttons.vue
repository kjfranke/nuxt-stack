<script setup lang="ts">
const buttonTypes = [
  {
    name: 'Default',
    class: '',
  },
  // {
  //   name: 'CTA',
  //   class: 'button--cta'
  // },
  // {
  //   name: 'Shop Flow',
  //   class: 'button--shop-flow'
  // },
  // {
  //   name: 'Link',
  //   class: 'button--link'
  // }
]
</script>

<template>
  <div>
    <h2>Links</h2>
    <table>
      <tbody>
        <tr>
          <th>Link</th>
          <td><a href="#">Link</a></td>
        </tr>
        <tr>
          <th>Button</th>
          <td>
            <button type="button">
              Button
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Buttons</h2>
    <div style="width: 100%; overflow-x: auto;">
      <table style="width: 100%;">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th
              v-for="button in buttonTypes"
              :key="button.name"
            >
              {{ button.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Default</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button"
              >
                <span>{{ button.name }}</span>
              </button>
            </td>
          </tr>
          <tr>
            <th>&nbsp;&nbsp;&nbsp;:disabled</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button"
                disabled
              >
                <span>{{ button.name }}</span>
              </button>
            </td>
          </tr>
          <tr>
            <th>Icon left</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button"
              >
                <Icon
                  name="icon:arrow"
                  class="icon icon-arrow icon-arrow--left"
                />
                <span>{{ button.name }}</span>
              </button>
            </td>
          </tr>
          <tr>
            <th>Icon right</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button"
              >
                <span>{{ button.name }}</span>
                <Icon
                  name="icon:arrow"
                  class="icon icon-arrow icon-arrow--right"
                />
              </button>
            </td>
          </tr>
          <tr>
            <th>Icon left + right</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button"
              >
                <Icon
                  name="icon:arrow"
                  class="icon icon-arrow icon-arrow--left"
                />
                <span>{{ button.name }}</span>
                <Icon
                  name="icon:arrow"
                  class="icon icon-arrow icon-arrow--right"
                />
              </button>
            </td>
          </tr>
          <tr>
            <th>Full-width</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button button--full"
              >
                <span>{{ button.name }}</span>
              </button>
            </td>
          </tr>
          <tr>
            <th>Full-width icon left</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button button--full"
              >
                <Icon
                  name="icon:arrow"
                  class="icon icon-arrow icon-arrow--left"
                />
                <span>{{ button.name }}</span>
              </button>
            </td>
          </tr>
          <tr>
            <th>Full-width icon right</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button button--full"
              >
                <span>{{ button.name }}</span>
                <Icon
                  name="icon:arrow"
                  class="icon icon-arrow icon-arrow--right"
                />
              </button>
            </td>
          </tr>
          <tr>
            <th>Full-width icon left + right</th>
            <td
              v-for="button in buttonTypes"
              :key="button.name"
            >
              <button
                :class="button.class"
                type="button"
                class="button button--full"
              >
                <Icon
                  name="icon:arrow"
                  class="icon icon-arrow icon-arrow--left"
                />
                <span>{{ button.name }}</span>
                <Icon
                  name="icon:arrow"
                  class="icon icon-arrow icon-arrow--right"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        type="button"
        class="button-wishlist"
      >
        <span class="visually-hidden">Add to wishlist</span>
      </button>
    </div>
  </div>
</template>
