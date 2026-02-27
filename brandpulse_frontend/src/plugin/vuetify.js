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
            variant: 'tonal',
            class: 'rounded-lg',
            size: 'small',  // ✓ pick one sensible default
            style: [{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }]
        },
        VListItem : {
            style: [
                { fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' },
            ]
        }, 
        VCard : {
            class : ['rounded-lg', 'glass-card'],
            variant : ''
        }
    }
})

export default vuetify;