<template>
    <div class="header">
        <div class="header-img" :style="headerImageStyle" @click="$emit('header-clicked')">
            <listing-save :id="id" :button="true"></listing-save>
            <button class="view-photos">View Photos</button>
        </div>
    </div>
</template>
<script>
    import ListingSave from './ListingSave.vue';

    export default {
        data() {
            return {
                headerImageStyle: {
                    'background-image': `url(${this.imageUrl})`
                }
            }
        },
        props: ['image-url', 'id'],
        components: {
            ListingSave
        }
    }
</script>
<style>
    .header {
        height: 320px;
    }

    .header .header-img {
        background-repeat: no-repeat;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        background-position: 50% 50%;
        background-color: #f5f5f5;
        height: 100%;
        cursor: pointer;
        position: relative;
    }

    .header .header-img .view-photos {
        position: absolute;
        bottom: 20px;
        left: 20px;
    }
</style>
