<template>
  <div class="row" style="margin-top: 100px">
        <div class="col"></div>

        <div class="col" v-if="show">

            <div class="card" style="margin-bottom:20px;" v-for="voting in votings" :key="voting.id">
                
                <div class="card-body">
                    <h5 class="card-title">{{voting.title}}</h5>
                    
                    <p class="card-text">{{voting.description}}</p>

                    <div class="row">

                        <div class="col">
                            Voti favore {{voting.favore}}
                        </div>
                        <div class="col">
                            Voti contro {{voting.contro}}
                        </div>

                    </div>
                </div>
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
            votings: [],
            user_votes: [],
            show: false,
        }
    },

    mounted: function() {
        this.init();
    },

    methods: {
        loadVotings: async function() {
            var self = this;
            
            var result = await axios.get('http://localhost:3000/votings')
            .then(function (response) {
                // handle success
                console.log(response);
                self.votings = response.data;                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

            console.log(result);
        },

        loadUserVotes: async function() {
            var self = this;

            var result = await axios.get('http://localhost:3000/user_vote')
            .then(function (response) {
                // handle success
                console.log(response);
                self.user_votes = response.data;

                
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
            console.log(result);
        }, 
        init: async function() {
            await this.loadVotings();
            await this.loadUserVotes();

            var self = this;

            self.votings.forEach(v => {
                v.favore = 0;
                v.contro = 0;

                self.user_votes.forEach(u_v => {
                    if (v.id == u_v.vote_id) {
                        (u_v.result == 1) ? v.favore +=1 : v.contro += 1;
                    }
                }); 
            });
            

            //Keep last
            this.show = true;
        }

    }
}
</script>

<style>

</style>