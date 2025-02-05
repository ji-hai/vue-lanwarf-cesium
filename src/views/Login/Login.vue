<script setup lang="ts">
import { LoginForm, RegisterForm } from './components'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { LocaleDropdown } from '@/components/LocaleDropdown'
import { useI18n } from '@/hooks/web/useI18n'
import { getCssVar, underlineToHump } from '@/utils'
import { useAppStore } from '@/store/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { ref } from 'vue'
import { ElScrollbar } from 'element-plus'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('login')

const appStore = useAppStore()

const { t } = useI18n()

const isLogin = ref(true)

const toRegister = () => {
  isLogin.value = false
}

const toLogin = () => {
  isLogin.value = true
}

const themeChange = () => {
  const color = getCssVar('--el-bg-color')
  appStore.setMenuTheme(color)
  appStore.setHeaderTheme(color)
}
</script>

<template>
  <div :class="prefixCls" class="h-[100%] relative bg-[var(--login-bg-color)]">
    <ElScrollbar class="h-full">
      <div class="relative flex mx-auto h-[100vh]">
        <img src="@/assets/svgs/login-box-bg.png" key="1" alt="" class="w-100% h-100vh absolute" />
        <!--        <div-->
        <!--          :class="`${prefixCls}__left flex-1 bg-gray-500 bg-opacity-20 relative p-30px lt-xl:hidden`"-->
        <!--        >-->
        <!--          <div class="flex items-center relative text-white">-->
        <!--            <img src="@/assets/imgs/logo.png" alt="" class="w-48px h-48px mr-10px" />-->
        <!--            <span class="text-20px font-bold">{{ underlineToHump(appStore.getTitle) }}</span>-->
        <!--          </div>-->
        <!--          <div class="flex justify-center items-center h-[calc(100%-60px)]">-->
        <!--            <TransitionGroup-->
        <!--              appear-->
        <!--              tag="div"-->
        <!--              enter-active-class="animate__animated animate__bounceInLeft"-->
        <!--            >-->
        <!--              <img src="@/assets/svgs/login-box-bg.png" key="1" alt="" class="w-350px" />-->
        <!--              <div class="text-3xl text-white" key="2">{{ t('login.welcome') }}</div>-->
        <!--              <div class="mt-5 font-normal text-white text-14px" key="3">-->
        <!--                {{ t('login.message') }}-->
        <!--              </div>-->
        <!--            </TransitionGroup>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="flex-1 p-30px dark:bg-[var(--login-bg-color)] relative">
          <div class="flex justify-between items-center text-white">
            <div class="flex items-center">
              <img src="@/assets/imgs/logo.png" alt="" class="w-48px h-48px mr-10px" />
              <span class="text-20px font-bold">{{ underlineToHump(appStore.getTitle) }}</span>
            </div>

            <div class="flex justify-end items-center space-x-10px">
              <ThemeSwitch @change="themeChange" />
              <LocaleDropdown class="lt-xl:text-white dark:text-white" />
            </div>
          </div>
          <Transition appear enter-active-class="animate__animated animate__bounceInRight">
            <div
              class="absolute h-600px pos-top-5 pos-left-0 pos-right-0 pos-bottom-0 m-auto at-2xl:max-w-500px at-xl:max-w-500px at-md:max-w-500px at-lg:max-w-500px"
            >
              <LoginForm
                v-if="isLogin"
                class="p-20px border-rd-6 h-auto m-auto bg-#eee bg-opacity-70 dark:bg-[var(--login-bg-color)]"
                @to-register="toRegister"
              />
              <RegisterForm
                v-else
                class="p-20px border-rd-6 h-auto m-auto bg-white bg-opacity-70"
                @to-login="toLogin"
              />
            </div>
          </Transition>
        </div>
      </div>
    </ElScrollbar>
  </div>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-login';

.@{prefix-cls} {
  overflow: auto;

  &__left {
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('@/assets/svgs/login-bg.svg');
      background-position: center;
      background-repeat: no-repeat;
      content: '';
    }
  }
}
</style>
