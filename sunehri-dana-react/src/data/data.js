/* ALL business data lives here: rates, discounts, free delivery, reviews, WhatsApp number. */
export const NUM="923026333536";
export const FREE_DELIVERY_AT=25000;   // Rs. cart value for free delivery (change to match the client's policy)
export const CLOSE_HOUR=21;            // rates valid until this hour (24h clock)
export const DISC={5:0,10:.02,25:.04,50:.06};   // pack-size discounts
export const REVIEWS=[];               // add ONLY real reviews, e.g. {name:"Ali",city:"Lahore",rating:5,text:"...",product:"1121 Kernel Basmati",verified:true}
export const GOOGLE_REVIEWS_URL="";    // optional: your Google Business reviews link (shows a "Read reviews on Google" button)
/* ================================= */
export const SIZES=[5,10,25,50];
export const P=[
 {id:0,c:"Basmati",n:"Super Kernel Basmati",kg:360,tag:"Best seller",col:"#fdebc8",d:"Long, aromatic grain for everyday pulao and special meals.",grain:"Long",aroma:"High",soak:"30 min",water:"1 : 1.5",time:"15–18 min",best:["pulao","daal","zarda"]},
 {id:1,c:"Basmati",n:"1121 Kernel Basmati",kg:410,tag:"Biryani pick",col:"#fbe0a8",d:"Extra-long grain that stays fluffy and separate. Ideal for biryani.",grain:"Extra long",aroma:"High",soak:"30 min",water:"1 : 1.5",time:"15 min",best:["biryani","pulao","zarda"]},
 {id:2,c:"Basmati",n:"Steam Basmati 1121",kg:440,tag:"Premium",col:"#f9d58e",d:"Steam processed so grains stay unbroken and beautifully separate.",grain:"Extra long",aroma:"High",soak:"20–30 min",water:"1 : 1.5",time:"12–15 min",best:["biryani","pulao"]},
 {id:3,c:"Sella",n:"Super Sella Golden",kg:390,tag:"Restaurant grade",col:"#f7cf86",d:"Golden parboiled rice that cooks firm, fluffy and non-sticky.",grain:"Long",aroma:"Medium-high",soak:"45–60 min",water:"1 : 2",time:"20–25 min",best:["biryani","pulao","daal"]},
 {id:4,c:"Sella",n:"1121 Golden Sella",kg:450,tag:"Dawat favourite",col:"#f4c36d",d:"Long golden grain with rich aroma. Perfect for big weddings and degs.",grain:"Extra long",aroma:"High",soak:"45–60 min",water:"1 : 2",time:"20–25 min",best:["biryani","zarda","pulao"]},
 {id:5,c:"Daily",n:"Irri-6 White",kg:195,tag:"Best value",col:"#eef0f4",d:"Clean everyday white rice at an affordable price.",grain:"Medium",aroma:"Low",soak:"15 min",water:"1 : 2",time:"15 min",best:["daal","fried","khichri"]},
 {id:6,c:"Daily",n:"Irri-9 Sella",kg:235,tag:"Daily use",col:"#f1e6cf",d:"Parboiled grain suited to plain rice, daal chawal and khichri.",grain:"Medium",aroma:"Low",soak:"30 min",water:"1 : 2",time:"20 min",best:["daal","khichri"]},
 {id:7,c:"Daily",n:"Broken Rice (Tota)",kg:145,tag:"Lowest price",col:"#ebe7dc",d:"Broken grain for khichri, kheer and large-batch cooking.",grain:"Broken",aroma:"None",soak:"10 min",water:"1 : 2.5",time:"15 min",best:["kheer","khichri"]},
 {id:8,c:"Special",n:"Brown Rice",kg:330,tag:"Healthy choice",col:"#e6cfae",d:"Whole grain with the bran left on. Rich in fibre.",grain:"Medium",aroma:"Medium",soak:"60 min",water:"1 : 2.5",time:"35–40 min",best:["bowl","fried"]},
 {id:9,c:"Special",n:"Kainat 1121 Extra Long",kg:480,tag:"Top grade",col:"#fbe6b5",d:"Hand-picked extra-long grain with the finest aroma we sell.",grain:"Extra long",aroma:"Very high",soak:"30 min",water:"1 : 1.5",time:"15 min",best:["biryani","zarda","pulao"]}
];
export const CATS=[
 {k:"Basmati",t:"Basmati Rice",d:"Aromatic long grain for pulao and biryani.",cl:"o wide"},
 {k:"Sella",t:"Sella Rice",d:"Golden parboiled rice that stays firm.",cl:"n"},
 {k:"Daily",t:"Everyday Rice",d:"Affordable rice for daily family meals.",cl:""},
 {k:"Special",t:"Specialty Rice",d:"Brown rice and top grade Kainat.",cl:"g wide"}
];
export const DISHES=[
 {id:"biryani",n:"Biryani",bg:"#ffe9d2",d:"Layered, spiced and aromatic. The star of every dawat.",tip:"Use 1121 or Sella. Par-boil to 70% before layering.",picks:[1,4,9]},
 {id:"pulao",n:"Pulao",bg:"#fff3d6",d:"Fragrant yakhni rice with whole spices and tender meat.",tip:"Soak 30 minutes and cook in yakhni at 1 : 1.5.",picks:[0,2,3]},
 {id:"zarda",n:"Zarda",bg:"#fff0c9",d:"Sweet saffron-coloured rice with dry fruits, a wedding classic.",tip:"Extra-long grain keeps each dane separate when sweetened.",picks:[4,9,1]},
 {id:"kheer",n:"Kheer",bg:"#f4ecff",d:"Creamy milk pudding with cardamom, nuts and silver leaf.",tip:"Broken rice melts into a naturally creamy kheer.",picks:[7]},
 {id:"khichri",n:"Khichri",bg:"#fff6d9",d:"Comfort food with daal, ghee and fried onion.",tip:"Irri or Tota cooks soft and blends with daal.",picks:[5,6,7]},
 {id:"daal",n:"Daal Chawal",bg:"#fff0d1",d:"Simple, filling and loved in every home.",tip:"Irri-6 for daily budget. Super Kernel for a better plate.",picks:[5,6,0]},
 {id:"fried",n:"Fried Rice",bg:"#f1f5e3",d:"Chinese-style rice with egg, vegetables and soy.",tip:"Cool the cooked rice first for non-sticky fried rice.",picks:[5,8]},
 {id:"bowl",n:"Healthy Rice Bowl",bg:"#e8f4ee",d:"Brown rice, veggies and protein. A balanced everyday bowl.",tip:"Soak brown rice at least 60 minutes for softer grain.",picks:[8]}
];
export const MEALS=[{k:"Biryani / Pulao",g:110},{k:"Zarda",g:90},{k:"Plain rice",g:100},{k:"Khichri",g:80},{k:"Fried rice",g:100},{k:"Kheer",g:35}];
export const FAQ=[
 ["What is the minimum order?","The smallest pack is 5 kg. You can mix varieties in one order."],
 ["Do you deliver across Pakistan?","Yes. We deliver nationwide. Delivery charges and time depend on your city and are confirmed on WhatsApp before dispatch. Orders above Rs 25,000 qualify for free delivery."],
 ["How do I pay?","Payment method is agreed on WhatsApp when we confirm your order, so you always know the final amount before you pay."],
 ["Why do prices change?","Rice follows the wholesale market. We show an indicative price and confirm the exact rate when you order. The confirmed rate is held for your order."],
 ["What is the difference between Basmati and Sella?","Basmati is aromatic, soft and elongates beautifully. Sella is parboiled before milling, so it cooks firmer, stays separate and rarely breaks. Great for big pots."],
 ["Do you offer wholesale rates?","Yes. 50 kg bags carry our best price per kg, and larger quantities can be quoted on WhatsApp."],
 ["What if I am not happy with my rice?","Message us on WhatsApp with a photo within 24 hours of delivery and we will make it right."]
];
export const GUIDE=[
 ["Basmati vs Sella vs Irri: what is the difference?","<b>Basmati</b> is an aged, long, aromatic grain that doubles in length when cooked. <b>Sella</b> is parboiled before milling, so it is golden, firm and non-sticky; ideal for biryani and big batches. <b>Irri</b> is a shorter, everyday grain that is budget friendly and good for daal chawal and khichri."],
 ["How to identify good Basmati","Look for long, slender, evenly coloured grains with very few broken pieces. Raw rice should smell lightly aromatic. When cooked, the grain should stretch to nearly twice its length without turning mushy. Buy sealed, graded packs."],
 ["How to cook perfect rice, step by step","1) Rinse gently until the water is nearly clear. 2) Soak as per the cooking chart. 3) Boil with salt using the right water ratio. 4) Cook on low heat covered. 5) Rest 5 minutes, then fluff with a fork."],
 ["How to store rice","Keep rice in an airtight container in a cool, dry place away from moisture and strong smells. Do not mix old and new rice. Stored well, it keeps its aroma for months."]
];
export const DSLUG={biryani:"best-rice-for-biryani",pulao:"best-rice-for-pulao",zarda:"best-rice-for-zarda",kheer:"best-rice-for-kheer",khichri:"best-rice-for-khichri",daal:"best-rice-for-daal-chawal",fried:"best-rice-for-fried-rice",bowl:"best-rice-for-healthy-bowl"};
export const CSLUG={Basmati:"basmati-rice-price-pakistan",Sella:"sella-rice-price-pakistan",Daily:"irri-rice-price-pakistan",Special:"brown-and-kainat-rice"};

/* Real images: put a path like "/images/x.webp" to override the built-in illustration. Leave "" for default. */
const BAG = "/images/baba-bag.webp";   // BABA Supreme bag, used everywhere a rice bag is shown
export const IMAGES = {
  products:{0:BAG,1:BAG,2:BAG,3:BAG,4:BAG,5:BAG,6:BAG,7:BAG,8:BAG,9:BAG},
  dishes:{biryani:"/images/biryani.webp",pulao:"/images/pulao.webp",zarda:"/images/dish-zarda.webp",kheer:"/images/kheer.webp",khichri:"/images/khichri.webp",daal:"/images/daal.webp",fried:"/images/fried.webp",bowl:"/images/dish-bowl.webp"}   // zarda and bowl: abhi dark card hain, asli dish photo aaye to path yahan badal dein
};
export const SITE_URL = "https://YOUR-DOMAIN.com/";
