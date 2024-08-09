<script>
import { getRandomName } from "../utils/randomName.js";

export default {
  data() {
    return {
      userName: "",
      originalUserName: "",
      editing: false,
    };
  },
  methods: {
    editUsername() {
      this.originalUserName = this.userName;
      this.editing = true;
    },
    saveUsername() {
      if (typeof window !== "undefined") {
        localStorage.setItem("userName", this.userName);
      }
      this.editing = false;
    },
    cancelEdit() {
      this.userName = this.originalUserName;
      this.editing = false;
    },
    initializeUserName() {
      if (typeof window !== "undefined") {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
          this.userName = storedName;
        } else {
          this.userName = getRandomName();
          localStorage.setItem("userName", this.userName);
        }
      }
    },
  },
  created() {
    this.initializeUserName();
  },
};
</script>
