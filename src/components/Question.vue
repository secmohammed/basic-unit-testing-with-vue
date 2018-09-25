<template>
    <div>
        <!-- Viewing the question-->
        <div v-if="!editing">
            <h1 v-text="question.title"></h1>
            <h1 v-text="question.body"></h1>
            <button id="edit" @click="editing = true">Edit</button>
        </div>
        <!-- Viewing the question-->

        <div v-if="editing">
            <input type="text" name="title" v-model="form.title">
            <input type="text" name="body" v-model="form.body">
            <button id="update" @click="update">Edit</button>
            <button id="cancel" @click="cancel">Cancel</button>
        </div>
        <p v-if="feedback">Your Question is updated</p>
    </div>
</template>
<script>
    import axios from'axios'
    export default {
        props : ['dataQuestion'],
        data(){
            return {
                question : this.dataQuestion,
                editing : false,
                form : {
                    title  : this.dataQuestion.title,
                    body : this.dataQuestion.body
                },
                feedback : false
            }
        },
        methods : {
            cancel(){
                this.editing = false
            },
            update(){
                this.question.title = this.form.title
                this.question.body = this.form.body
                axios.post('/questions/1',this.form).then(({data}) => {
                    this.feedback = true
                })
                this.editing = false
            }
        }
    };
</script>