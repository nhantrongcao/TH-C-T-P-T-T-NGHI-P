import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;

export const renderStarFromNumber = (rating) => {
  const stars = [];
  for (let i = 0; i < +rating; i++)
    stars.push(<AiFillStar className="filled-star" key={`filled-${i}`} />);
  for (let i = 5; i > +rating; i--)
    stars.push(<AiOutlineStar className="outline-star" key={`outline-${i}`} />);

  return stars;
};

export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
