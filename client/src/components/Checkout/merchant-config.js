import { PAYTM_MID } from '../../CONSTANTS';

const RAZORPAY_KEY = 'rzp_test_gXfpQtcK0MGmMf'
const CONFIG = {
    style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#dfa231",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
            padding: "",
            backgroundColor: ""
        }
    },
    jsFile: "",
    data: {
        orderId: "1",
        amount: "1000",
        token: "16b4a25b7be647cb98ca996d555592691617988139420",
        tokenType: "TXN_TOKEN",
        // userDetail: {
        //     mobileNumber: "",
        //     name: ""
        // }
    },
    merchant: {
        mid: PAYTM_MID,
        name: "Raavanan",
        // logo: "/static/media/raavanan logo.07b03d7b.png",
        logo: "/static/media/raavananlogo.png",
        redirect: true
    },
    mapClientMessage: {},
    labels: {},
    payMode: {
        labels: {},
        filter: {
            exclude: []
        },
        order: [
            "NB",
            "CARD",
            "LOGIN"
        ]
    },
    flow: "DEFAULT",
    handler: {
        notifyMerchant: function(eventName,data){
          console.log("notifyMerchant handler function called");
          console.log("eventName => ",eventName);
          console.log("data => ",data);
        }
    }
    
};

export default CONFIG;