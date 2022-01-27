<template>
  <div id="contact" class="contact" :class="mode">
    <h1 class="title" :mode="mode">BeatFul</h1>

    <div
      class="hamburger"
      @click="hamburgerOpen = !hamburgerOpen"
      :class="hamburgerOpen ? 'hamburger--is-open' : ''"
    >
      <div class="hamburger__item hamburger__item--first"></div>
      <div class="hamburger__item hamburger__item--middle"></div>
      <div class="hamburger__item hamburger__item--last"></div>
    </div>
    <div class="droper-content" :class="hamburgerOpen ? 'dropic' : ''">
      <router-link to="/">HOME</router-link>
      <router-link to="/songs">SONGS</router-link>
      <router-link to="/contact">CONTACT</router-link>
      <router-view />
    </div>

    <Nav class="hey" :mode="mode" @toggle="toggle" />

    <h2>You have questions or suggestions for us?</h2>
    <h3>Get in touch with us!</h3>
    <form @submit.prevent="sendEmail">
      <!--<label>Name</label>-->
      <input
        type="text"
        v-model="name"
        name="name"
        placeholder="Your Name"
        required
      >
      <!--<label>Email</label>-->
      <input
        type="email"
        v-model="email"
        name="email"
        placeholder="Your Email"
        required
      >
      <!--<label>Message</label>-->
      <textarea
        name="message"
        v-model="message"
        rows="8"
        placeholder="Message"
        required>
      </textarea>

      <input type="submit" value="Send">
    </form>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
import Nav from "../components/Nav";

export default {
  name: 'ContactForm',
  components: {
      Nav,
  },
  data() {
    return {
        mode: "light",
      hamburgerOpen: false,
      name: '',
      email: '',
      message: '',
      isHidden: false,
    }
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target,
        'YOUR_USER_ID', {
          name: this.name,
          email: this.email,
          message: this.message
        })

      } catch(error) {
          console.log({error})
      }
      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''
    },
    toggle() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
    },
  }
}
</script>

<style scoped>
#contact {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  background: #f1eff6;
  transition: background 0.3s ease-in-out;
  margin-top: -27px;
}
#contact h1 {
  font-family: "Dancing Script";
  font-size: 56px;
  font-weight: 700;
  display: flex;
  justify-content: left;
  padding-top: 15px;
  margin-left: 2%;
  color: #91a48e;
}
#contact.dark {
  height: 100vh;
  background-color: #363636;
  color: #e8e8e8;
}
h2, h3 {
    padding-top: 12px;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #2c3e50;
}
h3 {
font-size: 28px;
font-weight: 400;
}
.dark h2, .dark h3 {
    color: #e6e6e6;
}
form {
  position: absolute;
  width: 40%;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  display: block;
  text-align: center;
}
input[type=text], [type=email], textarea {
  width: 100%;
  font-size: 16px;
  padding: 12px 0 12px 16px;
  border: 2px solid #91a48e;
  border-radius: 12px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
  max-height: 400px;
}
input[type=submit] {
  width: 100%;
  font-size: 16px;
  background-color: #91a48e;
  color: white;
  padding: 12px 0px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}
input[type=submit]:hover {
  background-color: #9fb09c;
}
input:focus, textarea:focus {
  outline: 0;
}
@media screen and (max-width: 1080px) {
    #contact, #contact.dark {
        height: 105vh;
    }
    h2, h3 {
    font-size: 34px;
    }
    h3 {
    font-size: 24px;
    padding-top: 8px;
    }
  form {
    width: 60%;
    padding-top: 30px;
  }
  input[type=submit] {
    margin-bottom: 40px;
  }
}
@media screen and (max-width: 980px) {
    #contact, #contact.dark {
    height: 105vh;
    padding-bottom: 730px;
  }
    #contact h1 {
    font-size: 48px;
    margin-left: 6%;
  }
}
@media screen and (max-width: 780px) {
    #contact h1 {
    justify-content: left;
    padding-top: 65px;
    margin-left: 11%;
    font-size: 52px;
  }
    form {
    width: 70%;
    padding-top: 130px;
  }
   
  h2 {
    font-size: 30px;
    padding: 20px 100px 0;
  }
}
@media screen and (max-width: 600px) {
  h2 {
    font-size: 24px;
    padding: 20px 50px 0;
  }
  h3 {
      font-size: 20px;
      padding-top: 5px;
  }
  form {
    width: 85%;
  }
  input[type=text], [type=email], textarea {
    font-size: 15px;
    padding: 10px 0 10px 15px;
    margin-top: 12px;
    margin-bottom: 20px;
  }
}
</style>
