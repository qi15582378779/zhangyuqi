<template>
	<div>
		<input type="text" class="inp" v-model="msg" />
		<button @click="show" class="btn">确定</button>
	</div>
</template>



<script>
	export default {
		name:"about",
		data(){
			return{
				msg:"请在这里输入数据"
			}
		},
		methods:{
			show(){
				alert(111)
			}
		}
	}
</script>



<style>
	.inp{
		width: 100px;
		height: 40px;
	}
	.btn{
		width: 100px;
		height: 30px;
	}
</style>