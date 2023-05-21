<template>
	<section class="page-home">
		<Header></Header>

		<div class="wrapper">
			<div class="main-content">
				<div class="list">
					<div class="item">
						<p>item-1</p>
					</div>
					<div class="item">
						<p>item-1</p>
					</div>
					<div class="item">
						<p>item-1</p>
					</div>
					<div class="item">
						<p>item-1</p>
					</div>
					<div class="item">
						<p>item-1</p>
					</div>
					<div class="item">
						<p>item-1</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/HeaderComponent.vue';

export default defineComponent({
	name: 'HomeView',
	components: {
		Header,
	},
});
</script>
