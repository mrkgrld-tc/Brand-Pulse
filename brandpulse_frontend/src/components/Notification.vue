<template>
    <v-dialog width="400px">
        <v-card class="glass-card">
            <v-card-text>
                <p class="text-center">Notification</p>
                <v-divider class="border-opacity-25"></v-divider>
                <div class="d-flex flex-column align-center mt-2">
                    <v-icon size="x-large" :class="icon === 'mdi-loading' ? 'rotate' : ''">{{ icon }}</v-icon>
                    <p>{{ title }}</p>
                    <p class="text-caption">{{ subtitle }}</p>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
    export default{
        props: {
            title:{
                type: String,
                default: 'notif'
            },
            icon: {
                type: String,
                default: 'mdi-bell-ring'
            },
            subtitle:{
                type : String,
                default : 'subtitle'
            },
        },
        data(){
            return{
                test : this.title,
                test1 : 'tsett',
                test2 : this.test1
            }
        }
    }
</script>
<style scope>
.rotate {
    display: inline-block; /* Required for some elements to rotate properly */
    animation: rotation 2s linear infinite;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>