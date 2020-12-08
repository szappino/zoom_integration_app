<template>

    <div class="row" style="margin-top: 100px">
        <div class="col"></div>

        <div class="col">

            <form @submit.prevent="" style="margin: 25px">
                <div class="form-group">
                    <label for="username">Titolo votazione</label>
                    <input
                        v-model="voting.title"
                        type="text"
                        class="form-control"
                        id="username"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1"
                        >Descrizione votazione</label
                    >
                    <input
                        v-model="voting.description"
                        type="text"
                        class="form-control"
                        required
                    />
                </div>              

            </form>

            <div class="row justify-content-center" v-if="!voted" >
                <button @click="vote_ok" class="btn btn-success">
                    Vota Favore
                </button>

                <button @click="vote_no" class="btn btn-danger" style="margin-left: 25px">
                    Vota Contrario
                </button>
            </div>

            <div class="row justify-content-center" v-if="voted" >
                <h2>Hai già votato</h2>
            </div>


        </div>

        <div class="col"></div>
    </div>

</template>

<script>

import axios from 'axios';

export default {

    data: function() {
        return {
            voted: false,
            loaded: false,
            voting : {
                title: '',
                description: '',
            },
            user_vote: {
                user: '',
                vote_id: null,
                result: null,
            }
        }
    },

    mounted: function() {
        this.loadVoting();
    },

    methods: {
        loadVoting : async function() {

            //TODO: check on load if the current user already voted
            this.user_vote.user = this.$route.query.username;

            var data;
            
            var result = await axios.get('http://localhost:3000/votings')
            .then(function (response) {
                // handle success
                console.log(response);
                data = response.data;

                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });


            var votings = null;
            await axios.get('http://localhost:3000/user_vote')
            .then(function (response) {
                
                votings = response.data;                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

            console.log('votings:');
            console.log(votings);


            this.voting = data[data.length -1];
            this.user_vote.vote_id = this.voting.id;
            
            
            
            
            votings.forEach(element => {
                                
                if (element.user == this.$route.query.username && element.vote_id == this.voting.id) {
                    this.voted = true;
                }
                
            });

            console.log(result);
            console.log(data[data.length -1]);
        },

        vote_ok: async function() {

            this.user_vote.result = 1;

            await axios.post("http://localhost:3000/user_vote", {
                user: this.user_vote.user, vote_id: this.user_vote.vote_id, result: this.user_vote.result
            });

            this.voted = true;
        },

        vote_no: async function() {
            this.user_vote.result = 0;

            await axios.post("http://localhost:3000/user_vote", {
                user: this.user_vote.user, vote_id: this.user_vote.vote_id, result: this.user_vote.result
            });

            this.voted = true;
        }
    }

};
</script>

<style>
</style>