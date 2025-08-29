const propertyCategories = [
    "Apartment",
    "House",
    "Villa",
    "Cottage",
    "Townhouse",
    "Guesthouse",
    "Bungalow",
    "Cabin",
    "Studio",
    "Treehouse",
    "Boathouse",
    "Tent",
    "Farmhouse",
    "Castle",
    "Mansion",
    "Resort",
    "Igloo",
    "Lighthouse",
    "Yurt",
    "Tipi",
    "Cave",
    "Other",
  ];
  
  import apartment from "../filterImages/apartment.png";
  import house from "../filterImages/home.png";
  import villa from "../filterImages/villa.png";
  import cottage from "../filterImages/cottage.png";
  import townhouse from "../filterImages/townhouse.png";
  import guesthouse from "../filterImages/guesthouse.png";
  import bungalow from "../filterImages/bungalow.png";
  import cabin from "../filterImages/cabin.png";
  import studio from "../filterImages/studio.png";
  import boat from "../filterImages/houseboat.png";
  import treehouse from "../filterImages/treehouse.png";
  import tent from "../filterImages/tent.png";
  import resort from "../filterImages/resort.png";
  import farmhouse from "../filterImages/fence.png";
  import castle from "../filterImages/castle.png";
  import mansion from "../filterImages/mansion.png";
  import igloo from "../filterImages/igloo.png";
  import lighthouse from "../filterImages/lighthouse.png";
  import yurt from "../filterImages/yurt.png";
  import tipi from "../filterImages/tipi.png";
  import cave from "../filterImages/cave.png";
  import other from "../filterImages/more.png";
  
  const imageArray = [
    apartment,
    house,
    villa,
    cottage,
    townhouse,
    guesthouse,
    bungalow,
    cabin,
    studio,
    treehouse,
    boat,
    tent,
    farmhouse,
    castle,
    mansion,
    resort,
    igloo,
    lighthouse,
    yurt,
    tipi,
    cave,
    other,
  ];
  
  const filterData = propertyCategories.map((category, index) => {
    return {
      image: imageArray[index],
      value: category,
    };
  });
  

  export default filterData
  