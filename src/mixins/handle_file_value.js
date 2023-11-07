import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification()
export default {
  data() {
    return {
      fandoValue: "Select a File",
    };
  },
  methods: {
    handleFileChangePosition(event, exch) {
      const input = event.target;
      let file;
      if (exch == "NFO") {
        if (input.files && input.files[0]) {
          this.fandoValue = input.files[0].name;
          file = input.files[0]
        }
      }
      if (exch == "CDS") {
        if (input.files && input.files[0]) {
          this.cdsValue = input.files[0].name;
          file = input.files[0]
        }
      }
      if (exch == "MCX") {
        if (input.files && input.files[0]) {
          this.mcxValue = input.files[0].name;
          file = input.files[0]
        }
      }

      let formData = new FormData();
      formData.append("file", file);
      formData.append("exchange", exch)
      let payload = {
        formData: formData,
        exch: exch,
      }
      this.$store.dispatch("fileupload/loadPositionFile", payload)
    },
    
    async submitPositionsFile() {
      if ( this.cdsValue != "Select a File" && this.fandoValue != "Select a File" && this.mcxValue != "Select a File" ) {
        await this.$store.dispatch("fileupload/submitPositionFile")
        this.fandoValue = "Select a File";
        this.cdsValue = "Select a File";
        this.mcxValue = "Select a File";
      } else {
        notify({ group: "auth", type: "error", title: `Please Upload All Documents`});
      }
    },

    handleFileChangeHoldings(event, type) {
      const input = event.target;
      let file;
      if (type == "DP") {
        if (input.files && input.files[0]) {
          this.dpHoldFile = input.files[0].name;
          file = input.files[0]
        }
      }
      if (type == "T1") {
        if (input.files && input.files[0]) {
          this.t1HoldFile = input.files[0].name;
          file = input.files[0]
        }
      }
      let formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      this.$store.dispatch("fileupload/loadHoldingFile", { formData: formData, type: type });
    },

    async submitHoldingFile() {
      if (this.dpHoldFile != "Select a File" && this.t1HoldFile != "Select a File") {
        await this.$store.dispatch("fileupload/submitHoldingFile")
        this.dpHoldFile = "Select a File";
        this.t1HoldFile = "Select a File";
      } else {
        notify({ group: "auth", type: "error", title: `Please Upload All Documents`});
      }
    },
  },
};
