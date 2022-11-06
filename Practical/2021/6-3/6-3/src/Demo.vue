<template>
	<div>
		<p>{{msg}}</p>
	</div>
</template>
<script>
	export default{
		data:function(){
			return{
				msg:"今天是个好日子"
			}
		}
	}
</script>
<style scoped>
	p{
		font-size: 36px;
		color: blue;
	}
</style>