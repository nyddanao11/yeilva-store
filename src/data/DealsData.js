export const deals = [
{
  id: 1,
  name: "Mangosteen choco",
  url:  `${process.env.PUBLIC_URL}/images/choco.jpg`,
  price: 230,
  description: "Mangosteen Coffee with moringa is perfect to start your day for its true coffee taste sweetened by stevia.Mangosteen is a potent source of anti-oxidant blended with Moringa leaf powder that is a remarkable source of nutrition. Mangosteen boosts immune system, Moringa controls blood pressure and Stevia protects the bone and reduces heart burn",               
  discountedPrice: 200,
  weight:120,
  rating: 4.5,
  thumbnails:
      [`${process.env.PUBLIC_URL}/images/mangosteen.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/mangoesteen2.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/mangoesteen3.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/mangoesteen4.png`,
      ],
},
{
  id: 2,
  name: "Acai Berry 1000ml",
  url:  `${process.env.PUBLIC_URL}/images/acai1.png`,
  price: 2000,
  description:"What are some of ACAI BERRY’s health benefits? The acai berry has numerous health benefits, and has been proven to protect virtually every system in the body. A few of these benefits include: Weight loss: Acai is composed of several vitamins and minerals, and works to suppress hunger, increase energy, and stimulate metabolism. Digestive System Aid: A high level of fiber makes acai berry a natural colon cleanser. Boosts the Immune System: The high concentration of antioxidants in acai berry helps to support the immune system by fortifying cells and fighting off intruders. Acai berry has also been proven to: Regulate sugar level, Prevents Cardio vascular disease, Improves heart function , Maintain Healthy Teeth and Gums, Prevent Cancer. ",
  discountedPrice: 1800,
  weight:1000,
  rating: 4.2,
   thumbnails:
     [`${process.env.PUBLIC_URL}/images/acai1.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/acai2.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/acai3.png`,
      ],
 },
 {
  id: 3,
  name: "Arctic C",
  url: `${process.env.PUBLIC_URL}/images/artic c.png`,
  price: 750,
  discountedPrice: 600,
   weight:35,
   rating: 4.2,
  description:"blend of omega 3,6 and 9 which contains essential fatty acids EPA and DHA derived from the tissues of oily fish that can contributes to the healthy function of the heart and normal the maintenance of the brain",
    thumbnails:
      [`${process.env.PUBLIC_URL}/images/artic c.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/arcticc1.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/arcticc2.png`,
       
      ],
},
{
  id: 5,
  name: "Absorbent Cee",
  url:  `${process.env.PUBLIC_URL}/images/absorbent c.png`,
  price: 750,
  discountedPrice: 600,
   weight:120,
   rating: 4.2,
  description:"Vitamin Cee for strong immune system and prevent cardio vascular disease",
    thumbnails:
      [`${process.env.PUBLIC_URL}/images/absorbent c.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/absorbentcee1.png`,
       `${process.env.PUBLIC_URL}/images/dealsthumb/absorbentcee2.png`,
       
      ],
},



];