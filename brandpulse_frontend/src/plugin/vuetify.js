import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import { customDarkTheme, customLightTheme } from '../assets/theme'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
    },
    theme:{
        defaultTheme: 'customDarkTheme',
        themes:{
            customDarkTheme,
            customLightTheme,
        }
    },
    defaults : {
        VBtn : {
            variant : 'tonal',
            class : 'rounded-xl'
        }, 
        VCard : {
            class : 'rounded-lg glass-card',
            variant : ''
        }
    }
})

export default vuetify;