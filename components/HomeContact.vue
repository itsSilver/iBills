<template>
  <div class="container pt-c" id="contact">
    <div class="header">Ask Question</div>
    <div class="line"><div class="inside"></div></div>
    <h2 class="secondary">Let us hear from you directly!</h2>

    <div class="columns mx-auto pt-4 flex-center">
      <div class="column is-one-third">
        <p class="c-text">Blockchain.com, Inc ID# 2024031</p>
      </div>
      <div class="column is-two-thirds">
        <form @submit.prevent="sendEmail" class="inline">
          <div class="columns">
            <div class="column">
              <b-field label="Full Name">
                <b-input v-model="form.name" required></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Email">
                <b-input v-model="form.email" type="email" required></b-input>
              </b-field>
            </div>
          </div>
          <b-field label="Message">
            <b-input
              maxlength="200"
              type="textarea"
              v-model="form.message"
              required
            ></b-input>
          </b-field>
          <b-button class="send-message" native-type="submit"
            >Send Message</b-button
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: null,
        email: null,
        message: null,
      },
    }
  },
  methods: {
    async sendEmail() {
      try {
        const send = this.$axios.post('/leads', this.form)
        this.$buefy.snackbar.open({
          message: `Message was sent successfully!`,
          queue: false,
        })
        this.form.name = null
        this.form.email = null
        this.form.message = null
      } catch (error) {
        this.$buefy.snackbar.open({
          message: `Error sending the message, please try again!`,
          queue: false,
        })
        console.log('error', error)
      }
    },
  },
}
</script>

<style scoped>
.header {
  color: #121d33;
  text-align: center;
  font-size: 25px;
  line-height: 100%;
  padding: 10px;
  padding-bottom: 15px;
}
.line {
  height: 1px;
  width: 90px;
  background-color: #ff7e00;
  text-align: center;
  margin: auto;
}
.secondary {
  text-align: center;
  font-weight: 500;
  font-size: 30px;
  color: #ff7e00;
}
.third {
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  color: #ff7e00;
}
.mx-auto {
  margin: auto 0;
}
.c-text {
  font-weight: 600;
  color: #000;
}
.flex-center {
  justify-content: center;
  align-content: center;
  align-items: center;
}
.send-message {
  color: white;
  background-color: #ff7e00;
  border-radius: 20px;
  border: none;
}
</style>
