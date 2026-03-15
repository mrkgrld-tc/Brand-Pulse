import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'
import { customDarkTheme, customLightTheme } from '../assets/theme'
import Loader from '@/components/Loader.vue'
const vuetify = createVuetify({
    components : {
        ...components,
        Loader,
    },
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
            style: [{ fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)' }]
        },
        VList : {
            style : [
                {backgroundColor : 'rgba(14, 11, 18, 0.8)'}
            ]
        },
        VListItem : {
            style: [
                { fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' },
            ]
        }, 
        VCard : {
            class : ['rounded-lg', 'glass-card', 'card-glow'],
            variant : ''
        },
        VTextField : {
            variant : 'outlined',
            density : 'compact'
        },
        VCardTitle : {
            style: [{ fontSize: 'clamp(1rem, 1.5vw, 1.3rem)!important' }]
        },
        VIcon : {
            opacity : 0.5,
        }
    }
})

export default vuetify;